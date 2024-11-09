from flask import Blueprint, jsonify, request
from db import get_db_connection

instructor_bp = Blueprint('instructor', __name__, url_prefix='/instructor')

#Obtener todos los instructores
@instructor_bp.route('/', methods=['GET'])
def get_instructores():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Instructor")
    instructores = cursor.fetchall()
    conn.close()
    return jsonify(instructores)

#Agregar instructor a la base de datos
@instructor_bp.route('/', methods=['POST'])
def add_instructor():
    data = request.get_json()

    if not data or not all(k in data for k in ("ci", "nombre", "apellido")):
        return jsonify({'error': 'Faltan datos necesarios: ci, nombre, apellido'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO Instructor (ci, nombre, apellido) VALUES (%s, %s, %s)",
                       (data['ci'], data['nombre'], data['apellido']))
        conn.commit()
        return jsonify({'message': 'Instructor agregado correctamente.'}), 201
    except Exception as e:
        # Manejo de errores en caso de que ocurra una excepción al insertar
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

#Eliminar Instructor de la base de datos
@instructor_bp.route('/', methods=['DELETE'])
def delete_instructor():
    data = request.get_json()
    ci = data.get('ci')

    if not ci:
        return jsonify({'error': 'Se requiere el campo ci para eliminar un instructor.'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM Instructor WHERE ci = %s", (ci,))
    
    conn.commit()
    conn.close()
    return jsonify({'message': 'Instructor eliminado correctamente.'}), 200


#Obtener por ci un Instructor
@instructor_bp.route('/<string:ci>', methods=['GET'])
def get_instructor(ci):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT ci, nombre, apellido FROM Instructor WHERE ci = %s", (ci,))
        instructor = cursor.fetchone()

        if instructor is None:
            return jsonify({'error': 'Instructor no encontrado'}), 404

        instructor_data = {
            'ci': instructor[0],
            'nombre': instructor[1],
            'apellido': instructor[2]
        }

        return jsonify(instructor_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        # Cerrar la conexión
        conn.close()

#Actualizar un alumno existente
@instructor_bp.route('/<string:ci>', methods=['PUT'])
def update_instructor(ci):
    data = request.get_json()

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Verificar si el alumno existe
        cursor.execute("SELECT * FROM Instructor WHERE ci = %s", (ci,))
        alumno = cursor.fetchone()

        if alumno is None:
            return jsonify({'error': 'Instructor no encontrado'}), 404

        # Actualizar los datos del alumno
        cursor.execute(
            "UPDATE Instructor SET nombre = %s, apellido = %s WHERE ci = %s",
            (data.get('nombre', alumno[1]),
             data.get('apellido', alumno[2]),
             ci)
        )
        conn.commit()
        return jsonify({'message': 'Instructor actualizado correctamente.'}), 200
    except Exception as e:
        conn.rollback() #Si existe algun error, revierte todo cambio que se haya hecho en esta query y deja como estaba antes.
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()