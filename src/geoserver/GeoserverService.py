from typing import Optional

from src.geoserver.GeoserverClient import GeoserverClient
from src.geoserver.GeoserverException import GeoserverException
from src.geoserver.GeoserverRequestResponseUtil import (transform_resource_info, transform_layer,
                                                        transform_layer_group, transform_hierarchical_area)
from src.utils.ConfigReader import load_config
from src.utils.JsonHelper import get_json_list_attribute, get_json_string_attribute


class GeoserverService:
    """
    A class used for combining data retrieved from multiple GeoServer endpoints and converting it to the desired format.
    Attributes
    ----------
    geoserver_client : GeoserverClient
        instance of class for retrieving data from GeoServer
    custom_areas_workspace : str
        name of the workspace where custom areas are saved in GeoServer
    custom_areas_group: str
        prefix of the name of the layer group used for storing custom areas
    areas_workspace: str
        name of the name of the workspace where areas are saved in GeoServer
    areas_group: str
        name of the layer group used for storing areas
    custom_areas_native_name: str
        native name of a custom area, which should be used for creation of new custom areas
    """

    def __init__(self):
        self.geoserver_client = GeoserverClient()

        config = load_config(section="geoserver_areas")
        self.custom_areas_workspace = config["custom_areas_workspace"]
        self.custom_areas_group = config["custom_areas_group"]
        self.areas_workspace = config["areas_workspace"]
        self.areas_group = config["areas_group"]
        self.custom_areas_native_name = config["custom_area_native_name"]

    # region Layers
    def get_layers_in_groups(self, workspace: Optional[str] = None) -> list:
        """ Combines data retrieved from multiple GeoServer endpoints to get a list of layers divided into layer groups
        together with information about them and converts data into the desired format.
        Parameters
        ----------
        workspace : str
            name of the workspace, in which layer groups are store, if None, retrieves all available layer groups
        Returns
        ----------
        list
            list of layers divided into layer groups
        """
        layer_groups_dict = self.geoserver_client.get_layer_groups(workspace)
        transformed_groups = []
        if layer_groups_dict is not None:
            layer_groups = get_json_list_attribute(layer_groups_dict, "layerGroups.layerGroup")
            if type(layer_groups) is not list:
                layer_groups = [layer_groups]

            transformed_groups = self.__get_transformed_groups__(layer_groups, workspace)
        return transformed_groups

    def get_layer_group(self, layer_group_name: str, workspace: Optional[str] = None) -> Optional[dict]:
        """ Combines data retrieved from multiple GeoServer endpoints to get all information about a layer group with
        the layer_group_name and converts data into the desired format.
        Parameters
        ----------
        layer_group_name: str
            name of the layer group to retrieve the information about
        workspace : str, optional
            name of the workspace in which the layer group is stored
        Returns
        -------
        dict, optional
            information about the given layer group or None if unable to retrieve the information
        """
        layer_group_dict = self.geoserver_client.get_layer_group(layer_group_name, workspace)
        transformed_layer_group = None

        if layer_group_dict is not None:
            layers = get_json_list_attribute(layer_group_dict, "layerGroup.publishables.published")
            if type(layers) is not list:
                layers = [layers]

            transformed_layers = self.__get_transformed_layers__(layers)
            transformed_layer_group = transform_layer_group(transformed_layers, layer_group_dict)

        return transformed_layer_group

    def get_layer(self, workspace: str, layer_name: str) -> Optional[dict]:
        """ Combines data retrieved from multiple GeoServer endpoints to get all information about a layer with the
        layer_name and converts data into the desired format.
        Parameters
        ----------
        workspace : str, optional
            name of the workspace in which the layer is stored
        layer_name: str
            name of the layer to retrieve the information about
        Returns
        -------
        dict
            information about the given layer or None if unable to retrieve the information
        """
        layer_dict = self.geoserver_client.get_layer(layer_name, workspace)
        transformed_layer = None

        if layer_dict is not None:
            resource_name = get_json_string_attribute(layer_dict, "layer.resource.name")
            resource_url = get_json_string_attribute(layer_dict, "layer.resource.href")
            resource_class = get_json_string_attribute(layer_dict, "layer.resource.@class")

            transformed_res_info = self.__get_resource_info_for_layer__(resource_name, resource_url, resource_class)
            transformed_layer = transform_layer(transformed_res_info, layer_dict)

        return transformed_layer

    # endregion

    # region Areas
    def get_areas(self) -> list:
        """ Combines data retrieved from multiple GeoServer endpoints to get list of hierarchically organized areas
        together with the information about them and converts data into the desired format.
        Returns
        ----------
        list
            list of hierarchically organized areas
        """
        areas = []

        transformed_area_group = self.__get__transformed_hierarchical_group__(self.areas_group, self.areas_workspace)
        if transformed_area_group is not None:
            areas = get_json_list_attribute(transformed_area_group, "subAreas")

        return areas

    def get_custom_areas(self, user_id: int) -> list:
        """ Combines data retrieved from multiple GeoServer endpoints to get list of hierarchically organized custom
        areas for user with the user_id together with the information about them and converts data into the desired
        format.
        Parameters
        ----------
        user_id : int
            ID of the user
        Returns
        ----------
        list
            list of hierarchically organized custom areas for the given user
        """
        areas = []

        custom_areas_group_for_user = f"{self.custom_areas_group}_{user_id}"
        transformed_area_group = self.__get__transformed_hierarchical_group__(custom_areas_group_for_user,
                                                                              self.custom_areas_workspace)
        if transformed_area_group is not None:
            areas = get_json_list_attribute(transformed_area_group, "subAreas")

        return areas

    def create_new_area_from_file(self, file_path: str, user_id: int, area_title: str,
                                  projection: str, timestamp: str) -> Optional[dict]:
        """ Creates a new custom area in GeoServer. The process of creating a new area includes: creating a data store
        with the given file as a source, creating a new layer from data from the data store and adding the layer to the
        layer group used for storing custom areas for user with the user_id.
        Parameters
        ----------
        file_path: str
            path to the file that should be used as a source of data
        user_id : int
            ID of the user
        area_title: str
            name of the area that will be created
        projection: str
            projection of the source data
        timestamp: str
            date and time when the creation of a new area started, this will be used to create a unique identifier
        Returns
        ----------
        dict, optional
            A newly created area or None if the area creation was not successful
        """
        store_name = f"customStore_{user_id}_{timestamp}"
        group_name = f"customAreas_{user_id}"
        layer_name = f"customLayer_{user_id}_{timestamp}"

        try:
            # Create datastore, layer for area and add layer to the group
            self.geoserver_client.create_datastore(store_name, file_path, "geopkg")
            self.geoserver_client.create_layer(self.custom_areas_workspace, store_name, self.custom_areas_native_name,
                                               layer_name, area_title, projection)
            self.geoserver_client.add_layer_to_layer_group(self.custom_areas_workspace, group_name, layer_name)

            # Get created area to return
            created_area = self.get_layer(self.custom_areas_workspace, layer_name)
            created_area["subAreas"] = []
            return created_area
        except GeoserverException:
            return None

    def delete_custom_area(self, area_name: str, user_id: int) -> bool:
        """ Deletes an area with the area_name from the GeoServer. The process of deleting an areas includes: deleting
        the datastore which serves as a source of data, removing the area from the layer group for user's custom areas
         and deleting the area itself.
        Parameters
        ----------
        area_name: str
            name of the area that will be deleted
        user_id : int
            ID of the user
        Returns
        ----------
        bool
            True if the deletion was successful, False otherwise
        """
        area_name_parts = area_name.split(":")
        area_identifier = area_name_parts[1]
        area_identifier_parts = area_identifier.split("_")
        store_name = f"customStore_{user_id}_{area_identifier_parts[2]}"
        try:
            self.geoserver_client.delete_store(store_name, True, area_name_parts[0])
            return True
        except GeoserverException:
            return False

    # endregion

    # region Private methods
    def __get_resource_info_for_layer__(self, res_name: str, res_url: str, res_class: str) -> Optional[dict]:
        res_info_dict = self.geoserver_client.get_resource_information(res_url)
        resource_information = None

        if res_info_dict is not None:
            resource_information = transform_resource_info(res_name, res_info_dict, res_class)

        return resource_information

    def __get_transformed_groups__(self, layer_groups: list[dict], workspace: Optional[str] = None) -> list:
        transformed_layer_groups = []
        for layer_group in layer_groups:
            layer_group_name = get_json_string_attribute(layer_group, "name")
            transformed_layer_group = self.get_layer_group(layer_group_name, workspace)
            if transformed_layer_group is not None:
                transformed_layer_groups.append(transformed_layer_group)
        return transformed_layer_groups

    def __get_transformed_layers__(self, layers: list[dict]) -> list:
        transformed_layers = []
        for layer in layers:
            layer_name = get_json_string_attribute(layer, "name")
            if layer_name == "":
                continue

            layer_name_parts = layer_name.split(':')
            transformed_layer = self.get_layer(layer_name_parts[0], layer_name_parts[1])
            if transformed_layer is not None:
                transformed_layers.append(transformed_layer)

        return transformed_layers

    def __get__transformed_hierarchical_group__(self, layer_group_name: str, workspace: Optional[str] = None) -> dict:
        transformed_hierarchical_group = None
        area_layer_group_dict = self.geoserver_client.get_layer_group(layer_group_name, workspace)
        if area_layer_group_dict is not None:
            area_layers = get_json_list_attribute(area_layer_group_dict, "layerGroup.publishables.published")
            if type(area_layers) is not list:
                area_layers = [area_layers]
            hierarchical_group_content = self.__get_transformed_hierarchical_group_content__(area_layers)

            area_layer_group_mode = get_json_string_attribute(area_layer_group_dict, "layerGroup.mode")
            if area_layer_group_mode == "EO":
                root_area_layer_name = get_json_string_attribute(area_layer_group_dict, "layerGroup.rootLayer.name")
                root_area_layer_name_parts = root_area_layer_name.split(":")
                root_area_layer = self.get_layer(root_area_layer_name_parts[0], root_area_layer_name_parts[1])
                transformed_hierarchical_group = transform_hierarchical_area(root_area_layer, hierarchical_group_content)
            else:
                transformed_hierarchical_group = transform_hierarchical_area({}, hierarchical_group_content)

        return transformed_hierarchical_group

    def __get_transformed_hierarchical_group_content__(self, publishables: list) -> list:
        transformed_content = []
        for publishable_dict in publishables:
            area_layer_type = get_json_string_attribute(publishable_dict, "@type")
            area_layer_name = get_json_string_attribute(publishable_dict, "name")
            layer_name_parts = area_layer_name.split(':')

            if area_layer_type == "layer":
                transformed_area_layer = self.get_layer(layer_name_parts[0], layer_name_parts[1])
                if transformed_area_layer is not None:
                    transformed_area_layer["subAreas"] = []
                    transformed_content.append(transformed_area_layer)

            elif area_layer_type == "layerGroup":
                sub_area_group = self.__get__transformed_hierarchical_group__(layer_name_parts[1], layer_name_parts[0])
                if sub_area_group is not None:
                    transformed_content.append(sub_area_group)

        return transformed_content

    # endregion
