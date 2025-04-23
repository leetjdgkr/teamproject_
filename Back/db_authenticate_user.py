# Importing the function to get the DB connection
from db_connection import get_db_connection

# Function to check if the credentials exist in the database
def check_user_credentials(test_data):
    # Get the database connection from db_connection.py
    db = get_db_connection()
    
    # List to hold all the dictionaries
    all_user_data = []
    
    # Now, proceed with your existing code
    if db:
        try:
            cursor = db.cursor()
            # Replace 'test' with your actual table name
            cursor.execute("SELECT * FROM test")
            
            # Fetch all the rows from the query result
            rows = cursor.fetchall()

            # Create a dictionary for each row and append to the list
            for row in rows:
                user_data = {'id': row[0], 'pwd': row[1]}  # Creating a dictionary for each row
                all_user_data.append(user_data)  # Append to the list

            cursor.close()
            db.close()

        except Exception as e:
            print(f"Error while fetching data: {e}")
            return False  # Return False if there's an error with the database connection, 자체 db 연결 오류
    else:
        print("Database connection failed, cannot proceed.")
        return False  # Return False if the database connection fails

    # Check if test_data exists in the database
    for user in all_user_data:
        if test_data == user:  # Compare test_data with user data
            return True  # If match is found, return True
    
    return False  # If no match is found, return False

# Example usage of check_user_credentials
test_data = {'id': 'test', 'pwd': 123}  # Example data to check

# Call the function and get the result as a boolean
result = check_user_credentials(test_data)

# Print the result of the check
if result:
    print("User found!")
else:
    print("User not found!")
