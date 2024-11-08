-- Insertar actividades
INSERT INTO Actividad (id, descripcion, costo) VALUES
('ACT-00001', 'Snowboard', 100),
('ACT-00002', 'Ski', 120),
('ACT-00003', 'Moto de nieve', 150);

-- Insertar turnos
INSERT INTO Turno (id, hora_inicio, hora_fin) VALUES
('TUR-00001', '09:00:00', '11:00:00'),
('TUR-00002', '12:00:00', '14:00:00'),
('TUR-00003', '16:00:00', '18:00:00');

-- Insertar instructores
INSERT INTO Instructor (ci, nombre, apellido) VALUES
('12345678', 'Carlos', 'Perez'),
('23456789', 'Ana', 'Lopez'),
('34567890', 'Luis', 'Martinez');

-- Insertar equipamientos
INSERT INTO Equipamiento (id, id_actividad, descripcion, costo) VALUES
('EQU-00001', 'ACT-00001', 'Tabla de snowboard', 50),
('EQU-00002', 'ACT-00001', 'Botas de snowboard', 20),
('EQU-00003', 'ACT-00002', 'Esquís', 60),
('EQU-00004', 'ACT-00002', 'Bastones de ski', 15),
('EQU-00005', 'ACT-00003', 'Casco para moto de nieve', 40),
('EQU-00006', 'ACT-00003', 'Guantes de moto de nieve', 25);

-- Insertar alumnos
INSERT INTO Alumno (ci, nombre, apellido, fecha_nacimiento, telefono_contacto) VALUES
('45678901', 'Juan', 'Gomez', '2000-05-12', '987654321'),
('56789012', 'Maria', 'Rodriguez', '1998-11-25', '123456789'),
('67890123', 'Pedro', 'Sanchez', '2002-02-18', '555666777'),
('78901234', 'Lucia', 'Martinez', '2001-03-15', '987123456'),
('89012345', 'Miguel', 'Diaz', '1999-09-10', '654321789'),
('90123456', 'Sofia', 'Perez', '2003-07-21', '321654987'),
('12345670', 'Carlos', 'Lopez', '1997-08-30', '147258369'),
('23456781', 'Ana', 'Gimenez', '2001-11-11', '963852741'),
('34567892', 'Pablo', 'Fernandez', '2000-06-16', '789456123'),
('45678903', 'Laura', 'Suarez', '1998-12-04', '852369741');

-- Insertar clases
INSERT INTO Clase (id, ci_instructor, id_actividad, id_turno, dictada) VALUES
('CLA-00001', '12345678', 'ACT-00001', 'TUR-00001', TRUE),
('CLA-00002', '23456789', 'ACT-00002', 'TUR-00002', FALSE),
('CLA-00003', '34567890', 'ACT-00003', 'TUR-00003', TRUE),
('CLA-00004', '12345678', 'ACT-00002', 'TUR-00001', TRUE),
('CLA-00005', '23456789', 'ACT-00003', 'TUR-00002', TRUE),
('CLA-00006', '34567890', 'ACT-00001', 'TUR-00003', FALSE),
('CLA-00007', '12345678', 'ACT-00003', 'TUR-00001', TRUE),
('CLA-00008', '23456789', 'ACT-00001', 'TUR-00002', TRUE),
('CLA-00009', '34567890', 'ACT-00002', 'TUR-00003', TRUE),
('CLA-00010', '12345678', 'ACT-00003', 'TUR-00001', FALSE),
('CLA-00011', '23456789', 'ACT-00002', 'TUR-00002', TRUE),
('CLA-00012', '34567890', 'ACT-00001', 'TUR-00003', TRUE),
('CLA-00013', '12345678', 'ACT-00003', 'TUR-00001', TRUE),
('CLA-00014', '23456789', 'ACT-00001', 'TUR-00002', FALSE),
('CLA-00015', '34567890', 'ACT-00002', 'TUR-00003', TRUE),
('CLA-00016', '12345678', 'ACT-00003', 'TUR-00001', TRUE),
('CLA-00017', '23456789', 'ACT-00002', 'TUR-00002', TRUE),
('CLA-00018', '34567890', 'ACT-00001', 'TUR-00003', FALSE),
('CLA-00019', '12345678', 'ACT-00002', 'TUR-00001', TRUE),
('CLA-00020', '23456789', 'ACT-00003', 'TUR-00002', TRUE);

-- Insertar relaciones Alumno_Clase (asignar alumnos a clases y equipamiento) sin duplicaciones
INSERT INTO Alumno_Clase (id_clase, ci_alumno, id_equipamiento) VALUES
('CLA-00001', '45678901', 'EQU-00001'),
('CLA-00001', '56789012', 'EQU-00002'),
('CLA-00002', '67890123', 'EQU-00003'),
('CLA-00003', '78901234', 'EQU-00005'),
('CLA-00004', '89012345', 'EQU-00004'),
('CLA-00005', '90123456', 'EQU-00006'),
('CLA-00006', '12345670', 'EQU-00001'),
('CLA-00007', '23456781', 'EQU-00003'),
('CLA-00008', '34567892', 'EQU-00005'),
('CLA-00009', '45678903', 'EQU-00006'),
('CLA-00010', '56789012', 'EQU-00002'),
('CLA-00011', '67890123', 'EQU-00003'),
('CLA-00012', '78901234', 'EQU-00005'),
('CLA-00013', '89012345', 'EQU-00004'),
('CLA-00014', '90123456', 'EQU-00006'),
('CLA-00015', '12345670', 'EQU-00001'),
('CLA-00016', '23456781', 'EQU-00003'),
('CLA-00017', '34567892', 'EQU-00005'),
('CLA-00018', '45678903', 'EQU-00006'),
('CLA-00019', '45678901', 'EQU-00002'),
('CLA-00020', '56789012', 'EQU-00001'),
('CLA-00003', '67890123', 'EQU-00005'),
('CLA-00004', '78901234', 'EQU-00006'),
('CLA-00005', '89012345', 'EQU-00003'),
('CLA-00006', '90123456', 'EQU-00004'),
('CLA-00007', '12345670', 'EQU-00002'),
('CLA-00008', '23456781', 'EQU-00005'),
('CLA-00009', '34567892', 'EQU-00006'),
('CLA-00010', '45678903', 'EQU-00001'),
('CLA-00011', '45678901', 'EQU-00003'),
('CLA-00012', '67890123', 'EQU-00006'),
('CLA-00013', '78901234', 'EQU-00004'),
('CLA-00014', '89012345', 'EQU-00001'),
('CLA-00015', '90123456', 'EQU-00005'),
('CLA-00016', '12345670', 'EQU-00002'),
('CLA-00017', '23456781', 'EQU-00006'),
('CLA-00018', '34567892', 'EQU-00001'),
('CLA-00019', '45678903', 'EQU-00004'),
('CLA-00020', '45678901', 'EQU-00002');


-- Insertar datos de login
INSERT INTO Login (correo, contrasena) VALUES
('juan.gomez@ucu.edu', 'password1'),
('maria.rodriguez@ucu.edu', 'password2'),
('pedro.sanchez@ucu.edu', 'password3'),
('lucia.martinez@ucu.edu', 'password4'),
('miguel.diaz@ucu.edu', 'password5');