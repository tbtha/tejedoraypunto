# 📖 Manual de Usuario - Tejedora y Punto

## Bienvenido a Tejedora y Punto

Esta guía te ayudará a navegar y utilizar todas las funcionalidades de nuestra plataforma de productos artesanales tejidos.

---

## 📋 Tabla de Contenidos

1. [Primeros Pasos](#primeros-pasos)
2. [Registro de Usuario](#registro-de-usuario)
3. [Inicio de Sesión](#inicio-de-sesión)
4. [Navegación Principal](#navegación-principal)
5. [Explorar Productos](#explorar-productos)
6. [Carrito de Compras](#carrito-de-compras)
7. [Realizar un Pedido](#realizar-un-pedido)
8. [Mis Pedidos](#mis-pedidos)
9. [Panel de Administración](#panel-de-administración)
10. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## 🚀 Primeros Pasos

### Acceder a la Aplicación

1. Abre tu navegador web (Chrome, Firefox, Safari, Edge)
2. Ingresa a la URL: `http://localhost:5173` 
3. Verás la página de inicio con nuestros productos destacados

### Navegación sin Registrarse

Puedes explorar la tienda sin necesidad de crear una cuenta:
- Ver catálogo de productos
- Filtrar por categorías
- Buscar productos específicos
- Leer el blog
- Ver información de contacto

**Nota:** Para comprar necesitas crear una cuenta.

---

## 👤 Registro de Usuario

### Paso 1: Acceder al Registro

1. Haz clic en **"Iniciar sesión"** en el menú superior
2. Selecciona la pestaña **"Registrarse"**

### Paso 2: Completar el Formulario

Completa los siguientes campos:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Nombre completo** | Tu nombre y apellido | María González |
| **RUT** | RUT chileno sin puntos, con guión | 12345678-9 |
| **Email** | Correo electrónico válido | maria@ejemplo.com |
| **Teléfono** | Número de contacto | +56912345678 |
| **Fecha de nacimiento** | En formato DD/MM/AAAA | 15/03/1990 |
| **Región** | Selecciona tu región | Metropolitana |
| **Comuna** | Selecciona tu comuna | Santiago |
| **Dirección** | Calle, número, depto | Calle Falsa 123, Depto 4B |
| **Contraseña** | Mínimo 8 caracteres | ••••••••• |

### Paso 3: Validaciones

El sistema validará automáticamente:
- ✅ Email con formato correcto (debe contener @)
- ✅ RUT válido según dígito verificador
- ✅ Contraseña segura (mínimo 8 caracteres)
- ✅ Todos los campos obligatorios completos

### Paso 4: Confirmar Registro

1. Haz clic en **"Registrarse"**
2. Si todo es correcto, verás un mensaje de confirmación
3. Serás redirigido al inicio de sesión

---

## 🔐 Inicio de Sesión

### Iniciar Sesión como Cliente

1. Haz clic en **"Iniciar sesión"** en el menú
2. Ingresa tu **correo electrónico**
3. Ingresa tu **contraseña**
4. Haz clic en **"Entrar"**

**Credenciales de prueba - Cliente:**
```
Email: cliente@gmail.com
Contraseña: cliente123
```

### Iniciar Sesión como Administrador

**Credenciales de prueba - Administrador:**
```
Email: tejedoraypunto@gmail.com
Contraseña: admin123
```

### ¿Olvidaste tu Contraseña?

Proximas integraciones.

---

## 🧭 Navegación Principal

Una vez dentro, verás el menú principal:

### Para Usuarios No Autenticados
- **Inicio** - Página principal
- **Productos** - Catálogo completo
- **Blog** - Artículos y noticias
- **Me** - Sobre nosotros
- **Contacto** - Formulario de contacto
- **Iniciar sesión** - Acceso a cuenta

### Para Usuarios Autenticados (Clientes)
- **Inicio** - Página principal
- **Productos** - Catálogo completo
- **Carrito** - Tu carrito de compras
- **Mis Pedidos** - Historial de compras
- **Blog** - Artículos y noticias
- **Me** - Sobre nosotros
- **Contacto** - Formulario de contacto
- **Cerrar sesión** - Salir de tu cuenta

### Para Administradores
Acceso adicional a:
- **Dashboard** - Panel de control
- **Gestión de Productos**
- **Gestión de Usuarios**
- **Gestión de Pedidos**

---

## 🛍️ Explorar Productos

### Ver Catálogo

1. Haz clic en **"Productos"** en el menú
2. Verás todos los productos disponibles en formato de tarjetas

### Filtrar por Categoría

1. En la página de productos, selecciona una categoría del menú desplegable:
   - Temporada Verano
   - Temporada Invierno
   - Accesorios
   - Ropa
   - Otros

2. Haz clic en **"Filtrar"**
3. Solo se mostrarán productos de esa categoría

### Buscar Productos

1. Usa el campo de búsqueda en la parte superior
2. Escribe el nombre del producto
3. Los resultados se filtrarán automáticamente

### Ver Detalles del Producto

Cada tarjeta de producto muestra:
- 📸 **Imagen** del producto
- 🏷️ **Nombre** del producto
- 💰 **Precio** en pesos chilenos
- 📦 **Stock disponible**
- 📝 **Descripción** breve

---

## 🛒 Carrito de Compras

### Agregar Productos

1. Ve a la página de **Productos**
2. Encuentra el producto que deseas
3. Ajusta la **cantidad** (usando los botones + y -)
4. Haz clic en **"Agregar al carrito"**
5. Verás una confirmación

### Ver tu Carrito

1. Haz clic en **"Carrito"** en el menú superior
2. Verás todos los productos agregados

### Modificar Cantidades

En el carrito puedes:
- ➕ **Aumentar cantidad** - Botón "+"
- ➖ **Disminuir cantidad** - Botón "-"
- 🗑️ **Eliminar producto** - Icono de basura
- 🧹 **Vaciar carrito** - Botón "Vaciar Carrito"

### Resumen del Pedido

En el lado derecho verás:
- 📊 **Total de productos** - Cantidad de items
- 💵 **Subtotal** - Suma de productos
- 🚚 **Envío** - Gratis
- 💰 **Total a pagar** - Monto final

---

## 📦 Realizar un Pedido

### Paso 1: Revisar Carrito

1. Verifica que todos los productos sean correctos
2. Confirma las cantidades
3. Revisa el total a pagar

### Paso 2: Proceder al Pago

1. Haz clic en **"Proceder al Pago"**
2. Se abrirá el formulario de datos de envío

### Paso 3: Completar Datos de Envío

Ingresa la información requerida:
- 📍 **Región** - Selecciona tu región
- 🏘️ **Comuna** - Selecciona tu comuna
- 🏠 **Dirección** - Dirección completa de entrega
- 💳 **Método de pago** - Selecciona entre:
  - Webpay
  - Transferencia bancaria

### Paso 4: Confirmar Pedido

1. Revisa toda la información
2. Haz clic en **"Confirmar Pedido"**
3. Recibirás una confirmación con el número de pedido
4. El carrito se vaciará automáticamente

---

## 📋 Mis Pedidos

### Acceder a Mis Pedidos

1. Haz clic en **"Mis Pedidos"** en el menú
2. Verás tu historial completo de compras

### Información de Cada Pedido

Cada pedido muestra:
- 🔢 **Número de orden** - ID único
- 📅 **Fecha de compra** - Cuándo realizaste el pedido
- 🏷️ **Estado actual**:
  - 🟡 **PENDIENTE** - En proceso de confirmación
  - 🟢 **CONFIRMADA** - Pedido confirmado
  - 🔵 **ENVIADA** - En camino
  - ✅ **ENTREGADA** - Ya recibido
  - 🔴 **CANCELADA** - Pedido cancelado
- 💰 **Total pagado**
- 💳 **Método de pago**
- 📍 **Dirección de envío**

### Ver Detalles del Pedido

1. Haz clic en **"Ver Detalles"**
2. Se abrirá un modal con información completa:
   - Lista de productos comprados
   - Cantidad de cada producto
   - Precio unitario
   - Subtotal por producto
   - Neto e IVA
   - Total del pedido

---

## 👨‍💼 Panel de Administración

**Nota:** Solo disponible para usuarios con rol de Administrador.

### Acceder al Dashboard

1. Inicia sesión como administrador
2. Haz clic en **"Dashboard"** en el menú
3. Verás el panel de control

### Dashboard - Estadísticas

El dashboard muestra:
- 📊 **Total de pedidos**
- 🟡 **Pedidos pendientes**
- 🟢 **Pedidos confirmados**
- 🔵 **Pedidos enviados**
- ✅ **Pedidos entregados**
- 🔴 **Pedidos cancelados**
- 💰 **Total en ventas**

### Gestión de Productos

#### Ver Inventario
1. Click en **"Inventario"**
2. Verás tabla con todos los productos

#### Crear Producto Nuevo
1. Click en **"Crear Producto"**
2. Completa el formulario:
   - Nombre del producto
   - Descripción
   - Precio
   - Stock
   - Categoría
   - Imagen (URL)
3. Click en **"Guardar"**

#### Editar Producto
1. En el inventario, busca el producto
2. Click en icono de **editar** (lápiz)
3. Modifica los campos necesarios
4. Click en **"Actualizar"**

#### Eliminar Producto
1. Click en icono de **eliminar** (basura)
2. Confirma la acción
3. El producto se eliminará permanentemente

### Gestión de Categorías

#### Crear Categoría
1. Click en **"Crear Categoría"**
2. Ingresa:
   - Nombre de la categoría
   - Descripción
3. Click en **"Crear"**

### Gestión de Usuarios

#### Ver Usuarios
1. Click en **"Gestión de Usuarios"**
2. Verás tabla con todos los usuarios registrados

#### Crear Usuario
1. Click en **"Crear Usuario"**
2. Completa datos del usuario
3. Asigna rol (CLIENTE o ADMIN)
4. Click en **"Guardar"**

#### Editar Usuario
1. Click en icono de editar
2. Modifica datos necesarios
3. Click en **"Actualizar"**

#### Eliminar Usuario
1. Click en icono de eliminar
2. Confirma la acción
3. El usuario será eliminado

### Gestión de Pedidos

#### Ver Pedidos
1. Click en **"Gestión de Pedidos"**
2. Verás tabla con todos los pedidos

Información mostrada:
- ID del pedido
- Fecha de compra
- Cliente
- Total
- Estado actual
- Método de pago
- Dirección de envío

#### Cambiar Estado de Pedido
1. Ubica el pedido
2. Click en menú desplegable de **Estado**
3. Selecciona nuevo estado:
   - PENDIENTE
   - CONFIRMADA
   - ENVIADA
   - ENTREGADA
   - CANCELADA
4. El cambio se guarda automáticamente

#### Ver Detalles de Pedido
1. Click en **"Ver Detalles"**
2. Verás:
   - Productos del pedido
   - Cantidades
   - Precios
   - Información del cliente

---

