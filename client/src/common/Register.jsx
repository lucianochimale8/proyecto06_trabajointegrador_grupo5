import { useState } from "react";
import { useAutorizacion } from "../hooks/useAutorizacion";

export default function Register() {
  const { register, login } = useAutorizacion();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rol, setRol] = useState("ALUMNO");
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    const result = register({ username, password, name, rol });
    if (!result.success) {
      setMessage({ type: "error", text: result.message || "No se pudo registrar." });
      return;
    }

    const loginResult = login({ username, password });
    if (loginResult.success) {
      setMessage({ type: "success", text: "Registro exitoso. Has ingresado automáticamente." });
      setUsername("");
      setPassword("");
      setName("");
    } else {
      setMessage({ type: "warning", text: "Registro realizado, pero no se pudo iniciar sesión automáticamente." });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <label style={{ fontSize: "0.9rem" }}>Nombre de usuario</label>
      <input
        className="modern-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        placeholder="ej: usuario123"
      />

      <label style={{ fontSize: "0.9rem" }}>Contraseña</label>
      <input
        className="modern-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="●●●●●●●"
      />

      <label style={{ fontSize: "0.9rem" }}>Nombre (opcional)</label>
      <input
        className="modern-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre visible"
      />

      <label style={{ fontSize: "0.9rem" }}>Rol</label>
      <select className="modern-input" value={rol} onChange={(e) => setRol(e.target.value)}>
        <option value="ALUMNO">ALUMNO</option>
        <option value="ADMINISTRADOR">ADMINISTRADOR</option>
      </select>

      {message && (
        <div style={{ color: message.type === "error" ? "#b00020" : "#1b7a1b", fontWeight: 700 }}>
          {message.text}
        </div>
      )}

      <button className="modern-btn" type="submit" style={{ alignSelf: "stretch", marginTop: "6px" }}>
        Registrar
      </button>
    </form>
  );
}