
import React from 'react';
import { useParams } from 'react-router-dom';

export const CourseDetails = () => {
  const { id } = useParams();

  // Datos de ejemplo para mostrar detalles del curso
  const courseDetails = {
    1: { name: 'Curso de Esquí', description: 'Aprende a esquiar como un profesional en nuestras montañas.' },
    2: { name: 'Curso de Snowboard', description: 'Domina el snowboard con técnicas avanzadas.' },
    3: { name: 'Curso de Alpinismo', description: 'Escala y disfruta de la montaña con seguridad.' },
    4: { name: 'Curso de Patinaje', description: 'Patina con estilo y precisión sobre hielo.' },
  };

  const course = courseDetails[id];

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{course.name}</h1>
      <p>{course.description}</p>
    </div>
  );
};

export default CourseDetails;
