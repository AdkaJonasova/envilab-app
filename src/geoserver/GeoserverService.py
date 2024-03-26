import requests
from requests import JSONDecodeError
from requests.auth import HTTPBasicAuth

from src.mockdata.MockAreas import mock_areas
from src.mockdata.MockLayers import mock_layers
from src.utils.ConfigReader import load_config
from src.utils.JsonHelper import create_geoserver_layer_json, get_json_attribute
from src.utils.LoggingUtil import logging


class GeoserverService:
    def __init__(self):
        self.logger = logging.getLogger(__name__)

        config = load_config(section="geoserver")
        self.geoserver_name = config["host"]
        self.geoserver_rest = config["host_rest"]
        self.username = config["user"]
        self.password = config["password"]

    def get_layers(self):
        transformed_layers = []
        try:
            headers = {"Content-type": "application/json"}
            request_url = f"{self.geoserver_rest}/layers"

            response = requests.get(request_url, auth=self.__get_geoserver_auth__(), headers=headers)
            if response.status_code == 200:
                response_content = response.json()
                layers = response_content["layers"]["layer"]
                transformed_layers = self.__transform__layers__(layers)
            else:
                self.logger.error(f"Unable to get layers from geoserver, "
                                  f"request failed with status code {response.status_code}")
        except Exception as e:
            self.logger.error(f"Unable to fetch layers from geoserver, request failed with error: {str(e)}")

        return transformed_layers

    def __transform__layers__(self, layers):
        transformed_layers = []
        for layer in layers:
            try:
                layer_name = get_json_attribute(layer, "name")  # layer name
                layer_link = get_json_attribute(layer, "href")

                # Fetch layer information from geoserver
                layer_response = requests.get(layer_link, auth=self.__get_geoserver_auth__())
                if layer_response.status_code != 200:
                    self.logger.error(f"Unable to fetch layer information for layer {layer_name} from geoserver, "
                                      f"request failed with status code {layer_response.status_code}")
                    continue

                layer_response_content = layer_response.json()
                layer_type = get_json_attribute(layer_response_content, "layer.type")  # layer type
                src_link = get_json_attribute(layer_response_content, "layer.resource.href")
                src_class = get_json_attribute(layer_response_content, "layer.resource.@class")

                # Fetch source information from geoserver
                src_response = requests.get(src_link, auth=self.__get_geoserver_auth__())
                if src_response.status_code != 200:
                    self.logger.error(f"Unable to fetch source information for layer {layer_name} from geoserver, "
                                      f"request failed with status code {src_response.status_code}")
                    continue

                src_response_content = src_response.json()
                layer_title = get_json_attribute(src_response_content, f"{src_class}.title")  # layer title
                layer_desc = get_json_attribute(src_response_content, f"{src_class}.abstract")  # layer description
                layer_proj = get_json_attribute(src_response_content, f"{src_class}.srs")  # layer projection

                # Fetch layer data for vector layer
                layer_data = {}
                # if layer_type == "VECTOR":  # TODO constant/enum
                #     layer_data = self.__get_features_for_vector_layer(layer_name, layer_proj)

                # Create json with layer information and data
                transformed_layer = create_geoserver_layer_json(layer_name, layer_type, layer_title, layer_desc,
                                                                layer_proj, layer_data)
                transformed_layers.append(transformed_layer)

            except Exception as e:
                self.logger.error(f"Unable to transform layer {layer}. Failed with error: {str(e)}")

        return transformed_layers

    def __get_geoserver_auth__(self):
        return HTTPBasicAuth(self.username, self.password)

    def __get_features_for_vector_layer(self, layer_name: str, projection: str):
        layer_features = {}
        try:
            params = {
                "service": "wfs",
                "version": "1.1.0",
                "request": "GetFeature",
                "typeName": layer_name,
                "srsName": projection,
                "outputFormat": "application/json"
            }

            response = requests.get(
                url=f"{self.geoserver_name}ows",
                params=params,
                auth=self.__get_geoserver_auth__()
            )
            if response.status_code == 200:
                layer_features = response.json()
            else:
                self.logger.error(f"Unable to fetch features for layer {layer_name}, "
                                  f"request failed with status code {response.status_code}")
        except JSONDecodeError as e:
            self.logger.error(f"Unable to fetch features for layer {layer_name}, failed with error: {str(e)}")

        return layer_features


# ---------- Mock methods ----------
def get_areas():
    return mock_areas


def get_layers():
    return mock_layers
