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
  
  // Si ya está autenticado, redirigir
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/AboutMiembros', { replace: true });
    }
  }, [isAuthenticated, navigate]);

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
      login(); // Guardar estado de autenticación
      
      // Redirigir a la ruta que intentaba acceder o a home
      const from = location.state?.from || '/AboutMiembros';
      setTimeout(() => {
        navigate(from, { replace: true });
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
        {fromProtectedRoute && (
          <p style={{ 
            color: '#ff6b6b', 
            fontSize: '14px', 
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            Inicia sesión para acceder a esta sección
          </p>
        )}

        <input
          className="modern-input"
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          required
        />

        <input
          className="modern-input"
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={e => setContraseña(e.target.value)}
          required
        />

        <button className="modern-btn" type="submit">Entrar</button>
        {mensaje && <p className="login-message">{mensaje}</p>}
      </form>
    </div>
  );
}