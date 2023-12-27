from pypika import Query, Table

from src.utils.DatabaseUtil import connect


class LayerRepository:
    TABLE_NAME = "UserLayer"

    def __init__(self):
        self.connection = connect()

    def get_all_favorite_for_user(self, user_id):
        cursor = self.connection.cursor()

        user_layers = Table(self.TABLE_NAME)
        query = (Query().from_(user_layers)
                 .select(user_layers.layerID, user_layers.isActive, user_layers.isFavorite, user_layers.userID)
                 .where(user_layers.userID == user_id)
                 .where(user_layers.isFavorite == 'true'))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_all_active_for_user(self, user_id):
        cursor = self.connection.cursor()

        user_layers = Table(self.TABLE_NAME)
        query = (Query().from_(user_layers)
                 .select(user_layers.layerID, user_layers.isActive, user_layers.isFavorite, user_layers.userID)
                 .where(user_layers.userID == user_id)
                 .where(user_layers.isActive == 'true'))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_all_for_user(self, user_id):
        cursor = self.connection.cursor()

        user_layers = Table(self.TABLE_NAME)
        query = (Query().from_(user_layers)
                 .select(user_layers.layerID, user_layers.isActive, user_layers.isFavorite, user_layers.userID)
                 .where(user_layers.userID == user_id))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_layer_by_id_and_user(self, layer_id, user_id):
        cursor = self.connection.cursor()

        user_layers = Table(self.TABLE_NAME)
        query = (Query().from_(user_layers)
                 .select(user_layers.layerID, user_layers.isActive, user_layers.isFavorite, user_layers.userID)
                 .where(user_layers.layerID == layer_id)
                 .where(user_layers.userID == user_id))

        cursor.execute(str(query))
        return cursor.fetchall()
