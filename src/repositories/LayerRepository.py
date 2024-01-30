from psycopg2.extras import RealDictCursor
from pypika import Query, Table

from src.utils.DatabaseUtil import connect


class LayerRepository:
    TABLE_NAME = "UserLayer"

    def __init__(self):
        self.connection = connect()

    def get_all_favorite_for_user(self, user_id):
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_layers = Table(self.TABLE_NAME)
        query = (Query().from_(user_layers)
                 .select(user_layers.layerID, user_layers.isActive, user_layers.isFavorite, user_layers.userID)
                 .where(user_layers.userID == user_id)
                 .where(user_layers.isFavorite == 'true'))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_all_active_for_user(self, user_id):
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_layers = Table(self.TABLE_NAME)
        query = (Query().from_(user_layers)
                 .select(user_layers.layerID, user_layers.isActive, user_layers.isFavorite, user_layers.userID)
                 .where(user_layers.userID == user_id)
                 .where(user_layers.isActive == 'true'))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_all_for_user(self, user_id):
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_layers = Table(self.TABLE_NAME)
        query = (Query().from_(user_layers)
                 .select(user_layers.layerID, user_layers.isActive, user_layers.isFavorite, user_layers.userID)
                 .where(user_layers.userID == user_id))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_layer_by_id_and_user(self, layer_id, user_id):
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_layers = Table(self.TABLE_NAME)
        query = (Query().from_(user_layers)
                 .select(user_layers.layerID, user_layers.isActive, user_layers.isFavorite, user_layers.userID)
                 .where(user_layers.layerID == layer_id)
                 .where(user_layers.userID == user_id))

        cursor.execute(str(query))
        return cursor.fetchall()

    def activate_layer_for_user(self, layer_id, user_id):
        layers = self.get_layer_by_id_and_user(layer_id, user_id)
        if layers:
            found_layer = layers[0]
            self.__update_layer(layer_id, 'true', found_layer.get("isFavorite"), user_id)
        else:
            self.__insert_layer(layer_id, 'true', 'true', user_id)

        self.connection.commit()

    def deactivate_layer_for_user(self, layer_id, user_id):
        layers = self.get_layer_by_id_and_user(layer_id, user_id)
        if layers:
            found_layer = layers[0]
            self.__update_layer(layer_id, 'false', found_layer.get("isFavorite"), user_id)
        else:
            self.__insert_layer(layer_id, 'false', 'true', user_id)

        self.connection.commit()

    def add_layer_to_favorites_for_user(self, layer_id, user_id):
        layers = self.get_layer_by_id_and_user(layer_id, user_id)
        if layers:
            found_layer = layers[0]
            self.__update_layer(layer_id, found_layer.get("isActive"), 'true', user_id)
        else:
            self.__insert_layer(layer_id, 'false', 'true', user_id)

        self.connection.commit()

    def remove_layer_from_favorites_for_user(self, layer_id, user_id):
        layers = self.get_layer_by_id_and_user(layer_id, user_id)
        if layers:
            found_layer = layers[0]
            self.__update_layer(layer_id, found_layer.get("isActive"), 'false', user_id)
        else:
            self.__insert_layer(layer_id, 'false', 'false', user_id)

        self.connection.commit()

    # Private methods
    def __insert_layer(self, layer_id, is_active, is_favorite, user_id):
        cursor = self.connection.cursor()

        user_layers = Table(self.TABLE_NAME)
        query = Query().into(user_layers).insert(layer_id, is_active, is_favorite, user_id)

        cursor.execute(str(query))

    def __update_layer(self, layer_id, is_active, is_favorite, user_id):
        cursor = self.connection.cursor()

        user_layers = Table(self.TABLE_NAME)
        query = (Query().update(user_layers)
                 .set(user_layers.isFavorite, is_favorite)
                 .set(user_layers.isActive, is_active)
                 .where(user_layers.layerID == layer_id)
                 .where(user_layers.userID == user_id))

        cursor.execute(str(query))
