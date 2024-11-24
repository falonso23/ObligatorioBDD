import React from "react";
import GenericDetails from "../GenericDetails/GenericDetails";
import { useParams } from "react-router-dom";

import {
  getAlumnoByCi,
  addAlumno,
  updateAlumno,
  deleteAlumnoByCi,
} from "../../api";

function AlumnoDetails() {
  const { mode, id } = useParams();
  console.log("Mode: ", mode, id);

  const fields = [
    {
      name: "ci",
      label: "CI",
      type: "number",
      required: true,
      disabled: mode !== "create",
      maxLength: 8,
    },
    { name: "nombre", label: "Nombre", required: true, maxLength: 20 },
    { name: "apellido", label: "Apellido", required: true, maxLength: 20 },
    {
      name: "telefono_contacto",
      label: "Teléfono de Contacto",
      type: "number",
      maxLength: 9,
    },
    { name: "fecha_nacimiento", label: "Fecha de Nacimiento", type: "date" },
  ];

  return (
    <GenericDetails
      fetchItem={getAlumnoByCi}
      saveItem={(data, ci) =>
        mode === "edit" ? updateAlumno(ci, data) : addAlumno(data)
      }
      deleteItem={deleteAlumnoByCi}
      fields={fields}
      entityName="Alumno"
      redirectPath="/alumnos"
    />
  );
}

export default AlumnoDetails;
