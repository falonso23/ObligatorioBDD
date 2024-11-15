from flask import Blueprint, jsonify, request, json
from db import get_db_connection

alumno_bp = Blueprint('alumno', __name__, url_prefix='/alumno')


@alumno_bp.route('/', methods=['GET'])
def get_alumnos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT ci, nombre, apellido FROM Alumno")
    alumnos = cursor.fetchall()
    conn.close()
    response_json = json.dumps(alumnos, sort_keys=False)
    return response_json, 200, {'Content-Type': 'application/json'}

@alumno_bp.route("/<string:ci>", methods=['GET'])
def get_alumno_by_ci(ci):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Alumno WHERE ci = %s", (ci,))
    alumno = cursor.fetchone()
    conn.close()
    
    if not alumno:
        return jsonify({'error': 'Alumno not found'}), 404
    
    if 'fecha_nacimiento' in alumno and alumno['fecha_nacimiento']:
        alumno['fecha_nacimiento'] = alumno['fecha_nacimiento'].strftime("%Y-%m-%d")

    return jsonify(alumno)

@alumno_bp.route('/', methods=['POST'])
def create_alumno():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()

    campos = []
    valores = []
    for campo, valor in data.items():
        if valor: 
            campos.append(campo)
            valores.append(valor)

    campos_sql = ", ".join(campos)
    placeholders = ", ".join(["%s"] * len(valores))
    sql = f"INSERT INTO Alumno ({campos_sql}) VALUES ({placeholders})"

    try:
        cursor.execute(sql, valores)
        conn.commit()
        return jsonify({'message': 'Alumno creado'}), 201
    except Exception as e:
        print(e)
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

@alumno_bp.route("/<string:ci>", methods=['PUT'])
def update_alumno(ci):
    data = request.get_json() 
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE Alumno
            SET nombre = %s, apellido = %s, fecha_nacimiento = %s, telefono_contacto = %s
            WHERE ci = %s
        """, (data['nombre'], data['apellido'], data['fecha_nacimiento'], data['telefono_contacto'], ci))

        if cursor.rowcount == 0:
            conn.rollback() 
            return jsonify({'error': 'Alumno not encontrado'}), 404

        conn.commit()
        return jsonify({'message': 'Alumno actualizado'}), 200
    
    except Exception as e:
        conn.rollback()
        return jsonify({'error': f'Error editando alumno: {str(e)}'}), 500
    
    finally:
        conn.close()

@alumno_bp.route("/<string:ci>", methods=['DELETE'])
def delete_alumno(ci):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM Alumno WHERE ci = %s", (ci,))

        if cursor.rowcount == 0:
            conn.rollback()
            return jsonify({'error': 'Alumno no encontrado'}), 404

        conn.commit()
        return jsonify({'message': 'Alumno eliminado correctamente'}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({'error': f'Error al eliminar el alumno: {str(e)}'}), 500

    finally:
        conn.close()
