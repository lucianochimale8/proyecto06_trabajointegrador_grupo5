import { useEffect, useRef, useState } from 'react';
import '../../../styles/colores.css';
import sonidoCorrecto from "../../../assets/audio/correct.mp3";
import sonidoError from "../../../assets/audio/gameover.mp3";
import sonidoNextLevel from "../../../assets/audio/next-level-m.mp3";
import sonidoGanar from "../../../assets/audio/win.mp3";

// Juego 3: Números (nivel 1) y Días de la semana (nivel 2)
export default function NumbersDays() {
  // datasets
  const numeros = [
    { espanol: 'uno', english: 'one' },
    { espanol: 'dos', english: 'two' },
    { espanol: 'tres', english: 'three' },
    { espanol: 'cuatro', english: 'four' },
    { espanol: 'cinco', english: 'five' },
    { espanol: 'seis', english: 'six' },
    { espanol: 'siete', english: 'seven' },
    { espanol: 'ocho', english: 'eight' },
    { espanol: 'nueve', english: 'nine' },
    { espanol: 'diez', english: 'ten' },
  ];
  const dias = [
    { espanol: 'lunes', english: 'monday' },
    { espanol: 'martes', english: 'tuesday' },
    { espanol: 'miércoles', english: 'wednesday' },
    { espanol: 'jueves', english: 'thursday' },
    { espanol: 'viernes', english: 'friday' },
    { espanol: 'sábado', english: 'saturday' },
    { espanol: 'domingo', english: 'sunday' },
  ];

  // sonidos
  const sonidoCorrectoRef = useRef(null);
  const sonidoErrorRef = useRef(null);
  const sonidoNextLevelRef = useRef(null);
  const sonidoGanarRef = useRef(null);

  useEffect(() => {
    sonidoCorrectoRef.current = new Audio(sonidoCorrecto);
    sonidoCorrectoRef.current.volume = 0.5;
    sonidoCorrectoRef.current.preload = 'auto';

    sonidoErrorRef.current = new Audio(sonidoError);
    sonidoErrorRef.current.volume = 0.5;
    sonidoErrorRef.current.preload = 'auto';

    sonidoNextLevelRef.current = new Audio(sonidoNextLevel);
    sonidoNextLevelRef.current.volume = 0.6;
    sonidoNextLevelRef.current.preload = 'auto';

    sonidoGanarRef.current = new Audio(sonidoGanar);
    sonidoGanarRef.current.volume = 0.6;
    sonidoGanarRef.current.preload = 'auto';
  }, []);

  const reproducirSonido = (ref) => {
    if (ref && ref.current) {
      try {
        if (ref.current.currentTime > 0) {
          ref.current.currentTime = 0;
        }
        const p = ref.current.play();
        if (p && p.catch) {
          p.catch((err) => {
            if (err?.name !== 'NotAllowedError' && err?.name !== 'NotSupportedError') {
              try {
                ref.current.load();
                ref.current.currentTime = 0;
                ref.current.play().catch(() => {});
              } catch {}
            }
          });
        }
      } catch {}
    }
  };

  // estado de juego
  const [nivel, setNivel] = useState(1); // 1: números, 2: días
  const [objetivo, setObjetivo] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [aciertos, setAciertos] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [botonSeleccionado, setBotonSeleccionado] = useState(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [juegoActivo, setJuegoActivo] = useState(true);
  const [aciertosNivel1, setAciertosNivel1] = useState(0);
  const [aciertosNivel2, setAciertosNivel2] = useState(0);
  const MAX_ACIERTOS = 5;

  // generar ronda
  const datasetActual = nivel === 1 ? numeros : dias;
  const generarRonda = () => {
    const indice = Math.floor(Math.random() * datasetActual.length);
    const objetivoNuevo = datasetActual[indice];
    setObjetivo(objetivoNuevo);
    const opcionesAleatorias = [...datasetActual].sort(() => Math.random() - 0.5).slice(0, 3);
    if (!opcionesAleatorias.find(o => o.english === objetivoNuevo.english)) {
      opcionesAleatorias[0] = objetivoNuevo;
    }
    const mezcladas = [...opcionesAleatorias].sort(() => Math.random() - 0.5);
    setOpciones(mezcladas);
    setMensaje('');
    setBotonSeleccionado(null);
    setRespuestaCorrecta(null);
  };

  useEffect(() => {
    generarRonda();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nivel]);

  const manejarRespuesta = (opcion, idx) => {
    if (!juegoActivo) return;
    if (botonSeleccionado !== null) return;
    const esCorrecto = opcion.english === objetivo.english;
    setBotonSeleccionado(idx);
    setRespuestaCorrecta(esCorrecto);
    if (esCorrecto) {
      reproducirSonido(sonidoCorrectoRef);
      const nuevos = aciertos + 1;
      setAciertos(nuevos);
      setMensaje('¡Correcto!');
      if (nuevos >= MAX_ACIERTOS) {
        if (nivel === 1) {
          // pasar a nivel 2
          setTimeout(() => {
            reproducirSonido(sonidoNextLevelRef);
            setNivel(2);
            setAciertosNivel1(nuevos);
            setAciertos(0);
            setBotonSeleccionado(null);
            setRespuestaCorrecta(null);
          }, 1200);
        } else {
          // ganar
          setJuegoActivo(false);
          setAciertosNivel2(nuevos);
          setTimeout(() => {
            reproducirSonido(sonidoGanarRef);
          }, 400);
        }
      } else {
        setTimeout(() => generarRonda(), 1200);
      }
    } else {
      reproducirSonido(sonidoErrorRef);
      setMensaje('¡Intenta de nuevo!');
      setTimeout(() => generarRonda(), 1200);
    }
  };

  const tituloPrincipal = nivel === 1 ? 'Ejercicio de números' : 'Ejercicio de días';
  const subtitulo = nivel === 1 ? 'Elige la palabra en inglés' : 'Elige el nombre en inglés';
  const textoObjetivo = objetivo?.espanol;

  return (
    <div className="juego-colores">
      {juegoActivo ? (
        <>
          <div className="encabezado-juego numbers-header">
            <h1>{tituloPrincipal}</h1>
            <p className="about-subtitle">{subtitulo}</p>
            <div className="puntaje">Aciertos: {aciertos}/{MAX_ACIERTOS}</div>
          </div>

          <div className="contenedor-juego">
            <div className="area-pregunta">
              <h2 className="palabra-color" style={{ textTransform: 'capitalize' }}>
                {textoObjetivo}
              </h2>
            </div>

            <div className="area-opciones">
              {opciones.map((op, i) => (
                <button
                  key={i}
                  className={`boton-opcion ${botonSeleccionado === i ? (respuestaCorrecta ? 'boton-correcto' : 'boton-incorrecto') : ''}`}
                  onClick={() => manejarRespuesta(op, i)}
                >
                  <span className="opcion-texto" style={{ textTransform: 'capitalize' }}>
                    {op.english}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="contenedor-mensaje" aria-live="polite">
            {mensaje && (
              <div className={`mensaje ${respuestaCorrecta ? 'mensaje-correcto' : 'mensaje-incorrecto'}`}>
                {mensaje}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="contenedor-resultados">
          <div className="resultado-total">
            <h2>¡Resultados!</h2>
            <p>Ejercicio de números: {aciertosNivel1}/{MAX_ACIERTOS}</p>
            <p>Ejercicio de días: {aciertosNivel2}/{MAX_ACIERTOS}</p>
            <p className="porcentaje">
              {Math.round(((aciertosNivel1 + aciertosNivel2) / (2 * MAX_ACIERTOS)) * 100)}% completado
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


