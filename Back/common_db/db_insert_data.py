# Importing the function to get the DB connection
from db_connection import get_db_connection

# Get the database connection from db_connection.py
db = get_db_connection()
# Now, proceed with your existing code
if db:
    try:
        cursor = db.cursor()
        # Replace 'test' with your actual table name
        cursor.execute("INSERT INTO test" + id, pwd + "VALUES" + data1) # 일단 보류
        
        # Fetch all the rows from the query result
        rows = cursor.fetchall()

        # List to hold all the dictionaries
        all_user_data = []

        # Create a dictionary for each row and append to the list
        for row in rows:
            user_data = {'id': row[0], 'pwd': row[1]}  # Creating a dictionary for each row
            all_user_data.append(user_data)  # Append to the list

        cursor.close()
        db.close()

    except Exception as e:
        print(f"Error while fetching data: {e}")
else:
    print("Database connection failed, cannot proceed.")

# Print all user data
print(all_user_data)
