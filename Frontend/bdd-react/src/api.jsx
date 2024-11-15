import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; 

// --- Instructor Endpoints ---
export const addInstructor = (instructor) => axios.post(`${API_URL}/instructor`, instructor);
export const getInstructores = () => axios.get(`${API_URL}/instructor`);

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
export const addTurno = (turno) => axios.post(`${API_URL}/turnos`, turno);
export const getTurnos = () => axios.get(`${API_URL}/turnos`);

// --- Reportes Endpoints ---
export const getReportActividadIngresos = () => axios.get(`${API_URL}/reporte/actividades_ingresos`);
export const getReportActividadAlumnos = () => axios.get(`${API_URL}/reporte/actividades_alumnos`);
export const getReportTurnosConMasClases = () => axios.get(`${API_URL}/reporte/turnos_clases`);

// --- Clase Endpoints ---
export const getClases = () => axios.get(`${API_URL}/clase`);
