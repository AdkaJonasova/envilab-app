import logging
from typing import Optional

import requests
from requests.auth import HTTPBasicAuth

from src.geoserver.GeoserverException import GeoserverException
from src.geoserver.GeoserverRequestResponseUtil import get_create_datastore_request, get_create_layer_request, \
    get_create_layer_group_request, get_add_layer_to_group_request
from src.utils.ConfigReader import load_config
from src.utils.JsonHelper import get_json_list_attribute, get_json_string_attribute


class GeoserverClient:
    """
    A class used for retrieving data from GeoServer.
    Attributes
    ----------
    logger : Logger
            instance used for information and error logging
    geoserver_rest : str
        url of GeoServer's REST API
    username: str
        username used for authentication in requests
    password : str
        username used for authentication in requests
    """
    REQUEST_CONTENT_TYPE: dict[str, str] = {"Content-type": "application/json"}

    def __init__(self):
        self.logger = logging.getLogger(__name__)

        config = load_config(section="geoserver")
        self.geoserver_rest = config["host_rest"]
        self.username = config["user"]
        self.password = config["password"]

    def get_layer_groups(self, workspace: Optional[str] = None) -> Optional[dict]:
        """ Retrieves all layer groups (within a workspace) from Geoserver
        Parameters
        ----------
        workspace : str, optional
            name of the workspace
        Returns
        -------
        dict, optional
            layer groups or None if any error occurred
        """
        url = f"{self.geoserver_rest}/layergroups"
        if workspace is not None:
            url = f"{self.geoserver_rest}/workspaces/{workspace}/layergroups"

        return self.__send_get_request_to_geoserver__(url, "layer groups")

    def get_layer_group(self, layer_group_name: str, workspace: Optional[str] = None) -> Optional[dict]:
        """ Retrieves a layer group with the layer_group_name (within a workspace) from Geoserver
        Parameters
        ----------
        layer_group_name: str
            name of the layer group which should be retrieved
        workspace : str, optional
            name of the workspace
        Returns
        -------
        dict, optional
            information about layer group with the given name or None if any error occurred or no such a group was found
        """
        url = f"{self.geoserver_rest}/layergroups/{layer_group_name}"
        if workspace is not None:
            url = f"{self.geoserver_rest}/workspaces/{workspace}/layergroups/{layer_group_name}"

        return self.__send_get_request_to_geoserver__(url, "layer group")

    def get_layer(self, layer_name: str, workspace: Optional[str] = None) -> Optional[dict]:
        """ Retrieves a layer with the layer_name (within a workspace) from Geoserver
        Parameters
        ----------
        layer_name: str
            name of the layer which should be retrieved
        workspace : str, optional
            name of the workspace
        Returns
        -------
        dict, optional
            information about the layer with the given name or None if any error occurred or no such a layer was found
        """
        url = f"{self.geoserver_rest}/layers/{layer_name}"
        if workspace is not None:
            url = f"{self.geoserver_rest}/workspaces/{workspace}/layers/{layer_name}"

        return self.__send_get_request_to_geoserver__(url, "layer")

    def get_resource_information(self, resource_info_url: str) -> Optional[dict]:
        """ Retrieves resource information using the given resource_info_url from Geoserver
        Parameters
        ----------
        resource_info_url : str
            url to fetch data from
        Returns
        -------
        dict, optional
            information about the resource or None if any error occurred
        """
        return self.__send_get_request_to_geoserver__(resource_info_url, "resource information")

    def create_datastore(self, store_name: str, file_path: str, file_format: str):
        """ Creates a data store with the store_name that will contain data from the file at file_path
        Parameters
        ----------
        store_name : str
            name of the newly created data store
        file_path: str
            path to the file containing data for the store
        file_format: str
            format of the file, which contains data for the store
        Raises
        ----------
        GeoserverException
            if any error occurred during the creation
        """
        url = f"{self.geoserver_rest}/workspaces/customAreas/datastores"
        self.__send_post_request_to_geoserver__(
            url,
            get_create_datastore_request(file_path, store_name, file_format),
            "data store"
        )

    def create_layer(self, workspace: str, datastore_name: str, native_layer_name: str, layer_name: str,
                     layer_title: str, projection: str):
        """ Creates a new layer from the already existing data store in GeoServer.
        Parameters
        ----------
        workspace : str
            name of the workspace in which the layer will be created
        datastore_name: str
            name of the data store which provides data for the layer
        native_layer_name: str
            native name of the layer within a data store
        layer_name: str
            unique identifier for the layer
        layer_title: str
            name of the layer
        projection: str
            projection of the data
        Raises
        ----------
        GeoserverException
            if any error occurred during the creation
        """
        url = f"{self.geoserver_rest}/workspaces/{workspace}/datastores/{datastore_name}/featuretypes?recalculate=nativebbox"
        self.__send_post_request_to_geoserver__(
            url,
            get_create_layer_request(layer_name, native_layer_name, layer_title, projection),
            "layer"
        )

    def create_layer_group(self, workspace: str, group_name: str, group_title: str, mode: str, layers: list):
        """ Creates a new layer group, which will contain a given list of layers in GeoServer
        Parameters
        ----------
        workspace : str
            name of the workspace in which a new group will be created
        group_name: str
            unique identifier of the group
        group_title: str
            name of the group
        mode: str
            type of the group
        layers: list
            list of layers that should be inserted into the group
        Raises
        ----------
        GeoserverException
            if any error occurred during the creation
        """
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
            get_create_layer_group_request(workspace, group_name, group_title, mode, published_list),
            "layer group"
        )

    def add_layer_to_layer_group(self, workspace: str, group_name: str, layer_name: str):
        """ Adds an already existing layer to an already existing layer group in GeoServer.
        Parameters
        ----------
        workspace : str
            name of the workspace in which the layer group is located
        group_name: str
            unique identifier of the layer group
        layer_name: str
            unique identifier of the layer
        Raises
        ----------
        GeoserverException
            if any error occurred during the process
        """
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
            self.__send_put_request_to_geoserver__(
                url,
                get_add_layer_to_group_request(publishables, styles),
                "layer group"
            )

    def delete_store(self, store_name: str, recurse_delete: bool, workspace: str):
        """ Deletes an already existing data store with the store_name.
        Parameters
        ----------
        store_name : str
            name of the data store that will be deleted
        recurse_delete: bool
            If set to true, deleted all data related to the store, such as layers, layer groups as well
        workspace: str
            name of the workspace in which the data store is located
        Raises
        ----------
        GeoserverException
            if any error occurred during the deletion
        """
        url = f"{self.geoserver_rest}/workspaces/{workspace}/datastores/{store_name}"
        params = {"recurse": recurse_delete}
        self.__send_delete_request_to_geoserver__(url, params, "layer")

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
                    f"Unable to create {data_type}, request failed with status code {response.status_code}")
                raise GeoserverException(response.content, response.status_code)

        except Exception as e:
            self.logger.error(f"Unable to create {data_type}, request failed with message {str(e)}")
            raise GeoserverException(str(e))

    def __send_put_request_to_geoserver__(self, url: str, data: dict, data_type: str):
        try:
            response = requests.put(
                url=url,
                headers=self.REQUEST_CONTENT_TYPE,
                auth=self.__get_geoserver_auth__(),
                json=data
            )
            if response.status_code not in (200, 201, 202):
                self.logger.error(
                    f"Unable to update {data_type}, request failed with status code {response.status_code}")
                raise GeoserverException(response.content, response.status_code)

        except Exception as e:
            self.logger.error(f"Unable to update {data_type}, request failed with message {str(e)}")
            raise GeoserverException(str(e))

    def __send_delete_request_to_geoserver__(self, url: str, params: dict, data_type: str):
        try:
            response = requests.delete(
                url=url,
                headers=self.REQUEST_CONTENT_TYPE,
                auth=self.__get_geoserver_auth__(),
                params=params
            )

            if response.status_code != 200:
                self.logger.error(
                    f"Unable to delete {data_type}, request failed with status code {response.status_code}")
                raise GeoserverException(response.content, response.status_code)
        except Exception as e:
            self.logger.error(f"Unable to delete {data_type}, request failed with message {str(e)}")
            raise GeoserverException(str(e))

    def __get_geoserver_auth__(self) -> HTTPBasicAuth:
        return HTTPBasicAuth(self.username, self.password)

    # endregion
