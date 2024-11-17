from flask import Blueprint, jsonify, request
from db import get_db_connection

equipamiento_bp = Blueprint('equipamiento', __name__, url_prefix='/equipamiento')

@equipamiento_bp.route('/', methods=['GET'])
def get_equipamientoes():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Equipamiento")
    equipamientoes = cursor.fetchall()
    conn.close()
    return jsonify(equipamientoes)

@equipamiento_bp.route('/', methods=['POST'])
def add_equipamiento():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # cursor.execute("INSERT INTO Equipamiento (id, nombre, apellido) VALUES (%s, %s, %s)", (data['id'], data['nombre'], data['apellido']))
        conn.commit()
        return jsonify({'message': 'Equipamiento agregado correctamente.'}), 201
    except Exception as e:
        # Manejo de errores en caso de que ocurra una excepción al insertar
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()
    
@equipamiento_bp.route('/<string:id>', methods=['DELETE'])
def delete_equipamiento(id):
    if not id:
        return jsonify({'error': 'Se requiere el campo id para eliminar un equipamiento.'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM Equipamiento WHERE id = %s", (id,))
    
    conn.commit()
    conn.close()
    return jsonify({'message': 'Equipamiento eliminado correctamente.'}), 200

@equipamiento_bp.route("/<string:id>", methods=['GET'])
def getEquipamientoById(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Equipamiento WHERE id = %s", (id,))
    equipamiento = cursor.fetchone()
    conn.close()
    
    if not equipamiento:
        return jsonify({'error': 'equipamiento not found'}), 404


    return jsonify(equipamiento)


@equipamiento_bp.route("/<string:id>", methods=['PUT'])
def update_equipamiento(id):
    data = request.get_json() 
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE Equipamiento
            SET nombre = %s, apellido = %s
            WHERE id = %s
        """, (data['nombre'], data['apellido'], id))

        if cursor.rowcount == 0:
            conn.rollback() 
            return jsonify({'error': 'Equipamiento not encontrado'}), 404

        conn.commit()
        return jsonify({'message': 'Equipamiento actualizado'}), 200
    
    except Exception as e:
        conn.rollback()
        return jsonify({'error': f'Error editando Equipamiento: {str(e)}'}), 500
    
    finally:
        conn.close()