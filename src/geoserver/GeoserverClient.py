import logging
from typing import Optional

import requests
from requests.auth import HTTPBasicAuth

from src.geoserver.GeoserverException import GeoserverException
from src.geoserver.GeoserverResponseAdapter import get_create_datastore_request, get_create_layer_request, \
    get_create_layer_group_request, get_add_layer_to_group_request
from src.utils.ConfigReader import load_config
from src.utils.JsonHelper import get_json_list_attribute, get_json_string_attribute


class GeoserverClient:
    REQUEST_CONTENT_TYPE: dict[str, str] = {"Content-type": "application/json"}

    def __init__(self):
        self.logger = logging.getLogger(__name__)

        config = load_config(section="geoserver")
        self.geoserver_rest = config["host_rest"]
        self.username = config["user"]
        self.password = config["password"]

    def get_layer_groups(self, workspace: Optional[str] = None) -> Optional[dict]:
        url = f"{self.geoserver_rest}/layergroups"
        if workspace is not None:
            url = f"{self.geoserver_rest}/workspaces/{workspace}/layergroups"

        return self.__send_get_request_to_geoserver__(url, "layer groups")

    def get_layer_group(self, layer_group_name: str, workspace: Optional[str] = None) -> Optional[dict]:
        url = f"{self.geoserver_rest}/layergroups/{layer_group_name}"
        if workspace is not None:
            url = f"{self.geoserver_rest}/workspaces/{workspace}/layergroups/{layer_group_name}"

        return self.__send_get_request_to_geoserver__(url, "layer group")

    def get_layer(self, layer_name: str, workspace: Optional[str] = None) -> Optional[dict]:
        url = f"{self.geoserver_rest}/layers/{layer_name}"
        if workspace is not None:
            url = f"{self.geoserver_rest}/workspaces/{workspace}/layers/{layer_name}"

        return self.__send_get_request_to_geoserver__(url, "layer")

    def get_resource_information(self, resource_info_url: str) -> Optional[dict]:
        return self.__send_get_request_to_geoserver__(resource_info_url, "resource information")

    def create_datastore(self, store_name: str, file_path: str, file_format: str):
        url = f"{self.geoserver_rest}/workspaces/customAreas/datastores"
        self.__send_post_request_to_geoserver__(
            url,
            get_create_datastore_request(file_path, store_name, file_format),
            "data store"
        )

    def create_layer(self, workspace: str, datastore_name: str, native_layer_name: str, layer_name: str,
                     layer_title: str, projection: str):
        url = f"{self.geoserver_rest}/workspaces/{workspace}/datastores/{datastore_name}/featuretypes?recalculate=nativebbox"
        self.__send_post_request_to_geoserver__(
            url,
            get_create_layer_request(layer_name, native_layer_name, layer_title, projection),
            "layer"
        )

    def create_layer_group(self, workspace: str, group_name: str, group_title: str, mode: str, layers: list):
        published_list = []
        for layer in layers:
            published_layer = {
                "@type": "layer",
                "name": f"{workspace}:{layer}",
                "href": f"{self.geoserver_rest}/workspaces/{workspace}/layers/{layer}.json"
            }
            published_list.append(published_layer)

        url = f"{self.geoserver_rest}/workspaces/{workspace}/layergroups"
        self.__send_post_request_to_geoserver__(
            url,
            get_create_layer_group_request(workspace, group_name, group_title, mode, layers),
            "layer group"
        )

    def add_layer_to_layer_group(self, workspace: str, group_name: str, layer_name: str):
        layer_group = self.get_layer_group(group_name, workspace)
        layer_info = self.get_layer(layer_name, workspace)

        if layer_group is None:
            self.create_layer_group(workspace, group_name, group_name, "SINGLE", [layer_name])

        else:
            # Get existing publishables and styles
            publishables = get_json_list_attribute(layer_group, "layerGroup.publishables.published")
            if type(publishables) is not list:
                publishables = [publishables]

            styles = get_json_list_attribute(layer_group, "layerGroup.styles.style")
            if type(styles) is not list:
                styles = [styles]

            # Add new layer to publishables and styles
            new_publishable = {
                "@type": "layer",
                "name": f"{workspace}:{layer_name}",
                "href": f"{self.geoserver_rest}/workspaces/{workspace}/layers/{layer_name}.json",
            }
            publishables.append(new_publishable)
            new_style = get_json_string_attribute(layer_info, "layer.defaultStyle")
            styles.append(new_style)

            # Send request to update layer group
            url = f"{self.geoserver_rest}/workspaces/{workspace}/layergroups/{group_name}"
            self.__send_post_request_to_geoserver__(
                url,
                get_add_layer_to_group_request(publishables, styles),
                "layer group"
            )

    # region Private methods
    def __send_get_request_to_geoserver__(self, url: str, data_fetch_type: str) -> Optional[dict]:
        response_content = None
        try:
            response = requests.get(
                url=url,
                auth=self.__get_geoserver_auth__(),
                headers=self.REQUEST_CONTENT_TYPE
            )
            if response.status_code == 200:
                response_content = response.json()
            else:
                self.logger.error(f"Unable to fetch {data_fetch_type} from geoserver, "
                                  f"request failed with status code {response.status_code}")
        except Exception as e:
            self.logger.error(f"Unable to fetch {data_fetch_type} from geoserver, request failed with error: {str(e)}")

        return response_content

    def __send_post_request_to_geoserver__(self, url: str, data: dict, data_type: str):
        try:
            response = requests.post(
                url=url,
                headers=self.REQUEST_CONTENT_TYPE,
                auth=self.__get_geoserver_auth__(),
                json=data
            )
            if response.status_code not in (200, 201, 202):
                self.logger.error(
                    f"Unable to create/update {data_type} request failed with status code {response.status_code}")
                raise GeoserverException(response.content, response.status_code)

        except Exception as e:
            self.logger.error(f"Unable to create/update {data_type} request failed with message {str(e)}")
            raise GeoserverException(str(e))

    def __get_geoserver_auth__(self) -> HTTPBasicAuth:
        return HTTPBasicAuth(self.username, self.password)

    # endregion
