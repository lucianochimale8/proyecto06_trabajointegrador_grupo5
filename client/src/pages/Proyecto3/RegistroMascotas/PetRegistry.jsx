import React, { useState } from "react";

export default function PetRegistry() {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [edad, setEdad] = useState("");
  const [duenio, setDuenio] = useState("");
  const [vacunada, setVacunada] = useState("si");
  const [mascotas, setMascotas] = useState([]);

  function registrar(e) {
    e.preventDefault();
    if (!nombre.trim() || !tipo || edad === "" || !duenio.trim()) return;
    const m = { nombre: nombre.trim(), tipo, edad: Number(edad), duenio: duenio.trim(), vacunada: vacunada === "si" };
    setMascotas(prev => [m, ...prev]);
    setNombre(""); setTipo(""); setEdad(""); setDuenio(""); setVacunada("si");
  }

  function eliminar(index) {
    setMascotas(prev => prev.filter((_,i)=>i!==index));
  }

  const vacunadas = mascotas.filter(m=>m.vacunada).length;
  const noVac = mascotas.length - vacunadas;

  return (
    <div className="avg-container">
      <h1>Registro de Mascotas</h1>
      <form onSubmit={registrar} style={{marginBottom: "30px"}}>
        <input placeholder="Nombre mascota" value={nombre} onChange={e=>setNombre(e.target.value)} />
        <select 
          value={tipo} 
          onChange={e=>setTipo(e.target.value)}
        >
          <option value="">Tipo...</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          <option value="Conejo">Conejo</option>
          <option value="Pájaro">Pájaro</option>
          <option value="Otro">Otro</option>
        </select>
        <input type="number" placeholder="Edad (años)" value={edad} onChange={e=>setEdad(e.target.value)} />
        <input placeholder="Nombre del dueño" value={duenio} onChange={e=>setDuenio(e.target.value)} />
        <div style={{
          margin: "15px 0",
          padding: "15px",
          background: "var(--kawaii-blue)",
          borderRadius: "12px",
          border: "2px solid rgba(139,69,19,0.06)",
          textAlign: "center"
        }}>
          <h2 style={{
            fontFamily: "'Roundabout', cursive",
            color: "var(--kawaii-brown)",
            fontSize: "1.2rem",
            marginBottom: "10px",
            textAlign: "center"
          }}>¿Su mascota ha sido vacunada?</h2>
          <label style={{
            display: "inline-block",
            marginRight: "20px",
            fontFamily: "'KG Candy Cane Stripe', cursive",
            color: "var(--kawaii-brown)",
            cursor: "pointer"
          }}>
            <input 
              type="radio" 
              name="vac" 
              value="si" 
              checked={vacunada==="si"} 
              onChange={e=>setVacunada(e.target.value)}
              style={{marginRight: "5px", cursor: "pointer"}}
            /> Sí
          </label>
          <label style={{
            display: "inline-block",
            fontFamily: "'KG Candy Cane Stripe', cursive",
            color: "var(--kawaii-brown)",
            cursor: "pointer"
          }}>
            <input 
              type="radio" 
              name="vac" 
              value="no" 
              checked={vacunada==="no"} 
              onChange={e=>setVacunada(e.target.value)}
              style={{marginRight: "5px", cursor: "pointer"}}
            /> No
          </label>
        </div>
        <button type="submit" className="modern-btn">Registrar Mascota</button>
      </form>

      <section style={{marginTop: "30px", textAlign: "center"}}>
        <h2 style={{
          fontFamily: "'Roundabout', cursive",
          color: "var(--kawaii-brown)",
          marginBottom: "20px",
          textAlign: "center"
        }}>Mascotas Registradas</h2>
        {mascotas.length === 0 && <p style={{
          fontFamily: "'KG Candy Cane Stripe', cursive",
          color: "var(--kawaii-brown)",
          padding: "15px",
          background: "var(--kawaii-yellow)",
          borderRadius: "12px",
          border: "2px solid rgba(139,69,19,0.06)"
        }}>No hay mascotas registradas aún.</p>}
        {mascotas.map((m, i) => (
          <div key={i} style={{
            background: "var(--kawaii-yellow)",
            borderRadius: "12px",
            border: "2px solid rgba(139,69,19,0.06)",
            padding: "15px",
            marginBottom: "15px",
            textAlign: "center"
          }}>
            <div style={{
              fontFamily: "'Roundabout', cursive",
              color: "var(--kawaii-brown)",
              fontSize: "1.3rem",
              fontWeight: "bold",
              marginBottom: "10px",
              textAlign: "center"
            }}>{m.nombre}</div>
            <div style={{
              fontFamily: "'KG Candy Cane Stripe', cursive",
              color: "var(--kawaii-brown)",
              marginBottom: "10px",
              textAlign: "center"
            }}>
              <p style={{margin: "5px 0", textAlign: "center"}}><strong>Tipo:</strong> {m.tipo}</p>
              <p style={{margin: "5px 0", textAlign: "center"}}><strong>Edad:</strong> {m.edad} años</p>
              <p style={{margin: "5px 0", textAlign: "center"}}><strong>Dueño:</strong> {m.duenio}</p>
              <p style={{margin: "5px 0", textAlign: "center"}}><strong>Estado:</strong> {m.vacunada ? "Vacunada" : "No vacunada"}</p>
            </div>
            <button 
              onClick={()=>eliminar(i)} 
              className="modern-btn"
              style={{
                background: "var(--kawaii-pink)",
                fontSize: "0.9rem",
                padding: "8px 16px"
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
        {mascotas.length > 0 && (
          <div className="resultado" style={{marginTop: "20px"}}>
            <h3 style={{
              fontFamily: "'Roundabout', cursive",
              color: "var(--kawaii-brown)",
              marginBottom: "10px",
              marginTop: "0"
            }}>Resumen</h3>
            <p style={{margin: "0"}}>Total: {mascotas.length} — Vacunadas: {vacunadas} — No vacunadas: {noVac}</p>
          </div>
        )}
      </section>

    </div>
  );
}