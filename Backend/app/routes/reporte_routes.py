from flask import Blueprint, jsonify, request, json
from db import get_db_connection

reporte_bp = Blueprint('reporte', __name__, url_prefix='/reporte')

@reporte_bp.route('/actividades_ingresos', methods=['GET'])
def get_actividades_con_mas_ingresos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
SELECT a.id, a.nombre as actividad, a.descripcion, a.costo, count(e.id) as equipamientos, SUM(a.costo + e.costo) AS ingresos_totales FROM Actividad a
JOIN Clase c ON c.id_actividad = a.id
JOIN Alumno_Clase ac ON ac.id_clase = c.id
LEFT JOIN Equipamiento e ON e.id = ac.id_equipamiento
GROUP BY a.id
ORDER BY ingresos_totales DESC
    """)    
    actividades = cursor.fetchall()
    response_json = json.dumps(actividades, sort_keys=False)
    return response_json, 200, {'Content-Type': 'application/json'}

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