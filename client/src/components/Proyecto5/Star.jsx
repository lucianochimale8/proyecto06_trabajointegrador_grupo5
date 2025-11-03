export default function Star({ star, onCatch }) {
  return (
    <div
      role="button"
      aria-label="Estrella"
      title="Click para atrapar"
      onClick={() => onCatch(star.id)}
      className="d-flex align-items-center justify-content-center pulse-glow"
      style={{
        position: "absolute",
        left: star.left,
        top: star.top,
        transform: "translate(-50%,-50%)",
        fontSize: star.size,
        color: star.color,
        cursor: "pointer",
        userSelect: "none",
        zIndex: 1050,
        transition: "all 0.3s ease",
        filter: "drop-shadow(0 0 15px rgba(255,255,255,0.6))",
        animation: `starFloat ${1 + (star.size % 3) * 0.2}s infinite alternate`,
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
      <div style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <i className="fas fa-star" style={{
          textShadow: "0 0 20px rgba(255,255,255,0.8)",
          filter: "brightness(1.2) contrast(1.1)"
        }}></i>
        {/* Efecto de brillo adicional */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: star.size + 10,
          height: star.size + 10,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${star.color}20 0%, transparent 70%)`,
          animation: "pulse-glow 2s ease-in-out infinite alternate"
        }}></div>
      </div>
      <style>{`
        @keyframes starFloat {
          from { transform: translate(-50%,-50%) translateY(0) scale(1); opacity: 1; }
          to { transform: translate(-50%,-50%) translateY(-8px) scale(1.1); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}