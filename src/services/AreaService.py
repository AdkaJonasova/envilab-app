import copy
from typing import List

from src.geoserver.GeoserverService import get_areas
from src.mockdata.MockAreas import Area
from src.repositories.AreaRepository import AreaRepository


def __merge_area__(geo_area: Area, area_info):
    merged_area = {
        'areaId': geo_area.areaId,
        'isActive': area_info['isActive'] if area_info else False,
        'isFavorite': area_info['isFavorite'] if area_info else False,
        'isCustom': area_info['isCustom'] if area_info else False,
        'geoArea': copy.copy(geo_area)
    }
    return merged_area


def __has_sub_areas__(geo_area):
    return len(geo_area.subAreas) != 0


def __merge_areas__(area_infos: List, geo_areas: List[Area], include_all: bool = False):
    result = []
    for geo_area in geo_areas:
        area_info = next((area_info for area_info in area_infos if area_info['areaID'] == geo_area.areaId), None)
        if area_info or include_all:
            area = __merge_area__(geo_area, area_info)
            if __has_sub_areas__(geo_area):
                area['geoArea'].subAreas = __merge_areas__(area_infos, geo_area.subAreas, include_all)
            result.append(area)
        elif not area_info and __has_sub_areas__(geo_area):
            result.extend(__merge_areas__(area_infos, geo_area.subAreas, include_all))
    return result


class AreaService:

    def __init__(self):
        self.area_repository = AreaRepository()

    def get_areas(self, user_id: int):
        area_infos = self.area_repository.get_areas_for_user(user_id)
        geo_areas = get_areas()
        merged_areas = __merge_areas__(area_infos, geo_areas, True)
        return merged_areas

    def get_favorite_areas(self, user_id: int):
        area_infos = self.area_repository.get_favorite_areas_for_user(user_id)
        geo_areas = get_areas()
        merged_areas = __merge_areas__(area_infos, geo_areas)
        return merged_areas

    def get_active_areas(self, user_id: int):
        area_infos = self.area_repository.get_active_areas_for_user(user_id)
        geo_areas = get_areas()
        merged_areas = __merge_areas__(area_infos, geo_areas)
        return merged_areas

    def get_custom_areas(self, user_id: int):
        area_infos = self.area_repository.get_custom_areas_for_user(user_id)
        geo_areas = get_areas()
        merged_areas = __merge_areas__(area_infos, geo_areas)
        return merged_areas
