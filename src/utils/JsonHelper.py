import logging

logger = logging.getLogger()


def get_json_string_attribute(json_data, attribute_path: str):
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


def get_json_list_attribute(json_data: dict, attribute_path: str) -> list:
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
