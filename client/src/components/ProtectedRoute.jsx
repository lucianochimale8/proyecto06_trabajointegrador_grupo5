import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirigir al login con información de que viene de una ruta protegida
    return <Navigate to="/login" state={{ from: location.pathname, requiresAuth: true }} replace />;
  }

  return children;
}

