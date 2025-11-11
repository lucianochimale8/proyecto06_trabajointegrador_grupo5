import { useState } from "react";
import { useAutorizacion } from "../hooks/useAutorizacion";

export default function Register() {
  const { register, login } = useAutorizacion();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rol, setRol] = useState("ALUMNO");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const result = register({ username, password, name, rol });
    if (!result.success) {
      setMessage({ type: "error", text: result.message || "No se pudo registrar." });
      return;
    }

    // loguea automáticamente después de registrar
    const loginResult = login({ username, password });
    if (loginResult.success) {
      setMessage({ type: "success", text: "Registro exitoso." });
      // limpiar campos
      setUsername("");
      setPassword("");
      setName("");
    }
  };

  return (
    <div className="register-card modern-card" style={{ padding: "20px" }}>
      <h3 style={{ marginTop: 0 }}>Crear cuenta</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: "8px" }}>
          <label>Nombre de usuario</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group" style={{ marginBottom: "8px" }}>
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group" style={{ marginBottom: "8px" }}>
          <label>Nombre (opcional)</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group" style={{ marginBottom: "8px" }}>
          <label>Rol</label>
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="ALUMNO">ALUMNO</option>
            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
          </select>
        </div>

        {message && (
          <div style={{ marginBottom: "8px", color: message.type === "error" ? "red" : "green" }}>
            {message.text}
          </div>
        )}

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}