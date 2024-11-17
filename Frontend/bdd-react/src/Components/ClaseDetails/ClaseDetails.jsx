import React from "react";
import GenericDetails from "../GenericDetails/GenericDetails";
import { useParams } from "react-router-dom";

import {
  getClaseById,
  addClase,
  updateClase,
  deleteClaseById,
} from "../../api";

function ClaseDetails() {
  const { mode, id } = useParams();
  console.log("Mode: ", mode, id)

  const fields = [
    { name: "instructor", label: "Instructor", required: true },
    { name: "actividad", label: "Actividad", required: true },
    { name: "turno", label: "Turno", required: true },
    { name: "dictada", label: "Dictada", required: true, type:"boolean" },
    { name: "fecha", label: "Fecha", type: "date" },
  ];

  return (
    <GenericDetails
      fetchItem={getClaseById}
      saveItem={(data, id) => {

        console.log('Save Item:', id, data);
        return mode === "edit" ? updateClase(id, data) : addClase(data)
      }
      }
      deleteItem={deleteClaseById}
      fields={fields}
      entityName="Clase"
      redirectPath="/clases"
    />
  );
}

export default ClaseDetails;
