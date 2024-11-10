
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Components/Home/Home";
import ActividadDetails from './Components/ActividadDetails/ActividadDetails';
import Report from './Components/Report/Report';
import ActividadesList from './Components/ActividadesList/ActividadesList';
import ReportesList from './Components/ReportesList/ReportesList';
import GenericList from './Components/GenericList/GenericList';
import NavBar from './Components/NavBar/NavBar';
import "./App.css"
function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/actividades" element={<ActividadesList />} />
        <Route path="/reportes" element={<ReportesList />} />
        <Route path="/list/:table" element={<GenericList />} />
        <Route path="/actividad/:id" element={<ActividadDetails />} />
        <Route path="/report/:id" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;