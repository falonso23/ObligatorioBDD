CREATE SCHEMA ucu_escuela_de_nieve;

CREATE TABLE Login(
    correo VARCHAR(50) NOT NULL,
    contrasena VARCHAR(50) NOT NULL,
    PRIMARY KEY (correo)
);

CREATE TABLE Actividad(
    id VARCHAR(15) NOT NULL ,
    nombre VARCHAR(32),
    descripcion VARCHAR(255),
    costo INT,
    url_imagen VARCHAR(512),
    PRIMARY KEY (id)
);

CREATE TABLE Equipamiento(
    id varchar(15) NOT NULL ,
    id_actividad VARCHAR(15) NOT NULL ,
    descripcion VARCHAR(200),
    costo INT,
    PRIMARY KEY (id),
    FOREIGN KEY (id_actividad) REFERENCES Actividad(id)
);

CREATE TABLE Instructor(
    ci VARCHAR(8) NOT NULL ,
    nombre VARCHAR(20) NOT NULL ,
    apellido VARCHAR(20) NOT NULL ,
    PRIMARY KEY (ci)
);

CREATE TABLE Turno(
    id VARCHAR(15) NOT NULL ,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Alumno(
    ci VARCHAR(8) NOT NULL ,
    nombre VARCHAR(20) NOT NULL ,
    apellido VARCHAR(20) NOT NULL ,
    fecha_nacimiento DATE,
    telefono INT,
    correo_electronico VARCHAR(20) NOT NULL,
    PRIMARY KEY (ci)
);

CREATE TABLE Clase(
    id varchar(15) NOT NULL ,
    ci_instructor VARCHAR(8) NOT NULL,
    id_actividad VARCHAR(15) NOT NULL,
    id_turno VARCHAR(15) NOT NULL,
    dictada BOOL,
    PRIMARY KEY (id),
    FOREIGN KEY (ci_instructor) REFERENCES Instructor (ci),
    FOREIGN KEY (id_actividad) REFERENCES Actividad (id),
    FOREIGN KEY (id_turno) REFERENCES Turno (id)
);

CREATE TABLE Alumno_Clase(
    id_clase VARCHAR(15) NOT NULL,
    ci_alumno VARCHAR(8) NOT NULL,
    id_equipamiento VARCHAR(15) NOT NULL,
    PRIMARY KEY (id_clase, ci_alumno),
    FOREIGN KEY (id_clase) REFERENCES Clase (id),
    FOREIGN KEY (ci_alumno) REFERENCES Alumno (ci),
    FOREIGN KEY (id_equipamiento) REFERENCES Equipamiento (id)
);