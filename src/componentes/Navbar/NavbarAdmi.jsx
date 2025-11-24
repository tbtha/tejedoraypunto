import { Link, useNavigate } from 'react-router-dom';
import { logout, getUser } from '../../services/authService';
import { useEffect, useState } from 'react';

export function NavbarAdmi() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = getUser();
    setUsuario(user);
  }, []);

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de cerrar sesión?')) {
      logout();
      navigate('/registro');
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/img/marca/logo_transformado.jpeg" alt="Logo" width="100%" height="auto" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/usuarios">Gestión de usuario</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/inventario">Gestión de productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/boletas">Gestión de pedidos</Link>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link" 
                  onClick={handleLogout}
                  style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid text-end">
        <span id="mensajeNavbarSesion" className="fw-semibold">
          {usuario && `Bienvenido, ${usuario.nombre}`}
        </span>
      </div>
    </>
  );
}