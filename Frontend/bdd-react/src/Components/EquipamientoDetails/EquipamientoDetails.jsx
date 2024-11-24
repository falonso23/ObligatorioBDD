import React from "react";
import GenericDetails from "../GenericDetails/GenericDetails";
import { useParams } from "react-router-dom";

import {
  getEquipamientoById,
  addEquipamiento,
  updateEquipamiento,
  deleteEquipamientoById,
  getActividades,
} from "../../api";

function EquipamientoDetails() {
  const { mode, id } = useParams();

  const fields = [
    {
      name: "id_actividad",
      label: "Actividad",
      type: "select",
      loadOptions: async () => {
        const response = await getActividades();
        return response.data.map((actividad) => ({
          value: actividad.id,
          label: actividad.nombre,
        }));
      },
      required: true,
      maxLength: 15,
    },
    {
      name: "descripcion",
      label: "Descripción",
      multiline: true,
      maxLength: 200,
    },
    { name: "costo", label: "Costo", type: "number", maxLength: 9 },
  ];

  return (
    <GenericDetails
      fetchItem={getEquipamientoById}
      saveItem={(data, ci) =>
        mode === "edit" ? updateEquipamiento(ci, data) : addEquipamiento(data)
      }
      deleteItem={deleteEquipamientoById}
      fields={fields}
      entityName="Equipamiento"
      redirectPath="/equipamientos"
    />
  );
}

export default EquipamientoDetails;
