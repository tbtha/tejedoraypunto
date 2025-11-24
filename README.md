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
   cd tejedoraypunto-frontend
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

## 🎯 Características destacadas

### Funcionalidades Principales
- **Diseño responsive** optimizado para móviles y desktop
- **Validaciones personalizadas** con mensajes coherentes con la marca
- **Arquitectura modular** para facilitar el mantenimiento
- **Gestión de imágenes** para productos
- **Filtrado y búsqueda** de productos por categoría y texto
- **Navegación intuitiva** con feedback visual
- **Carga dinámica** de contenido desde API

### Sistema de Autenticación
- Login con JWT (JSON Web Tokens)
- Roles de usuario (ADMIN, CLIENTE)
- Protección de rutas según rol
- Sesión persistente con localStorage

### Panel de Administración
- **Dashboard** con estadísticas de pedidos y ventas
- **Gestión de Productos**: CRUD completo con imágenes
- **Gestión de Categorías**: Crear y editar categorías
- **Gestión de Usuarios**: Administrar clientes y permisos
- **Gestión de Pedidos**: Ver y cambiar estados (PENDIENTE, CONFIRMADA, ENVIADA, ENTREGADA, CANCELADA)
- **Inventario**: Control de stock en tiempo real

### E-commerce
- Carrito de compras persistente
- Cálculo automático de totales
- Gestión de cantidades y stock
- Proceso de checkout
- Historial de pedidos del cliente

### Testing y Calidad
- **5 tests unitarios/integración** con 100% de éxito
- Configuración completa de Vitest
- Mocking de servicios y localStorage
- Cobertura de código configurada
- Scripts de CI/CD preparados

---

## 📁 Estructura del proyecto

```
tejedoraypunto/
├── public/
│   └── img/                      # Imágenes estáticas
│       ├── inicio/
│       ├── marca/
│       ├── summer/
│       ├── winter/
│       └── otros/
├── src/
│   ├── assets/                   # Recursos del proyecto
│   ├── componentes/              # Componentes reutilizables
│   │   ├── Blogs/
│   │   │   ├── BlogArchivo.jsx
│   │   │   └── BlogModal.jsx
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── FormContacto/
│   │   │   └── FormContacto.jsx
│   │   ├── GaleriaTejidos/
│   │   │   └── GaleriaTejidos.jsx
│   │   ├── GestionAdmin/
│   │   │   ├── ModuloDashboard.jsx
│   │   │   └── GestionBoletas.jsx
│   │   ├── InicioSesion/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegistroForm.jsx
│   │   │   ├── validaciones.js
│   │   │   └── regionycomuna.js
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── NavbarAdmi.jsx
│   │   ├── Productos/
│   │   │   ├── Productos.jsx
│   │   │   ├── CrearProducto.jsx
│   │   │   ├── EditarProd.jsx
│   │   │   ├── CrearCategoria.jsx
│   │   │   └── InventarioProductos.jsx
│   │   └── Usuarios/
│   │       ├── GestionUsuarios.jsx
│   │       ├── CrearUsuario.jsx
│   │       └── EditarUsuario.jsx
│   ├── pages/                    # Páginas principales
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   ├── Productos/
│   │   │   └── Productos.jsx
│   │   ├── Carrito/
│   │   │   └── Carrito.jsx
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   └── AdminUsuarios.jsx
│   │   ├── InicioSesion/
│   │   │   └── InicioSesion.jsx
│   │   └── Inventario/
│   │       └── Inventario.jsx
│   ├── services/                 # Servicios de API
│   │   ├── authService.js        # Autenticación JWT
│   │   ├── carritoService.js     # Gestión de carrito
│   │   ├── boletaService.js      # Gestión de pedidos
│   │   ├── productoService.js    # CRUD productos
│   │   └── categoriaService.js   # CRUD categorías
│   ├── test/                     # Configuración de tests
│   │   └── setup.js
│   ├── tests-basicos.test.jsx    # Suite de tests principales
│   ├── App.jsx                   # Componente principal
│   ├── main.jsx                  # Punto de entrada
│   └── index.css                 # Estilos globales
├── vitest.config.js              # Configuración de Vitest
├── vite.config.js                # Configuración de Vite
├── eslint.config.js              # Configuración de ESLint
├── package.json                  # Dependencias y scripts
├── TESTING.md                    # Documentación de testing
├── TESTING_GUIDE.md              # Guía técnica de testing
└── README.md                     # Este archivo
```

---

## 🔧 Configuración del Entorno

### Variables de Entorno

El frontend se conecta al backend en:
```
http://localhost:8082
```

### Endpoints Principales

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/auth/login` | POST | Inicio de sesión |
| `/api/auth/register` | POST | Registro de usuario |
| `/api/productos` | GET | Lista de productos |
| `/api/productos/{id}` | GET | Detalle de producto |
| `/api/categorias` | GET | Lista de categorías |
| `/api/boletas` | GET/POST | Gestión de pedidos |
| `/api/usuarios` | GET/PUT/DELETE | Gestión de usuarios |

---

## 👩‍💻 Autora

**Tabatha** ([@tbtha](https://github.com/tbtha))

---

## 📚 Documentación Adicional

- **[TESTING.md](./TESTING.md)** - Documentación completa del sistema de testing
  - Resumen ejecutivo con métricas
  - Configuración del entorno
  - Explicación detallada de cada test
  - Comandos de ejecución
  - Interpretación de resultados
  - Cobertura de código

- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Guía técnica de testing
  - Configuración paso a paso
  - Anatomía de un test
  - Patrones AAA (Arrange-Act-Assert)
  - Mocking avanzado
  - Debugging de tests
  - Casos de uso reales con código completo
  - Troubleshooting
  - Mejores prácticas

---

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo

# Testing
npm test                 # Ejecuta tests en modo watch
npm test -- --run        # Ejecuta tests una vez
npm run test:ui          # Interfaz visual de tests
npm run test:coverage    # Reporte de cobertura

# Build
npm run build            # Construye para producción
npm run preview          # Vista previa del build
npm run lint             # Ejecuta linter
```

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📞 Contacto

- **Email**: tejedoraypunto@gmail.com
- **GitHub**: [@tbtha](https://github.com/tbtha)
- **Instagram**: [@tejedoraypunto](https://www.instagram.com/tejedoraypunto/)

---

**Última actualización:** 23 de noviembre de 2025  
**Versión:** 1.0.0

---