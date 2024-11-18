from flask import Blueprint, jsonify, request
from db import get_db_connection

actividad_bp = Blueprint('actividad', __name__, url_prefix='/actividad')

@actividad_bp.route('/', methods=['GET'])
def get_actividades():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, nombre, descripcion, url_imagen FROM Actividad")
    actividades = cursor.fetchall()
    conn.close()
    return jsonify(actividades)


@actividad_bp.route("/<string:id>",methods=['GET'])
def get_actividad_by_id(id):
    #Busca un actividad por cedula en la base de datos
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Actividad WHERE id = %s", (id,))
    actividad = cursor.fetchone()
    conn.close()
    if not actividad:
        return jsonify({'error': 'Actividad not found'}), 404
    return jsonify(actividad)

@actividad_bp.route("/img/<string:id>",methods=['GET'])
def get_actividad_image_by_id(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT url_imagen FROM Actividad WHERE id = %s", (id,))
    actividad = cursor.fetchone()
    conn.close()
    if not actividad:
        return jsonify({'error': 'Actividad not found'}), 404
    return jsonify(actividad["url_imagen"])