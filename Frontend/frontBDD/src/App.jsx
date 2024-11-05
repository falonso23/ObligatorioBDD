/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import CourseDetails from './Pages/CourseDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/curso/:id" element={<CourseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;