import React, { useEffect, useState } from "react";
import GenericDetails from "../GenericDetails/GenericDetails";
import { useParams } from "react-router-dom";
import image_placeholder from "../../assets/image_placeholder.jpg";

import { getActivityImageUrlById, getActividadById } from "../../api";

function ActividadDetails() {
  const { mode, id } = useParams();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await getActivityImageUrlById(id);
        if (response.data) {
          setImageUrl(response.data);
        } else {
          setImageUrl(image_placeholder);
        }
      } catch (error) {
        setImageUrl(image_placeholder);
      }
    };
    fetchUrl();
  }, [id]);

  const fields = [
    { name: "nombre", label: "Nombre" },
    { name: "descripcion", label: "Descripción", multiline: true },
    { name: "costo", label: "Costo", type: "number" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GenericDetails
          fetchItem={getActividadById}
          fields={fields}
          entityName="Actividad"
          redirectPath="/actividades"
          isViewOnly={true}
        />
      </div>

      <div
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={imageUrl}
          alt="Actividad"
          style={{
            maxWidth: "100%",
            maxHeight: "400px",
            borderRadius: "8px",
            objectFit: "cover",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>
    </div>
  );
}

export default ActividadDetails;
