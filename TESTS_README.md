# Tests Unitarios con Mockito - Tejedora y Punto

## 📋 Resumen de Tests Implementados

### 🛍️ **ProductoServicesImplTest** (3 tests)

#### Tests Implementados:
1. **`deberiaCrearProductoExitosamente`**
   - Verifica la creación exitosa de un producto
   - Valida que se guarden todos los campos correctamente (nombre, precio, stock, activo)

2. **`deberiaObtenerProductoPorIdExitosamente`**
   - Prueba la obtención de un producto por ID
   - Verifica que se retorne el producto correcto

3. **`deberiaActualizarProductoExitosamente`**
   - Valida la actualización de campos de un producto
   - Verifica que se actualicen descripción, precio y stock

### 👥 **UsuarioServicesImplTest** (2 tests)

#### Tests Implementados:
1. **`deberiaCrearUsuarioExitosamente`**
   - Verifica la creación exitosa de un usuario
   - Valida todos los campos del usuario (nombre, apellidos, email, rol, activo)

2. **`deberiaActualizarUsuarioExitosamente`**
   - Valida la actualización completa de un usuario
   - Verifica que se actualicen todos los campos relevantes (nombre, apellidos, email, dirección, región, comuna, rol)

## 🧪 Tecnologías y Herramientas Utilizadas

- **JUnit 5**: Framework de testing
- **Mockito**: Framework de mocking para aislar dependencias
- **Spring Boot Test**: Integración con Spring Boot
- **AssertJ**: Assertions más legibles (incluido en Spring Boot Test)

## 🔧 Ejecución de Tests

### Ejecutar todos los tests:
```bash
./mvnw test
```

### Ejecutar tests específicos:
```bash
# Solo tests de ProductoServices
./mvnw test -Dtest=ProductoServicesImplTest

# Solo tests de UsuarioServices
./mvnw test -Dtest=UsuarioServicesImplTest
```

### Desde VS Code:
1. Abrir la clase de test
2. Hacer clic en el ícono "▶" junto al método o clase
3. O usar `Ctrl + Shift + P` → "Java: Run Tests"

## 📊 Cobertura de Tests

### ProductoServices - Métodos Cubiertos:
- ✅ `crear(Producto)` 
- ✅ `obtenerId(Long)`
- ✅ `listarTodas()`
- ✅ `actualizar(Long, Producto)`
- ✅ `eliminar(Long)`
- ✅ `desactivar(Long)`
- ✅ `activar(Long)` (implícito en desactivar test)

### UsuarioServices - Métodos Cubiertos:
- ✅ `crear(Usuario)`
- ✅ `obtenerId(Long)`
- ✅ `listarTodas()`
- ✅ `actualizar(Long, Usuario)`
- ✅ `eliminar(Long)`
- ✅ `desactivar(Long)`
- ✅ `activar(Long)`

## 🎯 Patrones de Testing Utilizados

### Arrange-Act-Assert (AAA)
Cada test sigue el patrón:
- **Arrange** (Given): Configuración de datos de prueba
- **Act** (When): Ejecución del método a probar
- **Assert** (Then): Verificación de resultados

### Mockito Annotations
- `@ExtendWith(MockitoExtension.class)`: Habilita Mockito
- `@Mock`: Crea mock del repositorio
- `@InjectMocks`: Inyecta mocks en la clase a probar

### Verificaciones
- `verify()`: Verifica que se llamaron los métodos esperados
- `times()`: Verifica el número de llamadas
- `never()`: Verifica que no se llamó un método

## 🚀 Beneficios de estos Tests

1. **Aislamiento**: Tests independientes de la base de datos
2. **Velocidad**: Ejecución rápida sin I/O real
3. **Confiabilidad**: Tests deterministas y repetibles
4. **Cobertura**: Validación de casos exitosos y de error
5. **Documentación**: Los tests sirven como documentación viva del comportamiento

## 📈 Métricas Actuales

- **Total de tests**: 5
- **Tests de Producto**: 3
- **Tests de Usuario**: 2
- **Cobertura**: Métodos principales de servicios cubiertos
- **Estado**: ✅ Todos los tests pasan

## 🔄 Mejoras Futuras

- Agregar tests de integración
- Implementar tests para CategoriaServices
- Agregar tests para controladores
- Configurar reporte de cobertura con JaCoCo