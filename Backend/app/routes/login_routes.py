from flask import Blueprint, jsonify, request
from db import get_db_connection

login_bp = Blueprint('login', __name__, url_prefix='/login')

from flask import Blueprint, jsonify, request
from db import get_db_connection
from utils import throwError

login_bp = Blueprint('login', __name__, url_prefix='/login')

@login_bp.route('/auth', methods=['POST'])
def authenticate_user():
    data = request.get_json()
    print(data)
    correo = data['correo']
    passwd = data['contrasena']

    if not correo or '@' not in correo and correo != "admin": #admin para debug
        return throwError("Ingrese un correo valido")

    if not passwd:
        return throwError("Ingrese una contraseña")


    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM Login WHERE correo = %s AND contrasena = %s",
        (correo, passwd)
    )
    login = cursor.fetchone()
    conn.close()

    if login:
        return jsonify({'message': 'Autenticación exitosa'}), 200
    else:
        return throwError("Correo o contraseña invalidos")
