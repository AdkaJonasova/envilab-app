from typing import List

from src.geoserver.GeoserverService import GeoserverService
from src.models.AreaModels import FavoritePairModel
from src.repositories.AreaRepository import AreaRepository


def __merge_area__(geo_area: dict, area_info: dict):
    merged_area = {
        'name': geo_area["name"],
        'title': geo_area["title"],
        'projection': geo_area["projection"],
        'extent': {
            'minx': geo_area["minx"],
            'maxx': geo_area["maxx"],
            'miny': geo_area["miny"],
            'maxy': geo_area["maxy"]
        },
        'isActive': area_info['isActive'] if area_info else False,
        'isFavorite': area_info['isFavorite'] if area_info else False,
        'isCustom': area_info['isCustom'] if area_info else False,
        'subAreas': geo_area["subAreas"]
    }
    return merged_area


def __has_sub_areas__(geo_area: dict):
    return len(geo_area["subAreas"]) != 0


def __merge_areas__(area_infos: List, geo_areas: List[dict], include_all: bool = False):
    result = []
    for geo_area in geo_areas:
        area_info = next((area_info for area_info in area_infos if area_info['areaName'] == geo_area["name"]), None)
        if area_info or include_all:
            area = __merge_area__(geo_area, area_info)
            if __has_sub_areas__(geo_area):
                area["subAreas"] = __merge_areas__(area_infos, geo_area["subAreas"], include_all)
            result.append(area)
        elif not area_info and __has_sub_areas__(geo_area):
            result.extend(__merge_areas__(area_infos, geo_area["subAreas"], include_all))
    return result


class AreaService:

    def __init__(self):
        self.area_repository = AreaRepository()
        self.geoserver_service = GeoserverService()

    def get_areas(self, user_id: int):
        area_infos = self.area_repository.get_areas_for_user(user_id)
        geo_areas = self.geoserver_service.get_areas()
        merged_areas = __merge_areas__(area_infos, geo_areas, True)
        return merged_areas

    def get_favorite_areas(self, user_id: int):
        area_infos = self.area_repository.get_favorite_areas_for_user(user_id)
        geo_areas = self.geoserver_service.get_areas()
        merged_areas = __merge_areas__(area_infos, geo_areas)
        return merged_areas

    def get_active_areas(self, user_id: int):
        area_infos = self.area_repository.get_active_areas_for_user(user_id)
        geo_areas = self.geoserver_service.get_areas()
        merged_areas = __merge_areas__(area_infos, geo_areas)
        return merged_areas

    def get_custom_areas(self, user_id: int):
        area_infos = self.area_repository.get_custom_areas_for_user(user_id)
        geo_areas = self.geoserver_service.get_areas()
        merged_areas = __merge_areas__(area_infos, geo_areas)
        return merged_areas

    def activate_area(self, area_name: str, user_id: int):
        self.area_repository.activate_area_for_user(area_name, user_id)

    def deactivate_area(self, area_name: str, user_id: int):
        self.area_repository.deactivate_area_for_user(area_name, user_id)

    def change_favorite_areas(self, user_id: int, areas: list[FavoritePairModel]):
        for area in areas:
            if area.value:
                self.area_repository.add_favorite_for_user(area.identificator, user_id)
            else:
                self.area_repository.remove_favorite_for_user(area.identificator, user_id)

