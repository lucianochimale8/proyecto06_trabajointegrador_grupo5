import { useState } from "react";

export default function MaxNumber() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [mensaje, setMensaje] = useState("");

  function calcular() {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      setMensaje("Por favor ingresa dos números válidos.");
      return;
    }
    if (a > b) setMensaje(`Es mayor ${a} que ${b}`);
    else if (b > a) setMensaje(`Es mayor ${b} que ${a}`);
    else setMensaje("Los números son iguales");
  }

  return (
    <div className="avg-container">
      <h1>Calcular número mayor</h1>
      <input type="number" placeholder="Número 1" value={num1} onChange={e=>setNum1(e.target.value)} />
      <input type="number" placeholder="Número 2" value={num2} onChange={e=>setNum2(e.target.value)} />
      <button className="modern-btn" onClick={calcular}>Calcular</button>
      {mensaje && <div className="resultado">{mensaje}</div>}

    </div>
  );
}