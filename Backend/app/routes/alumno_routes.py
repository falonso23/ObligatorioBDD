from flask import Blueprint, jsonify, request
from db import get_db_connection

alumno_bp = Blueprint('alumno', __name__, url_prefix='/alumno')


@alumno_bp.route('/', methods=['GET'])
def get_alumnos():
    #Devuelve todos los alumnos en la base de datos
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Alumno")
    alumnos = cursor.fetchall()
    conn.close()
    return jsonify(alumnos)

@alumno_bp.route('/', methods=['POST'])
def create_alumno():
    #Inserta un nuevo alumno a la base de datos
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Alumno (ci, nombre, apellido, fecha_nacimiento, telefono_contacto) VALUES (%s, %s, %s, %s, %s)", (data['ci'], data['nombre'], data['apellido'], data['fecha_nacimiento'], data['telefono_contacto']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Alumno created'}), 201

@alumno_bp.route("/<string:ci>",methods=['GET'])
def get_alumno_by_ci(ci):
    #Busca un alumno por cedula en la base de datos
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Alumno WHERE ci = %s", (ci,))
    alumno = cursor.fetchone()
    conn.close()
    if not alumno:
        return jsonify({'error': 'Alumno not found'}), 404
    return jsonify(alumno)