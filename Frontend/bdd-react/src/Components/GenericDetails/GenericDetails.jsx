import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

function GenericDetails({
  fetchItem,
  saveItem,
  deleteItem,
  fields,
  entityName,
  redirectPath,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const { mode, id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(() =>
    fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || "";
      return acc;
    }, {})
  );

  useEffect(() => {
    if (mode !== "create" && id) {
      const fetchData = async () => {
        try {
          const response = await fetchItem(id);
          setItem(response.data);
        } catch (error) {
          console.error(`Error fetching ${entityName}:`, error);
        }
      };
      fetchData();
    }
  }, [id, mode, fetchItem, entityName]);

  const handleChange = (e, field) => {
    const { name, value } = e.target;

    // Validar longitud máxima para campos tipo "number"
    if (field.type === "number" && field.maxLength) {
      if (value.length > field.maxLength) {
        return; // Ignorar valores más largos
      }
    }

    // Actualizar el estado
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async () => {
    try {
      await deleteItem(id);
      window.alert(`${entityName} eliminado correctamente`);
      navigate(redirectPath);
    } catch (error) {
      console.error(`Error deleting ${entityName}:`, error);
      window.alert(`Error al eliminar ${entityName}`);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleSave = async () => {
    try {
      if (mode === "create") {
        await saveItem(item);
        window.alert(`${entityName} creado correctamente`);
      } else if (mode === "edit") {
        await saveItem(item, id);
        window.alert(`${entityName} actualizado correctamente`);
      }
      navigate(redirectPath);
    } catch (error) {
      console.error(`Error saving ${entityName}:`, error);
      window.alert(`Error al guardar ${entityName}`);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: "20px auto" }}>
      <Typography variant="h4" gutterBottom>
        {mode === "create"
          ? `Crear ${entityName}`
          : mode === "edit"
          ? `Editar ${entityName}`
          : `Detalles de ${entityName}`}
      </Typography>

      {fields.map((field) => (
        <TextField
          key={field.name}
          required={field.required}
          multiline={field.multiline}
          label={field.label}
          name={field.name}
          type={field.type || "text"}
          value={item[field.name]}
          onChange={(e) => handleChange(e, field)} // Pasar el campo para validar
          fullWidth
          margin="normal"
          disabled={mode === "view" || field.disabled}
          InputLabelProps={field.type === "date" ? { shrink: true } : undefined}
          inputProps={
            field.type === "number"
              ? { inputMode: "numeric", pattern: "[0-9]*" } // Para UX en dispositivos móviles
              : field.maxLength
              ? { maxLength: field.maxLength } // Para otros tipos
              : {}
          }
        />
      ))}

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
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/${entityName}/edit/${id}`)}
            sx={{ marginTop: 2 }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenDialog(true)}
            sx={{ marginTop: 2, marginLeft: 1 }}
          >
            Eliminar
          </Button>
        </>
      )}
      <Button
        variant="outlined"
        onClick={() => navigate(redirectPath)}
        sx={{ marginTop: 2, marginLeft: 1 }}
      >
        Volver
      </Button>

      <DeleteDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Confirmar"
        message={`¿Estás seguro de que deseas eliminar este ${entityName}?`}
      />
    </Paper>
  );
}

export default GenericDetails;
