from __future__ import annotations

import logging
from typing import Optional
import psycopg2

from src.utils.ConfigReader import load_config

logger = logging.getLogger()


def connect() -> Optional[psycopg2.connection]:
    """ Opens and returns a connection to the database.
    Returns
    -------
    list
        an opened database connection
    """
    connection = None
    try:
        config = load_config("postgresql")
        connection = psycopg2.connect(
            host=config["host"],
            database=config["database"],
            user=config["user"],
            password=config["password"],
            port="5432"
        )

    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(f"Unable to connect to the database, connection failed with error: {error}")

    return connection
