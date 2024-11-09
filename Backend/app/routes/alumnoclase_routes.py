from flask import Blueprint, jsonify, request
from db import get_db_connection

alumnoclase_bp = Blueprint('alumnoclase', __name__, url_prefix='/alumnoclase')

@alumnoclase_bp.route('/', methods=['GET'])
def get_alumnoclase():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Alumno_Clase")
    alumnos = cursor.fetchall()
    conn.close()
    return jsonify(alumnos)
    

@alumnoclase_bp.route('/', methods=['POST'])
def agregar_alumno_a_clase():
    data = request.get_json()

    if not data or not (k in data for j in ("id_clase", "ci_alumno", "turno")):
        return jsonify({'error': 'Faltan datos necesarios: id_clase, ci_alumno, turno'}), 400
    
    conn =get_db_connection()
    cursor = conn.cursor()

    try:
        #Verifico si no está inscripto en otra clase    
        cursor.execute(
                       """SELECT COUNT(*) From Alumno_Clase
                       WHERE ci_alumno = %s AND turno = %s""",
                       (data['ci_alumno'], data['turno']))
        result = cursor.fetchone()

        if result[0] > 0:
            return jsonify({'error': 'El alumno ya está inscrito en otra clase en este turno'}), 400
        
        # Agregar el alumno a la clase
        cursor.execute("""
            INSERT INTO Alumno_Clase (id_clase, ci_alumno, turno)
            VALUES (%s, %s, %s)
        """, (data['id_clase'], data['ci_alumno'], data['turno']))
        conn.commit()
        
        return jsonify({'message': 'Alumno agregado a la clase correctamente.'}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()



# Modificar el equipamiento de un alumno en una clase
@alumnoclase_bp.route('/modificar_equipamiento', methods=['PUT'])
def modificar_equipamiento():
    data = request.get_json()

    if not data or not all(k in data for k in ("ci_alumno", "id_clase", "id_equipamiento")):
        return jsonify({'error': 'Faltan datos necesarios: ci_alumno, id_clase, id_equipamiento'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Verificar que la relación AlumnoClase exista
        cursor.execute("SELECT * FROM Alumno_Clase WHERE ci_alumno = %s AND id_clase = %s", (data['ci_alumno'], data['id_clase']))
        alumno_clase = cursor.fetchone()

        if alumno_clase is None:
            return jsonify({'error': 'La relación Alumno_Clase no existe'}), 404

        # Modificar el equipamiento en la tabla AlumnoClase
        cursor.execute("""
            UPDATE Alumno_Clase 
            SET id_equipamiento = %s 
            WHERE ci_alumno = %s AND id_clase = %s
        """, (data['ci_alumno'], data['id_clase'], data['id_equipamiento']))
        conn.commit()

        return jsonify({'message': 'Equipamiento modificado correctamente.'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()





