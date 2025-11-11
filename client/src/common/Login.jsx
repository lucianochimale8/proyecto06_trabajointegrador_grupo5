import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAutorizacion } from "../hooks/useAutorizacion.js";

export default function Login({ onShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const { login, isAuthenticated, user } = useAutorizacion();
  const navigate = useNavigate();

  // Si ya está autenticado, redirigir según el rol
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.rol === 'ADMINISTRADOR') {
        navigate('/Home', { replace: true });
      } else if (user?.rol === 'ALUMNO') {
        navigate('/aboutMiembros', { replace: true });
      } else {
        navigate('/error', { replace: true });
      }
    }
  }, [isAuthenticated, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(""); // Limpiar errores anteriores

    if (!username || !password) {
      setLoginError("Por favor, complete todos los campos.");
      return;
    }

    const result = await login({ username, password });

    if (!result.success) {
      setLoginError(result.message || "Error desconocido durante el inicio de sesión.");
    } else {
      // La redirección se manejará en el useEffect de arriba
      setUsername("");
      setPassword("");
    }
  };

  // Si ya está autenticado, no mostrar el formulario
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">INICIAR SESIÓN</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            id="username"
            className="login-input"
            placeholder="Admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="...."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {loginError && <div className="error-message">{loginError}</div>}

          <button 
            type="submit" 
            className="login-button"
          >
            Iniciar
          </button>
        </form>
        
        {onShowRegister && (
          <button 
            type="button"
            onClick={onShowRegister}
            className="modern-btn"
            style={{ width: "100%", marginTop: "12px" }}
          >
            Registrarse
          </button>
        )}
      </div>
    </div>
  );
}