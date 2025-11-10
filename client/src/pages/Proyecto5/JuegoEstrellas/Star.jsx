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
        color: "#ffffff",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translate(-50%,-50%) scale(1.15)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translate(-50%,-50%) scale(1)";
      }}
    >
      <div className="contenido-estrella">
        <i className="fas fa-star"></i>
      </div>
    </div>
  );
}