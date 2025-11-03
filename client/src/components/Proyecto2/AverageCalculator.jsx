import React, { useState } from "react";

export default function AverageCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [resultado, setResultado] = useState(null);

  function calcularPromedio() {
    const na = Number(a), nb = Number(b), nc = Number(c);
    if ([na, nb, nc].some(n => Number.isNaN(n))) {
      setResultado("Ingresa tres números válidos.");
      return;
    }
    const prom = (na + nb + nc) / 3;
    setResultado(`El promedio de ${na}, ${nb} y ${nc} es: ${prom}`);
  }

  return (
    <div className="avg-container">
      <h1>Calculador de Promedio</h1>
      <input placeholder="Número A" value={a} onChange={e=>setA(e.target.value)} />
      <input placeholder="Número B" value={b} onChange={e=>setB(e.target.value)} />
      <input placeholder="Número C" value={c} onChange={e=>setC(e.target.value)} />
      <button onClick={calcularPromedio}>Calcular promedio</button>
      {resultado && <div className="resultado">{resultado}</div>}

      <style>{`
        .avg-container{text-align:center;padding:18px;font-family:Inter}
        input{display:block;margin:8px auto;padding:8px;width:260px;border-radius:6px;border:1px solid #bbb}
        button{margin-top:10px;padding:10px 18px;border-radius:8px;border:none;background:#222;color:#fff;cursor:pointer}
        .resultado{margin-top:12px;font-weight:700}
      `}</style>
    </div>
  );
}