import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { MisPedidos } from '../../componentes/CompraUsuario/Pedidos';
import * as boletaService from '../../services/boletaService';

// Mock del boletaService
vi.mock('../../services/boletaService', () => ({
  getBoletasByUsuario: vi.fn(),
  getDetallesByBoleta: vi.fn()
}));

const renderMisPedidos = () => {
  return render(
    <BrowserRouter>
      <MisPedidos />
    </BrowserRouter>
  );
};

describe('MisPedidos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.getItem.mockReturnValue(JSON.stringify({ id: 1, nombre: 'Test User' }));
  });

  it('debe mostrar mensaje cuando no hay pedidos', async () => {
    boletaService.getBoletasByUsuario.mockResolvedValue([]);
    
    renderMisPedidos();
    
    await waitFor(() => {
      expect(screen.getByText(/No tienes pedidos aún/i)).toBeInTheDocument();
    });
  });

  it('debe mostrar lista de pedidos del usuario', async () => {
    const pedidosMock = [
      {
        id: 1,
        fechaCompra: '2025-01-15T10:00:00',
        total: 5000,
        estado: 'ENTREGADA',
        metodoPago: 'TRANSFERENCIA',
        direccionEnvio: 'Calle Test 123',
        comunaEnvio: 'Santiago',
        regionEnvio: 'Metropolitana'
      }
    ];
    
    boletaService.getBoletasByUsuario.mockResolvedValue(pedidosMock);
    
    renderMisPedidos();
    
    await waitFor(() => {
      expect(screen.getByText(/Orden #1/i)).toBeInTheDocument();
      expect(screen.getByText(/ENTREGADA/i)).toBeInTheDocument();
    });
  });

  it('debe mostrar el badge de estado con la clase correcta', async () => {
    const pedidosMock = [
      {
        id: 1,
        fechaCompra: '2025-01-15T10:00:00',
        total: 5000,
        estado: 'PENDIENTE',
        metodoPago: 'TRANSFERENCIA',
        direccionEnvio: 'Calle Test 123',
        comunaEnvio: 'Santiago',
        regionEnvio: 'Metropolitana'
      }
    ];
    
    boletaService.getBoletasByUsuario.mockResolvedValue(pedidosMock);
    
    renderMisPedidos();
    
    await waitFor(() => {
      const badge = screen.getByText('PENDIENTE');
      expect(badge).toHaveClass('badge', 'bg-warning');
    });
  });

  it('debe abrir modal con detalles al hacer clic en "Ver Detalles"', async () => {
    const user = userEvent.setup();
    
    const pedidosMock = [
      {
        id: 1,
        fechaCompra: '2025-01-15T10:00:00',
        total: 5000,
        estado: 'ENTREGADA',
        metodoPago: 'TRANSFERENCIA',
        direccionEnvio: 'Calle Test 123',
        comunaEnvio: 'Santiago',
        regionEnvio: 'Metropolitana',
        neto: 4200,
        iva: 800
      }
    ];
    
    const detallesMock = [
      {
        id: 1,
        cantidad: 2,
        precioUnitario: 2500,
        neto: 2100,
        iva: 400,
        producto: {
          id: 1,
          nombre: 'Producto Test',
          imagen: 'test.jpg'
        }
      }
    ];
    
    boletaService.getBoletasByUsuario.mockResolvedValue(pedidosMock);
    boletaService.getDetallesByBoleta.mockResolvedValue(detallesMock);
    
    renderMisPedidos();
    
    await waitFor(() => {
      expect(screen.getByText(/Orden #1/i)).toBeInTheDocument();
    });
    
    const verDetallesBtn = screen.getByRole('button', { name: /Ver Detalles/i });
    await user.click(verDetallesBtn);
    
    await waitFor(() => {
      expect(screen.getByText(/Detalles del Pedido #1/i)).toBeInTheDocument();
      expect(screen.getByText('Producto Test')).toBeInTheDocument();
    });
  });

  it('debe formatear correctamente los precios', async () => {
    const pedidosMock = [
      {
        id: 1,
        fechaCompra: '2025-01-15T10:00:00',
        total: 15990,
        estado: 'ENTREGADA',
        metodoPago: 'WEBPAY',
        direccionEnvio: 'Calle Test 123',
        comunaEnvio: 'Santiago',
        regionEnvio: 'Metropolitana'
      }
    ];
    
    boletaService.getBoletasByUsuario.mockResolvedValue(pedidosMock);
    
    renderMisPedidos();
    
    await waitFor(() => {
      expect(screen.getByText(/15\.990/)).toBeInTheDocument();
    });
  });
});
