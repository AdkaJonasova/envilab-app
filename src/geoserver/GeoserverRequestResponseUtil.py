from src.utils.JsonHelper import get_json_string_attribute


def transform_resource_info(resource_name: str, resource_info: dict, resource_class: str) -> dict:
    """ Converts the information about the resource to the desired format.
    Parameters
    ----------
    resource_name : str
        name of the resource
    resource_info : dict
        detailed information about the resource
    resource_class : str
        resource type
    Returns
    ----------
    dict
        converted information about the resource
    """
    transformed_resource_info = {
        "name": resource_name,
        "title": get_json_string_attribute(resource_info, f"{resource_class}.title"),
        "description": get_json_string_attribute(resource_info, f"{resource_class}.abstract"),
        "projection": get_json_string_attribute(resource_info, f"{resource_class}.srs"),
        "extent": {
            "minx": get_json_string_attribute(resource_info, f"{resource_class}.nativeBoundingBox.minx"),
            "miny": get_json_string_attribute(resource_info, f"{resource_class}.nativeBoundingBox.miny"),
            "maxx": get_json_string_attribute(resource_info, f"{resource_class}.nativeBoundingBox.maxx"),
            "maxy": get_json_string_attribute(resource_info, f"{resource_class}.nativeBoundingBox.maxy"),
        }
    }
    return transformed_resource_info


def transform_layer(transformed_resource_info: dict, layer_info: dict) -> dict:
    """ Converts the information about the layer to the desired format and attaches it to the already transformed
    resource information.
    Parameters
    ----------
    transformed_resource_info : dict
        transformed information about the resource
    layer_info : dict
        detailed information about the layer
    Returns
    ----------
    dict
        converted information about the layer and resource
    """
    transformed_resource_info["type"] = get_json_string_attribute(layer_info, "layer.type")
    transformed_resource_info["defaultStyle"] = get_json_string_attribute(layer_info, "layer.defaultStyle")

    return transformed_resource_info


def transform_layer_group(transformed_layers: list[dict], layer_group_info: dict) -> dict:
    """ Converts the information about the layer group to the desired format.
    Parameters
    ----------
    transformed_layers : list[dict]
        list of already converted information about layers that belong to the group
    layer_group_info : dict
        detailed information about the layer group
    Returns
    ----------
    dict
        converted information about the layer group
    """
    transformed_layer_group = {
        "name": get_json_string_attribute(layer_group_info, "layerGroup.name"),
        "title": get_json_string_attribute(layer_group_info, "layerGroup.title"),
        "description": get_json_string_attribute(layer_group_info, "layerGroup.abstractTxt"),
        "layers": transformed_layers
    }
    return transformed_layer_group


def transform_hierarchical_area(root_layer: dict, hierarchical_content: list) -> dict:
    """ Combines the already transformed information about the root layer with the already transformed hierarchical data
     to form a hierarchy tree of areas.
    Parameters
    ----------
    root_layer : dict
        converted information about the root (parent) layer
    hierarchical_content : list
        converted information about hierarchical content (child layers)
    Returns
    ----------
    dict
        Converted hierarchy tree of areas.
    """
    root_layer["subAreas"] = hierarchical_content
    return root_layer


def get_create_datastore_request(file_path: str, store_name: str, file_format: str) -> dict:
    """ Forms a request body of create data store GeoServer request.
    Parameters
    ----------
    file_path : str
        path to the file that will serve as a source of data
    store_name : str
        name of the data store that will be created
    file_format : str
        data store type
    Returns
    ----------
    dict
        create data store request body in the desired format
    """
    return {
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


def get_create_layer_request(layer_name: str, native_layer_name: str, layer_title: str, projection: str) -> dict:
    """ Forms a request body of create layer GeoServer request.
    Parameters
    ----------
    layer_name : str
        unique identifier of the layer
    native_layer_name : str
        name of the source within a data store
    layer_title : str
        name of the layer that will be created
    projection : str
        projection of the data
    Returns
    ----------
    dict
        create layer request body in the desired format
    """
    return {
        "featureType": {
            "name": layer_name,
            "nativeName": native_layer_name,
            "title": layer_title,
            "nativeCRS": projection,
            "srs": projection,
        }
    }


def get_create_layer_group_request(workspace: str, group_name: str, group_title: str,
                                   group_mode: str, layers: list) -> dict:
    """ Forms a request body of create layer group GeoServer request.
    Parameters
    ----------
    workspace : str
        name of the workspace in which the group will be located
    group_name : str
        unique identifier of the layer
    group_title : str
        name of the group that will be created
    group_mode : str
        group type
    layers : list
        list of layers that will be a part of the group
    Returns
    ----------
    dict
        create layer group request body in the desired format
    """
    return {
        "layerGroup": {
            "name": group_name,
            "title": group_title,
            "mode": group_mode,
            "workspace": {
                "name": workspace
            },
            "publishables": {
                "published": layers
            }
        }
    }


def get_add_layer_to_group_request(layers: list[dict], styles: list[dict]) -> dict:
    """ Forms a request body of add layers to group GeoServer request.
    Parameters
    ----------
    layers : list[dict]
        list of layers that should be a part of the group
    styles : list[dict]
        list of styles of the layers that that should be a part of the group
    Returns
    ----------
    dict
        add layers to layer group request body in the desired format
    """
    return {
        "layerGroup": {
            "publishables":
                {
                    "published": layers
                },
            "styles":
                {
                    "style": styles
                }
        }
    }
