import React, { useState } from "react";

export default function ReplaceQuestionMarks() {
  const [input, setInput] = useState("");
  const [salida, setSalida] = useState("");

  function procesar() {
    const s = input.trim();
    if (!s) { setSalida("Por favor ingresa una cadena."); return; }

    for (let i=0;i<s.length;i++){
      const ch = s[i];
      if (ch !== '?' && (ch < '0' || ch > '4')) {
        setSalida('Solo se permiten dígitos del 0 al 4 y signos de pregunta');
        return;
      }
    }

    // lógica: cada '?' se reemplaza por la suma de los dígitos vecinos (si existen)
    let resultado = "";
    for (let i=0;i<s.length;i++){
      if (s[i] === '?') {
        let suma = 0;
        if (i>0 && s[i-1] >= '0' && s[i-1] <= '4') suma += parseInt(s[i-1]);
        if (i<s.length-1 && s[i+1] >= '0' && s[i+1] <= '4') suma += parseInt(s[i+1]);
        resultado += suma.toString();
      } else resultado += s[i];
    }
    setSalida(resultado);
  }

  return (
    <div className="q-container">
      <h1>Reemplazar signos de pregunta</h1>
      <input placeholder="Ej: 1?4?34?" value={input} onKeyDown={e=>{ if(e.key==='Enter') procesar();}} onChange={e=>setInput(e.target.value)} />
      <button onClick={procesar}>Procesar</button>
      <div className="result-box">{salida || "Esperando entrada..."}</div>

      <style>{`
        .q-container{font-family:Segoe UI;padding:18px;text-align:center}
        input{width:320px;padding:8px;border-radius:8px;border:1px solid #ddd}
        button{margin-left:8px;padding:8px 12px;border-radius:8px;border:none;background:linear-gradient(45deg,#ff6b9d,#ff8fab);color:white}
        .result-box{margin-top:12px;padding:12px;background:#f8f9fa;border-radius:8px;font-family:monospace}
      `}</style>
    </div>
  );
}