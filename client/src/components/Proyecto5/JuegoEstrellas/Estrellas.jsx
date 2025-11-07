import { useEffect, useRef, useState } from "react";
import Estrella from "./Star.jsx";
import "../../../styles/Estrella.css";

const COLORES_ESTRELLAS = ["#ffffff", "#87ceeb", "#b0e0e6", "#e6e6fa", "#d8bfd8", "#f8f9ff"];
const TIEMPO_APARICION = 700;
const TIEMPO_VIDA = 4500;
const MAX_ESTRELLAS = 4;

export default function Estrellas() {
  const [estrellas, setEstrellas] = useState([]);
  const [puntos, setPuntos] = useState(0);
  const [estadoJuego, setEstadoJuego] = useState("inicio");
  const PUNTOS_GANAR = 15;

  const intervaloRef = useRef(null);
  const timeoutsRef = useRef(new Map());
  const contenedorRef = useRef(null);

  const atraparEstrella = (id) => {
    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }
    setEstrellas((prev) => prev.filter((s) => s.id !== id));
    setPuntos((p) => {
      const nuevosPuntos = p + 1;
      if (nuevosPuntos >= PUNTOS_GANAR) {
        setEstadoJuego("ganaste");
      }
      return nuevosPuntos;
    });
  };

  // nueva estrella
  const crearEstrella = () => {
    if (!contenedorRef.current) return;
    const medidas = contenedorRef.current.getBoundingClientRect();

    const nuevaEstrella = {
      id: Date.now() + Math.random(),
      left: Math.random() * (medidas.width - 60) + "px",
      top: Math.random() * (medidas.height - 60) + "px",
      size: Math.random() * 30 + 22,
      color: COLORES_ESTRELLAS[Math.floor(Math.random() * COLORES_ESTRELLAS.length)],
    };

    setEstrellas((prev) => {
      if (prev.length >= MAX_ESTRELLAS) {
        const nuevasEstrellas = [];
        for (let i = 1; i < prev.length; i++) {
          nuevasEstrellas.push(prev[i]);
        }
        nuevasEstrellas.push(nuevaEstrella);
        return nuevasEstrellas;
      } else {
        const nuevasEstrellas = [];
        for (let i = 0; i < prev.length; i++) {
          nuevasEstrellas.push(prev[i]);
        }
        nuevasEstrellas.push(nuevaEstrella);
        return nuevasEstrellas;
      }
    });

    // temporizador de vida de la estrella
    const timeoutId = setTimeout(() => {
      setEstrellas((prev) => prev.filter((s) => s.id !== nuevaEstrella.id));
      timeoutsRef.current.delete(nuevaEstrella.id);
    }, TIEMPO_VIDA);

    timeoutsRef.current.set(nuevaEstrella.id, timeoutId);
  };

  // funcion para inicar el juego
  const iniciarJuego = () => {
    setPuntos(0);
    setEstrellas([]);
    setEstadoJuego("jugando");
  };

  useEffect(() => {
    if (estadoJuego === "jugando") {
      intervaloRef.current = setInterval(crearEstrella, TIEMPO_APARICION);
    }

    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
      for (const t of timeoutsRef.current.values()) clearTimeout(t);
      timeoutsRef.current.clear();
    };
  }, [estadoJuego]);

  return (
    <div className="estrellas-container">
      <div ref={contenedorRef} className="game-container">
        {estadoJuego === "jugando" && (
          <div className="puntaje">
            <i className="fas fa-star me-2"></i> {puntos}
          </div>
        )}

        {estadoJuego === "jugando" &&
          estrellas.map((estrella) => (
            <Estrella 
              key={estrella.id} 
              estrella={estrella} 
              onAtrapar={atraparEstrella} 
            />
          ))}

        {estadoJuego === "inicio" && (
          <div className="pantalla-inicio">
            <h1 className="titulo-juego">¡Atrapa las Estrellas!</h1>
            <p className="instrucciones">
              Haz clic en las estrellas que aparezcan para ganar puntos
            </p>
            <button className="boton-juego" onClick={iniciarJuego}>
              <i className="fas fa-play me-2"></i> Iniciar Juego
            </button>
          </div>
        )}

        {estadoJuego === "ganaste" && (
          <div className="pantalla-ganar">
            <h2 className="titulo-ganar">¡Ganaste!</h2>
            <p className="puntos-finales">Puntuación final: {puntos}</p>
            <button className="boton-juego" onClick={iniciarJuego}>
              <i className="fas fa-redo me-2"></i> Jugar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}