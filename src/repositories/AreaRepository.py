from psycopg2.extras import RealDictCursor, RealDictRow
from pypika import Table, PostgreSQLQuery

from src.utils.DatabaseUtil import connect


class AreaRepository:
    USER_AREA_TABLE_NAME = "UserArea"

    def __init__(self):
        self.connection = connect()

    def get_area_by_id_and_user(self, area_name: str, user_id: int) -> list[RealDictRow]:
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_areas = Table(self.USER_AREA_TABLE_NAME)
        query = (PostgreSQLQuery.from_(user_areas)
                 .select(user_areas.areaName, user_areas.isActive, user_areas.isFavorite, user_areas.isCustom,
                         user_areas.userID)
                 .where(user_areas.areaName == area_name)
                 .where(user_areas.userID == user_id))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_areas_for_user(self, user_id: int) -> list[RealDictRow]:
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_areas = Table(self.USER_AREA_TABLE_NAME)
        query = (PostgreSQLQuery.from_(user_areas)
                 .select(user_areas.areaName, user_areas.isActive, user_areas.isFavorite, user_areas.isCustom,
                         user_areas.userID)
                 .where(user_areas.userID == user_id))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_active_areas_for_user(self, user_id: int) -> list[RealDictRow]:
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_areas = Table(self.USER_AREA_TABLE_NAME)
        query = (PostgreSQLQuery.from_(user_areas)
                 .select(user_areas.areaName, user_areas.isActive, user_areas.isFavorite, user_areas.isCustom,
                         user_areas.userID)
                 .where(user_areas.userID == user_id)
                 .where(user_areas.isActive == True))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_favorite_areas_for_user(self, user_id: int) -> list[RealDictRow]:
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_areas = Table(self.USER_AREA_TABLE_NAME)
        query = (PostgreSQLQuery.from_(user_areas)
                 .select(user_areas.areaName, user_areas.isActive, user_areas.isFavorite, user_areas.isCustom,
                         user_areas.userID)
                 .where(user_areas.userID == user_id)
                 .where(user_areas.isFavorite == True))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_custom_areas_for_user(self, user_id: int) -> list[RealDictRow]:
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_areas = Table(self.USER_AREA_TABLE_NAME)
        query = (PostgreSQLQuery.from_(user_areas)
                 .select(user_areas.areaName, user_areas.isActive, user_areas.isFavorite, user_areas.isCustom,
                         user_areas.userID)
                 .where(user_areas.userID == user_id)
                 .where(user_areas.isCustom == True))

        cursor.execute(str(query))
        return cursor.fetchall()

    def activate_area_for_user(self, area_name: str, user_id: int):
        areas = self.get_area_by_id_and_user(area_name, user_id)
        if areas:
            found_area = areas[0]
            self.__update_area_for_user(
                area_name,
                True,
                found_area.get("isFavorite"),
                found_area.get("isCustom"),
                user_id
            )
        else:
            self.__create_area_for_user(area_name, True, True, False, user_id)

        self.connection.commit()

    def deactivate_area_for_user(self, area_name, user_id: int):
        areas = self.get_area_by_id_and_user(area_name, user_id)
        if areas:
            found_area = areas[0]
            self.__update_area_for_user(
                area_name,
                False,
                found_area.get("isFavorite"),
                found_area.get("isCustom"),
                user_id
            )
        else:
            self.__create_area_for_user(area_name, False, True, False, user_id)

        self.connection.commit()

    def add_favorite_for_user(self, area_name: str, user_id: int):
        areas = self.get_area_by_id_and_user(area_name, user_id)
        if areas:
            found_area = areas[0]
            self.__update_area_for_user(
                area_name,
                found_area.get("isActive"),
                True,
                found_area.get("isCustom"),
                user_id
            )
        else:
            self.__create_area_for_user(area_name, False, True, False, user_id)

        self.connection.commit()

    def remove_favorite_for_user(self, area_name: str, user_id: int):
        areas = self.get_area_by_id_and_user(area_name, user_id)
        if areas:
            found_area = areas[0]
            self.__update_area_for_user(
                area_name,
                found_area.get("isActive"),
                False,
                found_area.get("isCustom"),
                user_id
            )
        else:
            self.__create_area_for_user(area_name, False, False, False, user_id)

        self.connection.commit()

    def add_custom_for_user(self, area_name: str, user_id: int):
        areas = self.get_area_by_id_and_user(area_name, user_id)
        if areas:
            found_area = areas[0]
            self.__update_area_for_user(
                area_name,
                found_area.get("isActive"),
                found_area.get("isFavorite"),
                True,
                user_id
            )
        else:
            self.__create_area_for_user(area_name, False, False, True, user_id)

        self.connection.commit()

    def remove_custom_for_user(self, area_name: str, user_id: int):
        areas = self.get_area_by_id_and_user(area_name, user_id)
        if areas:
            found_area = areas[0]
            self.__update_area_for_user(
                area_name,
                found_area.get("isActive"),
                found_area.get("isFavorite"),
                False,
                user_id
            )
        else:
            self.__create_area_for_user(area_name, False, False, False, user_id)

        self.connection.commit()

    def remove_area_for_user(self, area_name: str, user_id: int):
        cursor = self.connection.cursor()
        user_areas = Table(self.USER_AREA_TABLE_NAME)

        user_area_query = (PostgreSQLQuery
                           .from_(user_areas).delete()
                           .where(user_areas.areaName == area_name)
                           .where(user_areas.userID == user_id))
        cursor.execute(str(user_area_query))
        self.connection.commit()

    # Private methods
    def __create_area_for_user(self, area_name: str, is_active: bool, is_favorite: bool, is_custom: bool, user_id: int):
        cursor = self.connection.cursor()
        user_areas = Table(self.USER_AREA_TABLE_NAME)

        user_area_query = (PostgreSQLQuery
                           .into(user_areas).columns("areaName", "isActive", "isFavorite", "isCustom", "userID")
                           .insert(area_name, is_active, is_favorite, is_custom, user_id))
        cursor.execute(str(user_area_query))

    def __update_area_for_user(self, area_name: str, is_active: bool, is_favorite: bool, is_custom: bool, user_id: int):
        cursor = self.connection.cursor()
        user_areas = Table(self.USER_AREA_TABLE_NAME)

        query = (PostgreSQLQuery.update(user_areas)
                 .set(user_areas.isFavorite, is_favorite)
                 .set(user_areas.isActive, is_active)
                 .set(user_areas.isCustom, is_custom)
                 .where(user_areas.areaName == area_name)
                 .where(user_areas.userID == user_id))
        cursor.execute(str(query))
