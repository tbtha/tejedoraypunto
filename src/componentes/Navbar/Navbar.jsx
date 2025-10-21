import { Link } from 'react-router-dom';

export function Navbar() {
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
              <li className="nav-item">
                <Link className="nav-link" to="/registro">Iniciar sesión</Link>
              </li>
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
        <span id="mensajeNavbarSesion" className="fw-semibold"></span>
      </div>
    </>
  );
}