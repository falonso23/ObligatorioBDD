import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";

function RelatedList({ fetchData, columns, viewRoute }) {
  const [data, setData] = useState([]);
  const [finalColumns, setFinalColumns] = useState([]);
  const navigate = useNavigate();

  const handleView = (row) => {
    navigate(`${viewRoute}/${row.id}`);
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetchData();
        setData(response.data);

        // Agregar columna de acciones
        const actionColumn = {
          field: "actions",
          headerName: "Acciones",
          width: 100,
          sortable: false,
          renderCell: (params) => (
            <div>
              <IconButton color="primary" onClick={() => handleView(params.row)}>
                <VisibilityIcon />
              </IconButton>
            </div>
          ),
        };

        setFinalColumns([...columns, actionColumn]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, [fetchData, columns, viewRoute]);

  return (
    <Paper
      sx={{ height: "80vh", width: "100%", margin: "0 auto" }}
      elevation={5}
    >
      <DataGrid
        rows={data}
        columns={finalColumns}
        sx={{ border: 0 }}
        getRowId={(row) => row.id ? row.id : row.ci} 
        autoPageSize
      />
    </Paper>
  );
}

export default RelatedList;
