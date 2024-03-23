from psycopg2.extras import RealDictCursor
from pypika import Table, PostgreSQLQuery

from src.utils.DatabaseUtil import connect


class LayerRepository:
    TABLE_NAME = "UserLayer"

    def __init__(self):
        self.connection = connect()

    def get_all_favorite_for_user(self, user_id: int):
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_layers = Table(self.TABLE_NAME)
        query = (PostgreSQLQuery.from_(user_layers)
                 .select(user_layers.layerName, user_layers.isActive, user_layers.isFavorite, user_layers.userID)
                 .where(user_layers.userID == user_id)
                 .where(user_layers.isFavorite == True))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_all_active_for_user(self, user_id: int):
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_layers = Table(self.TABLE_NAME)
        query = (PostgreSQLQuery.from_(user_layers)
                 .select(user_layers.layerName, user_layers.isActive, user_layers.isFavorite, user_layers.userID)
                 .where(user_layers.userID == user_id)
                 .where(user_layers.isActive == True))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_all_for_user(self, user_id: int):
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_layers = Table(self.TABLE_NAME)
        query = (PostgreSQLQuery.from_(user_layers)
                 .select(user_layers.layerName, user_layers.isActive, user_layers.isFavorite, user_layers.userID)
                 .where(user_layers.userID == user_id))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_layer_by_name_and_user(self, layer_name: str, user_id: int):
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_layers = Table(self.TABLE_NAME)
        query = (PostgreSQLQuery.from_(user_layers)
                 .select(user_layers.layerName, user_layers.isActive, user_layers.isFavorite, user_layers.userID)
                 .where(user_layers.layerName == layer_name)
                 .where(user_layers.userID == user_id))

        cursor.execute(str(query))
        return cursor.fetchall()

    def activate_layer_for_user(self, layer_name: str, user_id: int):
        layers = self.get_layer_by_name_and_user(layer_name, user_id)
        if layers:
            found_layer = layers[0]
            self.__update_layer(
                layer_name,
                True,
                found_layer.get("isFavorite"),
                found_layer.get("opacity"),
                user_id)
        else:
            self.__insert_layer(layer_name, True, True, 100, user_id)

        self.connection.commit()

    def deactivate_layer_for_user(self, layer_name: str, user_id: int):
        layers = self.get_layer_by_name_and_user(layer_name, user_id)
        if layers:
            found_layer = layers[0]
            self.__update_layer(
                found_layer.get("layerName"),
                False,
                found_layer.get("isFavorite"),
                found_layer.get("opacity"),
                user_id)
        else:
            self.__insert_layer(layer_name, False, True, 100, user_id)

        self.connection.commit()

    def add_layer_to_favorites_for_user(self, layer_name: str, user_id: int):
        layers = self.get_layer_by_name_and_user(layer_name, user_id)
        if layers:
            found_layer = layers[0]
            self.__update_layer(
                found_layer.get("layerName"),
                found_layer.get("isActive"),
                True,
                found_layer.get("opacity"),
                user_id)
        else:
            self.__insert_layer(layer_name, False, True, 100, user_id)

        self.connection.commit()

    def remove_layer_from_favorites_for_user(self, layer_name: str, user_id: int):
        layers = self.get_layer_by_name_and_user(layer_name, user_id)
        if layers:
            found_layer = layers[0]
            self.__update_layer(
                found_layer.get("layerName"),
                found_layer.get("isActive"),
                False,
                found_layer.get("opacity"),
                user_id
            )
        else:
            self.__insert_layer(layer_name, False, False, 100, user_id)

        self.connection.commit()

    # Private methods
    def __insert_layer(self, layer_name: str, is_active: bool, is_favorite: bool, opacity: int, user_id: int):
        cursor = self.connection.cursor()

        user_layers = Table(self.TABLE_NAME)
        query = (PostgreSQLQuery
                 .into(user_layers)
                 .columns("layerName", "isActive", "isFavorite", "opacity", "userID")
                 .insert(layer_name, is_active, is_favorite, opacity, user_id))

        cursor.execute(str(query))

    def __update_layer(self, layer_name: str, is_active: bool, is_favorite: bool, opacity: int, user_id: int):
        cursor = self.connection.cursor()

        user_layers = Table(self.TABLE_NAME)
        query = (PostgreSQLQuery.update(user_layers)
                 .set(user_layers.layerName, layer_name)
                 .set(user_layers.isFavorite, is_favorite)
                 .set(user_layers.isActive, is_active)
                 .set(user_layers.opacity, opacity)
                 .where(user_layers.layerName == layer_name)
                 .where(user_layers.userID == user_id))

        cursor.execute(str(query))
