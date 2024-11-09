
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import ActividadDetails from './Components/ActividadDetails/ActividadDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/actividad/:id" element={<ActividadDetails />} />
      </Routes>
    </Router>
  );
}

export default App;