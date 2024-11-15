import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  getAlumnoByCi,
  addAlumno,
  updateAlumno,
  deleteAlumnoByCi,
} from "../../api"; 
import DeleteDialog from "../DeleteDialog/DeleteDialog";

function AlumnoDetails() {
  const [openDialog, setOpenDialog] = useState(false);
  const { id, mode } = useParams();
  const navigate = useNavigate();

  const [alumno, setAlumno] = useState({
    ci: "",
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    telefono_contacto: "",
  });

  useEffect(() => {
    const fetchAlumno = async () => {
      if (mode !== "create" && id) {
        const response = await getAlumnoByCi(id);
        setAlumno(response.data);
      }
    };
    fetchAlumno();
  }, [id, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlumno((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async () => {
    try {
      await deleteAlumnoByCi(alumno.ci);
      window.alert("Alumno eliminado correctamente");
      navigate("/alumnos");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error al eliminar el alumno";
      window.alert(errorMessage);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleSave = async () => {
    Object.keys(alumno).forEach((key) => {
      if (!alumno[key].replace(/\s/g, "").length) delete alumno[key];
    });
    try {
      if (mode === "create") {
        await addAlumno(alumno);
      } else if (mode === "edit") {
        await updateAlumno(id, alumno);
      }
      window.alert(
        `Alumno ${mode === "create" ? "creado" : "editado"} correctamente`
      );
      navigate("/alumnos");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error al guardar alumno";
      window.alert(errorMessage);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: 4, maxWidth: 600, margin: "20px auto" }}
    >
      <Typography variant="h4" gutterBottom>
        {mode === "create"
          ? "Crear Alumno"
          : mode === "edit"
            ? "Editar Alumno"
            : "Detalles del Alumno"}
      </Typography>

      <TextField
        required
        label="CI"
        name="ci"
        type="number"
        value={alumno.ci}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled={mode !== "create"}
      />
      <TextField
        required
        label="Nombre"
        name="nombre"
        value={alumno.nombre}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled={mode === "view"}
      />
      <TextField
        required
        label="Apellido"
        name="apellido"
        value={alumno.apellido}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled={mode === "view"}
      />
      <TextField
        label="Telefono de contacto"
        name="telefono_contacto"
        type="number"
        value={alumno.telefono_contacto}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled={mode === "view"}
      />

      <TextField
        label="Fecha de Nacimiento"
        name="fecha_nacimiento"
        type="date"
        value={alumno.fecha_nacimiento}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled={mode === "view"}
        InputLabelProps={{ shrink: true }}
      />

      {mode !== "view" && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ marginTop: 2 }}
        >
          Guardar
        </Button>
      )}

      {mode === "view" && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/alumno/edit/${id}`)}
          sx={{ marginTop: 2 }}
        >
          Editar
        </Button>
      )}

      {mode === "view" && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenDialog(true)}
          sx={{ marginTop: 2, marginLeft: 1 }}
        >
          Eliminar
        </Button>
      )}
      <Button
        variant="outlined"
        onClick={() => navigate("/alumnos")}
        sx={{ marginTop: 2, marginLeft: 1 }}
      >
        Volver
      </Button>
      <DeleteDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Confirmar"
        message="¿Estás seguro de que deseas eliminar este alumno?"
      />
    </Paper>
  );
}

export default AlumnoDetails;
