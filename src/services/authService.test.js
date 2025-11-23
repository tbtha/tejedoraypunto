import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  login, 
  logout, 
  isAuthenticated, 
  getToken, 
  getUser, 
  isAdmin 
} from '../authService';

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('debe guardar el token y usuario en localStorage', () => {
      const token = 'test-token-123';
      const usuario = { id: 1, nombre: 'Test User', rol: 'CLIENTE' };

      login(token, usuario);

      expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(usuario));
    });

    it('debe manejar usuarios sin datos correctamente', () => {
      const token = 'test-token';
      
      login(token, null);

      expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(null));
    });
  });

  describe('logout', () => {
    it('debe eliminar token y usuario de localStorage', () => {
      logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    });
  });

  describe('isAuthenticated', () => {
    it('debe retornar true cuando hay token', () => {
      localStorage.getItem.mockReturnValue('test-token');
      
      expect(isAuthenticated()).toBe(true);
    });

    it('debe retornar false cuando no hay token', () => {
      localStorage.getItem.mockReturnValue(null);
      
      expect(isAuthenticated()).toBe(false);
    });
  });

  describe('getToken', () => {
    it('debe retornar el token almacenado', () => {
      const token = 'test-token-123';
      localStorage.getItem.mockReturnValue(token);

      expect(getToken()).toBe(token);
      expect(localStorage.getItem).toHaveBeenCalledWith('token');
    });

    it('debe retornar null si no hay token', () => {
      localStorage.getItem.mockReturnValue(null);

      expect(getToken()).toBeNull();
    });
  });

  describe('getUser', () => {
    it('debe retornar el usuario parseado', () => {
      const usuario = { id: 1, nombre: 'Test', rol: 'ADMIN' };
      localStorage.getItem.mockReturnValue(JSON.stringify(usuario));

      const result = getUser();

      expect(result).toEqual(usuario);
      expect(localStorage.getItem).toHaveBeenCalledWith('user');
    });

    it('debe retornar null si no hay usuario', () => {
      localStorage.getItem.mockReturnValue(null);

      expect(getUser()).toBeNull();
    });

    it('debe manejar JSON inválido', () => {
      localStorage.getItem.mockReturnValue('invalid-json');

      expect(() => getUser()).toThrow();
    });
  });

  describe('isAdmin', () => {
    it('debe retornar true si el usuario es ADMIN', () => {
      const usuario = { id: 1, nombre: 'Admin', rol: 'ADMIN' };
      localStorage.getItem.mockReturnValue(JSON.stringify(usuario));

      expect(isAdmin()).toBe(true);
    });

    it('debe retornar false si el usuario es CLIENTE', () => {
      const usuario = { id: 1, nombre: 'Cliente', rol: 'CLIENTE' };
      localStorage.getItem.mockReturnValue(JSON.stringify(usuario));

      expect(isAdmin()).toBe(false);
    });

    it('debe retornar false si no hay usuario', () => {
      localStorage.getItem.mockReturnValue(null);

      expect(isAdmin()).toBe(false);
    });
  });
});
