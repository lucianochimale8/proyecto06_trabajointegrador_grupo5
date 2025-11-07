export default function Estrella({ estrella, onAtrapar }) {
  return (
    <div
      role="button"
      aria-label="Estrella"
      title="Click para atrapar"
      onClick={() => onAtrapar(estrella.id)}
      className="estrella-elemento"
      style={{
        left: estrella.left,
        top: estrella.top,
        fontSize: estrella.size,
        color: estrella.color,
        animationDuration: `${1 + (estrella.size % 3) * 0.2}s`
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translate(-50%,-50%) scale(1.2)";
        e.target.style.filter = "drop-shadow(0 0 25px rgba(255,255,255,0.9))";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translate(-50%,-50%) scale(1)";
        e.target.style.filter = "drop-shadow(0 0 15px rgba(255,255,255,0.6))";
      }}
    >
      <div className="contenido-estrella">
        <i className="fas fa-star"></i>
        <div 
          className="brillo-estrella"
          style={{
            width: estrella.size + 10,
            height: estrella.size + 10,
          }}
        ></div>
      </div>
    </div>
  );
}