import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { getAlumnos, deleteAlumnoByCi } from "../../api";
import { formatColumns } from "../Report/Report";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

function AlumnosList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAlumnoCi, setSelectedAlumnoCi] = useState(null);
  const navigate = useNavigate();

  const [alumnos, setAlumnos] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleEdit = (row) => {
    navigate(`/alumno/edit/${row.ci}`);
  };

  const handleView = (row) => {
    navigate(`/alumno/view/${row.ci}`);
  };

  const handleDelete = async () => {
    try {
      await deleteAlumnoByCi(selectedAlumnoCi);
      window.alert("Alumno eliminado correctamente");
      window.location.reload();
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error al eliminar el alumno";
      window.alert(errorMessage);
    } finally {
      setOpenDialog(false);
      setSelectedAlumnoCi(null);
    }
  };

  const handleNew = () => {
    navigate(`/alumno/create`);
  };

  useEffect(() => {
    const fetchAlumnos = async () => {
      const response = await getAlumnos();
      setAlumnos(response.data);
      const cols = formatColumns(response.data);

      const actionColumn = {
        field: "actions",
        headerName: "Acciones",
        width: 150,
        sortable: false,
        renderCell: (params) => (
          <div>
            <IconButton color="primary" onClick={() => handleView(params.row)}>
              <VisibilityIcon />
            </IconButton>
            <IconButton color="primary" onClick={() => handleEdit(params.row)}>
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => {
                setSelectedAlumnoCi(params.row.ci);
                setOpenDialog(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      };

      setColumns([...cols, actionColumn]);
    };
    fetchAlumnos();
  }, []);

  return (
    <div className="report_container">
      <div className="header">
        <h1 className="page-title">Alumnos</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNew}
          sx={{
            backgroundColor: "var(--ucu-primary-color)",
            color: "white",
            fontFamily: "var(--ucu-font-family)",
            margin: "10px",
          }}
        >
          Nuevo
        </Button>
      </div>
      <Paper
        sx={{ height: "80vh", width: "100%", margin: "0 auto" }}
        elevation={5}
      >
        <DataGrid
          rows={alumnos}
          columns={columns}
          sx={{ border: 0 }}
          getRowId={(row) => row.ci}
          autoPageSize
        />
      </Paper>
      <DeleteDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Confirmar"
        message="¿Estás seguro de que deseas eliminar este alumno?"
      />
    </div>
  );
}

export default AlumnosList;
