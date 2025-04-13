from flask import Flask, render_template, request, redirect, session, url_for, flash
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'supersecretkey'

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/')
def home():
    return redirect(url_for('recommendations'))  

@app.route('/login', methods=['GET', 'POST'])
def login_register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        action = request.form['action']

        conn = get_db_connection()
        cursor = conn.cursor()

        if action == 'register':
            try:
                hashed_password = generate_password_hash(password)
                cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed_password))
                conn.commit()
                flash('Registration successful! Please log in.')
            except sqlite3.IntegrityError:
                flash('Username already taken.')
        elif action == 'login':
            cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
            user = cursor.fetchone()
            if user and check_password_hash(user['password'], password):
                session['user_id'] = user['id']
                session['username'] = user['username']
                flash('Logged in successfully.')
                return redirect(url_for('recommendations'))
            else:
                flash('Invalid credentials.')

        conn.close()
    return render_template('login_register.html')

@app.route('/logout')
def logout():
    session.clear()
    flash("Logged out.")
    return redirect(url_for('index'))

@app.route('/recommendations', methods=['GET', 'POST'])
def recommendations():
    if 'user_id' not in session:
        flash("Please log in to submit a recommendation.")
        return redirect(url_for('login_register'))

    conn = get_db_connection()
    cursor = conn.cursor()

    if request.method == 'POST':
        content = request.form['recommendation']
        if content.strip() != "":
            cursor.execute('INSERT INTO recommendations (user_id, content) VALUES (?, ?)', (session['user_id'], content))
            conn.commit()
            flash("Thanks for your feedback!")
        else:
            flash("Recommendation cannot be empty.")

    cursor.execute('SELECT content, timestamp FROM recommendations WHERE user_id = ? ORDER BY timestamp DESC', (session['user_id'],))
    recommendations = cursor.fetchall()
    conn.close()

    return render_template('recommendations.html', recommendations=recommendations)

@app.route('/admin/recommendations')
def admin_recommendations():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE id = ?', (session['user_id'],)).fetchone()

    if not user or not user['is_admin']:
        conn.close()
        return "Access Denied", 403

    # Get all recommendations joined with usernames
    all_recs = conn.execute('''
        SELECT users.username, recommendations.content, recommendations.timestamp
        FROM recommendations
        JOIN users ON recommendations.user_id = users.id
        ORDER BY users.username, recommendations.timestamp DESC
    ''').fetchall()
    conn.close()

    # Group recommendations by username
    grouped_recs = {}
    for rec in all_recs:
        username = rec['username']
        if username not in grouped_recs:
            grouped_recs[username] = []
        grouped_recs[username].append({
            'content': rec['content'],
            'timestamp': rec['timestamp']
        })

    return render_template('admin_recommendations.html', grouped_recs=grouped_recs)

if __name__ == '__main__':
    app.run(debug=True)
