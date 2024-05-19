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
    """
    A class used for manipulation with area data from GeoServer and the database.
    Attributes
    ----------
    area_repository : AreaRepository
        instance of class for manipulation with area data from the database
    geoserver_service : GeoserverService
        instance of class for manipulation with data from GeoServer
    file_service : FileService
        instance of class for manipulation with file system
    custom_areas_workspace : str
        name of the workspace where custom areas are saved in GeoServer
    custom_areas_native_name: str
        native name of a custom area, which should be used for creation of new custom areas
    output_folder : str
        path to the folder, where files containing data for custom areas are stored
    """

    def __init__(self):
        self.area_repository = AreaRepository()
        self.geoserver_service = GeoserverService()
        self.file_service = FileService()

        config = load_config(section="geoserver_areas")
        self.custom_areas_workspace = config["custom_areas_workspace"]
        self.custom_areas_native_name = config["custom_area_native_name"]
        self.output_folder = config["output_folder"]

    def get_areas(self, user_id: int) -> list:
        """ Loads all areas for the user with user_id from GeoServer and merges them with additional data from
        the database.
        Parameters
        ----------
        user_id : int
            ID of the user
        Returns
        -------
        list
            a list of all areas for the user
        """
        area_infos = self.area_repository.get_areas_for_user(user_id)
        general_areas = self.geoserver_service.get_areas()
        custom_areas = self.geoserver_service.get_custom_areas(user_id)
        geo_areas = general_areas + custom_areas
        merged_areas = __merge_areas__(area_infos, geo_areas, True)
        return merged_areas

    def get_favorite_areas(self, user_id: int) -> list:
        """ Loads all areas for the user with user_id from GeoServer, merges them with additional data from
        the database and returns only those that are marked as favorite.
        Parameters
        ----------
        user_id : int
            ID of the user
        Returns
        -------
        list
            a list of all favorite areas for the user
        """
        area_infos = self.area_repository.get_favorite_areas_for_user(user_id)
        general_areas = self.geoserver_service.get_areas()
        custom_areas = self.geoserver_service.get_custom_areas(user_id)
        geo_areas = general_areas + custom_areas
        merged_areas = __merge_areas__(area_infos, geo_areas)
        return merged_areas

    def get_active_areas(self, user_id: int) -> list:
        """ Loads all areas for the user with user_id from GeoServer, merges them with additional data from
        the database and returns only those that are marked as active.
        Parameters
        ----------
        user_id : int
            ID of the user
        Returns
        -------
        list
            a list of all active areas for the user
        """
        area_infos = self.area_repository.get_active_areas_for_user(user_id)
        general_areas = self.geoserver_service.get_areas()
        custom_areas = self.geoserver_service.get_custom_areas(user_id)
        geo_areas = general_areas + custom_areas
        merged_areas = __merge_areas__(area_infos, geo_areas)
        return merged_areas

    def get_custom_areas(self, user_id: int) -> list:
        """ Loads all areas for the user with user_id from GeoServer, merges them with additional data from
        the database and returns only those that are marked as custom.
        Parameters
        ----------
        user_id : int
            ID of the user
        Returns
        -------
        list
            a list of all custom areas for the user
        """
        area_infos = self.area_repository.get_custom_areas_for_user(user_id)
        general_areas = self.geoserver_service.get_areas()
        custom_areas = self.geoserver_service.get_custom_areas(user_id)
        geo_areas = general_areas + custom_areas
        merged_areas = __merge_areas__(area_infos, geo_areas)
        return merged_areas

    def activate_area(self, area_name: str, user_id: int):
        """ Activates an area with the given area_name for a user with the user_id.
        Parameters
        ----------
        area_name : str
            name of the area to activate
        user_id : int
            ID of the user
        """
        self.area_repository.activate_area_for_user(area_name, user_id)

    def deactivate_area(self, area_name: str, user_id: int):
        """ Deactivates an area with the given area_name for a user with the user_id.
        Parameters
        ----------
        area_name : str
            name of the area to deactivate
        user_id : int
            ID of the user
        """
        self.area_repository.deactivate_area_for_user(area_name, user_id)

    def change_favorite_areas(self, user_id: int, areas: list[FavoritePairModel]):
        """ Changes which areas are marked as a favorite for a user with the user_id.
        Parameters
        ----------
        user_id : int
            ID of the user
        areas: list[FavoritePairModel]
            list of areas to change
        """
        for area in areas:
            if area.value:
                self.area_repository.add_favorite_for_user(area.identificator, user_id)
            else:
                self.area_repository.remove_favorite_for_user(area.identificator, user_id)

    def create_custom_area(self, user_id: int, layer_title: str, projection: str, geojson: dict) -> Optional[dict]:
        """ Creates a custom area from given GeoJSON in GeoServer and assigns it to a user with the user_id.
        Parameters
        ----------
        user_id : int
            ID of the user
        layer_title: str
            name of the newly created area selected by user
        projection: str
            projection of the given GeoJSON object
        geojson: dict
            area that should be created in GeoJSON format.
        Returns
        ----------
        dict, optional
            a newly created area or None if creation was unsuccessful
        """
        timestamp = datetime.datetime.now().strftime("%b-%d-%Y-%H-%M-%S")

        file_name = f"customLayer_{user_id}_{timestamp}.gpkg"
        file_path = os.path.join(f"file://{self.output_folder}", file_name)
        self.file_service.write_geojson_to_geopackage(geojson, self.custom_areas_native_name, file_name)

        created_area = self.geoserver_service.create_new_area_from_file(file_path, user_id, layer_title,
                                                                        projection, timestamp)
        if created_area is not None:
            created_area_name = get_json_string_attribute(created_area, "name")
            self.area_repository.add_custom_for_user(created_area_name, user_id)
            created_area_info = self.area_repository.get_area_by_name_and_user(created_area_name, user_id)[0]
            created_area = __merge_area__(created_area, created_area_info)

        return created_area

    def delete_custom_area(self, user_id, area_name: str) -> bool:
        """ Creates a custom area from given GeoJSON in GeoServer and assigns it to a user with the user_id.
        Parameters
        ----------
        user_id : int
            ID of the user
        area_name: str
            Name of the area to delete.
        Returns
        ----------
        bool
            True if deleting the area was successful, False otherwise
        """
        area_name_parts = area_name.split(":")
        area_identificator = area_name_parts[1]
        area_identificator_parts = area_identificator.split("_")
        file_name = f"customLayer_{user_id}_{area_identificator_parts[2]}"

        delete_success = self.geoserver_service.delete_custom_area(area_name, user_id)

        if delete_success:
            self.file_service.delete_geopackage_file(file_name)
            self.area_repository.remove_area_for_user(area_name, user_id)
        return delete_success
