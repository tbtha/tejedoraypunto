# Guía Técnica de Testing - React con Vitest

## 📚 Índice
1. [Introducción al Testing en React](#introducción-al-testing-en-react)
2. [Configuración Paso a Paso](#configuración-paso-a-paso)
3. [Anatomía de un Test](#anatomía-de-un-test)
4. [Patrones y Técnicas](#patrones-y-técnicas)
5. [Mocking Avanzado](#mocking-avanzado)
6. [Debugging de Tests](#debugging-de-tests)
7. [Casos de Uso Reales](#casos-de-uso-reales)
8. [Troubleshooting](#troubleshooting)
9. [Mejores Prácticas](#mejores-prácticas)

---

## 🎓 Introducción al Testing en React

### ¿Por qué testear?

**Beneficios:**
- 🐛 Detecta bugs antes de producción
- 🔒 Evita regresiones al modificar código
- 📖 Documenta el comportamiento esperado
- 🚀 Permite refactorizar con confianza
- 💰 Reduce costos de mantenimiento

### Tipos de Tests

```
Pirámide de Testing
     /\
    /E2E\        End-to-End (pocas, costosas)
   /------\
  /Integr.\     Integración (medianas)
 /----------\
/  Unitarias \  Unitarias (muchas, rápidas)
--------------
```

**En este proyecto implementamos:**
- ✅ Tests Unitarios (servicios aislados)
- ✅ Tests de Integración (componentes + servicios)

---

## ⚙️ Configuración Paso a Paso

### 1. Instalar Dependencias

```bash
npm install --save-dev vitest @vitest/ui jsdom
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

**Explicación de cada paquete:**
- `vitest`: Framework de testing (alternativa moderna a Jest)
- `@vitest/ui`: Interfaz gráfica para visualizar tests
- `jsdom`: Simula un navegador en Node.js
- `@testing-library/react`: Utilities para testear componentes React
- `@testing-library/jest-dom`: Matchers personalizados (toBeInTheDocument, etc.)
- `@testing-library/user-event`: Simula interacciones de usuario

### 2. Crear vitest.config.js

```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Habilita funciones globales (describe, it, expect)
    globals: true,
    
    // Usa jsdom para simular el DOM del navegador
    environment: 'jsdom',
    
    // Archivo que se ejecuta antes de TODOS los tests
    setupFiles: './src/test/setup.js',
    
    // Configuración de cobertura de código
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.config.js',
        '**/dist/**'
      ]
    },
    
    // Timeout para tests asíncronos (5 segundos)
    testTimeout: 5000
  }
});
```

### 3. Crear src/test/setup.js

```javascript
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// IMPORTANTE: Limpia el DOM después de cada test
// Previene que los tests se afecten entre sí
afterEach(() => {
  cleanup();
});

// Mock de localStorage
// Por qué: localStorage no existe en el entorno de testing
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock de window.alert y window.confirm
// Por qué: No queremos popups reales durante los tests
global.alert = vi.fn();
global.confirm = vi.fn();

// Mock de fetch
// Por qué: No queremos hacer llamadas HTTP reales en tests unitarios
global.fetch = vi.fn();
```

### 4. Agregar Scripts a package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:run": "vitest run"
  }
}
```

---

## 🔬 Anatomía de un Test

### Estructura Básica

```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// describe: Agrupa tests relacionados
describe('Nombre del Módulo o Componente', () => {
  
  // beforeEach: Se ejecuta ANTES de cada test
  beforeEach(() => {
    // Preparación común para todos los tests
    localStorage.clear();
    vi.clearAllMocks();
  });
  
  // afterEach: Se ejecuta DESPUÉS de cada test
  afterEach(() => {
    // Limpieza común
  });
  
  // it (o test): Define un test individual
  it('debe hacer algo específico', () => {
    // Arrange (Preparar)
    const input = 5;
    
    // Act (Actuar)
    const result = miFunction(input);
    
    // Assert (Afirmar)
    expect(result).toBe(10);
  });
  
  // Tests asíncronos
  it('debe manejar promesas', async () => {
    const result = await miAsyncFunction();
    expect(result).toBeDefined();
  });
});
```

### Matchers Más Usados

```javascript
// Igualdad
expect(valor).toBe(5);                    // Igualdad estricta (===)
expect(objeto).toEqual({ a: 1 });         // Igualdad profunda

// Booleanos
expect(valor).toBeTruthy();               // Evaluable como true
expect(valor).toBeFalsy();                // Evaluable como false
expect(valor).toBeNull();                 // Exactamente null
expect(valor).toBeUndefined();            // Exactamente undefined
expect(valor).toBeDefined();              // No undefined

// Números
expect(valor).toBeGreaterThan(3);         // > 3
expect(valor).toBeGreaterThanOrEqual(3);  // >= 3
expect(valor).toBeLessThan(10);           // < 10
expect(valor).toBeCloseTo(0.3);           // Para decimales

// Strings
expect(texto).toMatch(/regex/);           // Coincide con regex
expect(texto).toContain('substring');     // Contiene substring

// Arrays
expect(array).toContain(item);            // Array contiene item
expect(array).toHaveLength(3);            // Longitud específica

// Objetos
expect(obj).toHaveProperty('key');        // Tiene propiedad
expect(obj).toMatchObject({ a: 1 });      // Coincidencia parcial

// Funciones (mocks)
expect(fn).toHaveBeenCalled();            // Fue llamada
expect(fn).toHaveBeenCalledTimes(2);      // Llamada N veces
expect(fn).toHaveBeenCalledWith('arg');   // Llamada con argumentos

// DOM (jest-dom)
expect(element).toBeInTheDocument();      // Elemento existe en DOM
expect(element).toHaveClass('active');    // Tiene clase CSS
expect(input).toHaveValue('text');        // Input tiene valor
expect(button).toBeDisabled();            // Está deshabilitado
```

---

## 🎯 Patrones y Técnicas

### Patrón AAA (Arrange-Act-Assert)

```javascript
it('debe calcular el total del carrito', () => {
  // ARRANGE: Preparar datos de prueba
  const productos = [
    { precio: 1000, cantidad: 2 },
    { precio: 500, cantidad: 3 }
  ];
  localStorage.getItem.mockReturnValue(JSON.stringify(productos));
  
  // ACT: Ejecutar la función a probar
  const total = getPrecioTotal();
  
  // ASSERT: Verificar el resultado
  expect(total).toBe(3500);
});
```

### Testing de Componentes React

```javascript
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MiComponente } from './MiComponente';

it('debe renderizar el componente', () => {
  // Arrange: Renderizar componente
  render(
    <BrowserRouter>
      <MiComponente />
    </BrowserRouter>
  );
  
  // Assert: Verificar que aparece en el DOM
  expect(screen.getByText('Hola Mundo')).toBeInTheDocument();
});
```

### Testing de Interacciones de Usuario

```javascript
import userEvent from '@testing-library/user-event';

it('debe manejar click en botón', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  
  render(<button onClick={handleClick}>Click</button>);
  
  const button = screen.getByRole('button', { name: /Click/i });
  await user.click(button);
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it('debe escribir en input', async () => {
  const user = userEvent.setup();
  render(<input type="text" />);
  
  const input = screen.getByRole('textbox');
  await user.type(input, 'Hola');
  
  expect(input).toHaveValue('Hola');
});
```

### Testing de Código Asíncrono

```javascript
import { waitFor } from '@testing-library/react';

it('debe cargar datos del servidor', async () => {
  // Mock de fetch
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ data: 'test' })
  });
  
  render(<ComponenteConFetch />);
  
  // Esperar a que aparezca el dato
  await waitFor(() => {
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
```

---

## 🎭 Mocking Avanzado

### Mock de Módulos Completos

```javascript
// Mock de un módulo externo
vi.mock('axios');

import axios from 'axios';

it('debe hacer petición HTTP', async () => {
  axios.get.mockResolvedValue({ data: { id: 1 } });
  
  const result = await fetchData();
  
  expect(axios.get).toHaveBeenCalledWith('/api/data');
  expect(result).toEqual({ id: 1 });
});
```

### Mock de Funciones Específicas

```javascript
import * as authService from './authService';

// Mock de función específica
vi.spyOn(authService, 'login').mockImplementation(() => {
  return { success: true, token: 'fake-token' };
});
```

### Mock con Diferentes Comportamientos

```javascript
it('debe manejar múltiples llamadas', () => {
  const fn = vi.fn();
  
  // Primera llamada retorna 'primero'
  fn.mockReturnValueOnce('primero');
  
  // Segunda llamada retorna 'segundo'
  fn.mockReturnValueOnce('segundo');
  
  // Tercera y siguientes retornan 'default'
  fn.mockReturnValue('default');
  
  expect(fn()).toBe('primero');
  expect(fn()).toBe('segundo');
  expect(fn()).toBe('default');
  expect(fn()).toBe('default');
});
```

### Mock de localStorage Real

```javascript
beforeEach(() => {
  // Crear un storage real en memoria
  const storage = {};
  
  global.localStorage = {
    getItem: vi.fn((key) => storage[key] || null),
    setItem: vi.fn((key, value) => { storage[key] = value; }),
    removeItem: vi.fn((key) => { delete storage[key]; }),
    clear: vi.fn(() => { Object.keys(storage).forEach(key => delete storage[key]); })
  };
});
```

---

## 🐛 Debugging de Tests

### 1. Ver qué se Renderizó

```javascript
import { screen } from '@testing-library/react';

it('debug de componente', () => {
  render(<MiComponente />);
  
  // Imprime todo el HTML renderizado
  screen.debug();
  
  // Imprime un elemento específico
  screen.debug(screen.getByRole('button'));
});
```

### 2. Ver Queries Disponibles

```javascript
it('encontrar elementos', () => {
  render(<MiComponente />);
  
  // Muestra todas las queries disponibles
  screen.logTestingPlaygroundURL();
  
  // Te da sugerencias de cómo seleccionar elementos
});
```

### 3. Ejecutar Tests en Modo Watch con Filtro

```bash
# Solo tests que contengan "login"
npm test -- login

# Solo un archivo específico
npm test src/services/authService.test.js
```

### 4. Usar Breakpoints

```javascript
it('test con breakpoint', () => {
  const result = miFunction();
  
  debugger; // Pausa la ejecución aquí
  
  expect(result).toBe(10);
});

// Ejecutar con inspector:
// node --inspect-brk node_modules/.bin/vitest
```

---

## 💼 Casos de Uso Reales

### Caso 1: Test de Login

```javascript
import { login } from './authService';

describe('authService - login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('debe guardar token en localStorage al hacer login exitoso', async () => {
    // Arrange: Mock de la respuesta del servidor
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          token: 'jwt-token-123',
          usuario: { id: 1, nombre: 'Juan', rol: 'CLIENTE' }
        })
      })
    );

    // Act: Ejecutar login
    const result = await login('juan@test.com', 'Password123!');

    // Assert: Verificar llamada a API
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8082/api/auth/login',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: 'juan@test.com',
          password: 'Password123!'
        })
      })
    );

    // Assert: Verificar que se guardó el token
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'jwt-token-123');
    
    // Assert: Verificar retorno exitoso
    expect(result.success).toBe(true);
  });

  it('debe manejar credenciales incorrectas', async () => {
    // Arrange: Mock de error del servidor
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Credenciales inválidas' })
      })
    );

    // Act
    const result = await login('wrong@test.com', 'wrongpass');

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toContain('incorrectos');
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
```

### Caso 2: Test de Carrito de Compras

```javascript
import { agregarAlCarrito, getPrecioTotal } from './carritoService';

describe('carritoService', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.getItem.mockReturnValue(null);
  });

  it('debe agregar producto a carrito vacío', () => {
    // Arrange
    const producto = {
      id: 1,
      nombre: 'Gorro de lana',
      precio: 5000,
      stock: 10
    };

    // Act
    const resultado = agregarAlCarrito(producto, 2);

    // Assert
    expect(resultado.success).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'carrito',
      expect.stringContaining('"cantidad":2')
    );
  });

  it('debe incrementar cantidad si producto ya existe', () => {
    // Arrange: Carrito con 1 unidad del producto
    const carritoExistente = [
      { id: 1, nombre: 'Gorro', precio: 5000, cantidad: 1, stock: 10 }
    ];
    localStorage.getItem.mockReturnValue(JSON.stringify(carritoExistente));

    const producto = { id: 1, nombre: 'Gorro', precio: 5000, stock: 10 };

    // Act: Agregar 2 unidades más
    agregarAlCarrito(producto, 2);

    // Assert: Ahora debe haber 3 unidades
    const llamada = localStorage.setItem.mock.calls[0];
    const carritoGuardado = JSON.parse(llamada[1]);
    expect(carritoGuardado[0].cantidad).toBe(3);
  });

  it('debe calcular precio total correctamente', () => {
    // Arrange
    const carrito = [
      { id: 1, precio: 5000, cantidad: 2 },  // 10,000
      { id: 2, precio: 3000, cantidad: 1 },  // 3,000
      { id: 3, precio: 2500, cantidad: 4 }   // 10,000
    ];
    localStorage.getItem.mockReturnValue(JSON.stringify(carrito));

    // Act
    const total = getPrecioTotal();

    // Assert: 10,000 + 3,000 + 10,000 = 23,000
    expect(total).toBe(23000);
  });
});
```

### Caso 3: Test de Componente con Router

```javascript
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Navbar } from './Navbar';
import * as authService from '../../services/authService';

// Mock del servicio
vi.mock('../../services/authService');

describe('Navbar', () => {
  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  it('debe mostrar "Iniciar sesión" si no está autenticado', () => {
    // Arrange
    authService.isAuthenticated.mockReturnValue(false);

    // Act
    renderNavbar();

    // Assert
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
    expect(screen.queryByText('Cerrar sesión')).not.toBeInTheDocument();
  });

  it('debe mostrar opciones de usuario autenticado', () => {
    // Arrange
    authService.isAuthenticated.mockReturnValue(true);
    authService.getUser.mockReturnValue({
      id: 1,
      nombre: 'María',
      rol: 'CLIENTE'
    });

    // Act
    renderNavbar();

    // Assert
    expect(screen.getByText('Carrito')).toBeInTheDocument();
    expect(screen.getByText('Mis Pedidos')).toBeInTheDocument();
    expect(screen.getByText(/Bienvenido, María/i)).toBeInTheDocument();
  });

  it('debe hacer logout al hacer click en "Cerrar sesión"', async () => {
    // Arrange
    const user = userEvent.setup();
    authService.isAuthenticated.mockReturnValue(true);
    authService.getUser.mockReturnValue({ nombre: 'Test' });
    authService.logout = vi.fn();
    global.confirm = vi.fn(() => true);

    renderNavbar();

    // Act
    const logoutBtn = screen.getByText('Cerrar sesión');
    await user.click(logoutBtn);

    // Assert
    expect(global.confirm).toHaveBeenCalled();
    expect(authService.logout).toHaveBeenCalled();
  });
});
```

---

## ❗ Troubleshooting

### Problema 1: "Cannot find module"

```
Error: Cannot find module './MiComponente'
```

**Solución:**
```javascript
// Verifica la ruta del import
import { MiComponente } from './MiComponente'; // ❌ Sin extensión
import { MiComponente } from './MiComponente.jsx'; // ✅ Con extensión
```

### Problema 2: "ReferenceError: localStorage is not defined"

**Solución:** Asegúrate de tener el mock en `setup.js`:
```javascript
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
```

### Problema 3: "Element type is invalid"

```
Element type is invalid: expected a string (for built-in components) 
or a class/function (for composite components) but got: undefined
```

**Causa:** Import/export incorrecto

**Solución:**
```javascript
// Si el componente usa export default:
export default function MiComponente() { ... }
import MiComponente from './MiComponente'; // ✅

// Si usa named export:
export function MiComponente() { ... }
import { MiComponente } from './MiComponente'; // ✅
```

### Problema 4: "Unable to find element"

```
TestingLibraryElementError: Unable to find an element with the text: /Login/i
```

**Solución:**
```javascript
// 1. Usar screen.debug() para ver qué se renderizó
screen.debug();

// 2. Buscar por diferentes atributos
screen.getByRole('button', { name: /Login/i });
screen.getByLabelText(/Email/i);
screen.getByPlaceholderText(/Buscar/i);

// 3. Usar queryBy si el elemento puede no existir
const elemento = screen.queryByText(/Login/i);
expect(elemento).not.toBeInTheDocument();
```

### Problema 5: Tests pasan individualmente pero fallan en conjunto

**Causa:** Tests no están aislados, se afectan entre sí

**Solución:**
```javascript
describe('Mi Suite', () => {
  beforeEach(() => {
    // Limpiar TODO antes de cada test
    vi.clearAllMocks();
    localStorage.clear();
    // Resetear cualquier estado global
  });

  afterEach(() => {
    // Limpieza adicional si es necesario
    cleanup();
  });
});
```

---

## ✨ Mejores Prácticas

### 1. Nombres Descriptivos

```javascript
// ❌ Mal
it('test 1', () => { ... });

// ✅ Bien
it('debe agregar producto al carrito cuando el stock es suficiente', () => { ... });
```

### 2. Un Concepto por Test

```javascript
// ❌ Mal: Test hace demasiadas cosas
it('debe manejar login y logout', () => {
  login();
  expect(...);
  logout();
  expect(...);
});

// ✅ Bien: Tests separados
it('debe hacer login correctamente', () => { ... });
it('debe hacer logout correctamente', () => { ... });
```

### 3. No Depender del Orden

```javascript
// ❌ Mal: Este test depende del anterior
it('test 1', () => { data = {...}; });
it('test 2', () => { expect(data).toBe(...); }); // ❌ Depende de test 1

// ✅ Bien: Cada test es independiente
it('test 1', () => {
  const data = {...};
  expect(data).toBe(...);
});
```

### 4. Queries por Prioridad

```javascript
// Prioridad alta (accesibles para usuarios)
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText(/email/i);
screen.getByPlaceholderText(/buscar/i);
screen.getByText(/hola/i);

// Prioridad media
screen.getByDisplayValue('valor');

// Prioridad baja (usar solo si no hay otra opción)
screen.getByTestId('my-element'); // Requiere data-testid
```

### 5. Esperar Cambios Asíncronos

```javascript
// ❌ Mal: No espera cambios asíncronos
it('test asíncrono', () => {
  render(<AsyncComponent />);
  expect(screen.getByText('Loaded')).toBeInTheDocument(); // ❌ Puede fallar
});

// ✅ Bien: Usa waitFor
it('test asíncrono', async () => {
  render(<AsyncComponent />);
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});

// ✅ También bien: Usa findBy (combina getBy + waitFor)
it('test asíncrono', async () => {
  render(<AsyncComponent />);
  expect(await screen.findByText('Loaded')).toBeInTheDocument();
});
```

### 6. Evitar Implementación Interna

```javascript
// ❌ Mal: Testea implementación interna
it('debe llamar a handleClick internamente', () => {
  expect(component.handleClick).toHaveBeenCalled();
});

// ✅ Bien: Testea comportamiento observable
it('debe mostrar mensaje al hacer click', async () => {
  const user = userEvent.setup();
  render(<Component />);
  
  await user.click(screen.getByRole('button'));
  
  expect(screen.getByText('Mensaje')).toBeInTheDocument();
});
```

---

## 📊 Comando de Cobertura

```bash
npm run test:coverage
```

**Resultado:**
```
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
All files             |   85.5  |   80.2   |   90.0  |   85.1  |
 authService.js       |   95.0  |   88.0   |  100.0  |   94.5  |
 carritoService.js    |   92.3  |   85.0   |   95.0  |   91.8  |
```

**Meta ideal:**
- Statements: > 80%
- Branches: > 75%
- Functions: > 85%
- Lines: > 80%

---

## 🎓 Recursos de Aprendizaje

### Documentación Oficial
- [Vitest](https://vitest.dev/) - Framework de testing
- [React Testing Library](https://testing-library.com/react) - Testing de React
- [Testing Library Queries](https://testing-library.com/docs/queries/about) - Cómo seleccionar elementos
- [jest-dom Matchers](https://github.com/testing-library/jest-dom) - Matchers personalizados

### Tutoriales Recomendados
- [Kent C. Dodds - Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
- [Common Mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Última actualización:** 23 de noviembre de 2025  
**Versión:** 2.0.0 - Guía Técnica Completa
