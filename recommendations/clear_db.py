import sqlite3

# Connect to your database
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Delete all rows from both tables
cursor.execute("DELETE FROM recommendations;")
cursor.execute("DELETE FROM users;")

# Optional: Reset autoincrement counters for clean IDs
cursor.execute("DELETE FROM sqlite_sequence WHERE name='users';")
cursor.execute("DELETE FROM sqlite_sequence WHERE name='recommendations';")

# Commit and close
conn.commit()
conn.close()

print("All data deleted. Table structure preserved.")
