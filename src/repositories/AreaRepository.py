from pypika import Table, Query

from src.utils.DatabaseUtil import connect


class AreaRepository:
    AREA_TABLE_NAME = "Area"
    USER_AREA_TABLE_NAME = "UserArea"

    def __int__(self):
        self.connection = connect()

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

    def activate_area_for_user(self, user_id, layer_id):
        return

    def deactivate_area_for_user(self, user_id, layer_id):
        return

    def add_favorite_for_user(self, user_id, layer_id):
        return

    def remove_favorite_for_user(self, user_id, layer_id):
        return

    def add_custom_for_user(self, user_id, layer_id):
        return

    def remove_custom_for_user(self, user_id, layer_id):
        return

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
