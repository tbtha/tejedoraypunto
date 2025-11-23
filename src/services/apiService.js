import axios from 'axios';
import { getToken, logout } from './authService';

const API_URL = 'http://localhost:8082';

// Crear instancia de axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token inválido o expirado
      logout();
      window.location.href = '/registro';
    }
    return Promise.reject(error);
  }
);

// ========== PRODUCTOS ==========

export const getProductos = async () => {
  try {
    const response = await apiClient.get('/api/productos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const getProductoById = async (id) => {
  try {
    const response = await apiClient.get(`/api/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
};

export const createProducto = async (producto) => {
  try {
    const response = await apiClient.post('/api/productos', producto);
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

export const updateProducto = async (id, producto) => {
  try {
    const response = await apiClient.put(`/api/productos/${id}`, producto);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

export const deleteProducto = async (id) => {
  try {
    const response = await apiClient.delete(`/api/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};

// ========== CATEGORÍAS ==========

export const getCategorias = async () => {
  try {
    const response = await apiClient.get('/api/categorias');
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};

export const getCategoriaById = async (id) => {
  try {
    const response = await apiClient.get(`/api/categorias/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    throw error;
  }
};

export const createCategoria = async (categoria) => {
  try {
    const response = await apiClient.post('/api/categorias', categoria);
    return response.data;
  } catch (error) {
    console.error('Error al crear categoría:', error);
    throw error;
  }
};

export const updateCategoria = async (id, categoria) => {
  try {
    const response = await apiClient.put(`/api/categorias/${id}`, categoria);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    throw error;
  }
};

export const deleteCategoria = async (id) => {
  try {
    const response = await apiClient.delete(`/api/categorias/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    throw error;
  }
};

// ========== USUARIOS ==========

export const getUsuarios = async () => {
  try {
    const response = await apiClient.get('/api/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

export const getUsuarioById = async (id) => {
  try {
    const response = await apiClient.get(`/api/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    throw error;
  }
};

export const createUsuario = async (usuario) => {
  try {
    const response = await apiClient.post('/api/usuarios', usuario);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

export const updateUsuario = async (id, usuario) => {
  try {
    const response = await apiClient.put(`/api/usuarios/${id}`, usuario);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

export const deleteUsuario = async (id) => {
  try {
    const response = await apiClient.delete(`/api/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};

export default apiClient;
