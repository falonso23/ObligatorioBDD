import React, { useState, useEffect } from "react";
import GenericDetails from "../GenericDetails/GenericDetails";
import { useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  getClaseById,
  addClase,
  updateClase,
  deleteClaseById,
  getInstructores,
  getActividades,
  getTurnos,
  getAlumnosByClase,
  getAlumnos,
  addAlumnoClase,
  getEquipamientos,
  removeAlumnoClase,
} from "../../api";
import GenericList from "../GenericList/GenericList";

function ClaseDetails() {
  const [allAlumnosPicklist, setAllAlumnosPicklist] = useState([]);
  const [allEquipamientosPicklist, setAllEquipamientosPicklist] = useState([]);
  const [selectedAlumnoCi, setSelectedAlumnoCi] = useState("");
  const [selectedEquipamientoId, setSelectedEquipamientoId] = useState("");
  const { mode, id } = useParams();
  const [reloadKey, setReloadKey] = useState(0);

  const eliminarRelacionAlumno = async (ci, id) => {
    console.log("remove", ci, id);
    try {
      const obj = { ci_alumno: ci, id_clase: id };
      await removeAlumnoClase(obj);
      window.alert("Alumno quitado de la clase");
    } catch (error) {
      console.error(error);
      window.alert(
        error.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    }
    refreshTable();
  };

    const handleSaveItem = (mode, id, data) => {
        if (mode === "edit") {
        return updateClase(id, data);
        } else {
        return addClase(data);
        }
    };
  

  const asignarAlumno = async () => {
    if (!selectedAlumnoCi || selectedAlumnoCi === "") {
      window.alert("Seleccione un alumno");
    }
    try {
      const obj = {
        id_clase: id,
        ci_alumno: selectedAlumnoCi,
        id_equipamiento: selectedEquipamientoId,
      };
      console.log("Sending: ", obj);
      await addAlumnoClase(obj);
      setSelectedAlumnoCi(undefined);
      setSelectedEquipamientoId(undefined);
      window.alert("Alumno asignado correctamente");
    } catch (error) {
      console.error(error);
      window.alert(
        error.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  const refreshTable = () => {
    setReloadKey((prevKey) => prevKey + 1); // Cambiar el valor del estado
  };

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await getAlumnos();
        if (response.data) {
          setAllAlumnosPicklist(
            response.data.map((alumno) => ({
              value: alumno.ci,
              label: alumno.nombre + " " + alumno.apellido,
            }))
          );
        }
      } catch (error) {
        window.alert(
          error.response?.data?.message
            ? error.response.data.message
            : error.message
        );
      }
    };

    const fetchEquipamientos = async () => {
      try {
        const response = await getEquipamientos();
        if (response.data) {
          console.log("getEquipamientos: ", response.data);
          setAllEquipamientosPicklist(
            response.data.map((equip) => {
              return {
                label: equip.descripcion,
                value: equip.id,
              };
            })
          );
        }
      } catch (error) {
        window.alert(
          error.response?.data?.message
            ? error.response.data.message
            : error.message
        );
      }
    };
    if (mode === "view") {
      fetchAlumnos();
      fetchEquipamientos();
    }
  }, []);

  const fields = [
    {
      name: "ci_instructor",
      label: "Instructor",
      type: "select",
      required: true,
      maxLength: 8,
      loadOptions: async () => {
        const response = await getInstructores();
        return response.data.map((instructor) => ({
          value: instructor.ci,
          label: instructor.nombre + " " + instructor.apellido,
        }));
      },
    },
    {
      name: "id_actividad",
      label: "Actividad",
      type: "select",
      required: true,
      maxLength: 15,
      loadOptions: async () => {
        const response = await getActividades();
        return response.data.map((actividad) => ({
          value: actividad.id,
          label: actividad.nombre,
        }));
      },
    },
    { name: "fecha", label: "Fecha", type: "date", required: true },
    {
      name: "id_turno",
      label: "Turno",
      type: "select",
      required: true,
      maxLength: 15,
      loadOptions: async () => {
        const response = await getTurnos();
        return response.data.map((turno) => ({
          value: turno.id,
          label: turno.hora_inicio + " - " + turno.hora_fin,
        }));
      },
    },
    { name: "dictada", label: "Dictada", type: "boolean" },
  ];

  const alumnoCols = [
    { field: "ci", headerName: "CI" },
    { field: "nombre", headerName: "Nombre" },
    { field: "apellido", headerName: "Apellido" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "20px",
        height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GenericDetails
          key={reloadKey}
          fetchItem={getClaseById}
          saveItem={(data, id) =>
            mode === "edit" ? updateClase(id, data) : addClase(data)
          }
          deleteItem={deleteClaseById}
          fields={fields}
          entityName="Clase"
          redirectPath="/clases"
        />
      </div>
      {mode === "view" && (
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          <GenericList
            fetchData={() => getAlumnosByClase(id)}
            baseColumns={alumnoCols}
            getRowId={(row) => row.ci}
            entityName="Alumnos Relacionados"
            viewPath="/alumno/view"
            isRelatedList={true}
            onRemove={(ci) => eliminarRelacionAlumno(ci, id)}
            height="50vh"
          />

          <div style={{ marginTop: "20px", width: "100%" }}>
            <Typography variant="h4" gutterBottom>
              Asignar alumno
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Autocomplete
                disablePortal
                options={allAlumnosPicklist}
                getOptionLabel={(option) => option.label || ""}
                sx={{ flex: "0 0 35%" }}
                required
                onChange={(event, newValue) => {
                  setSelectedAlumnoCi(newValue ? newValue.value : "");
                }}
                value={
                  allAlumnosPicklist.find(
                    (option) => option.value === selectedAlumnoCi
                  ) || null
                }
                renderInput={(params) => (
                  <TextField {...params} label="Alumno" variant="outlined" />
                )}
              />

              <Autocomplete
                disablePortal
                options={allEquipamientosPicklist}
                getOptionLabel={(option) => option.label || ""}
                sx={{ flex: "0 0 35%" }}
                onChange={(event, newValue) => {
                  setSelectedEquipamientoId(newValue ? newValue.value : "");
                }}
                value={
                  allEquipamientosPicklist.find(
                    (option) => option.value === selectedEquipamientoId
                  ) || null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Equipamiento"
                    variant="outlined"
                  />
                )}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={asignarAlumno}
                disabled={!selectedAlumnoCi}
                sx={{ flex: "0 0 25%", height: "56px" }}
              >
                Asignar alumno
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClaseDetails;
