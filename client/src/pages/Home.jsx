import Login from "../common/Login";
import Register from "../common/Register";

export default function Home() {
	return (
		<div className="page-transition" style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
			<div style={{ width: "100%", maxWidth: "900px", display: "grid", gap: "16px" }}>
				<div className="modern-card no-top-accent">
					<h1 style={{ margin: 0, textAlign: "center", color: "var(--kawaii-brown)" }}>Bienvenidos a nuestra pagina final!</h1>
				</div>
				<div className="modern-card no-top-accent" style={{ padding: "40px" }}>
					<p style={{ margin: 0, textAlign: "center", fontFamily: "'KG Candy Cane Stripe', cursive", fontSize: "1.3rem", fontWeight: 800, color: "var(--kawaii-brown)" }}>
						Aqui encontraras juegos de practica ademas de encontrar juegos simples para practicar tu ingles, esta pagina fue trabajada con la inclusion de niños con cualquier neurodivergencia en mente, para que no importe cualquier dificultad que solo importe que puedas seguir aprendiendo
					</p>
				</div>
				<div className="modern-card no-top-accent" style={{ padding: "40px" }}>
					<p style={{ margin: 0, textAlign: "center", color: "var(--kawaii-brown)", fontWeight: 900, fontFamily: "'KG Candy Cane Stripe', cursive", fontSize: "1.35rem", WebkitTextStroke: "1px var(--kawaii-brown)" }}>
						Explora nuestra pagina para descubrir todo lo que preparamos para ti &lt;3!!
					</p>
				</div>
			</div>
			<Login/>
			<Register/>
		</div>
	);
}

