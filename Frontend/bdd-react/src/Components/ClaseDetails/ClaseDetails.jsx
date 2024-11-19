import React from "react";
import GenericDetails from "../GenericDetails/GenericDetails";
import { useParams } from "react-router-dom";

import {
  getClaseById,
  addClase,
  updateClase,
  deleteClaseById,
  getInstructores,
  getActividades, 
  getTurnos,      
} from "../../api";

function ClaseDetails() {
  const { mode, id } = useParams();

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
    { name: "fecha", label: "Fecha", type: "date", required:true },
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

  return (
    <GenericDetails
      fetchItem={getClaseById}
      saveItem={(data, id) =>
        mode === "edit" ? updateClase(id, data) : addClase(data)
      }
      deleteItem={deleteClaseById}
      fields={fields}
      entityName="Clase"
      redirectPath="/clases"
    />
  );
}

export default ClaseDetails;
