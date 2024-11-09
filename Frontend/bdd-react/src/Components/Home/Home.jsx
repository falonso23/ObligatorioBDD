import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {getActividades} from "../../api"

export const Home = () => {
  const navigate = useNavigate();
  const [actividades, setActividades] = useState([]);

  const handleClickActividad = (id) => {
    navigate(`/actividad/${id}`);
  };

  useEffect(() => {
	const fetchCourses = async () => {
		const response = await getActividades();
		setActividades(response.data)
		console.log('Actividades: ', response)
	}
	fetchCourses();
  }, [])

  return (
    <div style={{ alignItems: "center", textAlign: "center" }}>
      <h1>Bienvenido a la Escuela UCU de Nieve</h1>
      <p>Selecciona una actividad:</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {actividades.map((actividad) => (
          <div
            key={actividad.id}
            onClick={() => handleClickActividad(actividad.id)}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              width: "150px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0px 4px 8px rgba(0, 0, 0, 0.2)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <h3>{actividad.nombre}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
