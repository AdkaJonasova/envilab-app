from typing import List

from src.geoserver.GeoserverService import GeoserverService
from src.geoserver.GeoserverService2 import GeoserverService2
from src.models.LayerModels import FavoritePairModel
from src.repositories.LayerRepository import LayerRepository
from src.utils.JsonHelper import get_json_list_attribute


def __merge_layers_in_groups__(layer_infos: list[dict], layer_groups: list[dict], include_all: bool = False) -> list:
    result = []
    for layer_group in layer_groups:
        layers = get_json_list_attribute(layer_group, "layers")
        layer_group["layers"] = __merge_layers__(layer_infos, layers, include_all)
        result.append(layer_group)
    return result


def __merge_layers__(layer_infos: List[dict], geo_layers: List[dict], include_all: bool = False) -> list:
    result = []

    for geo_layer in geo_layers:
        layer_info = next((layer_info for layer_info in layer_infos if layer_info['layerName'] == geo_layer['name']),
                          None)
        if layer_info or include_all:
            geo_layer["isActive"] = layer_info['isActive'] if layer_info else False
            geo_layer["isFavorite"] = layer_info['isFavorite'] if layer_info else False
            geo_layer["opacity"] = layer_info['opacity'] if layer_info else 100
            result.append(geo_layer)
    return result


class LayerService:

    def __init__(self):
        self.layer_repository = LayerRepository()
        self.geoserver_service = GeoserverService()
        self.geoserver_service2 = GeoserverService2()

    def get_layers(self, user_id: int) -> list:
        layer_infos = self.layer_repository.get_all_for_user(user_id)
        geo_layers = self.geoserver_service2.get_layers_in_groups()
        merged_layers = __merge_layers_in_groups__(layer_infos, geo_layers, True)
        return merged_layers

    def get_favorite_layers(self, user_id: int) -> list:
        layer_infos = self.layer_repository.get_all_favorite_for_user(user_id)
        geo_layer_groups = self.geoserver_service.get_layers_in_groups()
        merged_layer_groups = __merge_layers_in_groups__(layer_infos, geo_layer_groups)
        return merged_layer_groups

    def get_active_layers(self, user_id: int) -> list:
        layer_infos = self.layer_repository.get_all_active_for_user(user_id)
        geo_layers = self.geoserver_service.get_layers()
        merged_layers = __merge_layers__(layer_infos, geo_layers)
        return merged_layers

    def activate_layer(self, layer_name: str, user_id: int):
        self.layer_repository.activate_layer_for_user(layer_name, user_id)

    def deactivate_layer(self, layer_name: str, user_id: int):
        self.layer_repository.deactivate_layer_for_user(layer_name, user_id)

    def change_favorite_layers(self, user_id: int, layers: list[FavoritePairModel]):
        for layer in layers:
            if layer.value:
                self.layer_repository.add_layer_to_favorites_for_user(layer.name, user_id)
            else:
                self.layer_repository.remove_layer_from_favorites_for_user(layer.name, user_id)

    def set_opacity_of_layer(self, layer_name: str, user_id: int, opacity: int):
        self.layer_repository.set_opacity_of_layer_for_user(layer_name, user_id, opacity)
