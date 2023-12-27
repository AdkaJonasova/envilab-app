import psycopg2


def connect():
    connection = None
    try:
        connection = psycopg2.connect(
            host="localhost",
            database="postgres",
            user="postgres",
            password="Aj20Dip23")

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    return connection
