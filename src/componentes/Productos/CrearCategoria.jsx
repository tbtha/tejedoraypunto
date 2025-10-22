import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import './CrearProducto.css';
import './CrearCategoria.css';

const API_BASE_URL = 'http://localhost:8082/api';

export function CrearCategoria() {
  
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState({
    nombre: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

  const categoriaParaEnviar = {
    nombre: categoria.nombre.trim()
  };

    try {
      const response = await fetch(`${API_BASE_URL}/categorias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoriaParaEnviar)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al crear el categoria');
      }

      navigate('/inventario', {
        state: { message: 'Categoria creado exitosamente' }
      });

    } catch (err) {
      setError(err.message || 'No se pudo crear el categoria');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const tieneContenido = Object.values(categoria).some(val => val !== '');

    if (!tieneContenido || window.confirm('¿Está seguro de cancelar? Se perderán los datos ingresados.')) {
      navigate('/inventario');
    }
  };

return (
  <>
    <main className="flex-grow-1">
      <Navbar />
      <div className="crear-categoria-container">
        <div className="form-card">
          <h2>Crear Categoria</h2>

          {error && (
            <div className="error-message">
              {error}
              <button onClick={() => setError(null)} className="error-close">×</button>
            </div>
          )}

          {loading ? (
            <div className="loading">Cargando..</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row crear-categoria-container">
                <div className="form-group">
                  <label htmlFor="nombre">
                    Nombre de la categoria <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={categoria.nombre}
                    onChange={handleChange}
                    disabled={loading}
                    maxLength={100}
                    placeholder="Chaleco, Bufanda, etc."
                    required
                  />
                </div>
                </div>

              <div className="form-actions">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? "Guardando..." : "Crear Categoria"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
    <Footer />
  </>
);
}