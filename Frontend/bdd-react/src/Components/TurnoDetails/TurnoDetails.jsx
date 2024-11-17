import React from "react";
import GenericDetails from "../GenericDetails/GenericDetails";
import { useParams } from "react-router-dom";

import {
  getTurnoById
} from "../../api";

function TurnoDetails() {
  const { mode, id } = useParams();

  const fields = [
    { name: "hora_inicio", label: "Hora de inicio", type: "time" },
    { name: "hora_fin", label: "Hora de fin", type: "time" },
  ];

  return (
    <GenericDetails
      fetchItem={getTurnoById}
      fields={fields}
      entityName="Turno"
      redirectPath="/turnos"
      isViewOnly={true}
    />
  );
}

export default TurnoDetails;
