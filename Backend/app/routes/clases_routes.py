from flask import Blueprint, jsonify, request, json
from db import get_db_connection
from utils import handleError, throwError, generateNewId
from datetime import datetime

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
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    print("add clase; " + str(data))
    try:
        print("Before")
        cursor.execute("SELECT id FROM Clase WHERE fecha = %s AND ci_instructor = %s AND id_turno = %s", (data["fecha"], data["ci_instructor"], data["id_turno"]))
        print("After")
        clase_instructor = cursor.fetchone()
        print("Clase instructor: " + str(clase_instructor))
        if clase_instructor != None:
            print('Here: ')
            return throwError("El instructor ya está asignado a una clase el " + str(data["fecha"]) + " en este turno")

        cursor.execute("SELECT id FROM Clase ORDER BY id DESC LIMIT 1")
        last_record = cursor.fetchone() 
        last_id = last_record[0] if last_record else "CLA-00001"
        new_id = generateNewId(last_id)

        dictada = 1 if data["dictada"] else 0

        print("Inserting clase: " + str(data))
        cursor.execute("INSERT INTO Clase (id, ci_instructor, id_actividad, id_turno, fecha, dictada) VALUES (%s, %s, %s, %s, %s, %s)",
                       (new_id, data['ci_instructor'], data['id_actividad'], data['id_turno'], data['fecha'], dictada))
        conn.commit()

        return jsonify({
            'message': 'Clase agregada correctamente.'
        }), 201
    except Exception as e:
        conn.rollback()
        return handleError(e)
    finally:
        conn.close()

@clases_bp.route('/<string:id>', methods=['PUT'])
def update_clase(id):
    data = request.get_json()

    conn = get_db_connection()
    cursor = conn.cursor()
    print(data)

    try:
        # Convertir 'dictada' a un valor compatible con SQL (0 o 1)
        dictada = 1 if data["dictada"] else 0

        if _claseEnTranscurso(cursor):
            return throwError("No se puede editar la clase mientras está en curso")

        cursor.execute("""
            UPDATE Clase 
            SET ci_instructor = %s, id_actividad = %s, id_turno = %s, dictada = %s, fecha = %s 
            WHERE id = %s
        """, (data['ci_instructor'], data['id_actividad'], data["id_turno"], dictada, data["fecha"], id))

        if cursor.rowcount == 0:
            conn.rollback() 
            return throwError("Clase no encontrada")

        conn.commit()
        return jsonify({'message': 'Clase actualizada correctamente.'}), 200
    except Exception as e:
        conn.rollback()
        return handleError(e)
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
            return throwError("Clase no encontrada")
        
        if _claseEnTranscurso(cursor):
            return throwError("No se puede editar la clase mientras está en curso")

        # Eliminar la clase
        cursor.execute("DELETE FROM Clase WHERE id = %s", (id,))
        conn.commit()
        return jsonify({'message': 'Clase eliminada correctamente.'}), 200
    except Exception as e:
        conn.rollback()
        return handleError(e)
    finally:
        conn.close()

@clases_bp.route('/<string:id>/alumnos', methods=['GET'])
def get_alumnos_by_clase_id(id):
    print(id)
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT ac.id_clase, a.ci, a.nombre, a.apellido FROM Alumno_Clase ac
        JOIN Alumno a ON (a.ci = ac.ci_alumno)
        WHERE ac.id_clase = %s
    """, (id,))
    clase = cursor.fetchall()
    conn.close()

    if not clase:
        return jsonify({'error': 'La clase no existe'}), 404

    response_json = json.dumps(clase, sort_keys=False)
    return response_json, 200, {'Content-Type': 'application/json'}

@clases_bp.route('/<string:id>/alumnos', methods=['POST'])
def insert_alumno_to_clase(id):
    try: 
        data = request.get_json()
        print("data" + str(data))
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM Alumno_Clase WHERE id_clase = %s AND ci_alumno = %s", (data["id_clase"],data["ci_alumno"],))
        alumno_en_clase = cursor.fetchone()
        if alumno_en_clase != None:
            return throwError("El alumno ya está anotado en la clase")
        print("Here")
        cursor.execute("""SELECT c.id, c.fecha, t.hora_inicio, t.hora_fin
                        FROM Clase c
                        JOIN Turno t on (c.id_turno = t.id)
                        WHERE c.id = %s
        """, (data["id_clase"], ))
        current_class = cursor.fetchone()
        print("current_class: " + str(current_class))

        if current_class != None:
            id_clase, fecha, hora_inicio, hora_fin = current_class
            hora_inicio_str = (datetime.min + hora_inicio).time().strftime("%H:%M:%S")

            cursor.execute("""SELECT c.id, c.fecha, t.hora_inicio, t.hora_fin
                FROM Alumno_Clase ac
                JOIN Clase c on (c.id = ac.id_clase)
                JOIN Turno t on (c.id_turno = t.id)
                WHERE ac.ci_alumno = %s
                AND t.hora_inicio = %s
                AND c.fecha = %s
            """, (data["ci_alumno"], hora_inicio_str, fecha, ))
            otra_clase_alumno = cursor.fetchone()
            print("Otra clase alumno: " + str(otra_clase_alumno))
        
            if otra_clase_alumno != None:
                return throwError("El alumno ya está anotado en otra clase en este turno")    

        if "id_equipamiento" in data and data["id_equipamiento"] != "":
            cursor.execute("INSERT INTO Alumno_Clase (id_clase, ci_alumno, id_equipamiento) VALUES (%s, %s, %s)",
                            (data['id_clase'], data['ci_alumno'], data['id_equipamiento']))
        else:
            cursor.execute("INSERT INTO Alumno_Clase (id_clase, ci_alumno, id_equipamiento) VALUES (%s, %s, NULL)",
                            (data['id_clase'], data['ci_alumno']))
        conn.commit()

        return jsonify({
            'message': 'Alumno agregado correctamente a la clase.'
        }), 201
    except Exception as e:
        conn.rollback()
        return handleError(e)
    finally:
        conn.close()


@clases_bp.route('/<string:id_clase>/alumnos/<string:ci_alumno>', methods=['DELETE'])
def remove_alumno_from_clase(id_clase, ci_alumno):
    try: 
        print("Clase: " + id_clase)
        print("alumno: " + ci_alumno)
        conn = get_db_connection()
        cursor = conn.cursor()

        if _claseEnTranscurso(cursor):
            return throwError("No se puede editar la clase mientras está en curso")
        
        cursor.execute("DELETE FROM Alumno_Clase WHERE id_clase = %s AND ci_alumno = %s", (id_clase,ci_alumno,))
        conn.commit()

        return jsonify({'message': 'Alumno eliminado correctamente'}), 200
    except Exception as e:
        conn.rollback()
        return handleError(e)
    finally:
        conn.close()


def _claseEnTranscurso(cursor):
        fecha_actual = datetime.today().strftime('%Y-%m-%d')
        hora_actual = datetime.today().strftime('%H:%M:%S')

        cursor.execute("SELECT c.id FROM Clase c JOIN Turno t ON (t.id = c.id_turno) WHERE fecha = %s AND hora_inicio < %s AND hora_fin >= %s", (fecha_actual, hora_actual, hora_actual))
        clase = cursor.fetchone()
        print("Clase en transcurso: " + str(clase))
        return clase != None