from src.utils.JsonHelper import get_json_string_attribute


def transform_resource_info(resource_name: str, resource_info: dict, resource_class: str) -> dict:
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
    transformed_resource_info["type"] = get_json_string_attribute(layer_info, "layer.type")
    transformed_resource_info["defaultStyle"] = get_json_string_attribute(layer_info, "layer.defaultStyle")

    return transformed_resource_info


def transform_layer_group(transformed_layers: list[dict], layer_group_info: dict) -> dict:
    transformed_layer_group = {
        "name": get_json_string_attribute(layer_group_info, "layerGroup.name"),
        "title": get_json_string_attribute(layer_group_info, "layerGroup.title"),
        "description": get_json_string_attribute(layer_group_info, "layerGroup.abstractTxt"),
        "layers": transformed_layers
    }
    return transformed_layer_group


def get_create_datastore_request(file_path: str, store_name: str, file_format: str) -> dict:
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
