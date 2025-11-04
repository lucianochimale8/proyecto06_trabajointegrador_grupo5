import React, { useEffect, useRef, useState } from "react";
import { iniciarIntervalo } from "../../data/TiempoIntervalo.js";
import Star from "./Star.jsx";
import useSound from "use-sound";

import sonidoEstrella from "../../assets/audio/sonidoEstrella.mp3";
import sonidoVictoria from "../../assets/audio/victoria.mp3";

const STAR_COLORS = ["#ffffff", "#87ceeb", "#b0e0e6", "#e6e6fa", "#d8bfd8", "#f8f9ff"];
const SPAWN_INTERVAL_MS = 600;
const STAR_LIFESPAN_MS = 2500;
const MAX_STARS = 3;
const SCORE_TO_WIN = 10;

export default function Estrellas() {
  const [stars, setStars] = useState([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("inicio");

  const intervalRef = useRef(null);
  const timeoutsRef = useRef(new Map());
  const contenedorRef = useRef(null);

  const [playSonidoEstrella] = useSound(sonidoEstrella, { volume: 0.7 });
  const [playSonidoVictoria] = useSound(sonidoVictoria, { volume: 0.9 });

  const generarEstrella = () => {
    if (!contenedorRef.current) return;
    const rect = contenedorRef.current.getBoundingClientRect();

    const nueva = {
      id: Date.now() + Math.random(),
      left: Math.random() * (rect.width - 60) + "px",
      top: Math.random() * (rect.height - 60) + "px",
      size: Math.random() * 30 + 22,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    };

    setStars((prev) => {
      const next = prev.length >= MAX_STARS ? prev.slice(1).concat(nueva) : prev.concat(nueva);
      return next;
    });

    const timeoutId = setTimeout(() => {
      setStars((prev) => prev.filter((s) => s.id !== nueva.id));
      timeoutsRef.current.delete(nueva.id);
    }, STAR_LIFESPAN_MS);

    timeoutsRef.current.set(nueva.id, timeoutId);
  };

  useEffect(() => {
    if (gameState === "jugando") {
      intervalRef.current = iniciarIntervalo(generarEstrella, SPAWN_INTERVAL_MS);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      for (const t of timeoutsRef.current.values()) clearTimeout(t);
      timeoutsRef.current.clear();
    };
  }, [gameState]);

  const handleCatch = (id) => {
    playSonidoEstrella();

    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }
    setStars((prev) => prev.filter((s) => s.id !== id));
    setScore((s) => {
      const nuevo = s + 1;
      if (nuevo >= SCORE_TO_WIN) {
        setGameState("ganaste");
        playSonidoVictoria();
      }
      return nuevo;
    });
  };

  const startGame = () => {
    setScore(0);
    setStars([]);
    setGameState("jugando");
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >

      <div
        ref={contenedorRef}
        className="bloom-effect rounded-4 border-0"
        style={{
          width: "90%",
          maxWidth: "700px",
          height: "500px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(135,206,235,0.8) 50%, rgba(139,92,246,0.6) 100%)",
          backdropFilter: "blur(20px)",
          border: "3px solid rgba(99, 151, 201, 1)",
          borderRadius: "20px",
          boxShadow: "0 10px 40px rgba(255,255,255,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >

        {gameState === "jugando" && (
          <div
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              zIndex: 10,
              background: "linear-gradient(45deg, rgba(255,255,255,0.8) 0%, rgba(135,206,235,0.8) 100%)",
              padding: "12px 18px",
              borderRadius: "15px",
              fontWeight: "bold",
              fontSize: "1.3rem",
              color: "white",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255,255,255,0.3)",
              boxShadow: "0 10px 20px rgba(135,206,235,0.4)",
            }}
          >
            <i className="fas fa-star me-2" style={{ color: "#87ceeb" }}></i> {score}
          </div>
        )}

        
        {gameState === "jugando" &&
          stars.map((s) => <Star key={s.id} star={s} onCatch={handleCatch} />)}

        
        {gameState === "inicio" && (
          <div
            className="d-flex flex-column justify-content-center align-items-center text-center"
            style={{ height: "100%", color: "white" }}
          >
            <h1
              className="mb-4"
              style={{
                fontSize: "3.2rem",
                background: "linear-gradient(45deg, #ffffff, #87ceeb, #b0e0e6, #e6e6fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(135, 206, 235, 0.5)",
              }}
            >
              ¡Atrapa las Estrellas!
            </h1>
            <p className="lead mb-4 text-light">
              Haz clic en las estrellas que aparezcan para ganar puntos
            </p>
            <button className="game-btn" onClick={startGame}>
              <i className="fas fa-play me-2"></i> Iniciar Juego
            </button>
          </div>
        )}

      
        {gameState === "ganaste" && (
          <div
            className="d-flex flex-column justify-content-center align-items-center text-center"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 3000,
              borderRadius: "20px",
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(135,206,235,0.8) 50%, rgba(139,92,246,0.6) 100%)",
              backdropFilter: "blur(20px)",
              border: "3px solid rgba(255,255,255,0.3)",
              color: "white",
            }}
          >
            <h2
              className="mb-4"
              style={{
                fontSize: "4rem",
                color: "#ffffff",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              ¡Ganaste!
            </h2>
            <p
              className="mb-4 lead"
              style={{
                fontSize: "1.8rem",
                color: "#ffffff",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                fontWeight: "bold",
              }}
            >
              Puntuación final: {score}
            </p>
            <button className="game-btn" onClick={startGame}>
              <i className="fas fa-redo me-2"></i> Jugar de nuevo
            </button>
          </div>
        )}
      </div>

      <style>{`
        .game-btn {
          background: linear-gradient(45deg, #87ceeb, #b0e0e6);
          border: none;
          color: white;
          font-weight: bold;
          padding: 15px 30px;
          border-radius: 25px;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(135, 206, 235, 0.4);
          backdrop-filter: blur(10px);
        }
        .game-btn:hover {
          background: linear-gradient(45deg, #b0e0e6, #87ceeb);
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 15px 40px rgba(135, 206, 235, 0.6);
        }
      `}</style>
    </div>
  );
}