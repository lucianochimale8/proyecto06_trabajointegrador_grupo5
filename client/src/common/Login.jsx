import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAutorizacion } from "../hooks/useAutorizacion.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  // Obtiene la funcion de login, estado de auth y user
  const {login, isAuthenticated, user} = useAutorizacion();
  const navigate = useNavigate();

  // Si ya está autenticado, redirigir a proyecto2
  useEffect(() => {
    if (isAuthenticated) {
      if(user?.rol === 'ADMINISTRADOR'){
        navigate('/Home', { replace : true });
      } else if (user?.rol === 'ALUMNO') {
        navigate('/aboutMiembros', { replace : true });
      } else {
        navigate('/error', { replace : true });
      }

    }
  }, [isAuthenticated, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(""); // Limpiar errores anteriores
    //setIsLoading(true);

    if (!username || !password) {
      setLoginError("Por favor, complete todos los campos.");
      //setIsLoading(false);
      return;
    }

    const result = await login({ username, password });

    if (!result.success) {
      setLoginError(result.message || "Error desconocido durante el inicio de sesión.");
    } 
    else {
      // La redirección se manejará en el useEffect de arriba
      setUsername("");
      setPassword("");
    }
    //setIsLoading(false);
  };

  // Si ya está autenticado, no mostrar el formulario
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
          <p>Use: admin / 1234</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              placeholder="Ingrese su nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loginError && <div className="error-message">{loginError}</div>}

          <button 
            type="submit" 
            className="login-button"
          >
            Iniciar sesion
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;