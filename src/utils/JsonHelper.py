import logging

logger = logging.getLogger()


def get_json_string_attribute(json_data: dict, attribute_path: str):
    """ Tries to get an attribute with the attribute_path from given JSON data.
    Parameters
    ----------
    json_data : dict
        JSON data string
    attribute_path: str
        path to the attribute which should be retrieved - attribute names are divided by dots
    Returns
    -------
    str
        a value of the attribute or empty if no such an attribute was found
    """
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
    """ Tries to get an attribute with the attribute_path from given JSON data.
    Parameters
    ----------
    json_data : dict
        JSON data string
    attribute_path: str
        path to the attribute which should be retrieved - attribute names are divided by dots
    Returns
    -------
    list
        a value of the attribute or empty if no such an attribute was found
    """
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
