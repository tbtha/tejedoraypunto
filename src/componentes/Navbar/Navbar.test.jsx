import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './Navbar';
import * as authService from '../../services/authService';

// Mock del authService
vi.mock('../../services/authService', () => ({
  logout: vi.fn(),
  getUser: vi.fn(),
  isAuthenticated: vi.fn()
}));

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  it('debe renderizar correctamente', () => {
    authService.isAuthenticated.mockReturnValue(false);
    
    renderNavbar();
    
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
    expect(screen.getByText('Me')).toBeInTheDocument();
  });

  it('debe mostrar "Iniciar sesión" cuando el usuario no está autenticado', () => {
    authService.isAuthenticated.mockReturnValue(false);
    authService.getUser.mockReturnValue(null);
    
    renderNavbar();
    
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });

  it('debe mostrar enlaces de usuario autenticado', () => {
    authService.isAuthenticated.mockReturnValue(true);
    authService.getUser.mockReturnValue({ 
      id: 1, 
      nombre: 'Test User',
      rol: 'CLIENTE'
    });
    
    renderNavbar();
    
    expect(screen.getByText('Carrito')).toBeInTheDocument();
    expect(screen.getByText('Mis Pedidos')).toBeInTheDocument();
    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
  });

  it('debe mostrar mensaje de bienvenida con el nombre del usuario', () => {
    authService.isAuthenticated.mockReturnValue(true);
    authService.getUser.mockReturnValue({ 
      id: 1, 
      nombre: 'Juan Pérez',
      rol: 'CLIENTE'
    });
    
    renderNavbar();
    
    expect(screen.getByText('Bienvenido, Juan Pérez')).toBeInTheDocument();
  });
});
