import React from "react";
import GenericList from "../GenericList/GenericList";
import { getInstructores, deleteInstructorByCi } from "../../api";

function InstructoresList() {
  const columns = [
    { field: "ci", headerName: "CI" },
    { field: "nombre", headerName: "Nombre" },
    { field: "apellido", headerName: "Apellido" },
  ];

  return (
    <GenericList
      fetchData={getInstructores}
      deleteItem={deleteInstructorByCi}
      baseColumns={columns}
      getRowId={(row) => row.ci}
      entityName="Instructores"
      createPath="/instructor/create"
      editPath="/instructor/edit"
      viewPath="/instructor/view"
    />
  );
}

export default InstructoresList;
