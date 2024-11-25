from flask import Blueprint, jsonify, request
from db import get_db_connection
from utils import handleError

instructor_bp = Blueprint('instructor', __name__, url_prefix='/instructor')

@instructor_bp.route('/', methods=['GET'])
def get_instructores():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Instructor")
    instructores = cursor.fetchall()
    conn.close()
    return jsonify(instructores)

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
        return handleError(e)
    finally:
        conn.close()
    
@instructor_bp.route('/<string:ci>', methods=['DELETE'])
def delete_instructor(ci):
    if not ci:
        return jsonify({'error': 'Se requiere el campo ci para eliminar un instructor.'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM Instructor WHERE ci = %s", (ci,))
    
    conn.commit()
    conn.close()
    return jsonify({'message': 'Instructor eliminado correctamente.'}), 200


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
        return handleError(e)
    finally:
        # Cerrar la conexión
        conn.close()


@instructor_bp.route("/<string:ci>", methods=['PUT'])
def update_instructor(ci):
    data = request.get_json() 
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE Instructor
            SET nombre = %s, apellido = %s
            WHERE ci = %s
        """, (data['nombre'], data['apellido'], ci))

        if cursor.rowcount == 0:
            conn.rollback() 
            return jsonify({'error': 'Instructor not encontrado'}), 404

        conn.commit()
        return jsonify({'message': 'Instructor actualizado'}), 200
    
    except Exception as e:
        conn.rollback()
        return handleError(e)    
    finally:
        conn.close()