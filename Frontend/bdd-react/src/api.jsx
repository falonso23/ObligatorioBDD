import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; 

// --- Alumno Endpoints ---
export const addAlumno = (alumno) => axios.post(`${API_URL}/alumno/`, alumno);
export const updateAlumno = (ci, alumno) => axios.put(`${API_URL}/alumno/${ci}`, alumno);
export const getAlumnos = () => axios.get(`${API_URL}/alumno`);
export const getAlumnoByCi = (ci) => axios.get(`${API_URL}/alumno/${ci}`);
export const deleteAlumnoByCi = (ci) => axios.delete(`${API_URL}/alumno/${ci}`);

// --- Actividad Endpoints ---
export const addActividad = (actividad) => axios.post(`${API_URL}/actividad`, actividad);
export const getActividad = (id) => axios.get(`${API_URL}/actividad/${id}`);
export const getActividades = () => axios.get(`${API_URL}/actividad`);

// --- Turno Endpoints ---
export const getTurnos = () => axios.get(`${API_URL}/turno`);
export const getTurnoById = (id) => axios.get(`${API_URL}/turno/${id}`);

// --- Reportes Endpoints ---
export const getReportActividadIngresos = () => axios.get(`${API_URL}/reporte/actividades_ingresos`);
export const getReportActividadAlumnos = () => axios.get(`${API_URL}/reporte/actividades_alumnos`);
export const getReportTurnosConMasClases = () => axios.get(`${API_URL}/reporte/turnos_clases`);

// --- Clase Endpoints ---
export const getClases = () => axios.get(`${API_URL}/clase`);
export const getClaseById = (id) => axios.get(`${API_URL}/clase/${id}`);
export const deleteClaseById = (id) => axios.delete(`${API_URL}/clase/${id}`);
export const addClase = (clase) => axios.post(`${API_URL}/clase/`, clase);
export const updateClase = (id, clase) => axios.put(`${API_URL}/clase/${id}`, clase);

// --- Instructor Endpoints ---
export const addInstructor = (instructor) => axios.post(`${API_URL}/instructor/`, instructor);
export const updateInstructor = (ci, instructor) => axios.put(`${API_URL}/instructor/${ci}`, instructor);
export const getInstructores = () => axios.get(`${API_URL}/instructor`);
export const getInstructorByCi = (ci) => axios.get(`${API_URL}/instructor/${ci}`);
export const deleteInstructorByCi = (ci) => axios.delete(`${API_URL}/instructor/${ci}`);

// --- Equipamiento Endpoints ---
export const addEquipamiento = (equipamiento) => axios.post(`${API_URL}/equipamiento/`, equipamiento);
export const updateEquipamiento = (id, equipamiento) => axios.put(`${API_URL}/equipamiento/${id}`, equipamiento);
export const getEquipamientos = () => axios.get(`${API_URL}/equipamiento`);
export const getEquipamientoById = (id) => axios.get(`${API_URL}/equipamiento/${id}`);
export const deleteEquipamientoById = (id) => axios.delete(`${API_URL}/equipamiento/${id}`);