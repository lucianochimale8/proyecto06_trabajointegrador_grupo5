import { useState, useEffect } from 'react';

//estructura basica
function Juego() {
  const [numeroAleatorio, setNumeroAleatorio] = useState(0);
  const [numeroUsuario, setNumeroUsuario] = useState('');
  const [intentos, setIntentos] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [mostrarInicio, setMostrarInicio] = useState(true);

  const generarNumeroAleatorio = () => {
    const numero = Math.floor(Math.random() * 100) + 1;
    setNumeroAleatorio(numero);
  };
  
  //generar el numero dsps de hacer click en Iniciar juego
  useEffect(() => {
    if (!mostrarInicio) {
      const numero = Math.floor(Math.random() * 100) + 1;
      setNumeroAleatorio(numero);
      setNumeroUsuario('');
      setIntentos(0);
      setMensaje('');
      setJuegoTerminado(false);
    }
  }, [mostrarInicio]);

  useEffect(() => {
    if (numeroUsuario === '') return;

    const parsed = parseInt(numeroUsuario, 10);
    if (isNaN(parsed)) {
      setNumeroUsuario('');
      return;
    }
    if (parsed > 100) setNumeroUsuario('100');
    if (parsed < 1) setNumeroUsuario('1');
  }, [numeroUsuario]);

  //reinicia
  const iniciarJuego = () => {
    setMostrarInicio(false);
    setNumeroUsuario('');
    setIntentos(0);
    setMensaje('');
    setJuegoTerminado(false);
    generarNumeroAleatorio();
  };

  //verifica el numero
  const verificarNumero = () => {
    if (juegoTerminado) return;

    const numero = parseInt(numeroUsuario, 10);
    if (isNaN(numero)) {
      setMensaje('Por favor ingresá un número válido.');
      return;
    }
    if (numero < 1 || numero > 100) {
      setMensaje('El número debe ser entre 1 y 100.');
      return;
    }

    setIntentos(prev => prev + 1);

    if (numero === numeroAleatorio) {
      setMensaje(`¡Felicidades! Adivinaste el número en ${intentos + 1} intentos.`);
      setJuegoTerminado(true);
    } else if (numero < numeroAleatorio) {
      setMensaje(`El número ${numero} es muy bajo. Intenta con uno más alto.`);
    } else {
      setMensaje(`El número ${numero} es muy alto. Intenta con uno más bajo.`);
    }
  };

  //rendirse ñam :3
  const rendirse = () => {
    setMensaje(`Te rendiste. El número era ${numeroAleatorio}.`);
    setJuegoTerminado(true);
  };

  //vuelve a iniciar
  const reiniciarJuego = () => {
    setMostrarInicio(true);
    setNumeroUsuario('');
    setIntentos(0);
    setMensaje('');
    setJuegoTerminado(false);
    setNumeroAleatorio(0);
  };

  if (mostrarInicio) {
    return (
      <div className="avg-container">
        <h1>Adivina el número</h1>
        <p style={{
          fontFamily: "'KG Candy Cane Stripe', cursive",
          color: "var(--kawaii-brown)",
          fontSize: "1.1rem",
          margin: "10px 0"
        }}>Ingresa un número entre 1 y 100.</p>
        <p style={{
          fontFamily: "'KG Candy Cane Stripe', cursive",
          color: "var(--kawaii-brown)",
          fontSize: "1rem",
          margin: "10px 0"
        }}>Cantidad de intentos: 0</p>
        <button onClick={iniciarJuego} className="modern-btn">
          Iniciar Juego
        </button>
      </div>
    );
  }

  return (
    <div className="avg-container">
      <h1>Adivina el número</h1>
      <p style={{
        fontFamily: "'KG Candy Cane Stripe', cursive",
        color: "var(--kawaii-brown)",
        fontSize: "1.1rem",
        margin: "10px 0"
      }}>Ingresa un número entre 1 y 100</p>
      <p style={{
        fontFamily: "'KG Candy Cane Stripe', cursive",
        color: "var(--kawaii-brown)",
        fontSize: "1rem",
        margin: "10px 0"
      }}>Cantidad de intentos: {intentos}</p>

      <input
        type="number"
        min="1"
        max="100"
        value={numeroUsuario}
        onChange={(e) => setNumeroUsuario(e.target.value)}
        placeholder="Ingresa tu número"
        disabled={juegoTerminado}
        style={{
          opacity: juegoTerminado ? 0.6 : 1,
          cursor: juegoTerminado ? "not-allowed" : "text"
        }}
      />

      <div style={{ 
        display: "flex", 
        gap: "10px", 
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "15px"
      }}>
        <button
          onClick={verificarNumero}
          className="modern-btn"
          disabled={juegoTerminado}
          style={{
            opacity: juegoTerminado ? 0.6 : 1,
            cursor: juegoTerminado ? "not-allowed" : "pointer"
          }}
        >
          Verificar
        </button>
        <button
          onClick={rendirse}
          className="modern-btn"
          disabled={juegoTerminado}
          style={{
            background: "var(--kawaii-green)",
            color: "var(--kawaii-brown)",
            opacity: juegoTerminado ? 0.6 : 1,
            cursor: juegoTerminado ? "not-allowed" : "pointer"
          }}
        >
          Me rindo
        </button>
      </div>

      {mensaje && <div className="resultado" style={{
        marginTop: "20px",
        textAlign: "center"
      }}>{mensaje}</div>}

      {juegoTerminado && (
        <div style={{ marginTop: '20px', textAlign: "center" }}>
          <button onClick={reiniciarJuego} className="modern-btn">
            Volver al inicio
          </button>
        </div>
      )}
    </div>
  );
}

export default Juego;