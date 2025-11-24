import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../../services/authService';

// Componente para proteger rutas que requieren rol de ADMIN
export function AdminRoute({ children }) {
  if (!isAuthenticated()) {
    // Si no está autenticado, redirigir al login
    return <Navigate to="/registro" replace />;
  }

  if (!isAdmin()) {
    // Si está autenticado pero no es admin, redirigir a home
    return <Navigate to="/" replace />;
  }

  // Si está autenticado y es admin, mostrar el componente
  return children;
}
