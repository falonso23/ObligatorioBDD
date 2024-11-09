from flask import Blueprint, jsonify, request
from db import get_db_connection

reporte_bp = Blueprint('reporte', __name__, url_prefix='/reporte')

@reporte_bp.route('/actividades_ingresos', methods=['GET'])
def get_actividades_con_mas_ingresos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Actividad ORDER BY costo DESC")
    actividades = cursor.fetchall()
    conn.close()
    return jsonify(actividades)

@reporte_bp.route('/actividades_alumnos', methods=['GET'])
def get_actividades_con_mas_alumnos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Alumno ORDER BY ci DESC")
    actividades = cursor.fetchall()
    conn.close()
    return jsonify(actividades)


@reporte_bp.route('/turnos_clases', methods=['GET'])
def get_turnos_con_mas_clases():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Clase")
    actividades = cursor.fetchall()
    conn.close()
    return jsonify(actividades)