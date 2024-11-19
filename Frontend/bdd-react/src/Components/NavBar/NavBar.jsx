// src/components/NavBar.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "../../index.css";

import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

const NavBar = () => {

  const logout = () => {
    sessionStorage.removeItem("isLoggedIn");
    window.location.reload();
  };


  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "var(--ucu-primary-color)",
        color: "white",
        fontFamily: "var(--ucu-font-family)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontFamily: "var(--ucu-font-family)" }}
        >
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Home
          </Link>
        </Typography>

        <Button
          color="inherit"
          component={Link}
          to="/actividades"
          sx={{ fontFamily: "var(--ucu-font-family)" }}
        >
          Actividades
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/alumnos"
          sx={{ fontFamily: "var(--ucu-font-family)" }}
        >
          Alumnos
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/clases"
          sx={{ fontFamily: "var(--ucu-font-family)" }}
        >
          Clases
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/instructores"
          sx={{ fontFamily: "var(--ucu-font-family)" }}
        >
          Instructores
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/turnos"
          sx={{ fontFamily: "var(--ucu-font-family)" }}
        >
          Turnos
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/equipamientos"
          sx={{ fontFamily: "var(--ucu-font-family)" }}
        >
          Equipamientos
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/reportes"
          sx={{ fontFamily: "var(--ucu-font-family)" }}
        >
          Reportes
        </Button>
        <IconButton color="inherit" onClick={() => logout()} aria-label="Log out">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
