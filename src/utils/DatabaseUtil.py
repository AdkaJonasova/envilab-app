from __future__ import annotations

from typing import Optional
import psycopg2

from src.utils.ConfigReader import load_config


def connect() -> Optional[psycopg2.connection]:
    connection = None
    try:
        config = load_config("postgresql")
        connection = psycopg2.connect(
            host=config["host"],
            database=config["database"],
            user=config["user"],
            password=config["password"])

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    return connection
