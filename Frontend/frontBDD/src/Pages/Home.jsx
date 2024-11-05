/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const courses = [
  { id: 1, name: 'Curso de Esquí' },
  { id: 2, name: 'Curso de Snowboard' },
  { id: 3, name: 'Curso de Moto de Nieve' },
];

export const Home = () => {
  const navigate = useNavigate();

  const handleCourseClick = (id) => {
    navigate(`/curso/${id}`);
  };

  return (
    <div style={{  alignItems: 'center', textAlign: 'center' }}>
      <h1>Bienvenido a la Escuela de Deportes de Nieve</h1>
      <p>Selecciona el curso al que deseas entrar:</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => handleCourseClick(course.id)}
            style={{
              border: '1px solid #ccc',
              padding: '20px',
              borderRadius: '8px',
              width: '150px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            <h3>{course.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
