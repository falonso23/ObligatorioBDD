import React from "react";
import GenericDetails from "../GenericDetails/GenericDetails";
import { useParams } from "react-router-dom";

import {
  getInstructorByCi,
  addInstructor,
  updateInstructor,
  deleteInstructorByCi
} from "../../api";

function InstructorDetails() {
  const { mode, id } = useParams();

  const fields = [
    { name: "ci", label: "CI", type: "number", required: true, disabled: mode !== "create", maxLength: 8},
    { name: "nombre", label: "Nombre", required: true, maxLength: 20 },
    { name: "apellido", label: "Apellido", required: true, maxLength: 20 }  
  ];

  return (
    <GenericDetails
      fetchItem={getInstructorByCi}
      saveItem={(data, ci) =>  mode === "edit" ? updateInstructor(ci, data) : addInstructor(data)}
      deleteItem={deleteInstructorByCi}
      fields={fields}
      entityName="Instructor"
      redirectPath="/instructores"
    />
  );
}

export default InstructorDetails;
