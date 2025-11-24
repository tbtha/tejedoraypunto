
import { useState, useEffect } from 'react';
import { NavbarAdmi } from '../../componentes/Navbar/NavbarAdmi';
import { Footer } from '../../componentes/Footer/Footer';
import { 
  getBoletas, 
  getBoletasByEstado, 
  getDetallesByBoleta,
  cambiarEstadoBoleta 
} from '../../services/boletaService';
import './GestionBoletas.css';

export function GestionBoletas() {
  const [boletas, setBoletas] = useState([]);
  const [boletasFiltradas, setBoletasFiltradas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [mostrandoDetalles, setMostrandoDetalles] = useState(false);

  // Filtros
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroCliente, setFiltroCliente] = useState('');
  const [filtroFechaInicio, setFiltroFechaInicio] = useState('');
  const [filtroFechaFin, setFiltroFechaFin] = useState('');

  useEffect(() => {
    cargarBoletas();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [filtroEstado, filtroCliente, filtroFechaInicio, filtroFechaFin, boletas]);

  const cargarBoletas = async () => {
    try {
      const data = await getBoletas();
      const boletasOrdenadas = data.sort((a, b) => new Date(b.fechaCompra) - new Date(a.fechaCompra));
      setBoletas(boletasOrdenadas);
      setBoletasFiltradas(boletasOrdenadas);
    } catch (error) {
      console.error('Error al cargar boletas:', error);
      alert('Error al cargar las boletas');
    } finally {
      setCargando(false);
    }
  };

  const aplicarFiltros = () => {
    let resultado = [...boletas];

    // Filtro por estado
    if (filtroEstado) {
      resultado = resultado.filter(b => b.estado === filtroEstado);
    }

    // Filtro por cliente (nombre o email)
    if (filtroCliente) {
      const busqueda = filtroCliente.toLowerCase();
      resultado = resultado.filter(b => 
        b.usuario?.nombre?.toLowerCase().includes(busqueda) ||
        b.usuario?.email?.toLowerCase().includes(busqueda)
      );
    }

    // Filtro por fecha inicio
    if (filtroFechaInicio) {
      const fechaInicio = new Date(filtroFechaInicio);
      resultado = resultado.filter(b => new Date(b.fechaCompra) >= fechaInicio);
    }

    // Filtro por fecha fin
    if (filtroFechaFin) {
      const fechaFin = new Date(filtroFechaFin);
      fechaFin.setHours(23, 59, 59);
      resultado = resultado.filter(b => new Date(b.fechaCompra) <= fechaFin);
    }

    setBoletasFiltradas(resultado);
  };

  const limpiarFiltros = () => {
    setFiltroEstado('');
    setFiltroCliente('');
    setFiltroFechaInicio('');
    setFiltroFechaFin('');
  };

  const verDetalles = async (boleta) => {
    try {
      const detallesData = await getDetallesByBoleta(boleta.id);
      setDetalles(detallesData);
      setBoletaSeleccionada(boleta);
      setMostrandoDetalles(true);
    } catch (error) {
      console.error('Error al cargar detalles:', error);
      alert('Error al cargar los detalles de la boleta');
    }
  };

  const cerrarDetalles = () => {
    setMostrandoDetalles(false);
    setBoletaSeleccionada(null);
    setDetalles([]);
  };

  const handleCambiarEstado = async (boletaId, nuevoEstado) => {
    if (!window.confirm(`¿Cambiar el estado de la boleta #${boletaId} a ${nuevoEstado}?`)) {
      return;
    }

    try {
      await cambiarEstadoBoleta(boletaId, nuevoEstado);
      alert('Estado actualizado correctamente');
      cargarBoletas();
      if (mostrandoDetalles && boletaSeleccionada?.id === boletaId) {
        cerrarDetalles();
      }
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      alert('Error al cambiar el estado de la boleta');
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  const getEstadoClass = (estado) => {
    switch (estado) {
      case 'PENDIENTE':
        return 'badge bg-warning text-dark';
      case 'CONFIRMADA':
        return 'badge bg-success';
      case 'ENVIADA':
        return 'badge bg-info';
      case 'ENTREGADA':
        return 'badge bg-primary';
      case 'CANCELADA':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  const getImagenUrl = (rutaImagen) => {
    if (!rutaImagen) return null;
    if (rutaImagen.startsWith('http://') || rutaImagen.startsWith('https://')) {
      return rutaImagen;
    }
    if (rutaImagen.startsWith('/img/') || rutaImagen.startsWith('img/')) {
      const cleanPath = rutaImagen.startsWith('/') ? rutaImagen.substring(1) : rutaImagen;
      return `/${cleanPath}`;
    }
    return `/img/otros/${rutaImagen}`;
  };

  if (cargando) {
    return (
      <>
        <NavbarAdmi />
        <div className="container mt-5 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* <main className="gestion-boletas-container"> */}
      <div className="gestion-boletas-container">
        <div className="container-fluid mi-tabla px-2 px-md-3">
          {/* <div className="d-flex justify-content-between align-items-center mb-4"> */}
            {/* <h2>Gestión de Boletas</h2> */}
            <h3 style={{ marginBottom: '20px' }}>Gestión de boletas</h3>
            {/* <div className="text-muted">
              Total: {boletasFiltradas.length} boletas
            </div> */}
          {/* </div> */}

          {/* Filtros */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Filtros</h5>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">Estado</label>
                  <select 
                    className="form-select"
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                  >
                    <option value="">Todos los estados</option>
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="CONFIRMADA">Confirmada</option>
                    <option value="ENVIADA">Enviada</option>
                    <option value="ENTREGADA">Entregada</option>
                    <option value="CANCELADA">Cancelada</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Cliente</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nombre o email"
                    value={filtroCliente}
                    onChange={(e) => setFiltroCliente(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Fecha Inicio</label>
                  <input
                    type="date"
                    className="form-control"
                    value={filtroFechaInicio}
                    onChange={(e) => setFiltroFechaInicio(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Fecha Fin</label>
                  <input
                    type="date"
                    className="form-control"
                    value={filtroFechaFin}
                    onChange={(e) => setFiltroFechaFin(e.target.value)}
                  />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button 
                    className="btn btn-outline-secondary w-100"
                    onClick={limpiarFiltros}
                  >
                    Limpiar Filtros
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de boletas - Vista escritorio */}
          <div className="row d-none d-lg-block">
            <div className="col-12">
              {boletasFiltradas.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#ccc' }}></i>
                  <p className="text-muted mt-3">No se encontraron boletas</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Email</th>
                        <th>Total</th>
                        <th>Método Pago</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boletasFiltradas.map((boleta) => (
                        <tr key={boleta.id}>
                          <td><strong>#{boleta.id}</strong></td>
                          <td>{formatearFecha(boleta.fechaCompra)}</td>
                          <td>{boleta.usuario?.nombre || 'N/A'}</td>
                          <td>{boleta.usuario?.email || 'N/A'}</td>
                          <td><strong>{formatearPrecio(boleta.total)}</strong></td>
                          <td>{boleta.metodoPago}</td>
                          <td>
                            <span className={getEstadoClass(boleta.estado)}>
                              {boleta.estado}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-dark me-2"
                              onClick={() => verDetalles(boleta)}
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary dropdown-toggle"
                                data-bs-toggle="dropdown"
                              >
                                Cambiar Estado
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleCambiarEstado(boleta.id, 'PENDIENTE')}
                                  >
                                    Pendiente
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleCambiarEstado(boleta.id, 'CONFIRMADA')}
                                  >
                                    Confirmada
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleCambiarEstado(boleta.id, 'ENVIADA')}
                                  >
                                    Enviada
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleCambiarEstado(boleta.id, 'ENTREGADA')}
                                  >
                                    Entregada
                                  </button>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                  <button
                                    className="dropdown-item text-danger"
                                    onClick={() => handleCambiarEstado(boleta.id, 'CANCELADA')}
                                  >
                                    Cancelada
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Vista de tarjetas para pantallas pequeñas y medianas */}
          <div className="row d-lg-none">
            <div className="col-12">
              {boletasFiltradas.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#ccc' }}></i>
                  <p className="text-muted mt-3">No se encontraron boletas</p>
                </div>
              ) : (
                boletasFiltradas.map((boleta) => (
                  <div key={boleta.id} className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title mb-0">Orden #{boleta.id}</h5>
                        <span className={getEstadoClass(boleta.estado)}>
                          {boleta.estado}
                        </span>
                      </div>
                      <div className="row g-2 mb-3">
                        <div className="col-12">
                          <small className="text-muted d-block">Cliente</small>
                          <strong>{boleta.usuario?.nombre || 'N/A'}</strong>
                        </div>
                        <div className="col-12">
                          <small className="text-muted d-block">Email</small>
                          <strong>{boleta.usuario?.email || 'N/A'}</strong>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">Fecha</small>
                          <strong>{formatearFecha(boleta.fechaCompra)}</strong>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">Total</small>
                          <strong className="text-success">{formatearPrecio(boleta.total)}</strong>
                        </div>
                        <div className="col-12">
                          <small className="text-muted d-block">Método de Pago</small>
                          <strong>{boleta.metodoPago}</strong>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-dark flex-fill"
                          onClick={() => verDetalles(boleta)}
                        >
                          <i className="bi bi-eye me-1"></i> Ver Detalles
                        </button>
                        <div className="btn-group flex-fill">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary dropdown-toggle"
                            data-bs-toggle="dropdown"
                          >
                            Cambiar Estado
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleCambiarEstado(boleta.id, 'PENDIENTE')}
                              >
                                Pendiente
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleCambiarEstado(boleta.id, 'CONFIRMADA')}
                              >
                                Confirmada
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleCambiarEstado(boleta.id, 'ENVIADA')}
                              >
                                Enviada
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleCambiarEstado(boleta.id, 'ENTREGADA')}
                              >
                                Entregada
                              </button>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => handleCambiarEstado(boleta.id, 'CANCELADA')}
                              >
                                Cancelada
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        </div>

      {/* </main> */}

      {/* Modal de detalles */}
      {mostrandoDetalles && boletaSeleccionada && (
        <div className="modal-overlay" onClick={cerrarDetalles}>
          <div className="modal-content-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Detalles de Boleta #{boletaSeleccionada.id}</h4>
              <button className="btn-close" onClick={cerrarDetalles}></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {/* Información del cliente */}
                <div className="col-md-6 mb-4">
                  <h6 className="mb-3">Información del Cliente</h6>
                  <p className="mb-1"><strong>Nombre:</strong> {boletaSeleccionada.usuario?.nombre}</p>
                  <p className="mb-1"><strong>Email:</strong> {boletaSeleccionada.usuario?.email}</p>
                  <p className="mb-1"><strong>RUT:</strong> {boletaSeleccionada.usuario?.rut || 'N/A'}</p>
                </div>

                {/* Información de envío */}
                <div className="col-md-6 mb-4">
                  <h6 className="mb-3">Información de Envío</h6>
                  <p className="mb-1"><strong>Dirección:</strong> {boletaSeleccionada.direccionEnvio}</p>
                  <p className="mb-1"><strong>Comuna:</strong> {boletaSeleccionada.comunaEnvio}</p>
                  <p className="mb-1"><strong>Región:</strong> {boletaSeleccionada.regionEnvio}</p>
                </div>

                {/* Información del pedido */}
                <div className="col-12 mb-4">
                  <h6 className="mb-3">Información del Pedido</h6>
                  <div className="row">
                    <div className="col-md-3">
                      <p className="mb-1"><strong>Fecha:</strong></p>
                      <p>{formatearFecha(boletaSeleccionada.fechaCompra)}</p>
                    </div>
                    <div className="col-md-3">
                      <p className="mb-1"><strong>Método de Pago:</strong></p>
                      <p>{boletaSeleccionada.metodoPago}</p>
                    </div>
                    <div className="col-md-3">
                      <p className="mb-1"><strong>Estado:</strong></p>
                      <span className={getEstadoClass(boletaSeleccionada.estado)}>
                        {boletaSeleccionada.estado}
                      </span>
                    </div>
                    <div className="col-md-3">
                      <p className="mb-1"><strong>Total:</strong></p>
                      <h5>{formatearPrecio(boletaSeleccionada.total)}</h5>
                    </div>
                  </div>
                </div>

                {/* Productos */}
                <div className="col-12">
                  <h6 className="mb-3">Productos</h6>
                  {detalles.length === 0 ? (
                    <p className="text-muted">No se encontraron detalles</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Producto</th>
                            <th>Precio Unit.</th>
                            <th>Cantidad</th>
                            <th>Neto</th>
                            <th>IVA</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detalles.map((detalle, index) => (
                            <tr key={index}>
                              <td>
                                {detalle.producto?.imagen ? (
                                  <img
                                    src={getImagenUrl(detalle.producto.imagen)}
                                    alt={detalle.producto.nombre}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    className="rounded"
                                  />
                                ) : (
                                  <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                    <i className="bi bi-image text-muted"></i>
                                  </div>
                                )}
                              </td>
                              <td>{detalle.producto?.nombre || 'Producto'}</td>
                              <td>{formatearPrecio(detalle.precioUnitario)}</td>
                              <td>{detalle.cantidad}</td>
                              <td>{formatearPrecio((detalle.neto || 0) * detalle.cantidad)}</td>
                              <td>{formatearPrecio((detalle.iva || 0) * detalle.cantidad)}</td>
                              <td><strong>{formatearPrecio(detalle.cantidad * detalle.precioUnitario)}</strong></td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="6" className="text-end">Neto:</td>
                            <td><strong>{formatearPrecio(boletaSeleccionada.neto || 0)}</strong></td>
                          </tr>
                          <tr>
                            <td colSpan="6" className="text-end">IVA (19%):</td>
                            <td><strong>{formatearPrecio(boletaSeleccionada.iva || 0)}</strong></td>
                          </tr>
                          <tr className="table-active">
                            <td colSpan="6" className="text-end"><strong>Total:</strong></td>
                            <td><strong>{formatearPrecio(boletaSeleccionada.total)}</strong></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={cerrarDetalles}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
