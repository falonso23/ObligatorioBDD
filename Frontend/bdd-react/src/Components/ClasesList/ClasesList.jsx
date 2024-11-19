import React from "react";
import GenericList from "../GenericList/GenericList";
import { getClases, deleteClaseById } from "../../api";

function ClasesList() {
  const columns = [
    { field: "id", headerName: "Id" },
    { field: "instructor", headerName: "Instructor"},
    { field: "actividad", headerName: "Actividad"},
    { field: "fecha", headerName: "Fecha"},
    { field: "turno", headerName: "Turno"},
    { field: "dictada", headerName: "Dictada"}
  ];

  return (
    <GenericList
      fetchData={getClases}
      deleteItem={deleteClaseById}
      baseColumns={columns}
      getRowId={(row) => row.id}
      entityName="Clases"
      createPath="/clase/create"
      editPath="/clase/edit"
      viewPath="/clase/view"
    />
  );
}

export default ClasesList;
