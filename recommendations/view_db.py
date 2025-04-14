import sqlite3

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

print("Users:")
cursor.execute("SELECT * FROM users")
for row in cursor.fetchall():
    print(row)

print("\nRecommendations:")
cursor.execute("SELECT * FROM recommendations")
for row in cursor.fetchall():
    print(row)

conn.close()
