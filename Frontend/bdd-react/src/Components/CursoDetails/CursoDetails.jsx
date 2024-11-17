
import React from 'react';
import { useParams } from 'react-router-dom';

export const CursoDetails = () => {
  const { id } = useParams();
  const course = CursoDetails[id];

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{course.name}</h1>
      <p>{course.description}</p>
    </div>
  );
};

export default CursoDetails;
