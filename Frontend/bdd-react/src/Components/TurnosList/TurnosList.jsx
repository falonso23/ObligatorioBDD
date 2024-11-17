import React from "react";
import GenericList from "../GenericList/GenericList";
import { getTurnos } from "../../api";

function TurnosList() {
  const columns = [
    { field: "id", headerName: "Id"},
    { field: "hora_inicio", headerName: "Hora Inicio"},
    { field: "hora_fin", headerName: "Hora fin"}
  ];

  return (
    <GenericList
      fetchData={getTurnos}
      baseColumns={columns}
      getRowId={(row) => row.id}
      entityName="Turnos"
      createPath="/turno/create"
      editPath="/turno/edit"
      viewPath="/turno/view"
      isViewOnly={true}
    />
  );
}

export default TurnosList;
