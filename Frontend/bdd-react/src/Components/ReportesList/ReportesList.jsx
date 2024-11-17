import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid2";

import { ReportsList } from "../Report/Report";


function ReportesList() {
    const navigate = useNavigate();

    const handleClickReport = (id) => {
        navigate(`/report/${id}`);
      };
  return (
    <div>
      <h1 className="page-title">REPORTES</h1>
      <Grid container spacing={3} justifyContent="center">
        {ReportsList.map((report) => (
          <Grid item xs={12} key={report.id}>
            <Card
              sx={{ width: 345 }}
              onClick={() => handleClickReport(report.id)}
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant="body1" component="div">
                    {report.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ReportesList;
