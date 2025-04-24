# db_connection.py
import psycopg2

def get_db_connection():
    db = None  # Initialize db variable outside the try block

    try:
        db = psycopg2.connect(
            host='127.0.0.1',
            dbname='postgres',
            user='postgres',
            password='test',
            port=5432,
            options="-c client_encoding=UTF8"
        )
        db.set_client_encoding('UTF8')  # Explicitly ensure UTF8 encoding is used
        print("Database connection successful.")
    except Exception as e:
        print(f"Error: {e}")

    return db
