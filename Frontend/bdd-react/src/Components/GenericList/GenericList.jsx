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

import DeleteDialog from "../DeleteDialog/DeleteDialog";

function GenericList({
  fetchData,
  deleteItem,
  baseColumns,
  getRowId,
  entityName,
  createPath,
  editPath,
  viewPath,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (row) => {
    navigate(`${editPath}/${ getRowId(row)}`);
  };

  const handleView = (row) => {
    navigate(`${viewPath}/${ getRowId(row)}`);
  };

  const handleDelete = async () => {
    try {
      await deleteItem(selectedItemId);
      window.alert(`${entityName} eliminado correctamente`);
      setRows((prev) => prev.filter((item) => getRowId(item) !== selectedItemId));
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || `Error al eliminar ${entityName}`;
      window.alert(errorMessage);
    } finally {
      setOpenDialog(false);
      setSelectedItemId(null);
    }
  };

  const handleNew = () => {
    navigate(createPath);
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetchData();
        setRows(response.data);

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
                  setSelectedItemId(getRowId(params.row));
                  setOpenDialog(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ),
        };

        const adaptableColumns = baseColumns.map((col) => ({
          ...col,
          flex: 1,
        }));

        setColumns([...adaptableColumns, actionColumn]);
      } catch (error) {
        console.error(`Error fetching ${entityName}:`, error);
      }
    };
    fetchDataAsync();
  }, [fetchData, baseColumns, entityName, getRowId]);

  return (
    <div className="report_container">
      <div className="header">
        <h1 className="page-title">{entityName}</h1>
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
          rows={rows}
          columns={columns}
          sx={{ border: 0 }}
          getRowId={getRowId}
          autoPageSize
        />
      </Paper>
      <DeleteDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Confirmar"
        message={`¿Estás seguro de que deseas eliminar este ${entityName.toLowerCase()}?`}
      />
    </div>
  );
}

export default GenericList;
