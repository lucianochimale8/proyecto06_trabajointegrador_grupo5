import React, { useState, useEffect } from 'react';
import '../../styles/App.css';

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
      <div className="Juego">
        <div className="container">
          <h1>Adivina el número</h1>
          <p>Ingresa un número entre 1 y 100.</p>
          <p>Cantidad de intentos: 0</p>
          <button onClick={iniciarJuego} className="btn-iniciar">
            Iniciar Juego
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="Juego">
      <div className="container">
        <h1>Adivina el número</h1>
        <p>Ingresa un número entre 1 y 100</p>
        <p>Cantidad de intentos: {intentos}</p>

        <input
          type="number"
          min="1"
          max="100"
          value={numeroUsuario}
          onChange={(e) => setNumeroUsuario(e.target.value)}
          placeholder="Ingresa tu número"
          className="input-numero"
          disabled={juegoTerminado}
        />

        <div className="botones">
          <button
            onClick={verificarNumero}
            className="btn-verificar"
            disabled={juegoTerminado}
          >
            Verificar
          </button>
          <button
            onClick={rendirse}
            className="btn-rendirse"
            disabled={juegoTerminado}
          >
            Me rindo
          </button>
        </div>

        {mensaje && <div className="mensaje">{mensaje}</div>}

        {juegoTerminado && (
          <div style={{ marginTop: '12px' }}>
            <button onClick={reiniciarJuego} className="btn-reiniciar">
              Volver al inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Juego;