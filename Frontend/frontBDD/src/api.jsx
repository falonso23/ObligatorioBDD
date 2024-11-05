import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; // Cambia esto si es necesario

export const addInstructor = (instructor) => axios.post(`${API_URL}/instructores`, instructor);
export const getInstructores = () => axios.get(`${API_URL}/instructores`);

export const addAlumno = (alumno) => axios.post(`${API_URL}/alumnos`, alumno);
export const getAlumnos = () => axios.get(`${API_URL}/alumnos`);

export const addActividad = (actividad) => axios.post(`${API_URL}/actividades`, actividad);
export const getActividades = () => axios.get(`${API_URL}/actividades`);

export const addTurno = (turno) => axios.post(`${API_URL}/turnos`, turno);
export const getTurnos = () => axios.get(`${API_URL}/turnos`);
