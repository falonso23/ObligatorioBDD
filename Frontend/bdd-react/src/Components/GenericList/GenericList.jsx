import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

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
  isViewOnly = false,
  isRelatedList = false,
  onRemove,
  height = "80vh",
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (row) => {
    if (!isViewOnly) {
      navigate(`${editPath}/${getRowId(row)}`);
    }
  };

  const handleView = (row) => {
    navigate(`${viewPath}/${getRowId(row)}`);
  };

  const handleRemove = async (row) => {
    await onRemove(getRowId(row));
  };

  const handleDelete = async () => {
    if (!isViewOnly) {
      try {
        await deleteItem(selectedItemId);
        window.alert(`${entityName} eliminado correctamente`);
        setRows((prev) =>
          prev.filter((item) => getRowId(item) !== selectedItemId)
        );
      } catch (error) {
        window.alert(
          error.response?.data?.message
            ? error.response.data.message
            : error.message
        );
      } finally {
        setOpenDialog(false);
        setSelectedItemId(null);
      }
    }
  };

  const handleNew = () => {
    if (!isViewOnly) {
      navigate(createPath);
    }
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
              <IconButton
                color="primary"
                onClick={() => handleView(params.row)}
              >
                <VisibilityIcon />
              </IconButton>
              {isRelatedList && (
                <IconButton
                  color="error"
                  onClick={() => handleRemove(params.row)}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              )}
              {/* Botones estándar solo fuera de modo "related list" */}
              {!isRelatedList && !isViewOnly && (
                <>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(params.row)}
                  >
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
                </>
              )}
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
  }, [fetchData, baseColumns, entityName, getRowId, isViewOnly, isRelatedList]);

  return (
    <div className="report_container">
      <div className="header">
        {isRelatedList && (
          <Typography variant="h4" gutterBottom>
            {entityName}
          </Typography>
        )}
        {!isRelatedList && <h1 className="page-title">{entityName}</h1>}
        {!isViewOnly && !isRelatedList && (
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
        )}
      </div>
      <Paper sx={{ height, width: "100%", margin: "0 auto" }} elevation={5}>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{ border: 0 }}
          getRowId={getRowId}
          autoPageSize
        />
      </Paper>
      {!isViewOnly && !isRelatedList && (
        <DeleteDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={handleDelete}
          title="Confirmar"
          message={`¿Estás seguro de que deseas eliminar este ${entityName.toLowerCase()}?`}
        />
      )}
    </div>
  );
}

export default GenericList;
