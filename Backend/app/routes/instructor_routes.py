from flask import Blueprint, jsonify, request
from db import get_db_connection

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
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
    
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
