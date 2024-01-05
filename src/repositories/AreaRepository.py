from src.utils.DatabaseUtil import connect


class AreaRepository:
    AREA_TABLE_NAME = "Area"
    USER_AREA_TABLE_NAME = "UserArea"

    def __int__(self):
        self.connection = connect()

    def get_active_areas_for_user(self, user_id):
        return

    def get_favorite_areas_for_user(self, user_id):
        return

    def get_custom_areas_for_user(self, user_id):
        return

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
        return

    def __update_area_for_user(self, user_id, area_id, is_active, is_favorite, is_custom):
        return
