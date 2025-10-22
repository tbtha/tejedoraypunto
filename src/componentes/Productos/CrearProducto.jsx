import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarAdmi } from "../Navbar/NavbarAdmi";
import { Footer } from "../Footer/Footer";
import './CrearProducto.css';

const API_BASE_URL = 'http://localhost:8082/api';

export function CrearProducto() {
  
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    imagen: '',
    activo: true
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [imagenFile, setImagenFile] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categorias`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar categorías');
        }
        return response.json();
      })
      .then(data => {
        setCategorias(data);
        setLoadingCategorias(false); // ← Termina la carga exitosa
      })
      .catch(error => {
        console.error('Error al obtener las categorías:', error);
        setError('No se pudieron cargar las categorías');
        setLoadingCategorias(false); // ← Termina la carga con error
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Por favor seleccione una imagen válida (JPG, PNG, GIF, WEBP)');
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('La imagen no debe superar los 5MB');
        return;
      }

      setImagenFile(file);
      
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleRemoveImage = () => {
    setImagenFile(null);
    setImagenPreview(null);
    setProducto(prev => ({
      ...prev,
      imagen: ''
    }));
  };

  const subirImagen = async (file) => {
    try {
      const formData = new FormData();
      formData.append('imagen', file);

      const response = await fetch(`${API_BASE_URL}/upload-imagen`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }

      const data = await response.json();
      return data.ruta; // Retorna la ruta donde se guardó la imagen
    } catch (error) {
      console.error('Error al subir imagen:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let rutaImagen = null;

      // Si hay imagen, primero subirla
      if (imagenFile) {
        rutaImagen = await subirImagen(imagenFile);
      }

      // Crear el producto con la ruta de la imagen
      const productoParaEnviar = {
        nombre: producto.nombre.trim(),
        descripcion: producto.descripcion.trim(),
        precio: parseFloat(producto.precio),
        stock: parseInt(producto.stock, 10),
        imagen: rutaImagen,
        activo: producto.activo,
        categoria: { id: parseInt(producto.categoria, 10) }
      };

      const response = await fetch(`${API_BASE_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoParaEnviar)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al crear el producto');
      }

      navigate('/inventario', {
        state: { message: 'Producto creado exitosamente' }
      });

    } catch (err) {
      setError(err.message || 'No se pudo crear el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const tieneContenido = Object.values(producto).some(val => val !== '');

    if (!tieneContenido || window.confirm('¿Está seguro de cancelar? Se perderán los datos ingresados.')) {
      navigate('/inventario');
    }
  };

return (
  <>
    <main className="flex-grow-1">
        <div className="container">
      <NavbarAdmi />
      <div className="crear-producto-container">
        <div className="form-card">
          <h2>Crear Producto</h2>

          {error && (
            <div className="error-message">
              {error}
              <button onClick={() => setError(null)} className="error-close">×</button>
            </div>
          )}

          {loadingCategorias ? (
            <div className="loading">Cargando categorías...</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">
                    Nombre del producto <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    disabled={loading}
                    maxLength={100}
                    placeholder="Chaleco de lana, Bufanda tejida, etc."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="precio">
                    Precio <span className="required">*</span>
                  </label>
                  <div className="price-input">
                    <span className="currency">$</span>
                    <input
                      type="number"
                      id="precio"
                      name="precio"
                      step="1"
                      min="1"
                      value={producto.precio}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="1000"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="stock">
                  Stock inicial <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  min="0"
                  step="1"
                  value={producto.stock}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="10"
                  required
                />
                <small className="char-count">Cantidad de unidades disponibles</small>
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">
                  Descripción <span className="required">*</span>
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  rows="4"
                  value={producto.descripcion}
                  onChange={handleChange}
                  disabled={loading}
                  maxLength={500}
                  placeholder="Características principales del producto..."
                  required
                />
                <small className="char-count">
                  {producto.descripcion.length}/500 caracteres
                </small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="categoria">
                    Categoría <span className="required">*</span>
                  </label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={producto.categoria}
                    onChange={handleChange}
                    disabled={loading || categorias.length === 0}
                    required
                  >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                  {categorias.length === 0 && !loadingCategorias && (
                    <small className="error-text">No hay categorías disponibles</small>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="activo">
                    Estado del producto
                  </label>
                  <select
                    id="activo"
                    name="activo"
                    value={producto.activo}
                    onChange={(e) => setProducto(prev => ({
                      ...prev,
                      activo: e.target.value === 'true'
                    }))}
                    disabled={loading}
                  >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                  <small className="char-count">Define si el producto estará visible</small>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="imagen">
                  Imagen del producto
                </label>
                <div className="image-upload-container">
                  {!imagenPreview ? (
                    <div className="image-upload-area">
                      <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        accept="image/*"
                        onChange={handleImagenChange}
                        disabled={loading}
                        className="file-input"
                      />
                      <label htmlFor="imagen" className="file-label">
                        <div className="upload-icon">📷</div>
                        <span>Seleccionar imagen</span>
                        <small>JPG, PNG, GIF o WEBP (máx. 5MB)</small>
                      </label>
                    </div>
                  ) : (
                    <div className="image-preview-container">
                      <img src={imagenPreview} alt="Preview" className="image-preview" />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="remove-image-btn"
                        disabled={loading}
                      >
                        ✕ Quitar imagen
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? "Guardando..." : "Crear Producto"}
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
        </div>
    </main>
    <Footer />
  </>
);
}