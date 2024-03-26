def get_json_attribute(json_data: dict, attribute_path: str):
    value = ""
    keys = attribute_path.split('.')

    try:
        attribute_value = json_data
        for key in keys:
            attribute_value = attribute_value[key]
        value = attribute_value
    except (KeyError, TypeError):
        print(f"Attribute '{attribute_path}' not found in JSON data.")

    return value


def create_geoserver_layer_json(name: str, layer_type: str, title: str, description: str,
                                projection: str, layer_data: dict):
    layer_json = {
        "name": name,
        "type": layer_type,
        "title": title,
        "description": description,
        "projection": projection,
        "data": layer_data
    }
    return layer_json
