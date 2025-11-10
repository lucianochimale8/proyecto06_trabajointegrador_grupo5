import { useEffect, useRef, useState } from "react";
import Estrella from "./Star.jsx";
import "../../../styles/Estrella.css";
import sonidoEstrella from "../../../assets/audio/sonidoEstrella.mp3";
import sonidoVictoria from "../../../assets/audio/victoria.mp3";

const TIEMPO_APARICION = 1500; // 1.5 segundos (más rápido)
const TIEMPO_VIDA = 2000; // 2 segundos de vida
const PUNTOS_GANAR = 10; // Terminar al captar 10 estrellas
const AREA_SEGURA_TOP = 100; // Área superior donde no aparecen estrellas (para el contador)
const MIN_DISTANCIA_ENTRE_ESTRELLAS = 320; // Distancia mínima entre estrellas del mismo lote
const ESTRELLAS_POR_LOTE = 3; // cantidad de estrellas por aparición

export default function Estrellas() {
  const [estrellas, setEstrellas] = useState([]);
  const [puntos, setPuntos] = useState(0);
  const [estadoJuego, setEstadoJuego] = useState("inicio");

  const sonidoEstrellaRef = useRef(null);
  const sonidoVictoriaRef = useRef(null);

  useEffect(() => {
    sonidoEstrellaRef.current = new Audio(sonidoEstrella);
    sonidoEstrellaRef.current.volume = 0.5;
    sonidoEstrellaRef.current.preload = "auto";
    
    sonidoVictoriaRef.current = new Audio(sonidoVictoria);
    sonidoVictoriaRef.current.volume = 0.6;
    sonidoVictoriaRef.current.preload = "auto";
  }, []);

  const intervaloRef = useRef(null);
  const timeoutsRef = useRef(new Map());
  const contenedorRef = useRef(null);
  const ultimaPosicionRef = useRef(null);

  const atraparEstrella = (id) => {
    // sonido al atrapar estrelas
    if (sonidoEstrellaRef.current) {
      sonidoEstrellaRef.current.currentTime = 0;
      sonidoEstrellaRef.current.play().catch(error => {
        console.log("Error al reproducir sonido:", error);
      });
    }

    // detener expiración programada si existía
    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }

    // marcar fade-out y eliminar tras animación corta
    setEstrellas((prev) => prev.map((s) => (s.id === id ? { ...s, fadingOut: true } : s)));
    setTimeout(() => {
      setEstrellas((prev) => prev.filter((s) => s.id !== id));
    }, 250);

    // sumar puntos y chequear victoria
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

  // crear lote de N estrellas bien separadas entre sí
  const crearLoteEstrellas = () => {
    if (!contenedorRef.current) return;
    const width = contenedorRef.current.clientWidth;
    const height = contenedorRef.current.clientHeight;

    const margen = 30; // margen para no pegarse a bordes
    const minLeft = margen;
    const maxLeft = Math.max(margen, width - 60);
    const minTop = margen;
    const maxTop = Math.max(margen, height - 60);

    // Evitar solaparse con el marcador de puntaje (arriba-izquierda)
    const evitaMarcador = (x, y) => {
      const anchoMarcador = 180; // aprox ancho del badge
      const altoMarcador = 80;   // aprox alto del badge
      return !(x < anchoMarcador && y < altoMarcador);
    };

    const candidatas = [];

    // posiciones actuales ya renderizadas, para evitar amontonamiento con lotes anteriores
    const existentesGlobales = estrellas.map((e) => ({
      leftPx: typeof e.left === "string" ? parseFloat(e.left) : e.left,
      topPx: typeof e.top === "string" ? parseFloat(e.top) : e.top,
    }));

    const esValida = (x, y, existentesLote) => {
      for (const e of existentesLote) {
        const dx = x - e.leftPx;
        const dy = y - e.topPx;
        const d = Math.hypot(dx, dy);
        if (d < MIN_DISTANCIA_ENTRE_ESTRELLAS) return false;
      }
      // Evitar proximidad con estrellas de lotes anteriores
      for (const e of existentesGlobales) {
        const dx = x - e.leftPx;
        const dy = y - e.topPx;
        const d = Math.hypot(dx, dy);
        if (d < MIN_DISTANCIA_ENTRE_ESTRELLAS) return false;
      }
      return true;
    };

    const generarPosicion = (existentesLote) => {
      // intentar varias veces para encontrar posiciones separadas
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * (maxLeft - minLeft) + minLeft;
        const y = Math.random() * (maxTop - minTop) + minTop;
        if (evitaMarcador(x, y) && esValida(x, y, existentesLote)) {
          return { leftPx: x, topPx: y };
        }
      }
      return null;
    };

    // generar hasta ESTRELLAS_POR_LOTE posiciones separadas entre sí
    while (candidatas.length < ESTRELLAS_POR_LOTE) {
      const pos = generarPosicion(candidatas);
      if (!pos) break;
      candidatas.push(pos);
    }

    if (candidatas.length === 0) return;

    const nuevas = candidatas.map((pos) => {
      return {
        id: Date.now() + Math.random(),
        left: pos.leftPx + "px",
        top: pos.topPx + "px",
        size: Math.random() * 30 + 25,
        color: "#ffffff",
        fadingOut: false,
      };
    });

    setEstrellas((prev) => [...prev, ...nuevas]);

    // programar expiración de cada estrella
    nuevas.forEach((estrella) => {
      const timeoutId = setTimeout(() => {
        // marcar para animación de salida y eliminar luego de la animación
        setEstrellas((prev) =>
          prev.map((s) => (s.id === estrella.id ? { ...s, fadingOut: true } : s))
        );
        const removeId = setTimeout(() => {
          setEstrellas((prev) => prev.filter((s) => s.id !== estrella.id));
          timeoutsRef.current.delete(estrella.id);
        }, 400); // coincide con la duración de la animación de salida
        // reemplazar el timeout trackeado por el de eliminación final
        timeoutsRef.current.set(estrella.id, removeId);
      }, TIEMPO_VIDA);
      timeoutsRef.current.set(estrella.id, timeoutId);
    });
  };

  // funcion para inicar el juego
  const iniciarJuego = () => {
    setPuntos(0);
    setEstrellas([]);
    setEstadoJuego("jugando");
    ultimaPosicionRef.current = null;
    // desbloquear audio con gesto de usuario (play/pause silencioso)
    try {
      if (sonidoEstrellaRef.current) {
        const prev = sonidoEstrellaRef.current.volume;
        sonidoEstrellaRef.current.volume = 0;
        const p = sonidoEstrellaRef.current.play();
        if (p && typeof p.then === "function") {
          p.then(() => {
            sonidoEstrellaRef.current.pause();
            sonidoEstrellaRef.current.currentTime = 0;
            sonidoEstrellaRef.current.volume = prev;
          }).catch(() => {
            sonidoEstrellaRef.current.volume = prev;
          });
        } else {
          sonidoEstrellaRef.current.pause();
          sonidoEstrellaRef.current.currentTime = 0;
          sonidoEstrellaRef.current.volume = prev;
        }
      }
      if (sonidoVictoriaRef.current) {
        const prevV = sonidoVictoriaRef.current.volume;
        sonidoVictoriaRef.current.volume = 0;
        const pv = sonidoVictoriaRef.current.play();
        if (pv && typeof pv.then === "function") {
          pv.then(() => {
            sonidoVictoriaRef.current.pause();
            sonidoVictoriaRef.current.currentTime = 0;
            sonidoVictoriaRef.current.volume = prevV;
          }).catch(() => {
            sonidoVictoriaRef.current.volume = prevV;
          });
        } else {
          sonidoVictoriaRef.current.pause();
          sonidoVictoriaRef.current.currentTime = 0;
          sonidoVictoriaRef.current.volume = prevV;
        }
      }
    } catch {}
    // lote inicial inmediato
    setTimeout(() => crearLoteEstrellas(), 0);
  };

  useEffect(() => {
    if (estadoJuego === "jugando") {
      intervaloRef.current = setInterval(crearLoteEstrellas, TIEMPO_APARICION);
    }

    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
      for (const t of timeoutsRef.current.values()) clearTimeout(t);
      timeoutsRef.current.clear();
    };
  }, [estadoJuego]);

  return (
    <div className="estrellas-container">
      <div
        ref={contenedorRef}
        className={`game-container ${estadoJuego === "inicio" ? "inicio" : ""}`}
      >
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