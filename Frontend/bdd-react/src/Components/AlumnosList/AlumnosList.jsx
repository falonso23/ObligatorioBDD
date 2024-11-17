import React from "react";
import GenericList from "../GenericList/GenericList";
import { getAlumnos, deleteAlumnoByCi } from "../../api";

function AlumnosList() {
  const columns = [
    { field: "ci", headerName: "CI" },
    { field: "nombre", headerName: "Nombre"},
    { field: "apellido", headerName: "Apellido"},
  ];

  return (
    <GenericList
      fetchData={getAlumnos}
      deleteItem={deleteAlumnoByCi}
      baseColumns={columns}
      getRowId={(row) => row.ci}
      entityName="Alumnos"
      createPath="/alumno/create"
      editPath="/alumno/edit"
      viewPath="/alumno/view"
    />
  );
}

export default AlumnosList;
