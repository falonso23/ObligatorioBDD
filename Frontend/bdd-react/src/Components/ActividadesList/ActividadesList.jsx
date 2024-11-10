import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid2";

import { getActividades } from "../../api";
import image_placeholder from "../../assets/image_placeholder.jpg";

function ActividadesList() {
	const navigate = useNavigate();
  const [actividades, setActividades] = useState([]);

  const handleClickActividad = (id) => {
    navigate(`/actividad/${id}`);
  };

  
  useEffect(() => {
    const fetchActividades = async () => {
      const response = await getActividades();
      setActividades(response.data);
      console.log("Actividades: ", response);
    };
    fetchActividades();
  }, []);

  return (
    <div>
      <h1 className="page-title">ACTIVIDADES</h1>
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
                  image={
                    actividad.url_imagen
                      ? actividad.url_imagen
                      : image_placeholder
                  }
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
    </div>
  );
}

export default ActividadesList;
