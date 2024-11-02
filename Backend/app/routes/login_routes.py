from flask import Blueprint, jsonify, request
from db import get_db_connection

login_bp = Blueprint('login', __name__, url_prefix='/login')

@login_bp.route('/', methods=['GET'])
def get_logins():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Login")
    logins = cursor.fetchall()
    conn.close()
    return jsonify(logins)

@login_bp.route('/', methods=['POST'])
def create_login():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Login (correo, contrasena) VALUES (%s, %s)", (data['correo'], data['contrasena']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Login created'}), 201
