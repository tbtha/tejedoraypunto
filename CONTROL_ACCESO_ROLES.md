# 🔐 Control de Acceso por Roles (RBAC) - Implementado

## ✅ ¿Qué se implementó?

Se ha implementado un sistema de **Control de Acceso Basado en Roles** que diferencia entre usuarios ADMIN y USER, redirigiendo y protegiendo rutas según el rol.

---

## 🎯 Componentes Creados/Actualizados

### 1. **AdminRoute.jsx** (NUEVO)
Componente que protege rutas exclusivas para administradores.

```jsx
// src/componentes/AdminRoute/AdminRoute.jsx
- Verifica si el usuario está autenticado
- Verifica si el usuario tiene rol ADMIN
- Si no está autenticado → Redirige a /registro
- Si no es ADMIN → Redirige a /
- Si es ADMIN → Permite acceso
```

### 2. **LoginForm.jsx** (ACTUALIZADO)
Ahora redirige según el rol del usuario después del login.

```jsx
if (result.user.rol === 'ADMIN') {
  navigate('/dashboard');  // Administrador → Dashboard
} else {
  navigate('/');            // Usuario normal → Home
}
```

### 3. **App.jsx** (ACTUALIZADO)
Rutas protegidas con `AdminRoute` para administradores.

---

## 🔒 Tipos de Rutas

### **Rutas Públicas** (sin autenticación)
```
/ - Home
/registro - Registro
/registro - Login
/blogs - Blogs
/me - Acerca de
/contacto - Contacto
/productos - Ver productos
```

### **Rutas de ADMIN** (requiere rol ADMIN)
```
/dashboard - Panel de administración
/inventario - Gestión de productos
/usuarios - Gestión de usuarios
/crear-usuario - Crear usuario
/editar-usuario/:id - Editar usuario
/crear-producto - Crear producto
/editar-producto/:id - Editar producto
/crear-categoria - Crear categoría
```

### **Rutas de Usuario** (requiere autenticación, cualquier rol)
```
/carrito - Carrito de compras
```

---

## 🔄 Flujo de Autenticación por Roles

### **Caso 1: Usuario ADMIN**
```
1. Usuario ingresa credenciales de ADMIN
   ↓
2. Login exitoso → Token guardado
   ↓
3. Sistema verifica: user.rol === 'ADMIN'
   ↓
4. Redirige a /dashboard
   ↓
5. Puede acceder a todas las rutas de admin
```

### **Caso 2: Usuario USER**
```
1. Usuario ingresa credenciales de USER
   ↓
2. Login exitoso → Token guardado
   ↓
3. Sistema verifica: user.rol === 'USER'
   ↓
4. Redirige a / (Home)
   ↓
5. Puede acceder a rutas públicas y de usuario
6. NO puede acceder a rutas de admin
```

### **Caso 3: Usuario intenta acceder a ruta de admin sin ser ADMIN**
```
1. Usuario USER intenta ir a /dashboard
   ↓
2. AdminRoute verifica isAdmin()
   ↓
3. Resultado: false
   ↓
4. Redirige automáticamente a / (Home)
```

### **Caso 4: Usuario no autenticado intenta acceder a ruta protegida**
```
1. Usuario sin login intenta ir a /dashboard
   ↓
2. AdminRoute verifica isAuthenticated()
   ↓
3. Resultado: false
   ↓
4. Redirige automáticamente a /registro
```

---

## 📋 Funciones de Verificación

### **isAuthenticated()**
```javascript
// En authService.js
- Verifica si existe token en localStorage
- Verifica si el token NO ha expirado
- Retorna true/false
```

### **isAdmin()**
```javascript
// En authService.js
- Obtiene usuario de localStorage
- Verifica si user.rol === 'ADMIN'
- Retorna true/false
```

---

## 🧪 Pruebas Recomendadas

### **Prueba 1: Login como ADMIN**
```
1. Ve a http://localhost:5173/registro
2. Ingresa credenciales de ADMIN:
   - Email: tejedoraypunto@gmail.com
   - Password: admin123
3. Verifica:
   ✅ Redirige a /dashboard
   ✅ Puedes acceder a /inventario
   ✅ Puedes acceder a /usuarios
```

### **Prueba 2: Login como USER**
```
1. Ve a http://localhost:5173/registro
2. Ingresa credenciales de USER (crea un usuario normal)
3. Verifica:
   ✅ Redirige a /
   ✅ NO puedes acceder a /dashboard
   ✅ Si intentas ir a /dashboard, redirige a /
   ✅ Puedes acceder a /carrito
```

### **Prueba 3: Acceso sin autenticación**
```
1. Sin hacer login, intenta acceder a:
   - /dashboard
   - /inventario
   - /usuarios
2. Verifica:
   ✅ Todas redirigen a /registro
```

### **Prueba 4: Verificar roles en DevTools**
```
1. Login exitoso
2. Abre DevTools > Application > Local Storage
3. Verifica objeto "user":
   {
     "id": 1,
     "nombre": "Admin",
     "email": "tejedoraypunto@gmail.com",
     "rol": "ADMIN",  ← Importante
     ...
   }
```

---

## 🎨 Estructura de Archivos

```
src/
├── services/
│   └── authService.js
│       ├── isAuthenticated() - Verifica autenticación
│       └── isAdmin()         - Verifica rol ADMIN
├── componentes/
│   ├── AdminRoute/
│   │   └── AdminRoute.jsx    - Protege rutas de admin
│   ├── ProtectedRoute/
│   │   └── ProtectedRoute.jsx - Protege rutas autenticadas
│   └── InicioSesion/
│       └── LoginForm.jsx     - Redirige según rol
└── App.jsx                   - Define rutas protegidas
```

---

## 🔐 Comparación: AdminRoute vs ProtectedRoute

| Característica | AdminRoute | ProtectedRoute |
|----------------|------------|----------------|
| **Requiere autenticación** | ✅ Sí | ✅ Sí |
| **Requiere rol ADMIN** | ✅ Sí | ❌ No |
| **Quién puede acceder** | Solo ADMIN | ADMIN y USER |
| **Redirección si no autenticado** | /registro | /registro |
| **Redirección si no es ADMIN** | / (Home) | N/A |
| **Uso** | Rutas administrativas | Rutas de usuario |

---

## 💡 Ejemplos de Uso

### **Proteger ruta solo para ADMIN:**
```jsx
<Route 
  path="/dashboard" 
  element={<AdminRoute><Dashboard /></AdminRoute>} 
/>
```

### **Proteger ruta para cualquier usuario autenticado:**
```jsx
<Route 
  path="/carrito" 
  element={<ProtectedRoute><Carrito /></ProtectedRoute>} 
/>
```

### **Ruta pública (sin protección):**
```jsx
<Route path="/productos" element={<ProductosPage />} />
```

---

## 🚀 Mejoras Futuras (Opcional)

1. **Más Roles**
   - Agregar rol MODERATOR, VENDEDOR, etc.
   - Proteger rutas con múltiples roles permitidos

2. **Permisos Granulares**
   - Sistema de permisos más detallado
   - Ejemplo: "puede_crear_productos", "puede_eliminar_usuarios"

3. **Mensaje de Error**
   - Mostrar notificación cuando usuario sin permisos intenta acceder
   - "No tienes permisos para acceder a esta página"

4. **Página de No Autorizado**
   - Crear página 403 Forbidden
   - Redirigir allí en lugar de al home

---

## ✅ Resumen de Implementación

| Componente | Cambio | Resultado |
|------------|--------|-----------|
| **AdminRoute.jsx** | Creado | Protege rutas de admin |
| **LoginForm.jsx** | Actualizado | Redirige según rol |
| **App.jsx** | Actualizado | Usa AdminRoute para rutas admin |
| **authService.js** | Ya existía | Funciones isAdmin() y isAuthenticated() |

---

## 📝 Roles Disponibles

### **ADMIN**
- ✅ Acceso completo al dashboard
- ✅ Gestión de productos (crear, editar, eliminar)
- ✅ Gestión de usuarios
- ✅ Gestión de categorías
- ✅ Todas las funcionalidades de USER

### **USER**
- ✅ Ver productos
- ✅ Carrito de compras
- ✅ Ver blogs
- ✅ Contacto
- ❌ NO acceso a dashboard
- ❌ NO gestión de productos
- ❌ NO gestión de usuarios

---

**¡Control de Acceso por Roles Completado!** 🎉

Ahora el sistema diferencia correctamente entre ADMIN y USER, protegiendo las rutas según el rol del usuario autenticado.
