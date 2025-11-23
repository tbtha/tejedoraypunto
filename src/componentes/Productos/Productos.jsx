import React, { useState, useEffect } from 'react';
import './Productos.css';
import { getProductos, getCategorias } from '../../services/apiService';
import { agregarAlCarrito } from '../../services/carritoService';
import { isAuthenticated } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

export function Productos() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
  }, []);

  useEffect(() => {
    filtrarProductos();
  }, [productos, categoriaSeleccionada, searchQuery]);

  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      // Filtrar solo productos activos
      const productosActivos = Array.isArray(data) 
        ? data.filter(p => p.activo === true) 
        : [];
      setProductos(productosActivos);
      setProductosFiltrados(productosActivos);
    } catch (error) {
      console.error('Error:', error);
      setProductos([]);
      setProductosFiltrados([]);
    } finally {
      setCargando(false);
    }
  };

  const cargarCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
      setCategorias([]);
    }
  };

  const filtrarProductos = () => {
    let productosFilt = [...productos];

    // Filtrar por categoría
    if (categoriaSeleccionada) {
      productosFilt = productosFilt.filter(
        p => p.categoria?.id === parseInt(categoriaSeleccionada)
      );
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      productosFilt = productosFilt.filter(p =>
        p.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.descripcion?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setProductosFiltrados(productosFilt);
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  const getImagenUrl = (rutaImagen) => {
    if (!rutaImagen) return null;
    
    // Si la ruta ya es una URL completa, usarla directamente
    if (rutaImagen.startsWith('http://') || rutaImagen.startsWith('https://')) {
      return rutaImagen;
    }
    
    // Si es una ruta relativa, construir la URL
    if (rutaImagen.startsWith('/img/') || rutaImagen.startsWith('img/')) {
      const cleanPath = rutaImagen.startsWith('/') ? rutaImagen.substring(1) : rutaImagen;
      return `/${cleanPath}`;
    }
    
    return `/img/otros/${rutaImagen}`;
  };

  const handleAgregarAlCarrito = (producto) => {
    // Verificar si el usuario está autenticado
    if (!isAuthenticated()) {
      alert('Tienes que iniciar sesión para agregar productos al carrito');
      navigate('/registro');
      return;
    }

    // Verificar stock
    if (producto.stock <= 0) {
      alert('Producto sin stock disponible');
      return;
    }

    // Agregar al carrito
    const resultado = agregarAlCarrito(producto, 1);
    
    if (resultado.success) {
      alert(`${producto.nombre} agregado al carrito`);
    } else {
      alert('Error al agregar el producto al carrito');
    }
  };

  if (cargando) {
    return (
        <div className="container mt-5 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
    );
  }

  return (
      <div className="productos-page">
        <div className="container">
          {/* Encabezado */}
          <div className="productos-header">
            <h2 className="text-center mb-4">Productos</h2>
            
            {/* Filtros */}
            <div className="row mb-4">
              <div className="col-md-6 mb-3 mb-md-0">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={categoriaSeleccionada}
                  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Grid de productos */}
          {productosFiltrados.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No se encontraron productos</p>
            </div>
          ) : (
            <div className="row g-4">
              {productosFiltrados.map(producto => (
                <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="card producto-card h-100">
                    {/* Imagen del producto */}
                    <div className="producto-card-img-container">
                      {producto.imagen ? (
                        <img
                          src={getImagenUrl(producto.imagen)}
                          className="card-img-top producto-card-img"
                          alt={producto.nombre}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="no-imagen-card" 
                        style={{ display: producto.imagen ? 'none' : 'flex' }}
                      >
                        <i className="bi bi-image" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                      </div>
                    </div>

                    {/* Contenido de la card */}
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title producto-titulo">{producto.nombre}</h5>
                      <p className="card-text producto-descripcion flex-grow-1">
                        {producto.descripcion}
                      </p>
                      <div className="producto-info mt-auto">
                        <p className="producto-precio mb-2">
                          {formatearPrecio(producto.precio)}
                        </p>
                        {producto.stock !== undefined && (
                          <p className="producto-stock mb-3">
                            <small className={producto.stock > 0 ? 'text-success' : 'text-danger'}>
                              {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Sin stock'}
                            </small>
                          </p>
                        )}
                        <button 
                          className="btn btn-dark w-100"
                          disabled={producto.stock === 0}
                          onClick={() => handleAgregarAlCarrito(producto)}
                        >
                          {producto.stock === 0 ? 'No disponible' : 'Agregar al carrito'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
}

