import { describe, it, expect, vi, beforeEach } from 'vitest';
import { agregarAlCarrito, eliminarDelCarrito, getPrecioTotal, getCarrito } from './services/carritoService';
import { login, isAuthenticated, logout, getUser } from './services/authService';

describe('Tests Básicos del Sistema', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  // Test 1: Servicio de Autenticación - Login
  it('authService - debe guardar token y usuario al hacer login exitoso', async () => {
    const mockUser = { id: 1, nombre: 'Test User', rol: 'CLIENTE' };
    const mockToken = 'test-token-123';
    
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: mockToken, usuario: mockUser })
      })
    );

    const result = await login('test@test.com', 'Password123!');

    expect(result.success).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken);
  });

  // Test 2: Servicio de Carrito - Agregar producto
  it('carritoService - debe agregar un producto al carrito', () => {
    localStorage.getItem.mockReturnValue(JSON.stringify([]));
    
    const producto = { id: 1, nombre: 'Test', precio: 1000, stock: 10 };
    const resultado = agregarAlCarrito(producto, 1);

    expect(resultado.success).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  // Test 3: Servicio de Carrito - Obtener precio total
  it('carritoService - debe calcular el precio total correctamente', () => {
    const carrito = [
      { id: 1, precio: 1000, cantidad: 2 },
      { id: 2, precio: 500, cantidad: 3 }
    ];
    
    localStorage.getItem.mockReturnValue(JSON.stringify(carrito));
    
    const total = getPrecioTotal();
    expect(total).toBe(3500); // (1000*2) + (500*3)
  });

  // Test 4: Servicio de Carrito - Eliminar producto
  it('carritoService - debe eliminar un producto del carrito', () => {
    const carritoInicial = [
      { id: 1, nombre: 'Producto 1', precio: 1000, cantidad: 1 },
      { id: 2, nombre: 'Producto 2', precio: 2000, cantidad: 1 }
    ];
    
    localStorage.getItem.mockReturnValue(JSON.stringify(carritoInicial));
    
    const resultado = eliminarDelCarrito(1);
    
    expect(resultado.success).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  // Test 5: Servicio de Autenticación - Logout
  it('authService - debe limpiar datos al hacer logout', () => {
    // Configurar usuario autenticado
    localStorage.getItem.mockReturnValue('test-token');
    
    logout();
    
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
  });
});
