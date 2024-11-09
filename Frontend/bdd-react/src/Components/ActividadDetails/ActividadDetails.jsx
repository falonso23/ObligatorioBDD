import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActividad } from "../../api";

export const CourseDetails = () => {
  const { id } = useParams();
  const [actividad, setActividad] = useState([]);

  console.log("Clicked id: ", id);
  useEffect(() => {
	const fetchActividad = async () => {
		const response = await getActividad(id);
		setActividad(response.data)
		console.log('Actividad: ', response)
	}
	fetchActividad();
  }, [])

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{actividad.descripcion}</h1>
      <p>{actividad.costo}</p>
    </div>
  );
};

export default CourseDetails;
