import logging
from typing import Optional

from src.geoserver import GeoserverException
from src.geoserver.GeoserverClient import GeoserverClient
from src.geoserver.GeoserverRequestResponseUtil import transform_resource_info, transform_layer, transform_layer_group, \
    transform_hierarchical_area
from src.utils.ConfigReader import load_config
from src.utils.JsonHelper import get_json_list_attribute, get_json_string_attribute


class GeoserverService:

    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.geoserver_client = GeoserverClient()

        config = load_config(section="geoserver_areas")
        self.custom_areas_workspace = config["custom_areas_workspace"]
        self.custom_areas_group = config["custom_areas_group"]
        self.areas_workspace = config["areas_workspace"]
        self.areas_group = config["areas_group"]
        self.native_name = config["custom_area_native_name"]

    def get_layers_in_groups(self, workspace: Optional[str] = None):
        layer_groups_dict = self.geoserver_client.get_layer_groups(workspace)
        transformed_groups = None
        if layer_groups_dict is not None:
            layer_groups = get_json_list_attribute(layer_groups_dict, "layerGroups.layerGroup")
            if type(layer_groups) is not list:
                layer_groups = [layer_groups]

            transformed_groups = self.__get_transformed_groups__(layer_groups, workspace)
        return transformed_groups

    def get_layer_group(self, layer_group_name: str, workspace: Optional[str] = None) -> Optional[dict]:
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
        layer_dict = self.geoserver_client.get_layer(layer_name, workspace)
        transformed_layer = None

        if layer_dict is not None:
            resource_name = get_json_string_attribute(layer_dict, "layer.resource.name")
            resource_url = get_json_string_attribute(layer_dict, "layer.resource.href")
            resource_class = get_json_string_attribute(layer_dict, "layer.resource.@class")

            transformed_res_info = self.__get_resource_info_for_layer(resource_name, resource_url, resource_class)
            transformed_layer = transform_layer(transformed_res_info, layer_dict)

        return transformed_layer

    def get_areas(self):
        areas = []

        transformed_area_group = self.__get__transformed_hierarchical_group__(self.areas_group, self.areas_workspace)
        if transformed_area_group is not None:
            areas = get_json_list_attribute(transformed_area_group, "subAreas")

        return areas

    def get_custom_areas(self, user_id: int):
        areas = []

        custom_areas_group_for_user = f"{self.custom_areas_group}_{user_id}"
        transformed_area_group = self.__get__transformed_hierarchical_group__(custom_areas_group_for_user,
                                                                              self.custom_areas_workspace)
        if transformed_area_group is not None:
            areas = get_json_list_attribute(transformed_area_group, "subAreas")

        return areas

    def create_new_area_from_file(self, file_path: str, user_id: int, area_title: str,
                                  projection: str, timestamp: str) -> Optional[dict]:
        store_name = f"customStore_{user_id}_{timestamp}"
        group_name = f"customAreas_{user_id}"
        layer_name = f"customLayer_{user_id}_{timestamp}"

        try:
            # Create datastore, layer for area and add layer to the group
            self.geoserver_client.create_datastore(store_name, file_path, "geopkg")
            self.geoserver_client.create_layer(self.custom_areas_workspace, store_name, self.native_name, layer_name, area_title,
                                               projection)
            self.geoserver_client.add_layer_to_layer_group(self.custom_areas_workspace, group_name, layer_name)

            # Get created area to return
            created_area = self.get_layer(self.custom_areas_workspace, layer_name)
            return created_area
        except GeoserverException:
            return None

    # region Private methods
    def __get_resource_info_for_layer(self, res_name: str, res_url: str, res_class: str) -> Optional[dict]:
        res_info_dict = self.geoserver_client.get_resource_information(res_url)
        resource_information = None

        if res_info_dict is not None:
            resource_information = transform_resource_info(res_name, res_info_dict, res_class)

        return resource_information

    def __get_transformed_groups__(self, layer_groups: list[dict], workspace: Optional[str] = None):
        transformed_layer_groups = []
        for layer_group in layer_groups:
            layer_group_name = get_json_string_attribute(layer_group, "name")
            transformed_layer_group = self.get_layer_group(layer_group_name, workspace)
            if transformed_layer_group is not None:
                transformed_layer_groups.append(transformed_layer_group)
        return transformed_layer_groups

    def __get_transformed_layers__(self, layers: list[dict]):
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

    def __get__transformed_hierarchical_group__(self, layer_group_name: str, workspace: Optional[str] = None):
        transformed_hierarchical_group = []
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

    def __get_transformed_hierarchical_group_content__(self, publishables: list):
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
