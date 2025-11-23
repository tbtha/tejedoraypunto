import { Link, useNavigate } from 'react-router-dom';
import { logout, getUser, isAuthenticated } from '../../services/authService';
import { useEffect, useState } from 'react';

export function Navbar() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  useEffect(() => {
    // Verificar si hay usuario autenticado
    if (isAuthenticated()) {
      const user = getUser();
      setUsuario(user);
      setEstaAutenticado(true);
    } else {
      setUsuario(null);
      setEstaAutenticado(false);
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de cerrar sesión?')) {
      logout();
      setUsuario(null);
      setEstaAutenticado(false);
      navigate('/');
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
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Productos</Link>
              </li>
              
              {/* Mostrar según estado de autenticación */}
              {!estaAutenticado ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/registro">Iniciar sesión</Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/carrito">Carrito</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/mis-pedidos">Mis Pedidos</Link>
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
                </>
              )}
              
              <li className="nav-item">
                <Link className="nav-link" to="/blogs">Blog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/me">Me</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid text-end">
        <span id="mensajeNavbarSesion" className="fw-semibold">
          {usuario && estaAutenticado && `Bienvenido, ${usuario.nombre}`}
        </span>
      </div>
    </>
  );
}