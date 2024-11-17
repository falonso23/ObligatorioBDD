from flask import Blueprint, jsonify, request, json
from db import get_db_connection

clases_bp = Blueprint('clase', __name__, url_prefix='/clase')

# 1. Obtener todas las clases
@clases_bp.route('/', methods=['GET'])
def get_clases():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT c.id, a.nombre as actividad, CONCAT(i.nombre, ' ', i.apellido) as instructor, CONCAT(t.hora_inicio, ' - ', t.hora_fin) as turno, c.fecha,     IF(c.dictada, 'TRUE', 'FALSE') AS dictada FROM Clase c
        JOIN Actividad a on (a.id = c.id_actividad)
        JOIN Instructor i on (i.ci = c.ci_instructor)
        JOIN Turno t on (t.id = c.id_turno)
    """)
    clases = cursor.fetchall()
    conn.close()
    response_json = json.dumps(clases, sort_keys=False)
    return response_json, 200, {'Content-Type': 'application/json'}

@clases_bp.route('/<string:id>', methods=['GET'])
def get_clase(id):
    print(id)
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT c.ci_instructor, c.id_actividad, c.id_turno, c.id, a.nombre as actividad, CONCAT(i.nombre, ' ', i.apellido) as instructor, CONCAT(t.hora_inicio, ' - ', t.hora_fin) as turno, c.fecha, IF(c.dictada, 'TRUE', 'FALSE') AS dictada FROM Clase c
        JOIN Actividad a on (a.id = c.id_actividad)
        JOIN Instructor i on (i.ci = c.ci_instructor)
        JOIN Turno t on (t.id = c.id_turno)
        WHERE c.id = %s
        LIMIT 1
    """, (id,))
    clase = cursor.fetchone()
    conn.close()

    if not clase:
        return jsonify({'error': 'La clase no existe'}), 404
    
    if 'fecha' in clase and clase['fecha']:
        clase['fecha'] = clase['fecha'].strftime("%Y-%m-%d")

    response_json = json.dumps(clase, sort_keys=False)
    return response_json, 200, {'Content-Type': 'application/json'}

# 3. Agregar una nueva clase
@clases_bp.route('/', methods=['POST'])
def add_clase():
    print("clase agregada")
    return jsonify({'message': 'Clase agregada.'}), 200

@clases_bp.route('/<string:id>', methods=['PUT'])
def update_clase(id):
    data = request.get_json()

    conn = get_db_connection()
    cursor = conn.cursor()
    print(data)

    try:
        # Convertir 'dictada' a un valor compatible con SQL (0 o 1)
        dictada = 1 if data["dictada"] else 0

        # Actualizar la clase
        cursor.execute("""
            UPDATE Clase 
            SET ci_instructor = %s, id_actividad = %s, id_turno = %s, dictada = %s, fecha = %s 
            WHERE id = %s
        """, (data['ci_instructor'], data['id_actividad'], data["id_turno"], dictada, data["fecha"], id))

        # Verificar si se actualizó alguna fila
        if cursor.rowcount == 0:
            conn.rollback() 
            return jsonify({'error': 'Clase no encontrada'}), 404

        conn.commit()
        return jsonify({'message': 'Clase actualizada correctamente.'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


@clases_bp.route('/<string:id>', methods=['DELETE'])
def delete_clase(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Verificar si la clase existe
        cursor.execute("SELECT * FROM Clase WHERE id = %s", (id,))
        class_ = cursor.fetchone()

        if class_ is None:
            return jsonify({'error': 'Clase no encontrada'}), 404

        # Eliminar la clase
        cursor.execute("DELETE FROM Clase WHERE id = %s", (id,))
        conn.commit()
        return jsonify({'message': 'Clase eliminada correctamente.'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


        