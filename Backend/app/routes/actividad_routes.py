from flask import Blueprint, jsonify, request
from db import get_db_connection

actividad_bp = Blueprint('actividad', __name__, url_prefix='/actividad')

@actividad_bp.route('/', methods=['GET'])
def get_actividades():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Actividad")
    actividades = cursor.fetchall()
    conn.close()
    return jsonify(actividades)