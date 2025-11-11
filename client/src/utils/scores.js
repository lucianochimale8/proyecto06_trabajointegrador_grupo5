// Utilidad para guardar y cargar puntuaciones por usuario

const SCORES_KEY = "diagnostico_ingles_scores";

export const saveScore = (username, gameId, score, maxScore) => {
  try {
    const allScores = JSON.parse(localStorage.getItem(SCORES_KEY) || "{}");
    
    if (!allScores[username]) {
      allScores[username] = {};
    }
    
    // Solo actualizar si el nuevo puntaje es mayor
    const currentScore = allScores[username][gameId]?.score || 0;
    if (score > currentScore) {
      allScores[username][gameId] = {
        score,
        maxScore,
        completed: true,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(SCORES_KEY, JSON.stringify(allScores));
    }
    
    return true;
  } catch (error) {
    console.error("Error guardando puntuación:", error);
    return false;
  }
};

export const getScores = (username) => {
  try {
    const allScores = JSON.parse(localStorage.getItem(SCORES_KEY) || "{}");
    return allScores[username] || {};
  } catch (error) {
    console.error("Error cargando puntuaciones:", error);
    return {};
  }
};

export const getTotalScore = (username) => {
  const scores = getScores(username);
  let total = 0;
  let maxTotal = 0;
  
  Object.values(scores).forEach((gameScore) => {
    total += gameScore.score || 0;
    maxTotal += gameScore.maxScore || 0;
  });
  
  return { total, maxTotal };
};

