import React, { useState, useEffect } from "react";

export default function CasillasActivity() {
  // indices: a1,a2,a3,b1,b2,b3,c1,c2,c3
  const initial = { a1:"", a2:"", a3:"", b1:"", b2:"", b3:"", c1:"", c2:"", c3:"" };
  const [cells, setCells] = useState(initial);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // recalcula cada vez que cambia
    calcularX();
  }, [cells]);

  function onChange(id, value) {
    setCells(prev => ({...prev, [id]: value}));
  }

  function calcularX() {
    setMensaje("");
    // contar X's
    const keys = Object.keys(cells);
    const xs = keys.filter(k => (cells[k]||"").toString().toLowerCase() === "x");
    if (xs.length === 0) return; // nada que hacer
    if (xs.length > 1) { setMensaje("Por ahora solo se detecta una única X."); return; }

    const xKey = xs[0];
    // mapeo de columnas: col1 = a1,b1,c1 ; col2 = a2,b2,c2 ; col3 = a3,b3,c3
    const colMap = { a1:1,b1:1,c1:1, a2:2,b2:2,c2:2, a3:3,b3:3,c3:3 };
    const col = colMap[xKey];
    const colKeys = keys.filter(k => colMap[k] === col);
    // obtener valores numéricos de las otras dos celdas
    const others = colKeys.filter(k => k !== xKey);
    const nums = [];
    for (const k of others) {
      const v = cells[k].toString().trim();
      if (v === "") continue;
      const n = Number(v);
      if (!Number.isNaN(n)) nums.push(n);
    }
    if (nums.length < 2) { setMensaje("Se necesitan 2 números en la columna para calcular X (actualmente faltan)."); return; }
    // regla: X = suma de las otras dos celdas (implementación razonable)
    const valorX = nums.reduce((s,n) => s + n, 0);
    setCells(prev => ({...prev, [xKey]: String(valorX)}));
    setMensaje(`X calculada en ${xKey} = ${valorX} (suma de la columna).`);
  }

  function handleKey(e) {
    if (e.key === "Enter") calcularX();
  }

  return (
    <div className="cas-container" onKeyDown={handleKey}>
      <h1>Actividad Casillas</h1>
      <div className="grid">
        {["a1","a2","a3","b1","b2","b3","c1","c2","c3"].map(id => (
          <input
            key={id}
            value={cells[id]}
            onChange={e=>onChange(id, e.target.value)}
            placeholder={id}
          />
        ))}
      </div>
      <div className="mensaje">{mensaje}</div>

      <style>{`
        .cas-container{text-align:center;padding:18px;font-family:Arial}
        .grid{display:grid;grid-template-columns:repeat(3,90px);gap:8px;justify-content:center;margin:10px auto}
        input{width:80px;height:58px;text-align:center;font-size:18px;border-radius:8px;border:2px solid #333}
        .mensaje{margin-top:12px;color:#1f4f7a;font-weight:600}
      `}</style>
    </div>
  );
}