# Tejedora y Punto - API REST

## Documentación con Swagger

Este proyecto incluye documentación automática de la API REST usando **Swagger/OpenAPI 3**.

## 🚀 Cómo iniciar el sistema

### Requisitos previos
- **XAMPP** instalado
- **Java 21** o superior
- **IDE** como VS Code

### Paso a paso para iniciar el sistema

#### 1. Iniciar servicios de base de datos (XAMPP)

1. **Abrir XAMPP Control Panel**
   - Busca "XAMPP Control Panel" en el menú de inicio
   - Ejecutar como administrador (recomendado)

2. **Iniciar Apache**
   - Hacer clic en el botón "Start" junto a **Apache**
   - Esperar a que aparezca el texto en verde

3. **Iniciar MySQL**
   - Hacer clic en el botón "Start" junto a **MySQL**
   - Esperar a que aparezca el texto en verde

4. **Verificar que los servicios estén corriendo**
   - Apache debería estar en el puerto 80
   - MySQL debería estar en el puerto 3306

#### 2. Verificar la base de datos (Opcional)

1. **Abrir phpMyAdmin**
   - Hacer clic en "Admin" junto a MySQL en XAMPP
   - O navegar a: `http://localhost/phpmyadmin`

2. **Verificar la base de datos**
   - La base de datos `tejedoraypunto` se creará automáticamente
   - Las tablas se crearán al iniciar Spring Boot

#### 3. Iniciar la aplicación Spring Boot

##### Desde VS Code
1. **Abrir el proyecto** en VS Code
2. **Ejecutar la aplicación**:
   - Abrir `tejedoraypuntoApplication.java`
   - Hacer clic derecho → "Run Java"
   - O usar `Ctrl + F5`

### 🌐 Acceder a la documentación de Swagger

Una vez que tengas el servidor ejecutándose, puedes acceder a la documentación:

Una vez que tengas el servidor ejecutándose, puedes acceder a la documentación de Swagger en las siguientes URLs:

#### Swagger UI (Interfaz gráfica)
```
http://localhost:8082/swagger-ui.html
```

#### API Docs (JSON)
```
http://localhost:8082/api-docs
```

### Características de la documentación

La documentación incluye:

- **Controladores documentados**:
  - 🛍️ **Productos**: Gestión completa de productos de tejido
  - 📁 **Categorías**: Administración de categorías de productos
  - 👥 **Usuarios**: Gestión de usuarios del sistema
  - 🖼️ **Imágenes**: Subida y eliminación de imágenes de productos

- **Información detallada**:
  - Descripción de cada endpoint
  - Parámetros requeridos y opcionales
  - Ejemplos de requests y responses
  - Códigos de respuesta HTTP
  - Modelos de datos con ejemplos

### Cómo usar la interfaz de Swagger

1. **Explorar endpoints**: Navega por los diferentes controladores en la interfaz
2. **Probar APIs**: Usa el botón "Try it out" para ejecutar requests directamente
3. **Ver ejemplos**: Consulta los ejemplos de datos para cada modelo
4. **Validar responses**: Revisa los códigos de respuesta y estructura de datos

### Configuración

La configuración de Swagger se encuentra en:
- `SwaggerConfig.java`: Configuración principal de OpenAPI
- `application.properties`: Propiedades de Swagger UI

### Endpoints principales

#### Productos (`/api/productos`)
- `GET /api/productos` - Listar todos los productos
- `POST /api/productos` - Crear un nuevo producto
- `GET /api/productos/{id}` - Obtener producto por ID
- `PUT /api/productos/{id}` - Actualizar producto
- `DELETE /api/productos/{id}` - Eliminar producto
- `PATCH /api/productos/{id}/activar` - Activar producto
- `PATCH /api/productos/{id}/desactivar` - Desactivar producto

#### Categorías (`/api/categorias`)
- `GET /api/categorias` - Listar todas las categorías
- `POST /api/categorias` - Crear una nueva categoría
- `GET /api/categorias/{id}` - Obtener categoría por ID
- `PUT /api/categorias/{id}` - Actualizar categoría
- `DELETE /api/categorias/{id}` - Eliminar categoría

#### Usuarios (`/api/usuarios`)
- `GET /api/usuarios` - Listar todos los usuarios
- `POST /api/usuarios` - Crear un nuevo usuario
- `GET /api/usuarios/{id}` - Obtener usuario por ID
- `PUT /api/usuarios/{id}` - Actualizar usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario
- `PATCH /api/usuarios/{id}/activar` - Activar usuario
- `PATCH /api/usuarios/{id}/desactivar` - Desactivar usuario

#### Imágenes (`/api`)
- `POST /api/upload-imagen` - Subir imagen de producto
- `DELETE /api/delete-imagen` - Eliminar imagen de producto

### Notas importantes

- Todas las APIs soportan CORS para `http://localhost:5173` (frontend)
- Las imágenes se almacenan en `../tejedoraypunto-frontend/public/img/otros`
- Tamaño máximo de imagen: 5MB
- Formatos soportados: JPG, PNG, GIF, WEBP

### Desarrollo

Para modificar la documentación:
1. Edita las anotaciones `@Operation`, `@ApiResponse`, etc. en los controladores
2. Modifica la configuración en `SwaggerConfig.java`
3. Reinicia el servidor para ver los cambios

### 🎯 Resumen rápido de inicio

1. ✅ **Iniciar XAMPP** (Apache + MySQL)
2. ✅ **Ejecutar Spring Boot** (puerto 8082)
3. ✅ **Abrir Swagger**: `http://localhost:8082/swagger-ui.html`
4. ✅ **¡Listo para usar la API!**

---
