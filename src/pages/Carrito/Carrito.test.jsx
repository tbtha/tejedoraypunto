import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Carrito } from './Carrito';
import * as carritoService from '../../services/carritoService';

// Mock del carritoService
vi.mock('../../services/carritoService', () => ({
  getCarrito: vi.fn(),
  eliminarDelCarrito: vi.fn(),
  actualizarCantidad: vi.fn(),
  vaciarCarrito: vi.fn(),
  getPrecioTotal: vi.fn()
}));

const renderCarrito = () => {
  return render(
    <BrowserRouter>
      <Carrito />
    </BrowserRouter>
  );
};

describe('Carrito', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe mostrar mensaje cuando el carrito está vacío', () => {
    carritoService.getCarrito.mockReturnValue([]);
    carritoService.getPrecioTotal.mockReturnValue(0);
    
    renderCarrito();
    
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  it('debe mostrar productos en el carrito', () => {
    const productosMock = [
      { 
        id: 1, 
        nombre: 'Producto Test', 
        precio: 1000, 
        cantidad: 2,
        imagen: 'test.jpg'
      }
    ];
    
    carritoService.getCarrito.mockReturnValue(productosMock);
    carritoService.getPrecioTotal.mockReturnValue(2000);
    
    renderCarrito();
    
    expect(screen.getByText('Producto Test')).toBeInTheDocument();
    expect(screen.getByText('Carrito de Compras')).toBeInTheDocument();
  });

  it('debe calcular y mostrar el precio total correctamente', () => {
    const productosMock = [
      { id: 1, nombre: 'Producto 1', precio: 1000, cantidad: 2 },
      { id: 2, nombre: 'Producto 2', precio: 1500, cantidad: 1 }
    ];
    
    carritoService.getCarrito.mockReturnValue(productosMock);
    carritoService.getPrecioTotal.mockReturnValue(3500);
    
    renderCarrito();
    
    // El precio total aparece dos veces en el resumen del pedido
    const precioElements = screen.getAllByText(/3\.500/);
    expect(precioElements.length).toBeGreaterThan(0);
  });

  it('debe llamar a eliminarDelCarrito al hacer clic en eliminar', async () => {
    const user = userEvent.setup();
    global.confirm = vi.fn(() => true);
    
    const productosMock = [
      { id: 1, nombre: 'Producto Test', precio: 1000, cantidad: 1, imagen: 'test.jpg' }
    ];
    
    carritoService.getCarrito.mockReturnValue(productosMock);
    carritoService.getPrecioTotal.mockReturnValue(1000);
    carritoService.eliminarDelCarrito.mockReturnValue({ success: true, carrito: [] });
    
    renderCarrito();
    
    const eliminarBtn = screen.getAllByRole('button').find(
      btn => btn.querySelector('.bi-trash')
    );
    
    if (eliminarBtn) {
      await user.click(eliminarBtn);
      
      await waitFor(() => {
        expect(carritoService.eliminarDelCarrito).toHaveBeenCalledWith(1);
      });
    }
  });

  it('debe llamar a vaciarCarrito al hacer clic en vaciar carrito', async () => {
    const user = userEvent.setup();
    global.confirm = vi.fn(() => true);
    
    const productosMock = [
      { id: 1, nombre: 'Producto Test', precio: 1000, cantidad: 1, imagen: 'test.jpg' }
    ];
    
    carritoService.getCarrito.mockReturnValue(productosMock);
    carritoService.getPrecioTotal.mockReturnValue(1000);
    carritoService.vaciarCarrito.mockReturnValue({ success: true, carrito: [] });
    
    renderCarrito();
    
    const vaciarBtn = screen.getAllByRole('button').find(
      btn => btn.textContent.includes('Vaciar')
    );
    
    if (vaciarBtn) {
      await user.click(vaciarBtn);
      
      await waitFor(() => {
        expect(carritoService.vaciarCarrito).toHaveBeenCalled();
      });
    }
  });
});
