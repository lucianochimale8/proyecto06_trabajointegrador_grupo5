import { useEffect, useRef, useState } from "react";
import Estrella from "./Star.jsx";
import "../../../styles/Estrella.css";
import sonidoEstrella from "../../../assets/audio/sonidoEstrella.mp3";
import sonidoVictoria from "../../../assets/audio/victoria.mp3";

const TIEMPO_APARICION = 5000; // 5 segundos
const TIEMPO_VIDA = 10000; // 10 segundos de vida
const PUNTOS_GANAR = 10; // Terminar al captar 10 estrellas
const AREA_SEGURA_TOP = 100; // Área superior donde no aparecen estrellas (para el contador)

export default function Estrellas() {
  const [estrellas, setEstrellas] = useState([]);
  const [puntos, setPuntos] = useState(0);
  const [estadoJuego, setEstadoJuego] = useState("inicio");

  const sonidoEstrellaRef = useRef(null);
  const sonidoVictoriaRef = useRef(null);

  useEffect(() => {
    sonidoEstrellaRef.current = new Audio(sonidoEstrella);
    sonidoEstrellaRef.current.volume = 0.5;
    
    sonidoVictoriaRef.current = new Audio(sonidoVictoria);
    sonidoVictoriaRef.current.volume = 0.6;
  }, []);

  const intervaloRef = useRef(null);
  const timeoutsRef = useRef(new Map());
  const contenedorRef = useRef(null);

  const atraparEstrella = (id) => {
    // sonido al atrapar estrelas
    if (sonidoEstrellaRef.current) {
      sonidoEstrellaRef.current.currentTime = 0;
      sonidoEstrellaRef.current.play().catch(error => {
        console.log("Error al reproducir sonido:", error);
      });
    }

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
        // sonido de victoria cuando se gana
        if (sonidoVictoriaRef.current) {
          sonidoVictoriaRef.current.currentTime = 0;
          sonidoVictoriaRef.current.play().catch(error => {
            console.log("Error al reproducir sonido de victoria:", error);
          });
        }
      }
      return nuevosPuntos;
    });
  };

  // nueva estrella
  const crearEstrella = () => {
    if (!contenedorRef.current) return;
    const medidas = contenedorRef.current.getBoundingClientRect();

    // Asegurar que no aparezca en el área del contador (superior izquierda)
    const minTop = AREA_SEGURA_TOP;
    const maxTop = medidas.height - 60;
    const top = Math.random() * (maxTop - minTop) + minTop;

    const nuevaEstrella = {
      id: Date.now() + Math.random(),
      left: Math.random() * (medidas.width - 60) + "px",
      top: top + "px",
      size: Math.random() * 30 + 25, // Tamaños diferentes entre 25 y 55
      color: "#ffffff", // Siempre blanco
    };

    setEstrellas((prev) => [...prev, nuevaEstrella]);

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
          <div className="puntaje-estrellas">
            <i className="fas fa-star"></i> {puntos}/{PUNTOS_GANAR}
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
            <button className="modern-btn" onClick={iniciarJuego} style={{
              marginTop: "20px",
              fontSize: "1.2rem",
              padding: "15px 30px"
            }}>
              <i className="fas fa-play me-2"></i> Iniciar Juego
            </button>
          </div>
        )}

        {estadoJuego === "ganaste" && (
          <div className="pantalla-ganar">
            <div className="contenedor-resultados">
              <div className="resultado-total">
                <h2>¡Felicidades! ¡Has ganado!</h2>
                <p>Estrellas capturadas: {puntos}/{PUNTOS_GANAR}</p>
                <p className="porcentaje">
                  {Math.round((puntos / PUNTOS_GANAR) * 100)}% completado
                </p>
              </div>
              <button className="boton-reiniciar" onClick={iniciarJuego}>
                Jugar de Nuevo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}