import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { LoginForm } from './LoginForm';

// Mock de react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderLoginForm = () => {
  return render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
};

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('debe renderizar el formulario de login', () => {
    renderLoginForm();
    
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
  });

  it('debe validar campos vacíos', async () => {
    const user = userEvent.setup();
    
    renderLoginForm();
    
    const submitBtn = screen.getByRole('button', { name: /Entrar/i });
    await user.click(submitBtn);
    
    // El componente muestra mensaje de error en pantalla
    await waitFor(() => {
      expect(screen.getByText(/valida los campos correctamente/i)).toBeInTheDocument();
    });
  });

  it('debe validar formato de email', async () => {
    const user = userEvent.setup();
    
    renderLoginForm();
    
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    
    await user.type(emailInput, 'correo-invalido');
    await user.type(passwordInput, 'Password123!');
    
    // El mensaje de error debería aparecer en pantalla al escribir
    await waitFor(() => {
      expect(screen.getByText(/Formato de correo inválido/i)).toBeInTheDocument();
    });
  });

  it('debe realizar login exitosamente', async () => {
    const user = userEvent.setup();
    
    // Mock de fetch para simular respuesta exitosa
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          token: 'test-token-123',
          usuario: { id: 1, nombre: 'Test User', rol: 'CLIENTE' }
        }),
      })
    );
    
    renderLoginForm();
    
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitBtn = screen.getByRole('button', { name: /Entrar/i });
    
    await user.type(emailInput, 'test@gmail.com');
    await user.type(passwordInput, 'Pass123');
    await user.click(submitBtn);
    
    // Verificar que fetch fue llamado para login
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    }, { timeout: 3000 });
  });

  it('debe manejar errores de login', async () => {
    const user = userEvent.setup();
    
    // Mock de fetch para simular error
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
      })
    );
    
    renderLoginForm();
    
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitBtn = screen.getByRole('button', { name: /Entrar/i });
    
    await user.type(emailInput, 'test@gmail.com');
    await user.type(passwordInput, 'Pass123');
    await user.click(submitBtn);
    
    // Esperar que aparezca mensaje de error en pantalla
    await waitFor(() => {
      const errorMessage = screen.queryByText(/Correo o contraseña incorrectos/i) || 
                          screen.queryByText(/Error/i);
      expect(errorMessage).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
