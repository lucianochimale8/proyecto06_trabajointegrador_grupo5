import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  
  // Verificar si fue redirigido desde una ruta protegida
  const fromProtectedRoute = location.state?.from;
  const requiresAuth = location.state?.requiresAuth;
  
  // Si ya está autenticado, redirigir
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/Home', { replace: true });
    }
  }, [isAuthenticated, navigate, fromProtectedRoute]);
  
  // Mostrar mensaje si viene de una ruta protegida (juegos)
  useEffect(() => {
    if (requiresAuth) {
      setMensaje('Inicia sesión primero para acceder a esta sección');
    }
  }, [requiresAuth]);
  
  // Limpiar mensaje cuando el usuario empieza a escribir (solo si no es mensaje de requerimiento de auth)
  const handleUsuarioChange = (e) => {
    setUsuario(e.target.value);
    // Solo limpiar si el mensaje actual es el de requerimiento de auth y el usuario está escribiendo
    if (requiresAuth && mensaje === 'Inicia sesión primero para acceder a esta sección') {
      // No limpiar, mantener el mensaje
    } else if (mensaje && mensaje !== 'Inicia sesión primero para acceder a esta sección') {
      setMensaje('');
    }
  };
  
  const handleContraseñaChange = (e) => {
    setContraseña(e.target.value);
    // Solo limpiar si el mensaje actual es el de requerimiento de auth y el usuario está escribiendo
    if (requiresAuth && mensaje === 'Inicia sesión primero para acceder a esta sección') {
      // No limpiar, mantener el mensaje
    } else if (mensaje && mensaje !== 'Inicia sesión primero para acceder a esta sección') {
      setMensaje('');
    }
  };

  const usuarios = [
    { nombre: 'Ezquizos', clave: 'escabio5' },
    { nombre: 'Admin', clave: '1234' }
];

const manejarEnvio = e => {
    e.preventDefault();
    
    const valido = !usuarios.every(
      u => u.nombre !== usuario || u.clave !== contraseña
    );

    if (valido) {
      setMensaje(`Bienvenido, ${usuario}`);
      login(usuario); // Guardar estado de autenticación con el nombre de usuario
      
      // Redirigir siempre al Home
      setTimeout(() => {
        navigate('/Home', { replace: true });
      }, 1000);
    } else {
      setMensaje('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <form 
        className="login-form"
        onSubmit={manejarEnvio}>
        <h2 className="login-heading">Iniciar sesión</h2>

        <input
          className="modern-input"
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={handleUsuarioChange}
          required
        />

        <input
          className="modern-input"
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={handleContraseñaChange}
          required
        />

        <button className="modern-btn" type="submit">Entrar</button>
        {mensaje && (
          <p 
            className="login-message" 
            style={requiresAuth ? { color: '#ff6b6b', fontWeight: '600' } : {}}
          >
            {mensaje}
          </p>
        )}
      </form>
    </div>
  );
}