import sqlite3
from werkzeug.security import generate_password_hash

# Customize this
username = 'phoenix'
plain_password = 'phoenix47cod'  # Set your admin password here

hashed_password = generate_password_hash(plain_password)

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Make sure the user exists, or create them
cursor.execute("SELECT id FROM users WHERE username = ?", (username,))
user = cursor.fetchone()

if user:
    # Update existing user
    cursor.execute("UPDATE users SET password = ?, is_admin = 1 WHERE username = ?", (hashed_password, username))
    print(f"Updated password for '{username}'")
else:
    # Create new admin user
    cursor.execute("INSERT INTO users (username, password, is_admin) VALUES (?, ?, 1)", (username, hashed_password))
    print(f"Created new admin user '{username}'")

conn.commit()
conn.close()
