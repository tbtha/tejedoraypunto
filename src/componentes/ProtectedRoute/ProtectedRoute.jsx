import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../services/authService';

// Componente para proteger rutas que requieren autenticación
export function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    // Si no está autenticado, redirigir al login
    return <Navigate to="/registro" replace />;
  }

  // Si está autenticado, mostrar el componente
  return children;
}
