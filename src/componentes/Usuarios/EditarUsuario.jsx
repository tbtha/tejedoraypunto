import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NavbarAdmi } from '../Navbar/NavbarAdmi';
import { Footer } from '../Footer/Footer';
import {
  validarCorreo,
  validarNombre,
} from '../InicioSesion/validaciones';
import { regionesYComunas } from '../InicioSesion/regionycomuna';
import './EditarUsuario.css';
import { getUsuarioById, updateUsuario } from '../../services/apiService';

export  function EditarUsuario() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mensajes, setMensajes] = useState({});
  const [mensajeError, setMensajeError] = useState('');
  const [cargando, setCargando] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    region: '',
    comuna: '',
    rol: 'USER',
    activo: true
  });

  useEffect(() => {
    cargarUsuario();
  }, [id]);

  const cargarUsuario = async () => {
    try {
      const data = await getUsuarioById(id);
      setFormData({
        nombre: data.nombre || '',
        email: data.email || '',
        region: data.region || '',
        comuna: data.comuna || '',
        rol: data.rol || 'USER',
        activo: data.activo !== undefined ? data.activo : true
      });
    } catch (error) {
      console.error('Error:', error);
      setMensajeError('Error al conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Validaciones en tiempo real
    let msg = '';
    switch (name) {
      case 'email':
        [msg] = validarCorreo(value);
        break;
      case 'nombre':
        [msg] = validarNombre(value);
        break;
      default:
        break;
    }
    setMensajes({ ...mensajes, [name]: msg });
  };

  const handleRegionChange = (e) => {
    setFormData({
      ...formData,
      region: e.target.value,
      comuna: '' // Resetear comuna cuando cambia región
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError('');

    // Validar campos obligatorios
    if (!formData.nombre || !formData.email || !formData.region || !formData.comuna) {
      setMensajeError('Por favor, completa todos los campos obligatorios');
      return;
    }

    // Validar formato de datos
    const [msgEmail, validoEmail] = validarCorreo(formData.email);
    const [msgNombre, validoNombre] = validarNombre(formData.nombre);

    if (!validoEmail || !validoNombre) {
      setMensajeError('Por favor, valida los campos correctamente');
      return;
    }

    try {
      await updateUsuario(id, formData);
      alert('Usuario actualizado exitosamente');
      navigate('/usuarios');
    } catch (error) {
      console.error('Error:', error);
      setMensajeError(error.message || 'Error al conectar con el servidor');
    }
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
      <NavbarAdmi />
      <div className="container editar-usuario-container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card shadow-sm mt-4 mb-4">
              <div className="card-body">
                <h3 className="card-title mb-4 text-center">Editar Usuario</h3>
                
                {mensajeError && (
                  <div className="alert alert-danger" role="alert">
                    {mensajeError}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Nombre */}
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre completo <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                    {mensajes.nombre && (
                      <small className={mensajes.nombre.includes('✔️') ? 'text-success' : 'text-danger'}>
                        {mensajes.nombre}
                      </small>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {mensajes.email && (
                      <small className={mensajes.email.includes('✔️') ? 'text-success' : 'text-danger'}>
                        {mensajes.email}
                      </small>
                    )}
                  </div>


                  {/* Región */}
                  <div className="mb-3">
                    <label htmlFor="region" className="form-label">
                      Región <span className="text-danger">*</span>
                    </label>
                    <select
                      id="region"
                      name="region"
                      className="form-select"
                      value={formData.region}
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
                      id="comuna"
                      name="comuna"
                      className="form-select"
                      value={formData.comuna}
                      onChange={handleChange}
                      disabled={!formData.region}
                      required
                    >
                      <option value="">Selecciona una comuna</option>
                      {formData.region && regionesYComunas[formData.region]?.map((comuna) => (
                        <option key={comuna} value={comuna}>
                          {comuna}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rol y Activo en la misma fila */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="rol" className="form-label">
                          Rol <span className="text-danger">*</span>
                        </label>
                        <select
                          id="rol"
                          name="rol"
                          className="form-select"
                          value={formData.rol}
                          onChange={handleChange}
                          required
                        >
                          <option value="USER">Usuario</option>
                          <option value="ADMIN">Administrador</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label d-block">Estado</label>
                        <div className="form-check form-switch" style={{ paddingTop: '8px' }}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="activo"
                            name="activo"
                            checked={formData.activo}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="activo">
                            {formData.activo ? 'Activo' : 'Inactivo'}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="d-flex gap-2 justify-content-end">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate('usuarios')}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-dark">
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


