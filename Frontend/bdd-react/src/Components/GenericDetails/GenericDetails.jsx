import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

const formatTimeToInput = (timeString) => {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
};

const formatTimeForBackend = (timeString) => {
  if (!timeString) return "";
  return timeString.length === 5 ? `${timeString}:00` : timeString;
};

function GenericDetails({
  fetchItem,
  saveItem,
  deleteItem,
  fields,
  entityName,
  redirectPath,
  isViewOnly = false,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const { mode, id } = useParams();
  const navigate = useNavigate();
  const effectiveMode = isViewOnly ? "view" : mode;

  const [item, setItem] = useState(() =>
    fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || (field.type === "boolean" ? false : "");
      return acc;
    }, {})
  );

  useEffect(() => {
    if (effectiveMode !== "create" && id) {
      const fetchData = async () => {
        try {
          const response = await fetchItem(id);
          const formattedData = { ...response.data };

          // Formatear valores de tipo "time"
          fields.forEach((field) => {
            if (field.type === "time" && formattedData[field.name]) {
              formattedData[field.name] = formatTimeToInput(formattedData[field.name]);
            }
          });

          setItem(formattedData);
        } catch (error) {
          console.error(`Error fetching ${entityName}:`, error);
        }
      };
      fetchData();
    }
  }, [id, effectiveMode, fetchItem, entityName, fields]);

  const handleChange = (e, field) => {
    const { name, value, checked } = e.target;

    let updatedValue = value;

    if (field.type === "boolean") {
      updatedValue = checked;
    }

    setItem((prev) => ({ ...prev, [name]: updatedValue }));
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
      const formattedItem = { ...item };

      // Convertir valores de tipo "time" para el backend
      fields.forEach((field) => {
        if (field.type === "time" && formattedItem[field.name]) {
          formattedItem[field.name] = formatTimeForBackend(formattedItem[field.name]);
        }
      });

      if (effectiveMode === "create") {
        await saveItem(formattedItem);
        window.alert(`${entityName} creado correctamente`);
      } else if (effectiveMode === "edit") {
        await saveItem(formattedItem, id);
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
        {effectiveMode === "create"
          ? `Crear ${entityName}`
          : effectiveMode === "edit"
          ? `Editar ${entityName}`
          : `Detalles de ${entityName}`}
      </Typography>

      {fields.map((field) =>
        field.type === "boolean" ? (
          <FormControlLabel
            key={field.name}
            control={
              <Switch
                checked={item[field.name] || false}
                name={field.name}
                onChange={(e) => handleChange(e, field)}
                disabled={effectiveMode === "view"}
              />
            }
            label={field.label}
          />
        ) : (
          <TextField
            key={field.name}
            required={field.required}
            label={field.label}
            name={field.name}
            type={field.type || "text"}
            value={item[field.name] || ""}
            onChange={(e) => handleChange(e, field)}
            fullWidth
            margin="normal"
            disabled={effectiveMode === "view" || field.disabled}
            multiline={field.multiline || false}
            rows={field.multiline ? 4 : undefined}
            InputLabelProps={field.type === "date" || field.type === "time" ? { shrink: true } : undefined}
          />
        )
      )}

      {effectiveMode !== "view" && !isViewOnly && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ marginTop: 2 }}
        >
          Guardar
        </Button>
      )}

      {effectiveMode === "view" && !isViewOnly && (
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
