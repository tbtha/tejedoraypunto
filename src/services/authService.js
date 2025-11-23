// Servicio de autenticación para manejar login, logout y gestión de tokens

const API_URL = 'http://localhost:8082';

// Guardar token en localStorage
const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Obtener token de localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Eliminar token de localStorage
const removeToken = () => {
  localStorage.removeItem('token');
};

// Guardar información del usuario
const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Obtener información del usuario
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Eliminar información del usuario
const removeUser = () => {
  localStorage.removeItem('user');
};

// Login - nueva implementación con JWT
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        username: email,  // El backend espera "username" según tu configuración
        password: password 
      }),
    });

    if (!response.ok) {
      throw new Error('Credenciales incorrectas');
    }

    const data = await response.json();
    
    // Guardar el token
    if (data.token) {
      setToken(data.token);
      
      // Obtener información del usuario
      const userInfo = await getUserInfo(email);
      if (userInfo) {
        setUser(userInfo);
      }
      
      return { success: true, user: userInfo };
    } else {
      throw new Error('No se recibió el token');
    }
  } catch (error) {
    console.error('Error en login:', error);
    return { success: false, message: error.message };
  }
};

// Obtener información del usuario por email
const getUserInfo = async (email) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/api/usuarios`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener información del usuario');
    }

    const usuarios = await response.json();
    const usuario = usuarios.find(u => u.email === email);
    return usuario;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return null;
  }
};

// Logout
export const logout = () => {
  removeToken();
  removeUser();
};

// Verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    // Decodificar el token JWT para verificar si expiró
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp * 1000; // Convertir a milisegundos
    
    if (Date.now() >= expiration) {
      // Token expirado
      logout();
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error al verificar token:', error);
    return false;
  }
};

// Verificar si el usuario es administrador
export const isAdmin = () => {
  const user = getUser();
  return user && user.rol === 'ADMIN';
};

export default {
  login,
  logout,
  getToken,
  getUser,
  isAuthenticated,
  isAdmin,
};
