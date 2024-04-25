import logging
from typing import Optional

from requests.auth import HTTPBasicAuth

from src.geoserver.GeoserverClient import GeoserverClient
from src.geoserver.GeoserverResponseAdapter import transform_resource_info, transform_layer, transform_layer_group
from src.utils.JsonHelper import get_json_list_attribute, get_json_string_attribute


class GeoserverService2:

    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.geoserver_client = GeoserverClient()

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

    def __get_resource_info_for_layer(self, res_name: str, res_url: str, res_class: str) -> Optional[dict]:
        res_info_dict = self.geoserver_client.get_resource_information(res_url)
        resource_information = None

        if res_info_dict is not None:
            resource_information = transform_resource_info(res_name, res_info_dict, res_class)

        return resource_information

    # region Private methods
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

    # endregion
