import Login from "../common/Login";
import Register from "../common/Register";

export default function Home() {
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
              Aqui encontraras juegos de practica ademas de encontrar juegos simples para practicar tu ingles...
            </p>
          </div>

          <div className="modern-card no-top-accent" style={{ minHeight: "120px" }}>
            <p style={{ margin: 0, textAlign: "center", fontWeight: 700 }}>
              Explora nuestra pagina para descubrir todo lo que preparamos para ti &lt;3
            </p>
          </div>
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
          <Login />

          <div className="modern-card register-wrapper" style={{ padding: "14px", marginTop: "0" }}>
            <h3 style={{ marginTop: 0, marginBottom: "8px", textAlign: "center", color: "var(--kawaii-pink)" }}>
              Crear cuenta
            </h3>
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
}