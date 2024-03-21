from typing import List

from src.geoserver.GeoserverService import GeoserverService, get_layers
from src.mockdata.MockLayers import Layer
from src.repositories.LayerRepository import LayerRepository


def __merge_layers__(layer_infos: List, geo_layers: List[Layer], include_all: bool = False):
    result = []

    for geo_layer in geo_layers:
        layer_info = next((layer_info for layer_info in layer_infos if layer_info['layerID'] == geo_layer.layer_id), None)
        if layer_info or include_all:
            layer = {
                'layerId': geo_layer.layer_id,
                'isActive': layer_info['isActive'] if layer_info else False,
                'isFavorite': layer_info['isFavorite'] if layer_info else False,
                'geoLayer': geo_layer
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
        # geo_layers = get_layers()
        merged_layers = __merge_layers__(layer_infos, geo_layers)
        return merged_layers

    def get_active_layers(self, user_id: int):
        layer_infos = self.layer_repository.get_all_active_for_user(user_id)
        geo_layers = self.geoserver_service.get_layers()
        merged_layers = __merge_layers__(layer_infos, geo_layers)
        return merged_layers

    def activate_layer(self, layer_id: int, user_id: int):
        self.layer_repository.activate_layer_for_user(layer_id, user_id)

    def deactivate_layer(self, layer_id: int, user_id: int):
        self.layer_repository.deactivate_layer_for_user(layer_id, user_id)
