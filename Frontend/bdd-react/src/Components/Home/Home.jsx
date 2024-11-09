import "./Home.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActividades } from "../../api";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid2";

import { ReportsList } from "../Report/Report";

export const Home = () => {
  const navigate = useNavigate();
  const [actividades, setActividades] = useState([]);

  const handleClickActividad = (id) => {
    navigate(`/actividad/${id}`);
  };

  const handleClickReport = (id) => {
    navigate(`/report/${id}`);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getActividades();
      setActividades(response.data);
      console.log("Actividades: ", response);
    };
    fetchCourses();
  }, []);

  return (
    <div className="home_container">
      <h1>BIENVENIDO A LA ESCUELA UCU DE DEPORTES DE NIEVE</h1>
      <h3>SELECCIONE UNA ACTIVIDAD</h3>
      <Grid container spacing={3} justifyContent="center">
        {actividades.map((actividad) => (
          <Grid item xs={12} key={actividad.id}>
            <Card
              sx={{ width: 345 }}
              onClick={() => handleClickActividad(actividad.id)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="240"
                  image={actividad.url_imagen}
                  alt={actividad.descripcion}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {actividad.nombre}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {actividad.descripcion}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
	  <br/>
	  <h3>SELECCIONE UN REPORTE</h3>
	  <br/>
      <Grid container spacing={3} justifyContent="center">
        {ReportsList.map((report) => (
          <Grid item xs={12} key={report.id}>
            <Card sx={{ width: 345 }} onClick={() => handleClickReport(report.id)}>
				<CardActionArea>
              <CardContent>
                <Typography  variant="body1"  component="div">
                  {report.name}
                </Typography>
              </CardContent>
				</CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
