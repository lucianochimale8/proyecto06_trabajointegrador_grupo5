import { useState } from "react";

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

    </div>
  );
}