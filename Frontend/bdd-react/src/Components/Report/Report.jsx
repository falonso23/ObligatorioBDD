import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Report.css";

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

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

const paginationModel = { page: 0, pageSize: 5 };

const formaColumnName = (name) => {
	return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const formatColumns = (data) => {
	const colNames = Object.keys(data[0]).sort((a,b) => a > b ? 1 : -1);
	const columns = colNames.map(name => {return {field: name, headerName: formaColumnName(name), flex: 1}})
	return columns;
}

const Report = () => {
  const { id } = useParams();
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (ReportsList.find((r) => r.id == id)) {
        const report = ReportsList.find((r) => r.id == id);
        setSelectedReport(report);

        const fetchReport = async () => {
        const response = await report.fetchFunct();
        setReportData(response.data);
        const cols = formatColumns(response.data);
		setColumns(cols)
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
    <div className="report_container">
      <div className="report_title">
        <h1>{selectedReport.name}</h1>
      </div>
      <Paper sx={{ height: "80vh", width: '90%', margin: "0 auto" }}>
      <DataGrid
        rows={reportData}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10]}
        sx={{ border: 0 }}
		getRowId={(row) => row.id ? row.id : row.ci} 
      />
    </Paper>
    </div>
  );
};

export default Report;
