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

const formatColumnName = (name) => {
	return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const formatColumns = (data) => {
	const colNames = Object.keys(data[0]).sort((a,b) => a > b ? 1 : -1);
	const columns = colNames.map(name => {return {field: name, headerName: formatColumnName(name), flex: 1}})
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
  }, [id]);

  if (!selectedReport) {
    return <h1>Reporte no encontrado</h1>;
  }

  return (
    <div className="report_container">
      <div className="report_title">
        <h1>{selectedReport.name}</h1>
      </div>
      <Paper sx={{ height: "80vh", width: '100%', margin: "0 auto" }}  elevation={5} >
      <DataGrid
        rows={reportData}
        columns={columns}
        sx={{ border: 0 }}
		getRowId={(row) => row.id ? row.id : row.ci} 
		autoPageSize	
      />
    </Paper>
    </div>
  );
};

export default Report;
