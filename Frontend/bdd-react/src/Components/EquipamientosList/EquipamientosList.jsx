import React from "react";
import GenericList from "../GenericList/GenericList";
import { getEquipamientos, deleteEquipamientoById } from "../../api";

function EquipamientosList() {
  const columns = [
    { field: "id", headerName: "Id" },
    { field: "actividad", headerName: "Actividad" },
    { field: "descripcion", headerName: "Descripcion" },
    { field: "costo", headerName: "Costo" },
  ];

  return (
    <GenericList
      fetchData={getEquipamientos}
      deleteItem={deleteEquipamientoById}
      baseColumns={columns}
      getRowId={(row) => row.id}
      entityName="Equipamientos"
      createPath="/equipamiento/create"
      editPath="/equipamiento/edit"
      viewPath="/equipamiento/view"
    />
  );
}

export default EquipamientosList;
