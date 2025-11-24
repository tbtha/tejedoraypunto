import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Productos.css';
import { getProductos, getCategorias } from '../../services/apiService';
import { getToken } from '../../services/authService';

export function InventarioProductos() {

    const [productos, setProductos] = useState([]);
        const [categorias, setCategorias] = useState([]);
        const [categoriaFilter, setCategoriaFilter] = useState('');
        const [searchQuery, setSearchQuery] = useState('');
 
    const cargarProductos = async () => {
        try {
            const data = await getProductos();
            console.log("Respuesta del backend:", data);

            if (!Array.isArray(data)) {
                console.error('La respuesta no es un array:', data);
                setProductos([]);
                return;
            }

            const productosNormalizados = data.map(p => ({
                ...p,
                activo: p.activo === true || p.activo === 'true',
                imagen: p.imagen && typeof p.imagen === 'string' && p.imagen.trim() !== '' ? p.imagen : null,
            }));

            setProductos(productosNormalizados);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            setProductos([]);
        }
    };

    const cargarCategorias = async () => {
        try {
            const data = await getCategorias();
            setCategorias(data);
        } catch (err) {
            console.error('Error al obtener categorias:', err);
        }
    };
 
    useEffect(() => {
        cargarProductos();
        cargarCategorias();
    }, []);

    const handleDesactivar = (id, nombre) => {
        if (window.confirm(`¿Estás seguro de desactivar el producto "${nombre}"?`)) {
            const token = getToken();
            fetch(`http://localhost:8082/api/productos/${id}/desactivar`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al desactivar el producto');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Producto desactivado:', data);
                    alert('Producto desactivado exitosamente');
                    cargarProductos();  
                })
                .catch(error => {
                    console.error('Error al desactivar:', error);
                    alert('Error al desactivar el producto');
                });
        }
    };

    const handleActivar = (id, nombre) => {
        if (window.confirm(`¿Estás seguro de activar el producto "${nombre}"?`)) {
            const token = getToken();
            fetch(`http://localhost:8082/api/productos/${id}/activar`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al activar el producto');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Producto activar:', data);
                    alert('Producto activar exitosamente');
                    cargarProductos();  
                })
                .catch(error => {
                    console.error('Error al activar:', error);
                    alert('Error al activar el producto');
                });
        }
    };

    return (
            <div className="container-fluid mi-tabla px-2 px-md-3">
                <h3 style={{ marginBottom: '20px' }}>Gestión de productos</h3>
                <div className="row mb-3 g-2">
                    <div className="col-12 col-md-6">
                        <div className="input-group">
                            <span className="input-group-text">Filtrar</span>
                            <select className="form-select" value={categoriaFilter} onChange={e => setCategoriaFilter(e.target.value)}>
                                <option value="">Todas las categorías</option>
                                {categorias.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="d-flex flex-column flex-md-row justify-content-md-end gap-2">
                            <div className="input-group">
                                <input className="form-control form-control-sm" placeholder="Buscar por nombre..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                                <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => { setSearchQuery(''); setCategoriaFilter(''); }} title="Limpiar filtros">Limpiar</button>
                            </div>
                            <div className="d-flex gap-2">
                                <Link className="btn btn-outline-dark flex-fill flex-md-grow-0"
                                    style={{ fontSize: '13px' }} to="/crear-producto">Crear Producto
                                </Link>
                                <Link className="btn btn-outline-dark flex-fill flex-md-grow-0"
                                    style={{ fontSize: '13px' }} to="/crear-categoria">Crear Categoria
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Vista de tabla para pantallas grandes */}
                <div className="row d-none d-lg-block">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Categoría</th>
                                        <th>Editar</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos
                                        .filter(prod => {
                                            if (categoriaFilter && String(prod.categoria?.id) !== String(categoriaFilter)) return false;
                                            if (searchQuery && !prod.nombre.toLowerCase().includes(searchQuery.toLowerCase())) return false;
                                            return true;
                                        })
                                        .map((prod) => {
                                        const rowClass = !prod.activo ? 'text-muted' : '';
                                        return (
                                            <tr key={prod.id} className={rowClass}>
                                                <td>{prod.id}</td>
                                                <td>
                                                    {prod.imagen && prod.imagen.trim() !== '' ? (
                                                        <img 
                                                            src={`/${prod.imagen}`} 
                                                            alt={prod.nombre || 'Producto'}
                                                            className="producto-imagen-thumbnail"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextSibling.style.display = 'flex';
                                                            }}
                                                        />
                                                    ) : null}
                                                    <div className="no-imagen-placeholder" style={{ display: prod.imagen && prod.imagen.trim() !== '' ? 'none' : 'flex' }}>
                                                        Sin imagen
                                                    </div>
                                                </td>
                                                <td>{prod.nombre}</td>
                                                <td>{prod.descripcion}</td>
                                                <td>${prod.precio}</td>
                                                <td>
                                                    {Number(prod.stock) < 5 ? (
                                                        <span className="badge bg-warning text-dark">{prod.stock} (Bajo)</span>
                                                    ) : (
                                                        <span>{prod.stock}</span>
                                                    )}
                                                </td>
                                                <td>{prod.categoria?.nombre || 'Sin categoría'}</td>
                                                <td>
                                                    {prod.activo ? (
                                                        <Link className="btn btn-sm btn-outline-primary"
                                                            to={`/editar-producto/${prod.id}`}>
                                                            Editar
                                                        </Link>
                                                    ) : (
                                                        <button className="btn btn-sm btn-outline-secondary" disabled>
                                                            Editar
                                                        </button>
                                                    )}
                                                </td>
                                                <td>
                                                    {prod.activo ? (
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDesactivar(prod.id, prod.nombre)}>
                                                            Desactivar
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-sm btn-outline-success"
                                                            onClick={() => handleActivar(prod.id, prod.nombre)}>
                                                            Activar
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Vista de tarjetas para pantallas pequeñas y medianas */}
                <div className="row d-lg-none">
                    <div className="col-12">
                        {productos
                            .filter(prod => {
                                if (categoriaFilter && String(prod.categoria?.id) !== String(categoriaFilter)) return false;
                                if (searchQuery && !prod.nombre.toLowerCase().includes(searchQuery.toLowerCase())) return false;
                                return true;
                            })
                            .map((prod) => (
                                <div key={prod.id} className={`card mb-3 ${!prod.activo ? 'bg-light' : ''}`}>
                                    <div className="card-body">
                                        {prod.imagen && prod.imagen.trim() !== '' && (
                                            <div className="producto-imagen-card mb-2">
                                                <img 
                                                    src={`/${prod.imagen}`} 
                                                    alt={prod.nombre || 'Producto'}
                                                    className="producto-imagen-mobile"
                                                    onError={(e) => {
                                                        e.target.parentElement.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h5 className="card-title mb-0">{prod.nombre}</h5>
                                            {!prod.activo && (
                                                <span className="badge bg-secondary">Inactivo</span>
                                            )}
                                        </div>
                                        <p className="card-text text-muted small mb-2">{prod.descripcion}</p>
                                        <div className="row g-2 mb-3">
                                            <div className="col-6">
                                                <small className="text-muted d-block">ID</small>
                                                <strong>{prod.id}</strong>
                                            </div>
                                            <div className="col-6">
                                                <small className="text-muted d-block">Precio</small>
                                                <strong>${prod.precio}</strong>
                                            </div>
                                            <div className="col-6">
                                                <small className="text-muted d-block">Stock</small>
                                                {Number(prod.stock) < 5 ? (
                                                    <span className="badge bg-warning text-dark">{prod.stock} (Bajo)</span>
                                                ) : (
                                                    <strong>{prod.stock}</strong>
                                                )}
                                            </div>
                                            <div className="col-6">
                                                <small className="text-muted d-block">Categoría</small>
                                                <strong>{prod.categoria?.nombre || 'Sin categoría'}</strong>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-2">
                                            {prod.activo ? (
                                                <Link className="btn btn-sm btn-outline-primary flex-fill"
                                                    to={`/editar-producto/${prod.id}`}>
                                                    Editar Producto
                                                </Link>
                                            ) : (
                                                <button className="btn btn-sm btn-outline-secondary flex-fill" disabled>
                                                    Editar Producto
                                                </button>
                                            )}
                                            {prod.activo ? (
                                                <button
                                                    className="btn btn-sm btn-outline-danger flex-fill"
                                                    onClick={() => handleDesactivar(prod.id, prod.nombre)}>
                                                    Desactivar
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-sm btn-outline-success flex-fill"
                                                    onClick={() => handleActivar(prod.id, prod.nombre)}>
                                                    Activar
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
    );
}