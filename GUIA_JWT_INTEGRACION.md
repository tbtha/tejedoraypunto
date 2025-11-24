# 🔐 Guía de Integración JWT - Frontend React

## 📋 Resumen de Cambios

Se ha integrado exitosamente la autenticación JWT en el frontend de React para comunicarse con el backend que requiere tokens en las peticiones protegidas.

---

## 🎯 Servicios Creados

### 1. **authService.js** (`src/services/authService.js`)
Maneja toda la lógica de autenticación:

#### Funciones principales:
- `login(email, password)` - Inicia sesión y guarda el token
- `logout()` - Cierra sesión y elimina el token
- `getToken()` - Obtiene el token actual
- `getUser()` - Obtiene información del usuario
- `isAuthenticated()` - Verifica si el usuario está autenticado
- `isAdmin()` - Verifica si el usuario es administrador

#### Ejemplo de uso:
```javascript
import { login, logout, isAuthenticated } from '../../services/authService';

// Login
const result = await login('usuario@email.com', 'password123');
if (result.success) {
  console.log('Login exitoso', result.user);
}

// Logout
logout();

// Verificar autenticación
if (isAuthenticated()) {
  console.log('Usuario autenticado');
}
```

---

### 2. **apiService.js** (`src/services/apiService.js`)
Cliente de Axios configurado con interceptores para manejar tokens automáticamente.

#### Funciones disponibles:

**Productos:**
- `getProductos()` - Obtener todos los productos (público)
- `getProductoById(id)` - Obtener producto por ID (público)
- `createProducto(producto)` - Crear producto (requiere token)
- `updateProducto(id, producto)` - Actualizar producto (requiere token)
- `deleteProducto(id)` - Eliminar producto (requiere token)

**Categorías:**
- `getCategorias()` - Obtener todas las categorías (público)
- `getCategoriaById(id)` - Obtener categoría por ID (público)
- `createCategoria(categoria)` - Crear categoría (requiere token)
- `updateCategoria(id, categoria)` - Actualizar categoría (requiere token)
- `deleteCategoria(id)` - Eliminar categoría (requiere token)

**Usuarios:**
- `getUsuarios()` - Obtener todos los usuarios (requiere token)
- `getUsuarioById(id)` - Obtener usuario por ID (requiere token)
- `createUsuario(usuario)` - Crear usuario (requiere token)
- `updateUsuario(id, usuario)` - Actualizar usuario (requiere token)
- `deleteUsuario(id)` - Eliminar usuario (requiere token)

#### Ejemplo de uso:
```javascript
import { getProductos, createProducto } from '../../services/apiService';

// Obtener productos (no requiere token)
const productos = await getProductos();

// Crear producto (requiere token - se agrega automáticamente)
const nuevoProducto = {
  nombre: "Producto Test",
  descripcion: "Descripción",
  precio: 15000,
  stock: 10,
  imagen: "img/test.jpg",
  activo: true,
  categoria: { id: 1 }
};

await createProducto(nuevoProducto);
```

---

### 3. **ProtectedRoute.jsx** (`src/componentes/ProtectedRoute/ProtectedRoute.jsx`)
Componente para proteger rutas que requieren autenticación.

#### Uso en App.jsx:
```javascript
import { ProtectedRoute } from './componentes/ProtectedRoute/ProtectedRoute';

<Route 
  path="/dashboard" 
  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
/>
```

---

## 🔄 Componentes Actualizados

### 1. **LoginForm.jsx**
- Ahora usa `login()` del `authService` para autenticarse
- Guarda el token JWT automáticamente
- Obtiene y guarda información del usuario
- Muestra estado de carga durante el login

### 2. **Productos.jsx**
- Usa `getProductos()` y `getCategorias()` del `apiService`
- Las peticiones GET son públicas (no requieren token)

### 3. **CrearProducto.jsx**
- Usa `createProducto()` del `apiService`
- El token se agrega automáticamente a las peticiones
- La subida de imágenes también incluye el token

### 4. **App.jsx**
- Rutas administrativas protegidas con `<ProtectedRoute>`
- Redirige automáticamente al login si no hay token válido

---

## 🔐 Flujo de Autenticación

### 1. **Login:**
```
Usuario ingresa credenciales
    ↓
LoginForm llama a login(email, password)
    ↓
authService envía POST a /auth/login
    ↓
Backend devuelve JWT token
    ↓
Token se guarda en localStorage
    ↓
Se obtiene información del usuario
    ↓
Usuario es redirigido al dashboard
```

### 2. **Peticiones Protegidas:**
```
Componente llama a función de apiService
    ↓
Interceptor de Axios obtiene token de localStorage
    ↓
Agrega header: Authorization: Bearer {token}
    ↓
Envía petición al backend
    ↓
Si 401 (token inválido/expirado):
    - Ejecuta logout()
    - Redirige a /registro
```

### 3. **Logout:**
```
Usuario hace logout
    ↓
Se elimina token de localStorage
    ↓
Se elimina información del usuario
    ↓
Usuario es redirigido al login
```

---

## 🧪 Cómo Probar

### 1. **Probar Login:**
1. Asegúrate de que el backend esté corriendo en `http://localhost:8082`
2. Ve a `http://localhost:5173/registro`
3. Ingresa credenciales (ej: `tejedoraypunto@gmail.com` / `admin123`)
4. Si es exitoso, serás redirigido al dashboard
5. Abre DevTools > Application > Local Storage y verás el token guardado

### 2. **Probar Rutas Protegidas:**
1. Sin iniciar sesión, intenta acceder a `http://localhost:5173/dashboard`
2. Deberías ser redirigido automáticamente a `/registro`
3. Después de iniciar sesión, podrás acceder al dashboard

### 3. **Probar Creación de Producto:**
1. Inicia sesión
2. Ve a Inventario > Crear Producto
3. Llena el formulario y crea un producto
4. En Network DevTools, verás que la petición incluye el header `Authorization: Bearer {token}`

### 4. **Probar Expiración del Token:**
1. Inicia sesión
2. En DevTools > Application > Local Storage, modifica el token (ponle cualquier valor inválido)
3. Intenta crear un producto o acceder a una ruta protegida
4. Deberías ser redirigido automáticamente al login

---

## 📝 Notas Importantes

### Token JWT:
- Se guarda en `localStorage` con la clave `token`
- Se incluye automáticamente en todas las peticiones mediante interceptores
- Se verifica su expiración en `isAuthenticated()`
- Si expira o es inválido, el usuario es redirigido al login

### Interceptores de Axios:
- **Request Interceptor**: Agrega el token a todas las peticiones automáticamente
- **Response Interceptor**: Detecta errores 401 y ejecuta logout automático

### Rutas Protegidas:
- Todas las rutas administrativas están protegidas
- Si el usuario no está autenticado, es redirigido a `/registro`
- Las rutas públicas (Home, Productos, Blogs) no requieren autenticación

---

## 🚀 Próximos Pasos (Opcional)

Si quieres mejorar aún más la integración:

1. **Agregar botón de Logout:**
```javascript
import { logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const handleLogout = () => {
  logout();
  navigate('/registro');
};
```

2. **Mostrar información del usuario:**
```javascript
import { getUser } from '../../services/authService';

const user = getUser();
console.log(user.nombre, user.email, user.rol);
```

3. **Actualizar otros componentes:**
   - EditarProducto.jsx
   - CrearCategoria.jsx
   - GestionUsuarios.jsx
   - Todos deben usar las funciones de `apiService.js`

---

## ✅ Checklist de Integración

- [x] authService.js creado
- [x] apiService.js creado con interceptores
- [x] ProtectedRoute.jsx creado
- [x] LoginForm.jsx actualizado
- [x] Productos.jsx actualizado
- [x] CrearProducto.jsx actualizado
- [x] App.jsx con rutas protegidas
- [x] axios instalado

---

## 🐛 Solución de Problemas

### Error: "No se recibió el token"
- Verifica que el backend esté devolviendo el token en la respuesta de `/auth/login`
- Revisa que el formato sea: `{ "token": "eyJ..." }`

### Error: 401 Unauthorized
- Verifica que el token se esté guardando correctamente en localStorage
- Revisa que el interceptor esté agregando el header `Authorization`
- Confirma que el token no haya expirado

### El usuario no es redirigido al login
- Verifica que `ProtectedRoute` esté importado correctamente
- Asegúrate de que `isAuthenticated()` esté funcionando

---

## 📚 Recursos Adicionales

- [Documentación de Axios](https://axios-http.com/)
- [React Router - Protected Routes](https://reactrouter.com/en/main/start/tutorial)
- [JWT.io - Debugging de tokens](https://jwt.io/)

---

**¡La integración JWT está completa y lista para usar!** 🎉
