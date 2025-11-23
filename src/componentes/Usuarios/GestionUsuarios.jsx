import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './GestionUsuarios.css';
import { getUsuarios } from '../../services/apiService';
import { getToken } from '../../services/authService';

export function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [estadoFilter, setEstadoFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const cargarUsuarios = async () => {
        try {                            
            const data = await getUsuarios();
            console.log("Usuarios del backend:", data);

            if (!Array.isArray(data)) {
                console.error('La respuesta no es un array:', data);
                setUsuarios([]);
                return;
            }

            const usuariosNormalizados = data.map(u => ({
                ...u,
                activo: u.activo === true || u.activo === 'true',
            }));

            setUsuarios(usuariosNormalizados);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            setUsuarios([]);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const handleDesactivar = (id, nombre) => {
        if (window.confirm(`¿Estás seguro de desactivar al usuario "${nombre}"?`)) {
            const token = getToken();
            fetch(`http://localhost:8082/api/usuarios/${id}/desactivar`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al desactivar el usuario');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Usuario desactivado:', data);
                    alert('Usuario desactivado exitosamente');
                    cargarUsuarios();
                })
                .catch(error => {
                    console.error('Error al desactivar:', error);
                    alert('Error al desactivar el usuario');
                });
        }
    };

    const handleActivar = (id, nombre) => {
        if (window.confirm(`¿Estás seguro de activar al usuario "${nombre}"?`)) {
            const token = getToken();
            fetch(`http://localhost:8082/api/usuarios/${id}/activar`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al activar el usuario');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Usuario activado:', data);
                    alert('Usuario activado exitosamente');
                    cargarUsuarios();
                })
                .catch(error => {
                    console.error('Error al activar:', error);
                    alert('Error al activar el usuario');
                });
        }
    };

    return (
        <div className="container-fluid mi-tabla-usuarios px-2 px-md-3">
            <h3 style={{ marginBottom: '20px' }}>Gestión de Usuarios</h3>
            
            <div className="row mb-3 g-2">
                <div className="col-12 col-md-6">
                    <div className="input-group">
                        <span className="input-group-text">Estado</span>
                        <select className="form-select" value={estadoFilter} onChange={e => setEstadoFilter(e.target.value)}>
                            <option value="">Todos los usuarios</option>
                            <option value="true">Activos</option>
                            <option value="false">Inactivos</option>
                        </select>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="d-flex flex-column flex-md-row justify-content-md-end gap-2">
                        <div className="input-group">
                            <input 
                                className="form-control form-control-sm" 
                                placeholder="Buscar por nombre..." 
                                value={searchQuery} 
                                onChange={e => setSearchQuery(e.target.value)} 
                            />
                            <button 
                                className="btn btn-sm btn-outline-secondary" 
                                type="button" 
                                onClick={() => { setSearchQuery(''); setEstadoFilter(''); }} 
                                title="Limpiar filtros"
                            >
                                Limpiar
                            </button>
                        </div>
                        <Link 
                            className="btn btn-outline-dark flex-fill flex-md-grow-0"
                            style={{ fontSize: '13px' }} 
                            to="/crear-usuario"
                        >
                            Crear Usuario
                        </Link>
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
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Región</th>
                                    <th>Comuna</th>
                                    <th>Rol</th>
                                    <th>Editar</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios
                                    .filter(user => {
                                        // Filtro por estado
                                        if (estadoFilter && String(user.activo) !== estadoFilter) return false;
                                        // Filtro por nombre
                                        if (searchQuery && !user.nombre.toLowerCase().includes(searchQuery.toLowerCase())) return false;
                                        return true;
                                    })
                                    .map((user) => {
                                        const rowClass = !user.activo ? 'text-muted' : '';
                                        return (
                                            <tr key={user.id} className={rowClass}>
                                                <td>{user.id}</td>
                                                <td>{user.nombre}</td>
                                                <td>{user.email}</td>
                                                <td>{user.region || 'N/A'}</td>
                                                <td>{user.comuna || 'N/A'}</td>
                                                <td>
                                                    <span className={`badge ${user.rol === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>
                                                        {user.rol || 'USER'}
                                                    </span>
                                                </td>
                                                <td>
                                                    {user.activo ? (
                                                        <Link 
                                                            className="btn btn-sm btn-outline-primary"
                                                            to={`/editar-usuario/${user.id}`}
                                                        >
                                                            Editar
                                                        </Link>
                                                    ) : (
                                                        <button className="btn btn-sm btn-outline-secondary" disabled>
                                                            Editar
                                                        </button>
                                                    )}
                                                </td>
                                                <td>
                                                    {user.activo ? (
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDesactivar(user.id, user.nombre)}
                                                        >
                                                            Desactivar
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-sm btn-outline-success"
                                                            onClick={() => handleActivar(user.id, user.nombre)}
                                                        >
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
                    {usuarios
                        .filter(user => {
                            if (estadoFilter && String(user.activo) !== estadoFilter) return false;
                            if (searchQuery && !user.nombre.toLowerCase().includes(searchQuery.toLowerCase())) return false;
                            return true;
                        })
                        .map((user) => (
                            <div key={user.id} className={`card mb-3 ${!user.activo ? 'bg-light' : ''}`}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h5 className="card-title mb-0">{user.nombre}</h5>
                                        <div className="d-flex gap-2">
                                            <span className={`badge ${user.rol === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>
                                                {user.rol || 'USER'}
                                            </span>
                                            {!user.activo && (
                                                <span className="badge bg-secondary">Inactivo</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row g-2 mb-3">
                                        <div className="col-12">
                                            <small className="text-muted d-block">Email</small>
                                            <strong>{user.email}</strong>
                                        </div>
                                        <div className="col-6">
                                            <small className="text-muted d-block">ID</small>
                                            <strong>{user.id}</strong>
                                        </div>
                                        <div className="col-6">
                                            <small className="text-muted d-block">Región</small>
                                            <strong>{user.region || 'N/A'}</strong>
                                        </div>
                                        <div className="col-6">
                                            <small className="text-muted d-block">Comuna</small>
                                            <strong>{user.comuna || 'N/A'}</strong>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2">
                                        {user.activo ? (
                                            <Link 
                                                className="btn btn-sm btn-outline-primary flex-fill"
                                                to={`/editar-usuario/${user.id}`}
                                            >
                                                Editar Usuario
                                            </Link>
                                        ) : (
                                            <button className="btn btn-sm btn-outline-secondary flex-fill" disabled>
                                                Editar Usuario
                                            </button>
                                        )}
                                        {user.activo ? (
                                            <button
                                                className="btn btn-sm btn-outline-danger flex-fill"
                                                onClick={() => handleDesactivar(user.id, user.nombre)}
                                            >
                                                Desactivar
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-sm btn-outline-success flex-fill"
                                                onClick={() => handleActivar(user.id, user.nombre)}
                                            >
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
