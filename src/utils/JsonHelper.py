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


def create_layer_json(name: str, type: str, title: str, description: str, projection: str):
    layer_json = {
        "name": name,
        "type": type,
        "title": title,
        "description": description,
        "projection": projection
    }
    return layer_json
