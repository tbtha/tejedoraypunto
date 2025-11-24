# 🧶 Tejedora y Punto

Una plataforma web artesanal que conecta lo hecho a mano con lo digital, ofreciendo un catálogo de productos tejidos, gestión de contenidos y una experiencia de usuario coherente con la identidad artesanal.

---

## 📋 Descripción del proyecto

**Tejedora y Punto** es una aplicación web completa desarrollada para la venta y promoción de productos textiles artesanales. La plataforma integra:

- **Catálogo de productos**: Visualización de tejidos con imágenes, descripciones, precios y gestión de stock
- **Sistema de usuarios**: Registro, inicio de sesión y gestión de perfiles
- **Panel de administración**: Gestión completa de productos, categorías y usuarios
- **Blog integrado**: Contenido editorial sobre el proceso artesanal y la marca
- **Carrito de compras**: Funcionalidad de e-commerce (en desarrollo)
- **Responsive design**: Experiencia optimizada para dispositivos móviles y desktop

El proyecto busca mantener una estética coherente con la identidad artesanal, utilizando una arquitectura modular y validaciones personalizadas que reflejan el cuidado del oficio textil.

---

## 🛠️ Tecnologías utilizadas

### Frontend
- **React 19.1.0** - Biblioteca principal para la interfaz de usuario
- **React Router DOM 7.9.4** - Navegación y enrutamiento
- **Vite 6.3.5** - Herramienta de desarrollo y build
- **CSS3** - Estilos personalizados y responsive design
- **Bootstrap 5** - Framework CSS para componentes UI

### Backend
- **Spring Boot** - Framework principal para API REST
- **Spring Security** - Autenticación y autorización con JWT
- **Spring Data JPA** - Persistencia de datos
- **MySQL** - Base de datos relacional
- **Maven** - Gestión de dependencias

### Testing
- **Vitest 1.6.1** - Framework de testing para frontend
- **React Testing Library 14.1.2** - Testing de componentes React
- **@testing-library/jest-dom** - Matchers personalizados para DOM
- **@testing-library/user-event 14.5.1** - Simulación de interacciones
- **jsdom 23.0.1** - Entorno de navegador simulado

### Herramientas de desarrollo
- **ESLint** - Linting y calidad de código
- **Vite** - Bundler y servidor de desarrollo
- **Git** - Control de versiones

---

## 📦 Instrucciones de instalación

### Prerrequisitos
- **Node.js** (versión 16 o superior)
- **npm**
- **Git**

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tbtha/tejedoraypunto.git
   cd tejedoraypunto
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

---

## 🚀 Instrucciones de ejecución

### Modo desarrollo
```bash
npm run dev
```
La aplicación estará disponible en: `http://localhost:5173`

### Ejecutar tests
```bash
# Modo watch (desarrollo)
npm test

# Ejecutar una vez
npm test -- --run

# Solo tests específicos
npm test src/tests-basicos.test.jsx

# Interfaz visual
npm run test:ui

# Reporte de cobertura
npm run test:coverage
```

---

## 🧪 Testing

El proyecto incluye una suite completa de tests unitarios e integración implementados con **Vitest** y **React Testing Library**.

### Métricas de Testing
- ✅ **5/5 tests pasando** (100%)
- ⏱️ **Tiempo de ejecución:** ~3 segundos
- 📦 **Framework:** Vitest + React Testing Library
- 🌐 **Entorno:** jsdom (simulación de navegador)

### Tests Implementados

#### 1. **Autenticación - Login Exitoso**
Verifica que el servicio de login:
- Se comunica correctamente con la API
- Guarda el token JWT en localStorage
- Retorna éxito correctamente

#### 2. **Carrito - Agregar Producto**
Prueba que se puede:
- Agregar productos al carrito vacío
- Persistir el carrito en localStorage
- Retornar confirmación de éxito

#### 3. **Carrito - Cálculo de Precio Total**
Valida que:
- Se calcula correctamente `precio × cantidad`
- Se suman múltiples productos
- El resultado es exacto

#### 4. **Carrito - Eliminar Producto**
Asegura que:
- Se elimina el producto correcto por ID
- El carrito se actualiza
- Los cambios se persisten

#### 5. **Autenticación - Logout**
Confirma que:
- Se eliminan token y datos de usuario
- Se limpia localStorage
- No quedan datos sensibles

### Estructura de Testing

```
src/
├── test/
│   └── setup.js                    # Configuración global de tests
├── tests-basicos.test.jsx          # Suite principal (5 tests)
├── services/
│   ├── authService.test.js         # Tests de autenticación
│   └── carritoService.test.js      # Tests de carrito
└── componentes/
    ├── Navbar/Navbar.test.jsx
    └── InicioSesion/LoginForm.test.jsx
```

### Configuración de Testing

El proyecto usa **Vitest** con las siguientes características:

```javascript
// vitest.config.js
{
  globals: true,              // Funciones de test globales
  environment: 'jsdom',       // Simula navegador
  setupFiles: './src/test/setup.js',
  testTimeout: 5000           // 5 segundos timeout
}
```

**Mocks configurados:**
- `localStorage` - Evita efectos secundarios
- `fetch` - Simula llamadas HTTP
- `alert/confirm` - Evita popups en tests

### Comandos de Testing

| Comando | Descripción |
|---------|-------------|
| `npm test` | Modo watch (desarrollo) |
| `npm test -- --run` | Ejecutar una vez |
| `npm run test:ui` | Interfaz visual en navegador |
| `npm run test:coverage` | Reporte de cobertura |

### Ejemplo de Test

```javascript
it('carritoService - debe calcular el precio total correctamente', () => {
  // Arrange: Preparar datos
  const carrito = [
    { id: 1, precio: 1000, cantidad: 2 },
    { id: 2, precio: 500, cantidad: 3 }
  ];
  localStorage.getItem.mockReturnValue(JSON.stringify(carrito));
  
  // Act: Ejecutar función
  const total = getPrecioTotal();
  
  // Assert: Verificar resultado
  expect(total).toBe(3500); // (1000*2) + (500*3)
});
```

### Documentación Adicional

Para más información sobre testing:
- 📄 **[TESTING.md](./TESTING.md)** - Documentación oficial del sistema de testing
- 📘 **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Guía técnica con ejemplos y tutoriales

---

## 🔑 Credenciales de prueba

Para probar las funcionalidades de la aplicación, puedes utilizar las siguientes credenciales:

### Usuario Administrador
```
Email: tejedoraypunto@gmail.com
Contraseña: admin123
```

### Usuario Cliente
```
Email: cliente@gmail.com
Contraseña: cliente123
```

### Funcionalidades por rol:

**Administrador:**
- Acceso completo al panel de administración
- Gestión de productos (crear, editar, eliminar)
- Gestión de categorías
- Gestión de usuarios
- Acceso a inventario y estadísticas

**Cliente:**
- Navegación del catálogo de productos
- Registro y gestión de perfil
- Carrito de compras (en desarrollo)
- Acceso al blog y contenido editorial

---
