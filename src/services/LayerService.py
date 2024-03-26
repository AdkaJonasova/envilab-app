from typing import List

from src.geoserver.GeoserverService import GeoserverService
from src.repositories.LayerRepository import LayerRepository


def __merge_layers__(layer_infos: List[dict], geo_layers: List[dict], include_all: bool = False):
    result = []

    for geo_layer in geo_layers:
        layer_info = next((layer_info for layer_info in layer_infos if layer_info['layerName'] == geo_layer['name']), None)
        if layer_info or include_all:
            layer = {
                'name': geo_layer["name"],
                'title': geo_layer["title"],
                'type': geo_layer["type"],
                'description': geo_layer["description"],
                'projection': geo_layer["projection"],
                'isActive': layer_info['isActive'] if layer_info else False,
                'isFavorite': layer_info['isFavorite'] if layer_info else False,
                'opacity': layer_info['opacity'] if layer_info else 100,
                'data': geo_layer["data"],
            }
            result.append(layer)
    return result


class LayerService:

    def __init__(self):
        self.layer_repository = LayerRepository()
        self.geoserver_service = GeoserverService()

    def get_layers(self, user_id: int):
        layer_infos = self.layer_repository.get_all_for_user(user_id)
        geo_layers = self.geoserver_service.get_layers()
        merged_layers = __merge_layers__(layer_infos, geo_layers, True)
        return merged_layers

    def get_favorite_layers(self, user_id: int):
        layer_infos = self.layer_repository.get_all_favorite_for_user(user_id)
        geo_layers = self.geoserver_service.get_layers()
        merged_layers = __merge_layers__(layer_infos, geo_layers)
        return merged_layers

    def get_active_layers(self, user_id: int):
        layer_infos = self.layer_repository.get_all_active_for_user(user_id)
        geo_layers = self.geoserver_service.get_layers()
        merged_layers = __merge_layers__(layer_infos, geo_layers)
        return merged_layers

    def activate_layer(self, layer_name: str, user_id: int):
        self.layer_repository.activate_layer_for_user(layer_name, user_id)

    def deactivate_layer(self, layer_name: str, user_id: int):
        self.layer_repository.deactivate_layer_for_user(layer_name, user_id)

    def add_favorite_layer(self, layer_name: str, user_id: int):
        self.layer_repository.add_layer_to_favorites_for_user(layer_name, user_id)

    def remove_favorite_layer(self, layer_name: str, user_id: int):
        self.layer_repository.remove_layer_from_favorites_for_user(layer_name, user_id)

    def set_opacity_of_layer(self, layer_name: str, user_id: int, opacity: int):
        self.layer_repository.set_opacity_of_layer_for_user(layer_name, user_id, opacity)
