import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';

export function EditarProd() {
    const { id } = useParams();
    const navigate = useNavigate();
    const productoId = parseInt(id);

    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        activo: '',
        categoria: {
            id: '',
            nombre: ''
        }
    });

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setLoading(true);

                const respProducto = await fetch(`http://localhost:8082/api/productos/${productoId}`);

                if (!respProducto.ok) {
                    throw new Error('Error al cargar el producto')
                }
                const dataProducto = await respProducto.json();

                console.log('Producto cargado:', dataProducto);

                // Mantener la categoría tal como viene del backend
                setProducto({
                    ...dataProducto,
                    descripcion: dataProducto.descripcion || ''
                });

                const respCategorias = await fetch('http://localhost:8082/api/categorias');

                if (!respCategorias.ok) {
                    throw new Error('Error al cargar categorías')
                }
                const dataCategorias = await respCategorias.json();
                setCategorias(dataCategorias);

                setError(null);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (productoId) {
            cargarDatos();
        }
    }, [productoId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log('Campo modificado:', name, 'Valor:', value, 'Tipo:', typeof value);


        if (name === 'categoriaId') {
            const categoriaSeleccionada = categorias.find(c => c.id === parseInt(value));
            setProducto(prev => ({
                ...prev,
                categoria: categoriaSeleccionada || { id: value, nombre: '' }
            }));
        } else {

            setProducto(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async () => {
        setSaving(true);
        setError(null);
        setSuccess(false);

        try {
            const datosActualizados = {
                id: producto.id,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio: parseInt(producto.precio) || 0,
                
            };

            if (producto.categoria && producto.categoria.id) {
                datosActualizados.categoria = {
                    id: producto.categoria.id,
                    nombre: producto.categoria.nombre
                };
            }

            console.log('Datos a enviar:', datosActualizados);

            const response = await fetch(`http://localhost:8082/api/productos/${productoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosActualizados)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Respuesta del servidor:', errorText);
                throw new Error('Error al actualizar el producto');
            }

            const productoActualizado = await response.json();
            console.log('Producto actualizado exitosamente:', productoActualizado);
            setSuccess(true);

            setTimeout(() => {
                navigate('/productos');
            }, 1500);

        } catch (err) {
            console.error('Error completo:', err);
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleVolver = () => {
        navigate('/productos');
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-3 text-muted">Cargando producto...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container mt-3" style={{ maxWidth: '600px' }}>
                <div className="card">
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-2">
                        <h6 className="mb-0">Editar Producto</h6>
                        <button
                            onClick={handleVolver}
                            type="button"
                            className="btn-close btn-close-white"
                            aria-label="Cerrar"
                        ></button>
                    </div>

                    <div className="card-body p-3">
                        {error && (
                            <div className="alert alert-danger py-2 mb-2 small">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="alert alert-success py-2 mb-2 small">
                                Producto actualizado exitosamente
                            </div>
                        )}

                        <div className="mb-2">
                            <label className="form-label small mb-1">Nombre del Producto</label>
                            <input
                                type="text"
                                value={producto.nombre}
                                onChange={handleChange}
                                // disabled
                                className="form-control form-control-sm bg-light"
                                placeholder="Nombre del Producto"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="form-label small mb-1">Descripción</label>
                            <textarea
                                name="descripcion"
                                value={producto.descripcion}
                                onChange={handleChange}
                                rows={2}
                                className="form-control form-control-sm"
                                placeholder="Descripción del producto"
                            />
                        </div>

                        <div className="row g-2 mb-2">
                            <div className="col-6">
                                <label className="form-label small mb-1">Precio</label>
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text">$</span>
                                    <input
                                        type="number"
                                        name="precio"
                                        value={producto.precio}
                                        onChange={handleChange}
                                        min="0"
                                        className="form-control"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* categoria */}
                        <div className="mb-3">
                            <label className="form-label small mb-1">Categoría</label>
                            <input
                                type="text"
                                value={producto.categoria?.nombre || 'Sin categoría'}
                                disabled
                                className="form-control form-control-sm bg-light"/>
                        </div>

                        {/* <div className="mb-3">
                            <label className="form-label small mb-1">Estado</label>
                            <input
                                type="text"
                                value={producto.activo? 
                                'Activo' : 'Inactivo'
                                }
                                disabled
                                className="form-control form-control-sm bg-light"/>
                        </div> */}

                        {/* botones */}
                        <div className="d-flex gap-2 pt-2 border-top">
                            <button
                                onClick={handleVolver}
                                type="button"
                                className="btn btn-sm btn-secondary">
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={saving}
                                type="button"
                                className="btn btn-sm btn-primary flex-grow-1">
                                {saving ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}