// Servicio para manejar el carrito de compras

const CARRITO_KEY = 'carrito';

// Obtener carrito del localStorage
export const getCarrito = () => {
  try {
    const carrito = localStorage.getItem(CARRITO_KEY);
    return carrito ? JSON.parse(carrito) : [];
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    return [];
  }
};

// Guardar carrito en localStorage
const guardarCarrito = (carrito) => {
  try {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
  } catch (error) {
    console.error('Error al guardar el carrito:', error);
  }
};

// Agregar producto al carrito
export const agregarAlCarrito = (producto, cantidad = 1) => {
  try {
    const carrito = getCarrito();
    
    // Verificar si el producto ya existe en el carrito
    const index = carrito.findIndex(item => item.id === producto.id);
    
    if (index !== -1) {
      // Si existe, aumentar la cantidad
      carrito[index].cantidad += cantidad;
      
      // Verificar que no exceda el stock
      if (carrito[index].cantidad > producto.stock) {
        carrito[index].cantidad = producto.stock;
      }
    } else {
      // Si no existe, agregarlo
      carrito.push({
        ...producto,
        cantidad: cantidad
      });
    }
    
    guardarCarrito(carrito);
    return { success: true, carrito };
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    return { success: false, message: error.message };
  }
};

// Eliminar producto del carrito
export const eliminarDelCarrito = (productoId) => {
  try {
    let carrito = getCarrito();
    carrito = carrito.filter(item => item.id !== productoId);
    guardarCarrito(carrito);
    return { success: true, carrito };
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    return { success: false, message: error.message };
  }
};

// Actualizar cantidad de un producto en el carrito
export const actualizarCantidad = (productoId, nuevaCantidad) => {
  try {
    const carrito = getCarrito();
    const index = carrito.findIndex(item => item.id === productoId);
    
    if (index !== -1) {
      if (nuevaCantidad <= 0) {
        // Si la cantidad es 0 o menor, eliminar el producto
        return eliminarDelCarrito(productoId);
      } else {
        // Actualizar la cantidad (sin exceder el stock)
        carrito[index].cantidad = Math.min(nuevaCantidad, carrito[index].stock);
        guardarCarrito(carrito);
      }
    }
    
    return { success: true, carrito };
  } catch (error) {
    console.error('Error al actualizar cantidad:', error);
    return { success: false, message: error.message };
  }
};

// Vaciar carrito
export const vaciarCarrito = () => {
  try {
    localStorage.removeItem(CARRITO_KEY);
    return { success: true };
  } catch (error) {
    console.error('Error al vaciar carrito:', error);
    return { success: false, message: error.message };
  }
};

// Obtener cantidad total de productos en el carrito
export const getCantidadTotal = () => {
  const carrito = getCarrito();
  return carrito.reduce((total, item) => total + item.cantidad, 0);
};

// Obtener precio total del carrito
export const getPrecioTotal = () => {
  const carrito = getCarrito();
  return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
};

export default {
  getCarrito,
  agregarAlCarrito,
  eliminarDelCarrito,
  actualizarCantidad,
  vaciarCarrito,
  getCantidadTotal,
  getPrecioTotal
};
