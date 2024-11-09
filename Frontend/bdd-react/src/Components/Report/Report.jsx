import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Report.css";

import {
  getReportActividadIngresos,
  getReportActividadAlumnos,
  getReportTurnosConMasClases,
} from "../../api";

export const ReportsList = [
  {
    id: 0,
    name: "Actividades con mayores ingresos",
    fetchFunct: getReportActividadIngresos,
  },
  {
    id: 1,
    name: "Actividades con más alumnos",
    fetchFunct: getReportActividadAlumnos,
  },
  {
    id: 2,
    name: "Turnos con más clases dictadas",
    fetchFunct: getReportTurnosConMasClases,
  },
];

const Report = () => {
  const { id } = useParams();
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    if (ReportsList.find((r) => r.id == id)) {
        const report = ReportsList.find((r) => r.id == id);
        setSelectedReport(report);

        const fetchReport = async () => {
        const response = await report.fetchFunct();
        setReportData(response.data);
      };
      fetchReport();
    } else {
      console.error("Invalid report ID");
    }
  }, [id]); // Incluye `id` en las dependencias para actualizar cuando cambie

  if (!selectedReport) {
    return <h1>Reporte no encontrado</h1>;
  }

  return (
    <div>
      <div className="report_title">
        <h1>{selectedReport.name}</h1>
      </div>
      <pre>{JSON.stringify(reportData, null, 2)}</pre>{" "}
    </div>
  );
};

export default Report;
