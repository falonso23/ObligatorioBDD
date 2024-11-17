
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./Components/Home/Home";
import NavBar from './Components/NavBar/NavBar';

import ActividadesList from './Components/ActividadesList/ActividadesList';
import ReportesList from './Components/ReportesList/ReportesList';
import AlumnosList from './Components/AlumnosList/AlumnosList';
import ClasesList from './Components/ClasesList/ClasesList';

import Report from './Components/Report/Report';
import ActividadDetails from './Components/ActividadDetails/ActividadDetails';
import AlumnoDetails from './Components/AlumnoDetails/AlumnoDetails';
import ClaseDetails from './Components/ClaseDetails/ClaseDetails';

import "./App.css"
function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Nav */}
        <Route path="/actividades" element={<ActividadesList />} />
        <Route path="/reportes" element={<ReportesList />} />
        <Route path="/alumnos/" element={<AlumnosList />} />
        <Route path="/clases/" element={<ClasesList />} />

        {/* Actividad */}
        <Route path="/actividad/:id" element={<ActividadDetails />} />

        {/* Reportes */}
        <Route path="/report/:id" element={<Report />} />

        {/* Alumno */}
        <Route path="/alumno/:mode" element={<AlumnoDetails />} />
        <Route path="/alumno/:mode/:id" element={<AlumnoDetails />} />  

        {/* Clases */}
        <Route path="/clase/:mode" element={<ClaseDetails />} />
        <Route path="/clase/:mode/:id" element={<ClaseDetails />} />  
      </Routes>
    </Router>
  );
}

export default App;