import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
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
      acc[field.name] =
        field.defaultValue || (field.type === "boolean" ? false : "");
      return acc;
    }, {})
  );

  const [options, setOptions] = useState({});

  useEffect(() => {
    if (effectiveMode !== "create" && id) {
      const fetchData = async () => {
        try {
          const response = await fetchItem(id);
          const formattedData = { ...response.data };

          fields.forEach((field) => {
            if (field.type === "time" && formattedData[field.name]) {
              formattedData[field.name] = formatTimeToInput(
                formattedData[field.name]
              );
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

  useEffect(() => {
    const loadOptionsAsync = async () => {
      const loadedOptions = {};
      for (const field of fields) {
        if (field.type === "select" && field.loadOptions) {
          loadedOptions[field.name] = await field.loadOptions();
        }
      }
      setOptions(loadedOptions);
    };
    loadOptionsAsync();
  }, [fields]);

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
    const missingFields = fields
      .filter((field) => field.required && !item[field.name])
      .map((field) => field.label);

    if (missingFields.length > 0) {
      window.alert(
        `Por favor completa los siguientes campos requeridos:\n${missingFields.join(
          "\n"
        )}`
      );
      return;
    }

    try {
      const formattedItem = { ...item };

      fields.forEach((field) => {
        if (field.type === "time" && formattedItem[field.name]) {
          formattedItem[field.name] = formatTimeForBackend(
            formattedItem[field.name]
          );
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
    <Paper
      elevation={3}
      sx={{ padding: 4, maxWidth: 600, margin: "20px auto" }}
    >
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
        ) : field.type === "select" ? (
          <FormControl fullWidth margin="normal" key={field.name}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={item[field.name] || ""}
              onChange={(e) => handleChange(e, field)}
              disabled={effectiveMode === "view"}
              name={field.name}
              label={field.label}
            >
              {options[field.name]?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            multiline={field.multiline || false}
            rows={field.multiline ? 4 : undefined}
            disabled={effectiveMode === "view" || field.disabled}
            InputLabelProps={
              field.type === "date" || field.type === "time"
                ? { shrink: true }
                : undefined
            }
          />
        )
      )}

      {/* Botones */}
      <div>
        <Button
          variant="outlined"
          onClick={() => navigate(redirectPath)}
          sx={{ marginTop: 2 }}
        >
          Volver
        </Button>
        {effectiveMode !== "view" && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ marginTop: 2, marginLeft: 1 }}
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
              sx={{ marginTop: 2, marginLeft: 1 }}
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
      </div>

      {/* Diálogo de Confirmación de Eliminación */}
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
