// src/components/NavBar.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "../../index.css"

const NavBar = () => {
  return (
    <AppBar 
      position="static" 
      sx={{
        bgcolor: 'var(--ucu-primary-color)',
        color: 'white',
        fontFamily: 'var(--ucu-font-family)'
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontFamily: 'var(--ucu-font-family)' }}
        >
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Home
          </Link>
        </Typography>

        <Button color="inherit" component={Link} to="/actividades" sx={{ fontFamily: 'var(--ucu-font-family)' }}>
        Actividades
        </Button>
        <Button color="inherit" component={Link} to="/list/alumnos" sx={{ fontFamily: 'var(--ucu-font-family)' }}>
        Alumnos
        </Button>
        <Button color="inherit" component={Link} to="/list/clases" sx={{ fontFamily: 'var(--ucu-font-family)' }}>
        Clases
        </Button>
        <Button color="inherit" component={Link} to="/reportes" sx={{ fontFamily: 'var(--ucu-font-family)' }}>
        Reportes
        </Button>

      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
