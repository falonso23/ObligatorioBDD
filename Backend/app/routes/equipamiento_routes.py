from flask import Blueprint, jsonify, request
from db import get_db_connection

equipamiento_bp = Blueprint('equipamiento', __name__, url_prefix='/equipamiento')

@equipamiento_bp.route('/', methods=['GET'])
def get_equipamientos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Equipamiento")
    equipamientos = cursor.fetchall()
    conn.close()
    return jsonify(equipamientos)