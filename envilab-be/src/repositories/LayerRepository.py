from psycopg2.extras import RealDictCursor, RealDictRow
from pypika import Table, PostgreSQLQuery

from src.utils.DatabaseUtil import connect


class LayerRepository:
    """
    A class used for manipulation of layer data in the database.
    Attributes
    ----------
    connection
        opened connection to the database
    """
    TABLE_NAME = "UserLayer"

    def __init__(self):
        self.connection = connect()

    def get_layer_by_name_and_user(self, layer_name: str, user_id: int) -> list[RealDictRow]:
        """ Retrieves a layer with the layer_name for a user with the user_id from the database.
        Parameters
        ----------
        layer_name : str
            unique identifier of the layer
        user_id : int
            ID of the user
        Returns
        ----------
        list
            list of layers with the given identifier and user ID
        """
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_layer = Table(self.TABLE_NAME)
        query = (PostgreSQLQuery.from_(user_layer)
                 .select(user_layer.layerName, user_layer.isActive, user_layer.isFavorite, user_layer.opacity, user_layer.userID)
                 .where(user_layer.layerName == layer_name)
                 .where(user_layer.userID == user_id))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_layers_for_user(self, user_id: int) -> list[RealDictRow]:
        """ Retrieves all layers for a user from the database.
        Parameters
        ----------
        user_id : int
            ID of the user
        Returns
        ----------
        list
            list of layers with the given user ID
        """
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_layer = Table(self.TABLE_NAME)
        query = (PostgreSQLQuery.from_(user_layer)
                 .select(user_layer.layerName, user_layer.isActive, user_layer.isFavorite, user_layer.opacity, user_layer.userID)
                 .where(user_layer.userID == user_id))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_favorite_layers_for_user(self, user_id: int) -> list[RealDictRow]:
        """ Retrieves all layers for a user with the user_id that have a column isFavorite set to True from the
        database.
        Parameters
        ----------
        user_id : int
            ID of the user
        Returns
        ----------
        list
            list of layers with the given user ID and with a isFavorite column set to True
        """
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_layer = Table(self.TABLE_NAME)
        query = (PostgreSQLQuery.from_(user_layer)
                 .select(user_layer.layerName, user_layer.isActive, user_layer.isFavorite, user_layer.opacity, user_layer.userID)
                 .where(user_layer.userID == user_id)
                 .where(user_layer.isFavorite == True))

        cursor.execute(str(query))
        return cursor.fetchall()

    def get_active_layers_for_user(self, user_id: int) -> list[RealDictRow]:
        """ Retrieves all layers for a user with the user_id that have a column isActive set to True from the database.
        Parameters
        ----------
        user_id : int
            ID of the user
        Returns
        ----------
        list
            list of layers with the given user ID and with a isActive column set to True
        """
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)

        user_layer = Table(self.TABLE_NAME)
        query = (PostgreSQLQuery.from_(user_layer)
                 .select(user_layer.layerName, user_layer.isActive, user_layer.isFavorite, user_layer.opacity, user_layer.userID)
                 .where(user_layer.userID == user_id)
                 .where(user_layer.isActive == True))

        cursor.execute(str(query))
        return cursor.fetchall()

    def activate_layer_for_user(self, layer_name: str, user_id: int):
        """ Sets the isActive column to True for a layer with the layer_name and user with the user_id in the database.
        If no such a layer exists, create a new record for the layer.
        Parameters
        ----------
        layer_name : str
            unique identifier of the layer
        user_id : int
            ID of the user
        """
        layers = self.get_layer_by_name_and_user(layer_name, user_id)
        if layers:
            found_layer = layers[0]
            self.__update_layer__(
                found_layer.get("layerName"),
                True,
                found_layer.get("isFavorite"),
                found_layer.get("opacity"),
                found_layer.get("userID"))
        else:
            self.__insert_layer__(layer_name, True, True, 100, user_id)

        self.connection.commit()

    def deactivate_layer_for_user(self, layer_name: str, user_id: int):
        """ Sets the isActive column to False for a layer with the layer_name and user with the user_id in the database.
        If no such a layer exists, create a new record for the layer.
        Parameters
        ----------
        layer_name : str
            unique identifier of the layer
        user_id : int
            ID of the user
        """
        layers = self.get_layer_by_name_and_user(layer_name, user_id)
        if layers:
            found_layer = layers[0]
            self.__update_layer__(
                found_layer.get("layerName"),
                False,
                found_layer.get("isFavorite"),
                found_layer.get("opacity"),
                found_layer.get("userID"))
        else:
            self.__insert_layer__(layer_name, False, True, 100, user_id)

        self.connection.commit()

    def add_layer_to_favorites_for_user(self, layer_name: str, user_id: int):
        """ Sets the isFavorite column to True for a layer with the layer_name and user with the user_id in the database.
        If no such a layer exists, create a new record for the layer.
        Parameters
        ----------
        layer_name : str
            unique identifier of the layer
        user_id : int
            ID of the user
        """
        layers = self.get_layer_by_name_and_user(layer_name, user_id)
        if layers:
            found_layer = layers[0]
            self.__update_layer__(
                found_layer.get("layerName"),
                found_layer.get("isActive"),
                True,
                found_layer.get("opacity"),
                found_layer.get("userID"))
        else:
            self.__insert_layer__(layer_name, False, True, 100, user_id)

        self.connection.commit()

    def remove_layer_from_favorites_for_user(self, layer_name: str, user_id: int):
        """ Sets the isFavorite, isActive columns to True for a layer with the layer_name and user with the user_id in
        the database. If no such a layer exists, create a new record for the layer.
        Parameters
        ----------
        layer_name : str
            unique identifier of the layer
        user_id : int
            ID of the user
        """
        layers = self.get_layer_by_name_and_user(layer_name, user_id)
        if layers:
            found_layer = layers[0]
            self.__update_layer__(
                found_layer.get("layerName"),
                False,
                False,
                found_layer.get("opacity"),
                found_layer.get("userID")
            )
        else:
            self.__insert_layer__(layer_name, False, False, 100, user_id)

        self.connection.commit()

    def set_opacity_of_layer_for_user(self, layer_name: str, user_id: int, opacity: int):
        """ Sets the opacity column to given opacity for a layer with the layer_name and user with the user_id in the
        database. If no such a layer exists, create a new record for the layer.
        Parameters
        ----------
        layer_name : str
            unique identifier of the layer
        user_id : int
            ID of the user
        opacity: int
            new opacity that should be set
        """
        layers = self.get_layer_by_name_and_user(layer_name, user_id)
        if layers:
            found_layer = layers[0]
            self.__update_layer__(
                found_layer.get("layerName"),
                found_layer.get("isActive"),
                found_layer.get("isFavorite"),
                opacity,
                found_layer.get("userID")
            )
        else:
            self.__insert_layer__(layer_name, False, True, opacity, user_id)

    # Private methods
    def __insert_layer__(self, layer_name: str, is_active: bool, is_favorite: bool, opacity: int, user_id: int):
        cursor = self.connection.cursor()

        user_layers = Table(self.TABLE_NAME)
        query = (PostgreSQLQuery
                 .into(user_layers)
                 .columns("layerName", "isActive", "isFavorite", "opacity", "userID")
                 .insert(layer_name, is_active, is_favorite, opacity, user_id))

        cursor.execute(str(query))

    def __update_layer__(self, layer_name: str, is_active: bool, is_favorite: bool, opacity: int, user_id: int):
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
