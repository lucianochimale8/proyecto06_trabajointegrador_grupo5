import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirigir al login y guardar la ruta a la que intentaba acceder
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

