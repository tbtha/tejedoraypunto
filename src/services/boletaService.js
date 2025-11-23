import apiClient from './apiService';

// ============= BOLETAS =============

/**
 * Crear una nueva boleta
 * @param {Object} boletaData - Datos de la boleta
 * @returns {Promise} Boleta creada
 */
export const createBoleta = async (boletaData) => {
  try {
    const response = await apiClient.post('/api/boletas', boletaData);
    return response.data;
  } catch (error) {
    console.error('Error al crear boleta:', error);
    throw error;
  }
};

/**
 * Obtener todas las boletas (solo ADMIN)
 * @returns {Promise} Lista de boletas
 */
export const getBoletas = async () => {
  try {
    const response = await apiClient.get('/api/boletas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener boletas:', error);
    throw error;
  }
};

/**
 * Obtener boleta por ID
 * @param {number} id - ID de la boleta
 * @returns {Promise} Boleta
 */
export const getBoletaById = async (id) => {
  try {
    const response = await apiClient.get(`/api/boletas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener boleta:', error);
    throw error;
  }
};

/**
 * Obtener boletas de un usuario
 * @param {number} usuarioId - ID del usuario
 * @returns {Promise} Lista de boletas del usuario
 */
export const getBoletasByUsuario = async (usuarioId) => {
  try {
    const response = await apiClient.get(`/api/boletas/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener boletas del usuario:', error);
    throw error;
  }
};

/**
 * Obtener boletas por estado (solo ADMIN)
 * @param {string} estado - Estado de la boleta (PENDIENTE, CONFIRMADA, etc.)
 * @returns {Promise} Lista de boletas con ese estado
 */
export const getBoletasByEstado = async (estado) => {
  try {
    const response = await apiClient.get(`/api/boletas/estado/${estado}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener boletas por estado:', error);
    throw error;
  }
};

/**
 * Actualizar boleta (solo ADMIN)
 * @param {number} id - ID de la boleta
 * @param {Object} boletaData - Datos actualizados
 * @returns {Promise} Boleta actualizada
 */
export const updateBoleta = async (id, boletaData) => {
  try {
    const response = await apiClient.put(`/api/boletas/${id}`, boletaData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar boleta:', error);
    throw error;
  }
};

/**
 * Cambiar estado de boleta (solo ADMIN)
 * @param {number} id - ID de la boleta
 * @param {string} estado - Nuevo estado
 * @returns {Promise} Boleta actualizada
 */
export const cambiarEstadoBoleta = async (id, estado) => {
  try {
    const response = await apiClient.patch(`/api/boletas/${id}/estado?estado=${estado}`);
    return response.data;
  } catch (error) {
    console.error('Error al cambiar estado de boleta:', error);
    throw error;
  }
};

/**
 * Eliminar boleta (solo ADMIN)
 * @param {number} id - ID de la boleta
 * @returns {Promise}
 */
export const deleteBoleta = async (id) => {
  try {
    const response = await apiClient.delete(`/api/boletas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar boleta:', error);
    throw error;
  }
};

// ============= DETALLES DE BOLETA =============

/**
 * Crear detalle de boleta
 * @param {Object} detalleData - Datos del detalle
 * @returns {Promise} Detalle creado
 */
export const createDetalleBoleta = async (detalleData) => {
  try {
    const response = await apiClient.post('/api/detalles-boleta', detalleData);
    return response.data;
  } catch (error) {
    console.error('Error al crear detalle de boleta:', error);
    throw error;
  }
};

/**
 * Obtener todos los detalles (solo ADMIN)
 * @returns {Promise} Lista de detalles
 */
export const getDetallesBoleta = async () => {
  try {
    const response = await apiClient.get('/api/detalles-boleta');
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles:', error);
    throw error;
  }
};

/**
 * Obtener detalle por ID
 * @param {number} id - ID del detalle
 * @returns {Promise} Detalle
 */
export const getDetalleBoletaById = async (id) => {
  try {
    const response = await apiClient.get(`/api/detalles-boleta/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalle:', error);
    throw error;
  }
};

/**
 * Obtener detalles de una boleta específica
 * @param {number} boletaId - ID de la boleta
 * @returns {Promise} Lista de detalles de la boleta
 */
export const getDetallesByBoleta = async (boletaId) => {
  try {
    const response = await apiClient.get(`/api/detalles-boleta/boleta/${boletaId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de la boleta:', error);
    throw error;
  }
};

/**
 * Actualizar detalle (solo ADMIN)
 * @param {number} id - ID del detalle
 * @param {Object} detalleData - Datos actualizados
 * @returns {Promise} Detalle actualizado
 */
export const updateDetalleBoleta = async (id, detalleData) => {
  try {
    const response = await apiClient.put(`/api/detalles-boleta/${id}`, detalleData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar detalle:', error);
    throw error;
  }
};

/**
 * Eliminar detalle (solo ADMIN)
 * @param {number} id - ID del detalle
 * @returns {Promise}
 */
export const deleteDetalleBoleta = async (id) => {
  try {
    const response = await apiClient.delete(`/api/detalles-boleta/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar detalle:', error);
    throw error;
  }
};
