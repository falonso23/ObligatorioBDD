import "./ActividadDetails.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActividad } from "../../api";
import Box from "@mui/material/Box";

export const CourseDetails = () => {
  const { id } = useParams();
  const [actividad, setActividad] = useState([]);

  console.log("Clicked id: ", id);
  useEffect(() => {
    const fetchActividad = async () => {
      const response = await getActividad(id);
      setActividad(response.data);
      console.log("Actividad: ", response);
    };
    fetchActividad();
  }, []);

  return (
    <div className="actividad_container">
      <h1>{actividad.nombre}</h1>
      <p>{actividad.descripcion}</p>
      <p>{actividad.costo}</p>
    </div>
  );
};

export default CourseDetails;
