import requests
from requests.auth import HTTPBasicAuth

from src.mockdata.MockAreas import mock_areas
from src.mockdata.MockLayers import mock_layers
from src.utils.ConfigReader import load_config
from src.utils.JsonHelper import create_layer_json, get_json_attribute


class GeoserverService:
    def __init__(self):
        config = load_config(section="geoserver")
        self.geoserver_name = config["host"]
        self.username = config["user"]
        self.password = config["password"]

    def get_layers(self):
        try:
            headers = {"Content-type": "application/json"}
            request_url = "{}/layers".format(self.geoserver_name)

            response = requests.get(request_url, auth=self.__get_geoserver_auth__(), headers=headers)
            response_status = response.status_code
            response_content = response.json()

            layers = response_content["layers"]["layer"]
            transformed_layers = self.__transform__layers__(layers)
            return response
        except Exception as e:
            print(type(e))
            return ""

    def __transform__layers__(self, layers):
        layers_json = []
        for layer in layers:
            try:
                layer_name = get_json_attribute(layer, "name")  # layer name
                layer_link = get_json_attribute(layer, "href")

                layer_response = requests.get(layer_link, auth=self.__get_geoserver_auth__())
                layer_response_content = layer_response.json()
                layer_type = get_json_attribute(layer_response_content, "layer.type")  # layer type
                src_link = get_json_attribute(layer_response_content, "layer.resource.href")
                src_class = get_json_attribute(layer_response_content, "layer.resource.@class")

                src_response = requests.get(src_link, auth=self.__get_geoserver_auth__())
                src_response_content = src_response.json()
                layer_title = get_json_attribute(src_response_content, f"{src_class}.title")  # layer title
                layer_desc = get_json_attribute(src_response_content, f"{src_class}.abstract")  # layer description
                layer_proj = get_json_attribute(src_response_content, f"{src_class}.srs")  # layer projection

                (layers_json
                 .append(create_layer_json(layer_name, layer_type, layer_title, layer_desc, layer_proj)))

            except Exception as e:
                print(f"Unable to transform layer: {layer}. Failed with error: {type(e)}")

        result = {
            "layers": layers_json
        }
        return result

    def __get_geoserver_auth__(self):
        return HTTPBasicAuth(self.username, self.password)


# ---------- Mock methods ----------
def get_areas():
    return mock_areas


def get_layers():
    return mock_layers
