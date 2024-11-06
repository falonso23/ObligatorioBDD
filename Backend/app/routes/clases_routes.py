from flask import Blueprint, jsonify, request
from db import get_db_connection

clases_bp = Blueprint('clase', __name__, url_prefix='/clase')

# 1. Obtener todas las clases
@clases_bp.route('/', methods=['GET'])
def get_clases():
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Consulta para obtener todas las clases
        cursor.execute("SELECT id, ci_instructor, id_actividad, id_turno, dictada FROM Clase")
        classes = cursor.fetchall()

        class_list = [
            {
                'id': class_[0],
                'ci_instructor': class_[1],
                'id_actividad': class_[2],
                'id_turno': class_[3],
                'dictada': class_[4]
            }
            for class_ in classes
        ]

        return jsonify(class_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

# 2. Obtener una clase por ID
@clases_bp('/<int:id>', methods=['GET'])
def get_clase(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Consulta para obtener la clase por ID
        cursor.execute("SELECT id, ci_instructor, id_actividad, id_turno, dictada FROM Clase WHERE id = %s", (id,))
        class_ = cursor.fetchone()

        # Verificar si se encontró la clase
        if class_ is None:
            return jsonify({'error': 'Clase no encontrada'}), 404

        # Formatear los datos en un diccionario
        class_data = {
            'id': class_[0],
            'ci_instructor': class_[1],
            'id_actividad': class_[2],
            'id_turno': class_[3],
            'dictada': class_[4]
        }

        return jsonify(class_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

# 3. Agregar una nueva clase
@clases_bp.route('/', methods=['POST'])
def add_clase():
    data = request.get_json()

    # Verificar que los datos necesarios están presentes
    if not data or not all(k in data for k in ("ci_instructor", "id_actividad", "id_turno", "dictada")):
        return jsonify({'error': 'Faltan datos necesarios: ci_instructor, id_actividad, id_turno, dictada'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Insertar la nueva clase en la tabla
        cursor.execute(
            "INSERT INTO Clase (ci_instructor, id_actividad, id_turno, dictada) VALUES (%s, %s, %s, %s)",
            (data['ci_instructor'], data['id_actividad'], data['id_turno'], data['dictada'])
        )
        conn.commit()
        return jsonify({'message': 'Clase agregada correctamente.'}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

# 4. Actualizar una clase existente
@clases_bp.route('/<int:id>', methods=['PUT'])
def update_clase(id):
    data = request.get_json()

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Verificar si la clase existe
        cursor.execute("SELECT * FROM Clase WHERE id = %s", (id,))
        class_ = cursor.fetchone()

        if class_ is None:
            return jsonify({'error': 'Clase no encontrada'}), 404

        # Actualizar los datos de la clase
        cursor.execute(
            "UPDATE Class SET ci_instructor = %s, id_actividad = %s, id_turno = %s, dictada = %s WHERE id = %s",
            (data.get('ci_instructor', class_[1]),
             data.get('id_actividad', class_[2]),
             data.get('id_turno', class_[3]),
             data.get('dictada', class_[4]),
             id)
        )
        conn.commit()
        return jsonify({'message': 'Clase actualizada correctamente.'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()


@clases_bp.route('/<int:id>', methods=['DELETE'])
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


        