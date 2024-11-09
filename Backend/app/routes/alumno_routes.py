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
    cursor.execute("INSERT INTO Alumno (ci, nombre, apellido, fecha_nacimiento, telefono, correo_electronico) VALUES (%s, %s, %s, %s, %s, %s)", (data['ci'], data['nombre'], data['apellido'], data['fecha_nacimiento'], data['telefono'], data['correo_electronico']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Alumno creado'}), 201

@alumno_bp.route("/<string:ci>",methods=['GET'])
def get_alumno_by_ci(ci):
    #Busca un alumno por cedula en la base de datos
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Alumno WHERE ci = %s", (ci,))
    alumno = cursor.fetchone()
    conn.close()
    if not alumno:
        return jsonify({'error': 'Alumno no encontrado'}), 404
    return jsonify(alumno)


#Eliminar un alumno por ci
@alumno_bp.route('/', methods=['DELETE'])
def delete_alumno():
    data = request.get_json()
    ci = data.get('ci')

    if not ci:
        return jsonify({'error': 'Se requiere el campo ci para eliminar un alumno.'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM Alumno WHERE ci = %s", (ci,))
    
    conn.commit()
    conn.close()
    return jsonify({'message': 'Alumno eliminado correctamente.'}), 200


#Actualizar un alumno existente
@alumno_bp.route('/<string:ci>', methods=['PUT'])
def update_alumno(ci):
    data = request.get_json()

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Verificar si el alumno existe
        cursor.execute("SELECT * FROM Alumno WHERE ci = %s", (ci,))
        alumno = cursor.fetchone()

        if alumno is None:
            return jsonify({'error': 'Alumno no encontrado'}), 404

        # Actualizar los datos del alumno
        cursor.execute(
            "UPDATE Alumno SET nombre = %s, apellido = %s, fecha_nacimiento = %s, telefono = %s, correo_electronico = %s WHERE ci = %s",
            (data.get('nombre', alumno[1]),
             data.get('apellido', alumno[2]),
             data.get('fecha_nacimiento', alumno[3]),
             data.get('telefono', alumno[4]),  
             data.get('correo_electronico', alumno[5]),      
             ci)
        )
        conn.commit()
        return jsonify({'message': 'Alumno actualizado correctamente.'}), 200
    except Exception as e:
        conn.rollback() #Si existe algun error, revierte todo cambio que se haya hecho en esta query y deja como estaba antes.
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()