import { useState } from "react";

export default function CalculadorX() {
  const [casilla, setCasilla] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]);
  const [resultado, setResultado] = useState("");

  const actualizarCasilla = (fila, columna, valor) => {
    if (valor.length > 1) return;
    valor = valor.toUpperCase();
    if (valor !== "" && valor !== "X" && isNaN(valor)) return;

    const nueva = casilla.map((f, i) =>
      f.map((c, j) => (i === fila && j === columna ? valor : c))
    );
    setCasilla(nueva);
    setResultado("");
  };

  const calcularX = () => {
  const nueva = casilla.map((fila) => [...fila]);
    let filaX = -1;
    let colX = -1;
    let valorX = null;

    // buscar la posición de X
    casilla.forEach((fila, i) => {
      fila.forEach((valor, j) => {
        if (valor === "X") {
          filaX = i;
          colX = j;
        }
      });
    });

    // si no hay X, completa la última fila automáticamente
    if (filaX === -1 || colX === -1) {
      // completar fila C (suma de A + B)
      for (let j = 0; j < 3; j++) {
        const a = Number(nueva[0][j]);
        const b = Number(nueva[1][j]);
        if (!isNaN(a) && !isNaN(b) && nueva[2][j] === "") {
          nueva[2][j] = String(a + b);
        }
      }
      setCasilla(nueva);
      setResultado("Fila C completada automáticamente");
      return;
    }

    // calcular X
    if (filaX === 2 && colX !== -1) {
      const a = Number(nueva[0][colX]);
      const b = Number(nueva[1][colX]);
      if (!isNaN(a) && !isNaN(b)) {
        valorX = a + b;
        nueva[2][colX] = "X";
      }
    } else if (filaX === 1 && colX !== -1) {
      const a = Number(nueva[0][colX]);
      const c = Number(nueva[2][colX]);
      if (!isNaN(a) && !isNaN(c)) {
        valorX = c - a;
        nueva[1][colX] = "X";
      }
    } else if (filaX === 0 && colX !== -1) {
      const b = Number(nueva[1][colX]);
      const c = Number(nueva[2][colX]);
      if (!isNaN(b) && !isNaN(c)) {
        valorX = c - b;
        nueva[0][colX] = "X";
      }
    }

    // completa automáticamente la última si faltan digitos
    for (let j = 0; j < 3; j++) {
      const a = Number(nueva[0][j]);
      const b = Number(nueva[1][j]);
      if (!isNaN(a) && !isNaN(b) && nueva[2][j] === "") {
        nueva[2][j] = String(a + b);
      }
    }

    if (valorX !== null) {
      setCasilla(nueva);
      setResultado(`El valor de X es: ${valorX}`);
    } else {
      setCasilla(nueva);
      setResultado("Fila completada automáticamente");
    }
  };

  const limpiar = () => {
    setCasilla([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]);
    setResultado("");
  };

  return (
    <div className="avg-container">
      <h1>Valor de X</h1>
      {/* tabla 3x3 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 80px)",
        gridTemplateRows: "repeat(3, 80px)",
        gap: "10px",
        justifyContent: "center",
        margin: "30px auto"
      }}>
        {casilla.map((fila, i) =>
          fila.map((valor, j) => (
            <input
              key={`${i}-${j}`}
              type="text"
              value={valor}
              maxLength={1}
              onChange={(e) => actualizarCasilla(i, j, e.target.value)}
              style={{
                width: "70px",
                height: "70px",
                textAlign: "center",
                fontSize: "24px",
                border: "3px solid rgba(139,69,19,0.06)",
                borderRadius: "12px",
                background: "var(--kawaii-yellow)",
                fontFamily: "'KG Candy Cane Stripe', cursive",
                color: "var(--kawaii-brown)",
                fontWeight: "bold"
              }}
            />
          ))
        )}
      </div>

      {/* resultado */}
      {resultado && (
        <div className="resultado" style={{
          fontSize: "1.1rem",
          fontWeight: "900",
          textAlign: "center"
        }}>
          {resultado}
        </div>
      )}

      {/* botones */}
      <div style={{ 
        marginTop: "20px", 
        display: "flex", 
        gap: "10px", 
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        <button 
          onClick={calcularX}
          className="modern-btn"
        >
          Calcular X
        </button>
        <button 
          onClick={limpiar}
          className="modern-btn"
          style={{
            background: "var(--kawaii-green)",
            color: "var(--kawaii-brown)"
          }}
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}