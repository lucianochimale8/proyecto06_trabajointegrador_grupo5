export default function Estrella({ estrella, onAtrapar }) {
  return (
    <div
      role="button"
      aria-label="Estrella"
      title="Click para atrapar"
      onClick={() => onAtrapar(estrella.id)}
      className={`estrella-elemento ${estrella.fadingOut ? "fade-out" : ""}`}
      style={{
        left: estrella.left,
        top: estrella.top,
        fontSize: estrella.size,
        color: "#ffffff",
      }}
    >
      <div className="contenido-estrella">
        <i className="fas fa-star"></i>
      </div>
    </div>
  );
}