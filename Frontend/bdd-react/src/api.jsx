import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; 

export const addInstructor = (instructor) => axios.post(`${API_URL}/instructor`, instructor);
export const getInstructores = () => axios.get(`${API_URL}/instructor`);

export const addAlumno = (alumno) => axios.post(`${API_URL}/alumnos`, alumno);
export const getAlumnos = () => axios.get(`${API_URL}/alumnos`);

export const addActividad = (actividad) => axios.post(`${API_URL}/actividad`, actividad);
export const getActividad = (id) => axios.get(`${API_URL}/actividad/${id}`);
export const getActividades = () => axios.get(`${API_URL}/actividad`);

export const addTurno = (turno) => axios.post(`${API_URL}/turnos`, turno);
export const getTurnos = () => axios.get(`${API_URL}/turnos`);
