from pypika import Table, Query

from src.utils.DatabaseUtil import connect


class AreaSetRepository:
    AREA_SET_TABLE_NAME = "AreaSet"
    AREA_IN_SET_TABLE_NAME = "AreaInAreaSet"

    def __int__(self):
        self.connection = connect()

    def get_area_sets(self):
        cursor = self.connection.cursor()

        area_sets, areas_in_sets = Table(self.AREA_SET_TABLE_NAME, self.AREA_IN_SET_TABLE_NAME)
        query = (Query().from_(area_sets)
                 .left_join(areas_in_sets)
                 .on(area_sets.areaSetID == areas_in_sets.areaSetID)
                 .select("*"))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_areas_in_set(self, area_set_id):
        cursor = self.connection.cursor()

        area_sets, areas_in_sets = Table(self.AREA_SET_TABLE_NAME, self.AREA_IN_SET_TABLE_NAME)
        query = (Query().from_(area_sets)
                 .where(area_sets.areaSetID == area_set_id)
                 .left_join(areas_in_sets)
                 .on(area_sets.areaSetID == areas_in_sets.areaSetID)
                 .select("*"))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_area_sets_for_area(self, area_id):
        cursor = self.connection.cursor()

        area_sets, areas_in_sets = Table(self.AREA_SET_TABLE_NAME, self.AREA_IN_SET_TABLE_NAME)
        query = (Query().from_(areas_in_sets)
                 .where(areas_in_sets.areaID == area_id)
                 .left_join(areas_in_sets)
                 .on(area_sets.areaSetID == areas_in_sets.areaSetID)
                 .select("*"))

        cursor.execute(str(query))
        return cursor.fetchall()

    def add_area_to_set(self, area_id, area_set_id):
        cursor = self.connection.cursor()

        areas_in_sets = Table(self.AREA_IN_SET_TABLE_NAME)
        query = Query().into(areas_in_sets).insert(area_id, area_set_id)

        cursor.execute(str(query))
        self.connection.commit()

    def remove_area_from_set(self, area_id, area_set_id):
        cursor = self.connection.cursor()

        areas_in_sets = Table(self.AREA_IN_SET_TABLE_NAME)
        query = (Query()
                 .from_(areas_in_sets)
                 .where(areas_in_sets.areaID == area_id)
                 .where(areas_in_sets.areaSetID == area_set_id)
                 .delete())

        cursor.execute(str(query))
        self.connection.commit()

    def create_area_set(self, area_set_name, areas):
        cursor = self.connection.cursor()

        area_sets, areas_in_sets = Table(self.AREA_SET_TABLE_NAME, self.AREA_IN_SET_TABLE_NAME)

        area_set_query = Query().into(area_sets).insert(area_set_name)
        cursor.execute(str(area_set_query))
        inserted_area_set_id = cursor.lastrowid

        for area in areas:
            area_query = Query().into(areas_in_sets).insert(area, inserted_area_set_id)
            cursor.execute((str(area_query)))

        self.connection.commit()

