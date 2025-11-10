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
    <div className="avg-container">
      <h1>Formulario Alumno</h1>
      <input 
        placeholder="Nombre" 
        value={nombre} 
        onChange={e=>setNombre(e.target.value)} 
      />
      <input 
        placeholder="Apellido" 
        value={apellido} 
        onChange={e=>setApellido(e.target.value)} 
      />
      <input 
        placeholder="Libreta Universitaria" 
        value={libreta} 
        onChange={e=>setLibreta(e.target.value)} 
      />
      <button className="modern-btn" onClick={mostrarDatos}>Mostrar Datos</button>

      {datos && (
        <div className="resultado">
          <p><strong>Nombre:</strong> {datos.nombre}</p>
          <p><strong>Apellido:</strong> {datos.apellido}</p>
          <p><strong>Libreta:</strong> {datos.libreta}</p>
        </div>
      )}

    </div>
  );
}