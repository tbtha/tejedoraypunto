import { describe, it, expect, beforeEach } from 'vitest';
import { 
  getCarrito, 
  agregarAlCarrito, 
  eliminarDelCarrito, 
  actualizarCantidad, 
  vaciarCarrito, 
  getPrecioTotal 
} from './carritoService';describe('carritoService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getCarrito', () => {
    it('debe retornar array vacío si no hay carrito', () => {
      localStorage.getItem.mockReturnValue(null);
      
      const carrito = getCarrito();
      
      expect(carrito).toEqual([]);
    });

    it('debe retornar el carrito almacenado', () => {
      const carritoMock = [
        { id: 1, nombre: 'Producto 1', precio: 1000, cantidad: 2 }
      ];
      localStorage.getItem.mockReturnValue(JSON.stringify(carritoMock));
      
      const carrito = getCarrito();
      
      expect(carrito).toEqual(carritoMock);
    });
  });

  describe('agregarAlCarrito', () => {
    it('debe agregar un producto nuevo al carrito', () => {
      localStorage.getItem.mockReturnValue(JSON.stringify([]));
      
      const producto = { id: 1, nombre: 'Producto 1', precio: 1000, imagen: 'img1.jpg' };
      agregarAlCarrito(producto);

      const expectedCarrito = [{
        id: 1,
        nombre: 'Producto 1',
        precio: 1000,
        imagen: 'img1.jpg',
        cantidad: 1
      }];

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'carrito',
        JSON.stringify(expectedCarrito)
      );
    });

    it('debe incrementar cantidad si el producto ya existe', () => {
      const carritoExistente = [
        { id: 1, nombre: 'Producto 1', precio: 1000, cantidad: 1 }
      ];
      localStorage.getItem.mockReturnValue(JSON.stringify(carritoExistente));
      
      const producto = { id: 1, nombre: 'Producto 1', precio: 1000 };
      agregarAlCarrito(producto);

      const expectedCarrito = [
        { id: 1, nombre: 'Producto 1', precio: 1000, cantidad: 2 }
      ];

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'carrito',
        JSON.stringify(expectedCarrito)
      );
    });
  });

  describe('eliminarDelCarrito', () => {
    it('debe eliminar el producto del carrito', () => {
      const carritoExistente = [
        { id: 1, nombre: 'Producto 1', precio: 1000, cantidad: 1 },
        { id: 2, nombre: 'Producto 2', precio: 2000, cantidad: 1 }
      ];
      localStorage.getItem.mockReturnValue(JSON.stringify(carritoExistente));
      
      eliminarDelCarrito(1);

      const expectedCarrito = [
        { id: 2, nombre: 'Producto 2', precio: 2000, cantidad: 1 }
      ];

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'carrito',
        JSON.stringify(expectedCarrito)
      );
    });
  });

  describe('actualizarCantidad', () => {
    it('debe actualizar la cantidad del producto', () => {
      // Limpiar todas las llamadas previas
      localStorage.setItem.mockClear();
      
      const carritoExistente = [
        { id: 1, nombre: 'Producto 1', precio: 1000, cantidad: 1 }
      ];
      localStorage.getItem.mockReturnValue(JSON.stringify(carritoExistente));
      
      actualizarCantidad(1, 5);

      const expectedCarrito = [
        { id: 1, nombre: 'Producto 1', precio: 1000, cantidad: 5 }
      ];

      // Verificar que se guardó el carrito con la cantidad actualizada
      const calls = localStorage.setItem.mock.calls;
      const lastCall = calls[calls.length - 1];
      expect(lastCall[0]).toBe('carrito');
      const savedCarrito = JSON.parse(lastCall[1]);
      expect(savedCarrito[0].cantidad).toBe(5);
    });

    it('debe eliminar el producto si la cantidad es 0 o menor', () => {
      const carritoExistente = [
        { id: 1, nombre: 'Producto 1', precio: 1000, cantidad: 1 }
      ];
      localStorage.getItem.mockReturnValue(JSON.stringify(carritoExistente));
      
      actualizarCantidad(1, 0);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'carrito',
        JSON.stringify([])
      );
    });
  });

  describe('vaciarCarrito', () => {
    it('debe eliminar todos los productos del carrito', () => {
      vaciarCarrito();

      expect(localStorage.setItem).toHaveBeenCalledWith('carrito', JSON.stringify([]));
    });
  });

  describe('getPrecioTotal', () => {
    it('debe calcular el precio total del carrito', () => {
      const carritoMock = [
        { id: 1, precio: 1000, cantidad: 2 },
        { id: 2, precio: 1500, cantidad: 3 }
      ];
      localStorage.getItem.mockReturnValue(JSON.stringify(carritoMock));
      
      const total = getPrecioTotal();
      
      expect(total).toBe(6500); // (1000*2) + (1500*3)
    });

    it('debe retornar 0 si el carrito está vacío', () => {
      localStorage.getItem.mockReturnValue(JSON.stringify([]));
      
      const total = getPrecioTotal();
      
      expect(total).toBe(0);
    });
  });
});
