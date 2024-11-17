from flask import Blueprint, jsonify, request
from db import get_db_connection
from datetime import timedelta

turno_bp = Blueprint('turno', __name__, url_prefix='/turno')

@turno_bp.route('/', methods=['GET'])
def get_turnos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Turno")
    turnos = cursor.fetchall()
    conn.close()

    # Convertir valores timedelta a cadenas en todos los turnos
    for turno in turnos:
        for key, value in turno.items():
            if isinstance(value, timedelta):
                turno[key] = str(value)  # Convierte timedelta a formato "HH:MM:SS"

    return jsonify(turnos)

@turno_bp.route('/<string:id>', methods=['GET'])
def get_turno_by_id(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Turno WHERE id = %s", (id,))
    turno = cursor.fetchone()
    conn.close()

    for key, value in turno.items():
        if isinstance(value, timedelta):
            turno[key] = str(value)

    return jsonify(turno)
