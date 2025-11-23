import { useState, useEffect } from "react";
import { Footer } from "../../componentes/Footer/Footer";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { 
  getCarrito, 
  eliminarDelCarrito, 
  actualizarCantidad, 
  vaciarCarrito, 
  getPrecioTotal 
} from "../../services/carritoService";
import './Carrito.css';

export function Carrito(){
    const [carrito, setCarrito] = useState([]);
    const [precioTotal, setPrecioTotal] = useState(0);

    useEffect(() => {
        cargarCarrito();
    }, []);

    const cargarCarrito = () => {
        const carritoActual = getCarrito();
        setCarrito(carritoActual);
        setPrecioTotal(getPrecioTotal());
    };

    const handleEliminar = (productoId, nombreProducto) => {
        if (window.confirm(`¿Estás seguro de eliminar "${nombreProducto}" del carrito?`)) {
            const resultado = eliminarDelCarrito(productoId);
            if (resultado.success) {
                cargarCarrito();
            }
        }
    };

    const handleActualizarCantidad = (productoId, nuevaCantidad) => {
        if (nuevaCantidad <= 0) {
            return;
        }
        const resultado = actualizarCantidad(productoId, parseInt(nuevaCantidad));
        if (resultado.success) {
            cargarCarrito();
        }
    };

    const handleVaciarCarrito = () => {
        if (window.confirm('¿Estás seguro de vaciar todo el carrito?')) {
            const resultado = vaciarCarrito();
            if (resultado.success) {
                cargarCarrito();
            }
        }
    };

    const formatearPrecio = (precio) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(precio);
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

    return(
    <> 
    <main className="flex-grow-1">
        <div className="container">
            <Navbar/>
            
            <div className="carrito-container mt-4">
                <h2 className="mb-4">Carrito de Compras</h2>

                {carrito.length === 0 ? (
                    <div className="text-center py-5">
                        <i className="bi bi-cart-x" style={{ fontSize: '4rem', color: '#ccc' }}></i>
                        <p className="text-muted mt-3">Tu carrito está vacío</p>
                        <a href="/productos" className="btn btn-dark mt-3">Ver Productos</a>
                    </div>
                ) : (
                    <>
                        <div className="row">
                            <div className="col-lg-8">
                                {carrito.map(item => (
                                    <div key={item.id} className="card mb-3">
                                        <div className="card-body">
                                            <div className="row align-items-center">
                                                {/* Imagen */}
                                                <div className="col-md-2 col-sm-3">
                                                    {item.imagen ? (
                                                        <img
                                                            src={getImagenUrl(item.imagen)}
                                                            className="img-fluid rounded"
                                                            alt={item.nombre}
                                                            style={{ maxHeight: '80px', objectFit: 'cover' }}
                                                        />
                                                    ) : (
                                                        <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: '80px' }}>
                                                            <i className="bi bi-image" style={{ fontSize: '2rem', color: '#ccc' }}></i>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Información del producto */}
                                                <div className="col-md-4 col-sm-9">
                                                    <h5 className="mb-1">{item.nombre}</h5>
                                                    <p className="text-muted mb-0 small">{item.descripcion}</p>
                                                    <p className="mb-0 mt-1"><strong>{formatearPrecio(item.precio)}</strong></p>
                                                </div>

                                                {/* Cantidad */}
                                                <div className="col-md-3 col-sm-6 mt-3 mt-md-0">
                                                    <label className="form-label small">Cantidad</label>
                                                    <div className="input-group input-group-sm">
                                                        <button 
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => handleActualizarCantidad(item.id, item.cantidad - 1)}
                                                            disabled={item.cantidad <= 1}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            className="form-control text-center"
                                                            value={item.cantidad}
                                                            onChange={(e) => handleActualizarCantidad(item.id, e.target.value)}
                                                            min="1"
                                                            max={item.stock}
                                                        />
                                                        <button 
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => handleActualizarCantidad(item.id, item.cantidad + 1)}
                                                            disabled={item.cantidad >= item.stock}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <small className="text-muted">Stock: {item.stock}</small>
                                                </div>

                                                {/* Subtotal */}
                                                <div className="col-md-2 col-sm-4 mt-3 mt-md-0 text-center">
                                                    <p className="mb-0"><strong>{formatearPrecio(item.precio * item.cantidad)}</strong></p>
                                                </div>

                                                {/* Botón eliminar */}
                                                <div className="col-md-1 col-sm-2 mt-3 mt-md-0 text-center">
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => handleEliminar(item.id, item.nombre)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="text-end mt-3">
                                    <button 
                                        className="btn btn-outline-secondary"
                                        onClick={handleVaciarCarrito}
                                    >
                                        Vaciar Carrito
                                    </button>
                                </div>
                            </div>

                            {/* Resumen del pedido */}
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Resumen del Pedido</h5>
                                        <hr />
                                        
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Productos ({carrito.reduce((sum, item) => sum + item.cantidad, 0)})</span>
                                            <span>{formatearPrecio(precioTotal)}</span>
                                        </div>
                                        
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Envío</span>
                                            <span className="text-success">Gratis</span>
                                        </div>
                                        
                                        <hr />
                                        
                                        <div className="d-flex justify-content-between mb-3">
                                            <strong>Total</strong>
                                            <strong className="text-primary">{formatearPrecio(precioTotal)}</strong>
                                        </div>

                                        <button className="btn btn-dark w-100 mb-2">
                                            Proceder al Pago
                                        </button>
                                        
                                        <a href="/productos" className="btn btn-outline-secondary w-100">
                                            Seguir Comprando
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    </main>
    <Footer/>
    </>
    );
}