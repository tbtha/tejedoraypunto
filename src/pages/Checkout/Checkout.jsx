import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../componentes/Navbar/Navbar';
import { Footer } from '../../componentes/Footer/Footer';
import { getCarrito, getPrecioTotal, vaciarCarrito } from '../../services/carritoService';
import { createBoleta, createDetalleBoleta } from '../../services/boletaService';
import { regionesYComunas } from '../../componentes/InicioSesion/regionycomuna';
import './Checkout.css';

export function Checkout() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [procesando, setProcesando] = useState(false);
  
  const [datosEnvio, setDatosEnvio] = useState({
    direccion: '',
    region: '',
    comuna: '',
    metodoPago: 'TRANSFERENCIA'
  });

  useEffect(() => {
    // Cargar carrito
    const items = getCarrito();
    if (items.length === 0) {
      alert('Tu carrito está vacío');
      navigate('/carrito');
      return;
    }
    setCarrito(items);

    // Cargar datos del usuario
    const usuarioData = localStorage.getItem('user');
    if (usuarioData) {
      const user = JSON.parse(usuarioData);
      setUsuario(user);
      // Pre-llenar con datos del usuario si existen
      setDatosEnvio(prev => ({
        ...prev,
        direccion: user.direccion || '',
        region: user.region || '',
        comuna: user.comuna || ''
      }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosEnvio({
      ...datosEnvio,
      [name]: value
    });
  };

  const handleRegionChange = (e) => {
    setDatosEnvio({
      ...datosEnvio,
      region: e.target.value,
      comuna: '' // Resetear comuna
    });
  };

  const calcularSubtotal = () => {
    return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  };

  const calcularEnvio = () => {
    // Envío fijo de ejemplo, puedes modificarlo según tu lógica
    return 3000;
  };

  const calcularTotal = () => {
    return calcularSubtotal() + calcularEnvio();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar datos
    if (!datosEnvio.direccion || !datosEnvio.region || !datosEnvio.comuna) {
      alert('Por favor, completa todos los campos de envío');
      return;
    }

    if (!usuario || !usuario.id) {
      alert('Error: No se pudo identificar el usuario');
      return;
    }

    setProcesando(true);

    try {
      // Preparar los detalles de la boleta
      const detalles = carrito.map(item => ({
        producto: { id: item.id },
        cantidad: item.cantidad,
        precioUnitario: item.precio
      }));

      // Crear la boleta con los detalles en una sola petición
      const boletaData = {
        usuario: { id: usuario.id },
        metodoPago: datosEnvio.metodoPago,
        direccionEnvio: datosEnvio.direccion,
        regionEnvio: datosEnvio.region,
        comunaEnvio: datosEnvio.comuna,
        total: calcularTotal(),
        detalles: detalles
      };

      console.log('Creando boleta con detalles:', boletaData);
      const boletaCreada = await createBoleta(boletaData);
      console.log('Boleta creada:', boletaCreada);

      // Vaciar el carrito
      vaciarCarrito();

      // Mostrar mensaje de éxito y redirigir
      alert(`¡Pedido realizado exitosamente! Número de orden: ${boletaCreada.id}`);
      navigate('/mis-pedidos');
      
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.response?.status === 403) {
        alert('Error: No tienes permisos para realizar esta acción. Verifica que hayas iniciado sesión correctamente.');
      } else {
        alert('Error al procesar el pedido. Por favor, intenta nuevamente.');
      }
    } finally {
      setProcesando(false);
    }
  };

  if (!carrito.length) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="checkout-container">
        <div className="container py-5">
          <h2 className="mb-4">Finalizar Compra</h2>

          <div className="row">
            {/* Formulario de datos */}
            <div className="col-lg-7 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h4 className="card-title mb-4">Información de Envío</h4>
                  
                  <form onSubmit={handleSubmit}>
                    {/* Dirección */}
                    <div className="mb-3">
                      <label htmlFor="direccion" className="form-label">
                        Dirección de Envío <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="direccion"
                        name="direccion"
                        value={datosEnvio.direccion}
                        onChange={handleChange}
                        placeholder="Calle, número, depto/casa"
                        required
                      />
                    </div>

                    {/* Región */}
                    <div className="mb-3">
                      <label htmlFor="region" className="form-label">
                        Región <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        id="region"
                        name="region"
                        value={datosEnvio.region}
                        onChange={handleRegionChange}
                        required
                      >
                        <option value="">Selecciona una región</option>
                        {Object.keys(regionesYComunas).map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Comuna */}
                    <div className="mb-3">
                      <label htmlFor="comuna" className="form-label">
                        Comuna <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        id="comuna"
                        name="comuna"
                        value={datosEnvio.comuna}
                        onChange={handleChange}
                        disabled={!datosEnvio.region}
                        required
                      >
                        <option value="">Selecciona una comuna</option>
                        {datosEnvio.region &&
                          regionesYComunas[datosEnvio.region]?.map((comuna) => (
                            <option key={comuna} value={comuna}>
                              {comuna}
                            </option>
                          ))}
                      </select>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">Método de Pago</h4>

                    {/* Método de Pago */}
                    <div className="mb-3">
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="metodoPago"
                          id="transferencia"
                          value="TRANSFERENCIA"
                          checked={datosEnvio.metodoPago === 'TRANSFERENCIA'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="transferencia">
                          Transferencia Bancaria
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="metodoPago"
                          id="webpay"
                          value="WEBPAY"
                          checked={datosEnvio.metodoPago === 'WEBPAY'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="webpay">
                          WebPay (Tarjeta de Crédito/Débito)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="metodoPago"
                          id="efectivo"
                          value="EFECTIVO"
                          checked={datosEnvio.metodoPago === 'EFECTIVO'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="efectivo">
                          Pago en Efectivo (Contraentrega)
                        </label>
                      </div>
                    </div>

                    <div className="d-grid gap-2 mt-4">
                      <button
                        type="submit"
                        className="btn btn-dark btn-lg"
                        disabled={procesando}
                      >
                        {procesando ? 'Procesando...' : 'Confirmar Pedido'}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate('/carrito')}
                        disabled={procesando}
                      >
                        Volver al Carrito
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="col-lg-5">
              <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                <div className="card-body">
                  <h4 className="card-title mb-4">Resumen del Pedido</h4>

                  {/* Productos */}
                  <div className="productos-resumen mb-3">
                    {carrito.map((item) => (
                      <div key={item.id} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                        <div className="d-flex align-items-center flex-grow-1">
                          {item.imagen && (
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              className="img-thumbnail me-3"
                              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            />
                          )}
                          <div>
                            <h6 className="mb-0">{item.nombre}</h6>
                            <small className="text-muted">Cantidad: {item.cantidad}</small>
                          </div>
                        </div>
                        <div className="text-end">
                          <strong>${(item.precio * item.cantidad).toLocaleString('es-CL')}</strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totales */}
                  <div className="border-top pt-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <strong>${calcularSubtotal().toLocaleString('es-CL')}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Envío:</span>
                      <strong>${calcularEnvio().toLocaleString('es-CL')}</strong>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-0">
                      <h5>Total:</h5>
                      <h5 className="text-dark">
                        <strong>${calcularTotal().toLocaleString('es-CL')}</strong>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
