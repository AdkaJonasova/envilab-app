import logging

logger = logging.getLogger()


def get_json_string_attribute(json_data: dict, attribute_path: str):
    value = ""
    keys = attribute_path.split('.')

    try:
        attribute_value = json_data
        for key in keys:
            attribute_value = attribute_value[key]
        value = attribute_value
    except (KeyError, TypeError):
        logger.error(f"Attribute '{attribute_path}' not found in JSON data. Returning empty value")

    return value


def get_json_list_attribute(json_data: dict, attribute_path: str):
    value = []
    keys = attribute_path.split('.')

    try:
        attribute_value = json_data
        for key in keys:
            attribute_value = attribute_value[key]
        value = attribute_value
    except (KeyError, TypeError):
        logger.error(f"Attribute '{attribute_path}' not found in JSON data. Returning empty list")

    return value


def create_geo_area_json(name: str, title: str, projection: str,
                         minx: float, maxx: float, miny: float, maxy: float, sub_areas: list):
    area_json = {
        "name": name,
        "title": title,
        "projection": projection,
        "minx": minx,
        "maxx": maxx,
        "miny": miny,
        "maxy": maxy,
        "subAreas": sub_areas
    }
    return area_json


def create_geo_layer_json(name: str, layer_type: str, title: str, description: str,
                          projection: str):
    layer_json = {
        "name": name,
        "type": layer_type,
        "title": title,
        "description": description,
        "projection": projection
    }
    return layer_json


def create_geo_layer_group_json(name: str, title: str, description: str, layers: list):
    group_json = {
        "name": name,
        "title": title,
        "description": description,
        "layers": layers
    }
    return group_json
