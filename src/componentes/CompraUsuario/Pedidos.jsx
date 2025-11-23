
import { useState, useEffect } from 'react';
import { Navbar } from '../../componentes/Navbar/Navbar';
import { Footer } from '../../componentes/Footer/Footer';
import { getBoletasByUsuario, getDetallesByBoleta } from '../../services/boletaService';
import './MisPedidos.css';

export function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [mostrandoDetalles, setMostrandoDetalles] = useState(false);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      const usuarioData = localStorage.getItem('user');
      if (!usuarioData) {
        alert('No se pudo identificar el usuario');
        return;
      }
      
      const usuario = JSON.parse(usuarioData);
      const data = await getBoletasByUsuario(usuario.id);
      
      console.log('Datos de boletas recibidos:', data);
      if (data.length > 0) {
        console.log('Formato de fecha en boleta:', data[0].fechaCompra);
      }
      
      // Ordenar por fecha más reciente
      const pedidosOrdenados = data.sort((a, b) => {
        return new Date(b.fechaCompra) - new Date(a.fechaCompra);
      });
      setPedidos(pedidosOrdenados);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
      alert('Error al cargar los pedidos');
    } finally {
      setCargando(false);
    }
  };

  const verDetalles = async (pedido) => {
    try {
      const detallesData = await getDetallesByBoleta(pedido.id);
      setDetalles(detallesData);
      setPedidoSeleccionado(pedido);
      setMostrandoDetalles(true);
    } catch (error) {
      console.error('Error al cargar detalles:', error);
      alert('Error al cargar los detalles del pedido');
    }
  };

  const cerrarDetalles = () => {
    setMostrandoDetalles(false);
    setPedidoSeleccionado(null);
    setDetalles([]);
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return 'Fecha no disponible';
    
    try {
      const date = new Date(fecha);
      if (isNaN(date.getTime())) {
        return 'Fecha inválida';
      }
      
      return date.toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return 'Fecha inválida';
    }
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
        {/* <Navbar /> */}
        <div className="container mt-5 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
        {/* <Footer /> */}
      </>
    );
  }

  return (
    <>
      {/* <Navbar /> */}
      <main className="mis-pedidos-container">
        <div className="container py-5">
          <h2 className="mb-4">Mis Pedidos</h2>

          {pedidos.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#ccc' }}></i>
              <p className="text-muted mt-3">No tienes pedidos aún</p>
              <a href="/productos" className="btn btn-dark mt-3">Ir a Comprar</a>
            </div>
          ) : (
            <div className="row">
              <div className="col-12">
                {pedidos.map((pedido) => (
                  <div key={pedido.id} className="card mb-3 pedido-card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        {/* Información del pedido */}
                        <div className="col-md-8">
                          <div className="d-flex align-items-center mb-2">
                            <h5 className="mb-0 me-3">Orden #{pedido.id}</h5>
                            <span className={getEstadoClass(pedido.estado)}>
                              {pedido.estado}
                            </span>
                          </div>
                          <p className="text-muted mb-1">
                            <i className="bi bi-calendar me-2"></i>
                            {formatearFecha(pedido.fechaCompra)}
                          </p>
                          <p className="text-muted mb-1">
                            <i className="bi bi-credit-card me-2"></i>
                            {pedido.metodoPago}
                          </p>
                          <p className="text-muted mb-0">
                            <i className="bi bi-geo-alt me-2"></i>
                            {pedido.direccionEnvio}, {pedido.comunaEnvio}, {pedido.regionEnvio}
                          </p>
                        </div>

                        {/* Total y acciones */}
                        <div className="col-md-4 text-md-end mt-3 mt-md-0">
                          <h4 className="mb-3">{formatearPrecio(pedido.total)}</h4>
                          <button
                            className="btn btn-outline-dark btn-sm"
                            onClick={() => verDetalles(pedido)}
                          >
                            <i className="bi bi-eye me-2"></i>
                            Ver Detalles
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal de detalles */}
      {mostrandoDetalles && pedidoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarDetalles}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Detalles del Pedido #{pedidoSeleccionado.id}</h4>
              <button className="btn-close" onClick={cerrarDetalles}></button>
            </div>
            <div className="modal-body">
              {/* Información del pedido */}
              <div className="mb-4">
                <h6 className="mb-3">Información de Envío</h6>
                <p className="mb-1"><strong>Dirección:</strong> {pedidoSeleccionado.direccionEnvio}</p>
                <p className="mb-1"><strong>Comuna:</strong> {pedidoSeleccionado.comunaEnvio}</p>
                <p className="mb-1"><strong>Región:</strong> {pedidoSeleccionado.regionEnvio}</p>
                <p className="mb-1"><strong>Método de Pago:</strong> {pedidoSeleccionado.metodoPago}</p>
                <p className="mb-1">
                  <strong>Estado:</strong> 
                  <span className={`ms-2 ${getEstadoClass(pedidoSeleccionado.estado)}`}>
                    {pedidoSeleccionado.estado}
                  </span>
                </p>
              </div>

              {/* Productos */}
              <h6 className="mb-3">Productos</h6>
              {detalles.length === 0 ? (
                <p className="text-muted">No se encontraron detalles</p>
              ) : (
                <div className="productos-lista">
                  {detalles.map((detalle, index) => (
                    <div key={index} className="producto-item mb-3 pb-3 border-bottom">
                      <div className="row align-items-center">
                        <div className="col-md-2 col-3">
                          {detalle.producto?.imagen ? (
                            <img
                              src={getImagenUrl(detalle.producto.imagen)}
                              alt={detalle.producto.nombre}
                              className="img-fluid rounded"
                            />
                          ) : (
                            <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: '60px' }}>
                              <i className="bi bi-image" style={{ fontSize: '1.5rem', color: '#ccc' }}></i>
                            </div>
                          )}
                        </div>
                        <div className="col-md-5 col-9">
                          <h6 className="mb-1">{detalle.producto?.nombre || 'Producto'}</h6>
                          <small className="text-muted">Cantidad: {detalle.cantidad}</small>
                        </div>
                        <div className="col-md-5 col-12 mt-2 mt-md-0">
                          <div className="row text-end">
                            <div className="col-12">
                              <small className="text-muted">Neto: {formatearPrecio((detalle.neto || 0) * detalle.cantidad)}</small>
                            </div>
                            <div className="col-12">
                              <small className="text-muted">IVA: {formatearPrecio((detalle.iva || 0) * detalle.cantidad)}</small>
                            </div>
                            <div className="col-12">
                              <strong>Total: {formatearPrecio(detalle.cantidad * detalle.precioUnitario)}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Total */}
              <div className="mt-4 pt-3 border-top">
                <div className="d-flex justify-content-between mb-2">
                  <span>Neto:</span>
                  <span>{formatearPrecio(pedidoSeleccionado.neto || 0)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>IVA (19%):</span>
                  <span>{formatearPrecio(pedidoSeleccionado.iva || 0)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h5>Total:</h5>
                  <h5><strong>{formatearPrecio(pedidoSeleccionado.total)}</strong></h5>
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

      {/* <Footer /> */}
    </>
  );
}
