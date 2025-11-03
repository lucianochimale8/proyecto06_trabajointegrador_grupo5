import React, { useState } from "react";

export default function SalarySimulator() {
  const [nombre, setNombre] = useState("");
  const [horas, setHoras] = useState("");
  const [pagoHora, setPagoHora] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  function calcularPago() {
    setError("");
    const h = parseFloat(horas);
    const p = parseFloat(pagoHora);
    if (!nombre.trim() || Number.isNaN(h) || Number.isNaN(p)) {
      setError("Completa todos los campos correctamente.");
      setResultado(null);
      return;
    }
    let salario = h * p;
    if (h > 160) salario *= 1.2; // bono 20%
    setResultado(`${nombre}, tu salario mensual es: $${salario.toFixed(2)}`);
  }

  return (
    <div className="sim-container">
      <h1>Simulador de Salario Mensual</h1>

      <div className="form">
        <label>Nombre</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label>Horas trabajadas por mes</label>
        <input
          type="number"
          value={horas}
          onChange={(e) => setHoras(e.target.value)}
        />

        <label>Pago por hora</label>
        <input
          type="number"
          value={pagoHora}
          onChange={(e) => setPagoHora(e.target.value)}
        />

        <button onClick={calcularPago}>Calcular Pago</button>

        {error && <div className="error">{error}</div>}
        {resultado && <div className="resultado">{resultado}</div>}
      </div>

      <style>{`
        .sim-container{font-family: Inter, system-ui; text-align:center; padding:20px;}
        .form{max-width:420px;margin:12px auto;background:#fff;padding:20px;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,0.08)}
        label{display:block;margin-top:10px;font-weight:600;color:#4a2335}
        input{width:100%;padding:8px;margin-top:6px;border-radius:6px;border:1px solid #ccc}
        button{margin-top:12px;width:100%;padding:10px;border-radius:8px;border:none;background:linear-gradient(135deg,#bd4aa0,#cc6a93);color:#fff;font-weight:700;cursor:pointer}
        .resultado{margin-top:14px;color:#1b7a3a;font-weight:700}
        .error{margin-top:14px;color:#c0392b;font-weight:600}
      `}</style>
    </div>
  );
}