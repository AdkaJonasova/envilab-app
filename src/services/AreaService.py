from typing import List, Optional
import datetime
import os

from src.geoserver.GeoserverService import GeoserverService
from src.models.AreaModels import FavoritePairModel
from src.repositories.AreaRepository import AreaRepository
from src.services.FileService import FileService
from src.utils.ConfigReader import load_config
from src.utils.JsonHelper import get_json_string_attribute


def __merge_area__(geo_area: dict, area_info: dict) -> dict:
    geo_area['isActive'] = area_info['isActive'] if area_info else False
    geo_area['isFavorite'] = area_info['isFavorite'] if area_info else False
    geo_area['isCustom'] = area_info['isCustom'] if area_info else False
    return geo_area


def __has_sub_areas__(geo_area: dict) -> bool:
    return len(geo_area["subAreas"]) != 0


def __merge_areas__(area_infos: List, geo_areas: List[dict], include_all: bool = False) -> list:
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
        self.file_service = FileService()

        config = load_config(section="geoserver_areas")
        self.custom_areas_workspace = config["custom_areas_workspace"]
        self.custom_areas_native_name = config["custom_area_native_name"]
        self.output_folder = config["output_folder"]

    def get_areas(self, user_id: int) -> list:
        area_infos = self.area_repository.get_areas_for_user(user_id)
        general_areas = self.geoserver_service.get_areas()
        custom_areas = self.geoserver_service.get_custom_areas(user_id)
        geo_areas = general_areas + custom_areas
        merged_areas = __merge_areas__(area_infos, geo_areas, True)
        return merged_areas

    def get_favorite_areas(self, user_id: int) -> list:
        area_infos = self.area_repository.get_favorite_areas_for_user(user_id)
        general_areas = self.geoserver_service.get_areas()
        custom_areas = self.geoserver_service.get_custom_areas(user_id)
        geo_areas = general_areas + custom_areas
        merged_areas = __merge_areas__(area_infos, geo_areas)
        return merged_areas

    def get_active_areas(self, user_id: int) -> list:
        area_infos = self.area_repository.get_active_areas_for_user(user_id)
        general_areas = self.geoserver_service.get_areas()
        custom_areas = self.geoserver_service.get_custom_areas(user_id)
        geo_areas = general_areas + custom_areas
        merged_areas = __merge_areas__(area_infos, geo_areas)
        return merged_areas

    def get_custom_areas(self, user_id: int) -> list:
        area_infos = self.area_repository.get_custom_areas_for_user(user_id)
        general_areas = self.geoserver_service.get_areas()
        custom_areas = self.geoserver_service.get_custom_areas(user_id)
        geo_areas = general_areas + custom_areas
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

    def create_custom_area(self, user_id: int, layer_title: str, projection: str, geojson: dict) -> Optional[dict]:
        timestamp = datetime.datetime.now().strftime("%b_%d_%Y_%H_%M_%S")

        file_name = f"customLayer_{user_id}_{timestamp}.gpkg"
        file_path = os.path.join(f"file://{self.output_folder}", file_name)
        self.file_service.write_geojson_to_geopackage(geojson, self.custom_areas_native_name, file_name)

        created_area = self.geoserver_service.create_new_area_from_file(file_path, user_id, layer_title,
                                                                        projection, timestamp)
        if created_area is not None:
            created_area_name = get_json_string_attribute(created_area, "name")
            self.area_repository.add_custom_for_user(created_area_name, user_id)
            created_area_info = self.area_repository.get_area_by_id_and_user(created_area_name, user_id)[0]
            created_area = __merge_area__(created_area, created_area_info)

        return created_area
