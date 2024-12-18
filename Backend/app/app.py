from flask import Flask
from flask_cors import CORS


from routes.login_routes import login_bp
from routes.actividad_routes import actividad_bp
from routes.equipamiento_routes import equipamiento_bp
from routes.instructor_routes import instructor_bp
from routes.alumno_routes import alumno_bp
from routes.reporte_routes import reporte_bp
from routes.clases_routes import clases_bp
from routes.turno_routes import turno_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}})

app.register_blueprint(login_bp)
app.register_blueprint(actividad_bp)
app.register_blueprint(equipamiento_bp)
app.register_blueprint(instructor_bp)
app.register_blueprint(alumno_bp)
app.register_blueprint(reporte_bp)
app.register_blueprint(clases_bp)
app.register_blueprint(turno_bp)

if __name__ == '__main__':
    app.run(debug=True)
