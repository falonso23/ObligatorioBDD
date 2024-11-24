import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { login } from "../../api";

function Login() {
  const [credentials, setCredentials] = useState({
    correo: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
    try {
      const response = await login(credentials);
      if (response.status === 200) {
        sessionStorage.setItem("isLoggedIn", "true");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setCredentials((prev) => ({ ...prev, ["contrasena"]: "" }));
      window.alert(error.response.data.message);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 600,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Universidad Católica del Uruguay
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Iniciar Sesión
        </Typography>
        {/* Formulario para manejar el evento de "Enter" */}
        <form onSubmit={handleLogin}>
          <TextField
            label="Usuario"
            name="correo"
            fullWidth
            margin="normal"
            value={credentials.correo}
            onChange={handleChange}
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            label="Contraseña"
            name="contrasena"
            type="password"
            fullWidth
            margin="normal"
            value={credentials.contrasena}
            onChange={handleChange}
            inputProps={{ maxLength: 50 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            type="submit" // Botón de tipo submit
          >
            Ingresar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
