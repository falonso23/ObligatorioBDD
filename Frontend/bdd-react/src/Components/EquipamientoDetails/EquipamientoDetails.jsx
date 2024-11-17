import React from "react";
import GenericDetails from "../GenericDetails/GenericDetails";
import { useParams } from "react-router-dom";

import {
  getEquipamientoByCi,
  addEquipamiento,
  updateEquipamiento,
  deleteEquipamientoById
} from "../../api";

function EquipamientoDetails() {
  const { mode, id } = useParams();

  const fields = [
    { name: "actividad", label: "Actividad", required: true, maxLength: 20 },
    { name: "descripcion", label: "Descripcion", multiLine: true, maxLength: 200 },
    { name: "costo", label: "Costo", maxLength: 9 }
  ];

  return (
    <GenericDetails
      fetchItem={getEquipamientoByCi}
      saveItem={(data, ci) =>  mode === "edit" ? updateEquipamiento(ci, data) : addEquipamiento(data)}
      deleteItem={deleteEquipamientoById}
      fields={fields}
      entityName="Equipamiento"
      redirectPath="/equipamientos"
    />
  );
}

export default EquipamientoDetails;
