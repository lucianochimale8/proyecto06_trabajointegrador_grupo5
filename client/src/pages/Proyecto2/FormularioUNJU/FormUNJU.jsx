import React, { useState } from "react";

export default function FormUNJU() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [libreta, setLibreta] = useState("");
  const [datos, setDatos] = useState(null);

  function mostrarDatos() {
    setDatos({ nombre: nombre.trim(), apellido: apellido.trim(), libreta: libreta.trim() });
  }

  return (
    <div className="formu-container">
      <h1>Formulario Alumno</h1>
      <label>Nombre</label>
      <input value={nombre} onChange={e=>setNombre(e.target.value)} />
      <label>Apellido</label>
      <input value={apellido} onChange={e=>setApellido(e.target.value)} />
      <label>Libreta Universitaria</label>
      <input value={libreta} onChange={e=>setLibreta(e.target.value)} />
      <button onClick={mostrarDatos}>Mostrar Datos</button>

      {datos && (
        <div className="datos">
          <p><strong>Nombre:</strong> {datos.nombre}</p>
          <p><strong>Apellido:</strong> {datos.apellido}</p>
          <p><strong>Libreta:</strong> {datos.libreta}</p>
        </div>
      )}

    </div>
  );
}