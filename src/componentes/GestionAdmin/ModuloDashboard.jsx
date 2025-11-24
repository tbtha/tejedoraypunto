import { useState, useEffect } from "react";
import { getBoletas } from "../../services/boletaService";
import "./ModuloDashboard.css";

export function ModuloDashboard() {
    const [estadisticas, setEstadisticas] = useState({
        totalProductos: 0,
        totalUsuarios: 0,
        productosBajoStock: [],
        valorInventario: 0,
        productosPorCategoria: {},
        // Estadísticas de pedidos
        totalPedidos: 0,
        pedidosPendientes: 0,
        pedidosConfirmados: 0,
        pedidosEnviados: 0,
        pedidosEntregados: 0,
        pedidosCancelados: 0,
        totalVentas: 0
    });
    const [categorias, setCategorias] = useState({});

    const cargarEstadisticas = async () => {
        try {
            // Obtener productos
            const responseProductos = await fetch('http://localhost:8082/api/productos');
            const productos = await responseProductos.json();
            console.log('Productos recibidos:', productos);

            try {
                // Obtener categorías
                const responseCategorias = await fetch('http://localhost:8082/api/categorias');
                if (responseCategorias.ok) {
                    const categoriasData = await responseCategorias.json();
                    console.log('Categorías recibidas:', categoriasData);
                    
                    // Crear un objeto de mapeo de id a nombre de categoría
                    const categoriasMap = {};
                    for (const cat of categoriasData) {
                        if (cat && cat.id && cat.nombre) {
                            categoriasMap[cat.id] = cat.nombre; // Las categorías ya tienen el nombre directamente
                        }
                    }
                    console.log('Mapa de categorías creado:', categoriasMap);
                    setCategorias(categoriasMap);
                } else {
                    console.error('Error al obtener categorías:', responseCategorias.status);
                }
            } catch (error_) {
                console.error('Error al cargar categorías:', error_);
            }

            // Obtener usuarios
            const responseUsuarios = await fetch('http://localhost:8082/api/usuarios');
            const usuarios = await responseUsuarios.json();
            console.log('Usuarios recibidos:', usuarios);

            // Asegurarse de que productos es un array antes de filtrar
            const productosArray = Array.isArray(productos) ? productos : [];
            
            // Filtrar productos con stock bajo (menor a 5 unidades) y normalizar datos
            const productosBajos = productosArray
                .filter(producto => {
                    const stock = Number(producto.stock);
                    return !Number.isNaN(stock) && stock < 5;
                })
                .map(producto => ({
                    id: producto.id || '',
                    nombre: String(producto.nombre || ''),
                    stock: Number(producto.stock || 0),
                    precio: Number(producto.precio || 0),
                    categoriaId: producto.categoria?.id || ''  // Accedemos al id dentro del objeto categoria
                }));

            // Calcular valor total del inventario
            const valorInventario = productosArray.reduce((total, producto) => {
                return total + (Number(producto.precio) * Number(producto.stock));
            }, 0);

            // Calcular productos por categoría
            const productosPorCategoria = {};
            for (const producto of productosArray) {
                const categoriaId = producto.categoria?.id;
                if (categoriaId) {
                    if (!productosPorCategoria[categoriaId]) {
                        productosPorCategoria[categoriaId] = {
                            cantidad: 0,
                            stockTotal: 0,
                            // Usamos el nombre que viene en el objeto categoria del producto
                            nombre: producto.categoria?.nombre || 'Sin categoría'
                        };
                    }
                    productosPorCategoria[categoriaId].cantidad++;
                    productosPorCategoria[categoriaId].stockTotal += Number(producto.stock || 0);
                }
            };

            // Obtener estadísticas de pedidos (boletas)
            let pedidosStats = {
                totalPedidos: 0,
                pedidosPendientes: 0,
                pedidosConfirmados: 0,
                pedidosEnviados: 0,
                pedidosEntregados: 0,
                pedidosCancelados: 0,
                totalVentas: 0
            };

            try {
                const boletas = await getBoletas();
                if (Array.isArray(boletas)) {
                    pedidosStats.totalPedidos = boletas.length;
                    
                    boletas.forEach(boleta => {
                        // Contar por estado
                        switch(boleta.estado) {
                            case 'PENDIENTE':
                                pedidosStats.pedidosPendientes++;
                                break;
                            case 'CONFIRMADA':
                                pedidosStats.pedidosConfirmados++;
                                break;
                            case 'ENVIADA':
                                pedidosStats.pedidosEnviados++;
                                break;
                            case 'ENTREGADA':
                                pedidosStats.pedidosEntregados++;
                                break;
                            case 'CANCELADA':
                                pedidosStats.pedidosCancelados++;
                                break;
                        }
                        
                        // Sumar total de ventas (solo pedidos no cancelados)
                        if (boleta.estado !== 'CANCELADA') {
                            pedidosStats.totalVentas += Number(boleta.total || 0);
                        }
                    });
                }
            } catch (error) {
                console.error('Error al cargar estadísticas de pedidos:', error);
            }

            setEstadisticas({
                totalProductos: productosArray.length,
                totalUsuarios: Array.isArray(usuarios) ? usuarios.length : 0,
                productosBajoStock: productosBajos,
                valorInventario,
                productosPorCategoria,
                ...pedidosStats
            });

        } catch (error) {
            console.error('Error al cargar las estadísticas:', error);
        }
    };

    useEffect(() => {
        cargarEstadisticas();
    }, []);

    return (
        <div className="container-fluid dashboard-container px-2 px-md-3 mt-3 mt-md-4">
            <h2 className="text-center mb-3 mb-md-4 dashboard-title">Dashboard Administrativo</h2>
            
            <div className="row g-2 g-md-3">
                {/* Tarjeta Total Productos */}
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card shadow-sm stat-card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Total Productos</h5>
                            <p className="display-stat">{estadisticas.totalProductos}</p>
                        </div>
                    </div>
                </div>

                {/* Tarjeta Total Usuarios */}
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card shadow-sm stat-card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Total Usuarios</h5>
                            <p className="display-stat">{estadisticas.totalUsuarios}</p>
                        </div>
                    </div>
                </div>

                {/* Tarjeta Stock Bajo */}
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card shadow-sm stat-card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Productos Stock Bajo</h5>
                            <p className="display-stat text-warning">{estadisticas.productosBajoStock.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Valor del Inventario */}
            <div className="row mt-3 mt-md-4 g-2 g-md-3">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body text-center">
                            <h5 className="card-title mb-2 mb-md-3">Valor Total del Inventario</h5>
                            <p className="display-stat text-success mb-0">${estadisticas.valorInventario.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estadísticas de Pedidos */}
            <div className="row mt-3 mt-md-4 g-2 g-md-3">
                <div className="col-12">
                    <h4 className="mb-3">Estadísticas de Pedidos</h4>
                </div>
                
                {/* Total de Pedidos */}
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card shadow-sm stat-card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Total Pedidos</h5>
                            <p className="display-stat">{estadisticas.totalPedidos}</p>
                        </div>
                    </div>
                </div>

                {/* Pedidos Pendientes */}
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card shadow-sm stat-card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Pendientes</h5>
                            <p className="display-stat text-warning">{estadisticas.pedidosPendientes}</p>
                        </div>
                    </div>
                </div>

                {/* Pedidos Confirmados */}
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card shadow-sm stat-card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Confirmados</h5>
                            <p className="display-stat text-info">{estadisticas.pedidosConfirmados}</p>
                        </div>
                    </div>
                </div>

                {/* Pedidos Enviados */}
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card shadow-sm stat-card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Enviados</h5>
                            <p className="display-stat text-primary">{estadisticas.pedidosEnviados}</p>
                        </div>
                    </div>
                </div>

                {/* Pedidos Entregados */}
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card shadow-sm stat-card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Entregados</h5>
                            <p className="display-stat text-success">{estadisticas.pedidosEntregados}</p>
                        </div>
                    </div>
                </div>

                {/* Pedidos Cancelados */}
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card shadow-sm stat-card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Cancelados</h5>
                            <p className="display-stat text-danger">{estadisticas.pedidosCancelados}</p>
                        </div>
                    </div>
                </div>

                {/* Total de Ventas */}
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body text-center">
                            <h5 className="card-title mb-2 mb-md-3">Total Ventas (Pedidos no cancelados)</h5>
                            <p className="display-stat text-success mb-0">${estadisticas.totalVentas.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Distribución por Categoría */}
            <div className="row mt-3 mt-md-4 g-2 g-md-3">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Distribución por Categoría</h5>
                            
                            {/* Vista de tabla para pantallas grandes */}
                            <div className="table-responsive d-none d-md-block">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Categoría</th>
                                            <th>Cantidad de Productos</th>
                                            <th>Stock Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(estadisticas.productosPorCategoria).map(([id, datos]) => (
                                            <tr key={id}>
                                                <td>{datos.nombre}</td>
                                                <td>{datos.cantidad}</td>
                                                <td>{datos.stockTotal}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Vista de tarjetas para móviles */}
                            <div className="d-md-none">
                                {Object.entries(estadisticas.productosPorCategoria).map(([id, datos]) => (
                                    <div key={id} className="categoria-card mb-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <strong className="categoria-nombre">{datos.nombre}</strong>
                                            <div className="text-end">
                                                <div><small className="text-muted">Productos:</small> <span className="badge bg-primary">{datos.cantidad}</span></div>
                                                <div><small className="text-muted">Stock:</small> <span className="badge bg-secondary">{datos.stockTotal}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Tabla de Productos con Stock Bajo */}
            <div className="row mt-3 mt-md-4 mb-4 g-2 g-md-3">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Detalle de Productos con Stock Bajo</h5>
                            
                            {estadisticas.productosBajoStock.length === 0 ? (
                                <div className="alert alert-success text-center">
                                    No hay productos con stock bajo
                                </div>
                            ) : (
                                <>
                                    {/* Vista de tabla para pantallas grandes */}
                                    <div className="table-responsive d-none d-md-block">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Nombre</th>
                                                    <th>Stock Actual</th>
                                                    <th>Precio</th>
                                                    <th>Categoría</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {estadisticas.productosBajoStock.map((producto) => {
                                                    const stockValue = Number(producto.stock || 0);
                                                    const precioValue = Number(producto.precio || 0);
                                                    
                                                    return (
                                                        <tr key={String(producto.id || 'unknown')} className="table-warning">
                                                            <td>{String(producto.nombre || 'Sin nombre')}</td>
                                                            <td><span className="badge bg-warning text-dark">{stockValue}</span></td>
                                                            <td>${precioValue.toLocaleString()}</td>
                                                            <td>{categorias[producto.categoriaId] || 'Sin categoría'}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Vista de tarjetas para móviles */}
                                    <div className="d-md-none">
                                        {estadisticas.productosBajoStock.map((producto) => {
                                            const stockValue = Number(producto.stock || 0);
                                            const precioValue = Number(producto.precio || 0);
                                            
                                            return (
                                                <div key={String(producto.id || 'unknown')} className="producto-card bg-warning-light mb-2 p-3">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <strong className="producto-nombre">{String(producto.nombre || 'Sin nombre')}</strong>
                                                        <span className="badge bg-warning text-dark">{stockValue} unid.</span>
                                                    </div>
                                                    <div className="row g-2">
                                                        <div className="col-6">
                                                            <small className="text-muted d-block">Precio</small>
                                                            <strong>${precioValue.toLocaleString()}</strong>
                                                        </div>
                                                        <div className="col-6">
                                                            <small className="text-muted d-block">Categoría</small>
                                                            <strong>{categorias[producto.categoriaId] || 'Sin categoría'}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
