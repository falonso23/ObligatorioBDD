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
