from flask import Flask, jsonify, request
import mysql.connector

app = Flask(__name__)

def get_db_connection():
    return mysql.connector.connect(host='localhost', database='your_db', user='user', password='password')

@app.route('/api/data', methods=['GET'])
def get_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM table_name")
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
