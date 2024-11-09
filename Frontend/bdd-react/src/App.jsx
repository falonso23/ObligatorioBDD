
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Components/Home/Home";
import ActividadDetails from './Components/ActividadDetails/ActividadDetails';
import Report from './Components/Report/Report';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/actividad/:id" element={<ActividadDetails />} />
        <Route path="/report/:id" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;