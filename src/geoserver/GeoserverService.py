from typing import Optional

import requests
from requests.auth import HTTPBasicAuth

from src.enums.AreaType import AreaType
from src.utils.ConfigReader import load_config
from src.utils.JsonHelper import create_geo_layer_json, get_json_string_attribute, create_geo_layer_group_json, \
    get_json_list_attribute, create_geo_area_json
from src.utils.LoggingUtil import logging


class GeoserverService:
    def __init__(self):
        self.logger = logging.getLogger(__name__)

        config = load_config(section="geoserver")
        self.geoserver_rest = config["host_rest"]
        self.geoserver_areas = config["host_areas"]
        self.geoserver_custom_ares = config["host_custom_areas"]
        self.username = config["user"]
        self.password = config["password"]

    def get_layer_group(self, workspace: str, group_name: str) -> Optional[dict]:
        url = f"{self.geoserver_rest}/workspaces/{workspace}/layergroups/{group_name}"
        layer_group_response = requests.get(
            url=url,
            headers={"Content-type": "application/json"},
            auth=self.__get_geoserver_auth__()
        )
        if layer_group_response.status_code == 200:
            layer_group_response_content = layer_group_response.json()
            return layer_group_response_content
        else:
            return None

    def create_layer_group(self, workspace: str, group_name: str, group_title: str, mode: str, layers: list):
        published_list = []
        for layer in layers:
            published_layer = {
                "@type": "layer",
                "name": f"{workspace}:{layer}",
                "href": f"{self.geoserver_rest}/workspaces/{workspace}/layers/{layer}.json"
            }
            published_list.append(published_layer)

        data = {
            "layerGroup": {
                "name": group_name,
                "title": group_title,
                "mode": mode,
                "workspace": {
                    "name": workspace
                },
                "publishables": {
                    "published": published_list
                }
            }
        }
        url = f"{self.geoserver_rest}/workspaces/{workspace}/layergroups"

        r = requests.post(
            url=url,
            headers={"Content-type": "application/json"},
            auth=self.__get_geoserver_auth__(),
            json=data
        )

    def add_layer_to_layer_group(self, workspace: str, group_name: str, layer_name: str):
        layer_group = self.get_layer_group(workspace, group_name)

        if layer_group is None:
            self.create_layer_group(workspace, group_name, group_name, "SINGLE", [layer_name])

        else:
            publishables = get_json_list_attribute(layer_group, "layerGroup.publishables.published")
            if type(publishables) is not list:
                publishables = [publishables]
            new_publishable = {
                "@type": "layer",
                "name": f"{workspace}:{layer_name}",
                "href": f"{self.geoserver_rest}/workspaces/{workspace}/layers/{layer_name}.json",
            }
            publishables.append(new_publishable)

            request = {
                "publishables":
                {
                    "published": publishables
                }
            }
            url = f"{self.geoserver_rest}/workspaces/{workspace}/layergroups/{group_name}"
            requests.put(
                url=url,
                headers={"Content-type": "application/json"},
                auth=self.__get_geoserver_auth__(),
                json=request
            )

    def create_layer(self, datastore_name: str, native_layer_name: str, layer_name: str, layer_title: str, ):
        request = {
            "featureType": {
                "name": layer_name,
                "nativeName": native_layer_name,
                "title": layer_title,
                "srs": "EPSG:4326",
            }
        }

        url = f"{self.geoserver_rest}/workspaces/customAreas/datastores/{datastore_name}/featuretypes?recalculate=nativebbox"
        r = requests.post(
            url=url,
            headers={"Content-type": "application/json"},
            auth=self.__get_geoserver_auth__(),
            json=request
        )

    def create_datastore(self, file_path: str, store_name: str, file_format: str):
        request = {
            "dataStore": {
                "name": store_name,
                "connectionParameters": {
                    "entry": [
                        {"@key": "database", "$": file_path},
                        {"@key": "dbtype", "$": file_format}
                    ]
                }
            }
        }
        url = f"{self.geoserver_rest}/workspaces/customAreas/datastores"
        r = requests.post(
            url=url,
            headers={"Content-type": "application/json"},
            auth=self.__get_geoserver_auth__(),
            json=request
        )

    def get_areas(self, areas_type: AreaType, user_id: Optional[int] = None) -> list:
        result = []
        request_url = self.geoserver_areas if areas_type == AreaType.GeneralArea \
            else f"{self.geoserver_custom_ares}/customAreas_{user_id}"
        try:
            response = requests.get(request_url, auth=self.__get_geoserver_auth__(),
                                    headers={"Content-type": "application/json"})
            if response.status_code == 200:
                response_content = response.json()
                areas = get_json_list_attribute(response_content, "layerGroup.publishables.published")
                if type(areas) is list:
                    result = self.__get_data_for_areas__(areas)
                else:
                    result = self.__get_data_for_areas__([areas])
            else:
                self.logger.error(f"Unable to fetch areas from geoserver, "
                                  f"request failed with status code {response.status_code}")
        except Exception as e:
            self.logger.error(f"Unable to fetch areas from geoserver, request failed with error: {str(e)}")

        return result

    def get_layers_in_groups(self) -> list:
        transformed_groups = []
        try:
            headers = {"Content-type": "application/json"}
            request_url = f"{self.geoserver_rest}/layergroups"

            response = requests.get(request_url, auth=self.__get_geoserver_auth__(), headers=headers)
            if response.status_code == 200:
                response_content = response.json()
                layer_groups = get_json_list_attribute(response_content, "layerGroups.layerGroup")
                transformed_groups = self.__transform_layer_groups__(layer_groups)
            else:
                self.logger.error(f"Unable to fetch layer groups from geoserver, "
                                  f"request failed with status code {response.status_code}")
        except Exception as e:
            self.logger.error(f"Unable to fetch layer groups from geoserver, request failed with error: {str(e)}")

        return transformed_groups

    def get_layers(self) -> list:
        transformed_layers = []
        try:
            headers = {"Content-type": "application/json"}
            request_url = f"{self.geoserver_rest}/layers"

            response = requests.get(request_url, auth=self.__get_geoserver_auth__(), headers=headers)
            if response.status_code == 200:
                response_content = response.json()
                layers = get_json_list_attribute(response_content, "layers.layer")
                transformed_layers = self.__transform__layers__(layers)
            else:
                self.logger.error(f"Unable to get layers from geoserver, "
                                  f"request failed with status code {response.status_code}")
        except Exception as e:
            self.logger.error(f"Unable to fetch layers from geoserver, request failed with error: {str(e)}")

        return transformed_layers

    def __transform_layer_groups__(self, layer_groups: list) -> list:
        transformed_groups = []
        for group in layer_groups:
            try:
                group_name = get_json_string_attribute(group, "name")  # group name
                group_link = get_json_string_attribute(group, "href")

                # Fetch layer group from geoserver
                group_response = requests.get(group_link, auth=self.__get_geoserver_auth__())
                if group_response.status_code != 200:
                    self.logger.error(f"Unable to fetch layer group information for layer group {group_name} "
                                      f"from geoserver, request failed with status code {group_response.status_code}")
                    continue

                group_response_content = group_response.json()
                group_title = get_json_string_attribute(group_response_content, "layerGroup.title")  # group title
                group_desc = get_json_string_attribute(group_response_content,
                                                       "layerGroup.abstractTxt")  # group description
                group_layers = get_json_list_attribute(group_response_content, "layerGroup.publishables.published")

                # Transform layers of the group
                transformed_layers = []
                if type(group_layers) is list:
                    transformed_layers = self.__transform__layers__(group_layers)
                else:
                    transformed_layers = self.__transform__layers__([group_layers])

                # Create json with layer group information and layers
                transformed_group = create_geo_layer_group_json(group_name, group_title, group_desc, transformed_layers)
                transformed_groups.append(transformed_group)

            except Exception as e:
                self.logger.error(f"Unable to transform layer group {group}, failed with error: {str(e)}")

        return transformed_groups

    def __transform__layers__(self, layers: list) -> list:
        transformed_layers = []

        for layer in layers:
            transformed_layer = self.__transform_layer__(layer)
            if transformed_layer is not None:
                transformed_layers.append(transformed_layer)

        return transformed_layers

    def __transform_layer__(self, layer) -> Optional[dict]:
        transformed_layer = None

        try:
            layer_name = get_json_string_attribute(layer, "name")  # layer name
            layer_link = get_json_string_attribute(layer, "href")

            # Fetch layer information from geoserver
            layer_response = requests.get(layer_link, auth=self.__get_geoserver_auth__())
            if layer_response.status_code != 200:
                self.logger.error(f"Unable to fetch layer information for layer {layer_name} from geoserver, "
                                  f"request failed with status code {layer_response.status_code}")

            else:
                layer_response_content = layer_response.json()
                layer_type = get_json_string_attribute(layer_response_content, "layer.type")  # layer type
                src_link = get_json_string_attribute(layer_response_content, "layer.resource.href")
                src_class = get_json_string_attribute(layer_response_content, "layer.resource.@class")

                # Fetch source information from geoserver
                src_response = requests.get(src_link, auth=self.__get_geoserver_auth__())
                if src_response.status_code != 200:
                    self.logger.error(f"Unable to fetch source information for layer {layer_name} from geoserver, "
                                      f"request failed with status code {src_response.status_code}")
                else:
                    src_response_content = src_response.json()
                    layer_title = get_json_string_attribute(src_response_content, f"{src_class}.title")  # layer title
                    layer_desc = get_json_string_attribute(src_response_content,
                                                           f"{src_class}.abstract")  # layer description
                    layer_proj = get_json_string_attribute(src_response_content, f"{src_class}.srs")  # layer projection

                    transformed_layer = create_geo_layer_json(layer_name, layer_type, layer_title, layer_desc,
                                                              layer_proj)

        except Exception as e:
            self.logger.error(f"Unable to transform layer {layer}. Failed with error: {str(e)}")

        return transformed_layer

    def __get_data_for_areas__(self, areas) -> list:
        areas_data = []
        for area in areas:
            area_type = get_json_string_attribute(area, "@type")

            if area_type == "layerGroup":
                hierarchical_area_data = self.__get_data_for_hierarchical_area__(area)
                if len(hierarchical_area_data) != 0:
                    areas_data.extend(hierarchical_area_data)
            elif area_type == "layer":
                data_for_area = self.__get_data_for_area__(area, [])
                if data_for_area is not None:
                    areas_data.append(data_for_area)

        return areas_data

    def __get_data_for_hierarchical_area__(self, area: dict) -> list:
        result = []
        area_data_link = get_json_string_attribute(area, "href")

        area_data_response = requests.get(area_data_link, auth=self.__get_geoserver_auth__())
        if area_data_response.status_code != 200:
            self.logger.error(f"Unable to fetch area information for area {area} from geoserver, "
                              f"request failed with status code {area_data_response.status_code}")
        else:
            area_data_content = area_data_response.json()

            root_area = get_json_string_attribute(area_data_content, "layerGroup.rootLayer")
            sub_areas = get_json_list_attribute(area_data_content, "layerGroup.publishables.published")
            if type(sub_areas) is list:
                sub_areas_data = self.__get_data_for_areas__(sub_areas)
            else:
                sub_areas_data = self.__get_data_for_areas__([sub_areas])

            root_area_data = self.__get_data_for_area__(root_area, sub_areas_data)
            if root_area_data is not None:
                result.append(root_area_data)

        return result

    def __get_data_for_area__(self, area: dict, sub_areas: list) -> Optional[dict]:
        result = None
        try:
            area_data_link = get_json_string_attribute(area, "href")

            area_data_response = requests.get(area_data_link, auth=self.__get_geoserver_auth__())
            if area_data_response.status_code != 200:
                self.logger.error(f"Unable to fetch area information for area {area} from geoserver, "
                                  f"request failed with status code {area_data_response.status_code}")
            else:
                area_data_content = area_data_response.json()
                area_resource_link = get_json_string_attribute(area_data_content, "layer.resource.href")

                area_resource_response = requests.get(area_resource_link, auth=self.__get_geoserver_auth__())
                if area_resource_response.status_code != 200:
                    self.logger.error(f"Unable to fetch source information for area {area} from geoserver, "
                                      f"request failed with status code {area_resource_response.status_code}")
                else:
                    area_resource_content = area_resource_response.json()
                    area_name = get_json_string_attribute(area_resource_content, "featureType.name")
                    area_title = get_json_string_attribute(area_resource_content, "featureType.title")
                    area_projection = get_json_string_attribute(area_resource_content,
                                                                "featureType.nativeBoundsBox.crs")
                    area_minx = get_json_string_attribute(area_resource_content, "featureType.nativeBoundingBox.minx")
                    area_maxx = get_json_string_attribute(area_resource_content, "featureType.nativeBoundingBox.maxx")
                    area_miny = get_json_string_attribute(area_resource_content, "featureType.nativeBoundingBox.miny")
                    area_maxy = get_json_string_attribute(area_resource_content, "featureType.nativeBoundingBox.maxy")

                    result = create_geo_area_json(area_name, area_title, area_projection,
                                                  area_minx, area_maxx, area_miny, area_maxy, sub_areas)
        except Exception as e:
            self.logger.error(f"Unable to get data for area {area}. Failed with error: {str(e)}")

        return result

    def __get_geoserver_auth__(self) -> HTTPBasicAuth:
        return HTTPBasicAuth(self.username, self.password)
