import { useState, useEffect } from "react";
import Login from "../common/Login";
import Register from "../common/Register";
import { useAutorizacion } from "../hooks/useAutorizacion";
import { getScores, getTotalScore } from "../utils/scores";
import "../styles/colores.css";

export default function Home() {
  const { user, isAuthenticated } = useAutorizacion();
  const [scores, setScores] = useState({});
  const [totalScore, setTotalScore] = useState({ total: 0, maxTotal: 0 });
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const updateScores = () => {
      if (isAuthenticated && (user?.username || user?.name)) {
        const username = user?.username || user?.name;
        const userScores = getScores(username);
        const total = getTotalScore(username);
        setScores(userScores);
        setTotalScore(total);
      }
    };
    
    updateScores();
    
    // Listener para actualizar cuando cambien las puntuaciones en localStorage
    const handleStorageChange = (e) => {
      if (e.key === "diagnostico_ingles_scores") {
        updateScores();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // También escuchar cambios en la misma pestaña usando un intervalo
    const interval = setInterval(() => {
      updateScores();
    }, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [isAuthenticated, user]);

  const gameNames = {
    colores: "Colores",
    animals: "Animals",
    numbersdays: "Numbers & Days",
    bodyparts: "Body Parts"
  };
  return (
    <div className="page-transition" style={{ padding: "20px" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gap: "24px",
          gridTemplateColumns: "1fr 360px",
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="modern-card no-top-accent" style={{ minHeight: "120px" }}>
            <h1 style={{ margin: 0, textAlign: "center", color: "var(--kawaii-brown)" }}>
              Bienvenidos a nuestra pagina final!
            </h1>
          </div>

          <div className="modern-card no-top-accent" style={{ padding: "24px", minHeight: "200px" }}>
            <p style={{ margin: 0, textAlign: "center", fontFamily: "'KG Candy Cane Stripe', cursive", fontSize: "1.1rem", color: "var(--kawaii-brown)" }}>
            Aqui encontraras juegos de practica ademas de encontrar juegos simples para practicar tu ingles, esta pagina fue trabajada con la inclusion de niños con cualquier neurodivergencia en mente, para que no importe cualquier dificultad que solo importe que puedas seguir aprendiendo
            </p>
          </div>

          <div className="modern-card no-top-accent" style={{ padding: "40px" }}>
					<p style={{ margin: 0, textAlign: "center", color: "var(--kawaii-brown)", fontWeight: 900, fontFamily: "'KG Candy Cane Stripe', cursive", fontSize: "1.35rem", WebkitTextStroke: "1px var(--kawaii-brown)" }}>
              Explora nuestra pagina para descubrir todo lo que preparamos para ti &lt;3!!
            </p>
          </div>

          {isAuthenticated && (
            <div className="modern-card no-top-accent" style={{ padding: "50px 40px" }}>
              <div className="contenedor-resultados">
                <h1 className="titulo-juego" style={{ marginBottom: "180px", marginTop: "0px", color: "var(--kawaii-brown)", fontFamily: "'Roundabout', cursive" }}>
                  Puntuación Total
                </h1>
                
                {Object.keys(gameNames).map((gameId, index) => {
                  const gameScore = scores[gameId];
                  return (
                    <div key={gameId} className="resultado-juego" style={{ marginBottom: "30px", marginTop: index === 0 ? "40px" : "0" }}>
                      <h3 style={{ fontFamily: "'KG Candy Cane Stripe', cursive" }}>{gameNames[gameId]}</h3>
                      <p style={{ fontFamily: "'KG Candy Cane Stripe', cursive" }}>
                        {gameScore ? `${gameScore.score}/${gameScore.maxScore} puntos` : "No jugado"}
                      </p>
                    </div>
                  );
                })}

                {totalScore.maxTotal > 0 && (
                  <div className="resultado-total" style={{ marginTop: "50px" }}>
                    <h2 style={{ fontFamily: "'KG Candy Cane Stripe', cursive" }}>Puntuación Total</h2>
                    <p style={{ fontFamily: "'KG Candy Cane Stripe', cursive" }}>{totalScore.total}/{totalScore.maxTotal} puntos</p>
                    <p className="porcentaje" style={{ fontFamily: "'KG Candy Cane Stripe', cursive" }}>
                      {Math.round((totalScore.total / totalScore.maxTotal) * 100)}% de aciertos
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div
          className="auth-column"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "6px",
          }}
        >
          <Login onShowRegister={() => setShowRegister(true)} />

          {showRegister && (
            <div className="modern-card no-top-accent register-wrapper" style={{ padding: "14px", marginTop: "0" }}>
              <h3 style={{ marginTop: 0, marginBottom: "8px", textAlign: "center", color: "var(--kawaii-pink)" }}>
                Crear cuenta
              </h3>
              <Register />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}