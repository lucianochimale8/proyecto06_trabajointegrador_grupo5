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
    <div className="pet-container">
      <h1>Registro de Mascotas</h1>
      <form onSubmit={registrar} className="form">
        <input placeholder="Nombre mascota" value={nombre} onChange={e=>setNombre(e.target.value)} />
        <select value={tipo} onChange={e=>setTipo(e.target.value)}>
          <option value="">Tipo...</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          <option value="Conejo">Conejo</option>
          <option value="Pájaro">Pájaro</option>
          <option value="Otro">Otro</option>
        </select>
        <input type="number" placeholder="Edad (años)" value={edad} onChange={e=>setEdad(e.target.value)} />
        <input placeholder="Nombre del dueño" value={duenio} onChange={e=>setDuenio(e.target.value)} />
        <div className="radios">
          <label><input type="radio" name="vac" value="si" checked={vacunada==="si"} onChange={e=>setVacunada(e.target.value)} /> Sí</label>
          <label><input type="radio" name="vac" value="no" checked={vacunada==="no"} onChange={e=>setVacunada(e.target.value)} /> No</label>
        </div>
        <button type="submit">Registrar Mascota</button>
      </form>

      <section className="list">
        <h2>Mascotas Registradas</h2>
        {mascotas.length === 0 && <p>No hay mascotas registradas aún.</p>}
        {mascotas.map((m, i) => (
          <div key={i} className="card">
            <div className="titulo">{m.nombre}</div>
            <div className="info"><p><strong>Tipo:</strong> {m.tipo}</p><p><strong>Edad:</strong> {m.edad}</p><p><strong>Dueño:</strong> {m.duenio}</p><p><strong>Estado:</strong> {m.vacunada ? "Vacunada" : "No vacunada"}</p></div>
            <button onClick={()=>eliminar(i)} className="del">Eliminar</button>
          </div>
        ))}
        {mascotas.length > 0 && (
          <div className="stats">
            <h3>Resumen</h3>
            <p>Total: {mascotas.length} — Vacunadas: {vacunadas} — No vacunadas: {noVac}</p>
          </div>
        )}
      </section>

      <style>{`
        .pet-container{font-family:Comfortaa,Arial;padding:18px;max-width:900px;margin:0 auto}
        form{display:flex;flex-direction:column;gap:8px;background:#fff;padding:12px;border-radius:10px}
        input,select{padding:8px;border-radius:8px;border:1px solid #ddd}
        .radios{display:flex;gap:12px;align-items:center}
        button{padding:10px;border-radius:10px;border:none;background:linear-gradient(135deg,#ffd700,#ffb347);font-weight:700;cursor:pointer}
        .list{margin-top:16px}
        .card{display:flex;justify-content:space-between;align-items:center;padding:12px;border-radius:12px;background:rgba(255,255,255,0.9);box-shadow:0 8px 20px rgba(0,0,0,0.06);margin-bottom:10px}
        .titulo{font-weight:700;color:#a855f7}
        .del{background:#ff6b6b;color:white;padding:8px 12px;border-radius:8px;border:none;cursor:pointer}
        .stats{margin-top:12px;padding:10px;background:#f7f3ff;border-radius:10px}
      `}</style>
    </div>
  );
}