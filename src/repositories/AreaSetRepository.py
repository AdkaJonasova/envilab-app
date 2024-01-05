from src.utils.DatabaseUtil import connect


class AreaSetRepository:
    AREA_SET_TABLE_NAME = "AreaSet"
    AREA_IN_SET_TABLE_NAME = "AreaInAreaSet"

    def __int__(self):
        self.connection = connect()

    def get_area_sets(self):
        return

    def get_areas_in_set(self, area_set_id):
        return

    def get_area_set_for_area(self, area_id):
        return

    def add_area_to_set(self, area_id, area_set_id):
        return

    def remove_area_from_set(self, area_id, area_set_id):
        return

    def create_area_set(self, area_set_name, areas):
        return