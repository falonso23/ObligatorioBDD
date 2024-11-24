import React, { useState } from "react";
import { addInstructor } from "../../api";

export const InstructorForm = () => {
  const [instructor, setInstructor] = useState({
    ci: "",
    nombre: "",
    apellido: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addInstructor(instructor);
    alert("Instructor agregado!");
    setInstructor({ ci: "", nombre: "", apellido: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="CI"
        value={instructor.ci}
        onChange={(e) => setInstructor({ ...instructor, ci: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nombre"
        value={instructor.nombre}
        onChange={(e) =>
          setInstructor({ ...instructor, nombre: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Apellido"
        value={instructor.apellido}
        onChange={(e) =>
          setInstructor({ ...instructor, apellido: e.target.value })
        }
      />
      <button type="submit">Agregar Instructor</button>
    </form>
  );
};

export default InstructorForm;
