from pypika import Table, Query

from src.utils.DatabaseUtil import connect


class AreaRepository:
    AREA_TABLE_NAME = "Area"
    USER_AREA_TABLE_NAME = "UserArea"

    def __int__(self):
        self.connection = connect()

    def get_area_by_id_and_user(self, area_id, user_id):
        cursor = self.connection.cursor()

        user_areas = Table(self.AREA_TABLE_NAME)
        query = (Query().from_(user_areas)
                 .select(user_areas.areaID, user_areas.isActive, user_areas.isFavorite, user_areas.isCustom, user_areas.userID)
                 .where(user_areas.areaID == area_id)
                 .where(user_areas.userID == user_id))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_areas_for_user(self, user_id):
        cursor = self.connection.cursor()

        user_areas = Table(self.USER_AREA_TABLE_NAME)
        query = (Query().from_(user_areas)
                 .select(user_areas.areaID, user_areas.isActive, user_areas.isFavorite, user_areas.isCustom, user_areas.userID)
                 .where(user_areas.userID == user_id))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_active_areas_for_user(self, user_id):
        cursor = self.connection.cursor()

        user_areas = Table(self.USER_AREA_TABLE_NAME)
        query = (Query().from_(user_areas)
                 .select(user_areas.areaID, user_areas.isActive, user_areas.isFavorite, user_areas.isCustom,
                         user_areas.userID)
                 .where(user_areas.userID == user_id)
                 .where(user_areas.isActive == 'true'))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_favorite_areas_for_user(self, user_id):
        cursor = self.connection.cursor()

        user_areas = Table(self.USER_AREA_TABLE_NAME)
        query = (Query().from_(user_areas)
                 .select(user_areas.areaID, user_areas.isActive, user_areas.isFavorite, user_areas.isCustom,
                         user_areas.userID)
                 .where(user_areas.userID == user_id)
                 .where(user_areas.isFavorite == 'true'))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_custom_areas_for_user(self, user_id):
        cursor = self.connection.cursor()

        user_areas = Table(self.USER_AREA_TABLE_NAME)
        query = (Query().from_(user_areas)
                 .select(user_areas.areaID, user_areas.isActive, user_areas.isFavorite, user_areas.isCustom,
                         user_areas.userID)
                 .where(user_areas.userID == user_id)
                 .where(user_areas.isCustom == 'true'))

        cursor.execute(str(query))
        return cursor.fetchall()

    def activate_area_for_user(self, user_id, area_id):
        areas = self.get_area_by_id_and_user(area_id, user_id)
        if areas:
            found_area = areas[0]
            self.__update_area_for_user(user_id, area_id, 'true', found_area[2], found_area[3])
        else:
            self.__create_area_for_user(user_id, area_id, 'true', 'false', 'false')

        self.connection.commit()

    def deactivate_area_for_user(self, user_id, area_id):
        areas = self.get_area_by_id_and_user(area_id, user_id)
        if areas:
            found_area = areas[0]
            self.__update_area_for_user(user_id, area_id, 'false', found_area[2], found_area[3])
        else:
            self.__create_area_for_user(user_id, area_id, 'false', 'false', 'false')

        self.connection.commit()

    def add_favorite_for_user(self, user_id, area_id):
        areas = self.get_area_by_id_and_user(area_id, user_id)
        if areas:
            found_area = areas[0]
            self.__update_area_for_user(user_id, area_id, found_area[1], 'true', found_area[3])
        else:
            self.__create_area_for_user(user_id, area_id, 'false', 'true', 'false')

        self.connection.commit()

    def remove_favorite_for_user(self, user_id, area_id):
        areas = self.get_area_by_id_and_user(area_id, user_id)
        if areas:
            found_area = areas[0]
            self.__update_area_for_user(user_id, area_id, found_area[1], 'false', found_area[3])
        else:
            self.__create_area_for_user(user_id, area_id, 'false', 'false', 'false')

        self.connection.commit()

    def add_custom_for_user(self, user_id, area_id):
        areas = self.get_area_by_id_and_user(area_id, user_id)
        if areas:
            found_area = areas[0]
            self.__update_area_for_user(user_id, area_id, found_area[1], found_area[2], 'true')
        else:
            self.__create_area_for_user(user_id, area_id, 'false', 'false', 'true')

        self.connection.commit()

    def remove_custom_for_user(self, user_id, area_id):
        areas = self.get_area_by_id_and_user(area_id, user_id)
        if areas:
            found_area = areas[0]
            self.__update_area_for_user(user_id, area_id, found_area[1], found_area[2], 'false')
        else:
            self.__create_area_for_user(user_id, area_id, 'false', 'false', 'true')

        self.connection.commit()

    # Private methods
    def __create_area_for_user(self, user_id, area_id, is_active, is_favorite, is_custom):
        cursor = self.connection.cursor()

        areas = Table(self.AREA_TABLE_NAME)
        user_areas = Table(self.USER_AREA_TABLE_NAME)

        area_query = Query().into(areas).insert(area_id)
        user_area_query = Query().into(user_areas).insert(area_id, user_id, is_active, is_favorite, is_custom)

        cursor.execute(str(area_query))
        cursor.execute(str(user_area_query))

    def __update_area_for_user(self, user_id, area_id, is_active, is_favorite, is_custom):
        cursor = self.connection.cursor()

        user_areas = Table(self.USER_AREA_TABLE_NAME)

        query = (Query().update(user_areas)
                 .set(user_areas.isFavorite, is_favorite)
                 .set(user_areas.isActive, is_active)
                 .set(user_areas.isCustom, is_custom)
                 .where(user_areas.areaID == area_id)
                 .where(user_areas.userID == user_id))
        cursor.execute(str(query))
