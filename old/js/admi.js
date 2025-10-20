// Array de productos para la tabla de productos
window.productos = productos;
// Array de usuarios para la tabla de usuarios
window.usuarios = usuarios; 

// Cambia la sección visible según el botón presionado
function mostrarSeccion(id) {
  // Oculta todas las secciones
  var secciones = document.querySelectorAll('.content-section');
  secciones.forEach(function(sec) {
    sec.classList.remove('active');
  });
  // Muestra la sección seleccionada
  document.getElementById(id).classList.add('active');
};




// Genera el cuerpo de la tabla de usuarios con campos editables (excepto id)
function generarTbody(usuarios) {
  var tbody = document.createElement('tbody');
  usuarios.forEach(function(usuario, idx) {
    var tr = document.createElement('tr');

    // ID
    var tdId = document.createElement('td');
    var inputId = document.createElement('input');
    inputId.type = 'text';
    inputId.className = 'input-corto';
    inputId.value = usuario.id;
    tdId.appendChild(inputId);
    tr.appendChild(tdId);

    // RUT
    var tdRut = document.createElement('td');
    var inputRut = document.createElement('input');
    inputRut.type = 'text';
    inputRut.value = usuario.rut || '';
    inputRut.className ='input-mediano';
    tdRut.appendChild(inputRut);
    tr.appendChild(tdRut);

    // Nombre
    var tdNombre = document.createElement('td');
    var inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.value = usuario.nombre;
    inputNombre.className ='input-corto';
    tdNombre.appendChild(inputNombre);
    tr.appendChild(tdNombre);

    // Apellidos
    var tdApellidos = document.createElement('td');
    var inputApellidos = document.createElement('input');
    inputApellidos.type = 'text';
    inputApellidos.value = usuario.apellidos || '';
    tdApellidos.appendChild(inputApellidos);
    tr.appendChild(tdApellidos);

    // Email
    var tdEmail = document.createElement('td');
    var inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.value = usuario.email;
    tdEmail.appendChild(inputEmail);
    tr.appendChild(tdEmail);

    // Región
    var tdRegion = document.createElement('td');
    var inputRegion = document.createElement('input');
    inputRegion.type = 'text';
    inputRegion.value = usuario.region || '';
    tdRegion.appendChild(inputRegion);
    tr.appendChild(tdRegion);

    // Comuna
    var tdComuna = document.createElement('td');
    var inputComuna = document.createElement('input');
    inputComuna.type = 'text';
    inputComuna.value = usuario.comuna || '';
    inputComuna.className ='input-mediano';
    tdComuna.appendChild(inputComuna);
    tr.appendChild(tdComuna);

    // Dirección
    var tdDireccion = document.createElement('td');
    var inputDireccion = document.createElement('input');
    inputDireccion.type = 'text';
    inputDireccion.value = usuario.direccion || '';
    tdDireccion.appendChild(inputDireccion);
    tr.appendChild(tdDireccion);

    // Rol
    var tdRol = document.createElement('td');
    var inputRol = document.createElement('input');
    inputRol.type = 'text';
    inputRol.value = usuario.rol;
    inputRol.className ='input-mediano';
    tdRol.appendChild(inputRol);
    tr.appendChild(tdRol);

    // Estado
    var tdEstado = document.createElement('td');
    var inputEstado = document.createElement('input');
    inputEstado.type = 'text';
    inputEstado.className = 'input-corto';
    inputEstado.value = usuario.estado || 'activo';
    tdEstado.appendChild(inputEstado);
    tr.appendChild(tdEstado);

    // Acciones
    var tdAccion = document.createElement('td');
    var btnGuardar = document.createElement('button');
    btnGuardar.textContent = 'Guardar';
    btnGuardar.onclick = function () {
      usuario.id = inputId.value;
      usuario.rut = inputRut.value;
      usuario.nombre = inputNombre.value;
      usuario.apellidos = inputApellidos.value;
      usuario.email = inputEmail.value;
      usuario.region = inputRegion.value;
      usuario.comuna = inputComuna.value;
      usuario.direccion = inputDireccion.value;
      usuario.rol = inputRol.value;
      usuario.estado = inputEstado.value;

      btnGuardar.textContent = 'Guardado!';
      setTimeout(function () {
        btnGuardar.textContent = 'Guardar';
      }, 1000);
    };
    tdAccion.appendChild(btnGuardar);
    tr.appendChild(tdAccion);

    tbody.appendChild(tr);
  });
  return tbody;
}




// Genera el cuerpo de la tabla de productos con campos editables (excepto id)
function generarTbodyProductos(productos) {
  var tbody = document.createElement('tbody');
  productos.forEach(function(producto) {
    var tr = document.createElement('tr');
    // ID (editable)
    var tdId = document.createElement('td');
    var inputId = document.createElement('input');
    inputId.type = 'text';
    inputId.className ='input-corto';
    inputId.value = producto.id;
    tdId.appendChild(inputId);
    tr.appendChild(tdId);
    // Nombre (editable)
    var tdNombre = document.createElement('td');
    var inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.value = producto.titulo;
    tdNombre.appendChild(inputNombre);
    tr.appendChild(tdNombre);
    // Descripción (editable)
    var tdDesc = document.createElement('td');
    var inputDesc = document.createElement('input');
    inputDesc.type = 'text';
    inputDesc.value = producto.descripcion;
    tdDesc.appendChild(inputDesc);
    tr.appendChild(tdDesc);
    // Categoría (editable)
    var tdCat = document.createElement('td');
    var inputCat = document.createElement('input');
    inputCat.type = 'text';
    inputCat.value = producto.temporada;
    inputCat.className ='input-corto';
    tdCat.appendChild(inputCat);
    tr.appendChild(tdCat);
    // Precio (editable)
    var tdPrecio = document.createElement('td');
    var inputPrecio = document.createElement('input');
    inputPrecio.type = 'text';
    inputPrecio.className ='input-corto';
    inputPrecio.value = producto.precio;
    tdPrecio.appendChild(inputPrecio);
    tr.appendChild(tdPrecio);
    // Stock (editable)
    var tdStock = document.createElement('td');
    var inputStock = document.createElement('input');
    inputStock.type = 'number';
    inputStock.className ='input-corto';
    inputStock.value = producto.stock;
    tdStock.appendChild(inputStock);
    tr.appendChild(tdStock);
    // Estado (editable)
    var tdEstado = document.createElement('td');
    var inputEstado = document.createElement('input');
    inputEstado.type = 'text';
    inputEstado.className ='input-corto';
    inputEstado.value = producto.estado || "activo";
    tdEstado.appendChild(inputEstado);
    tr.appendChild(tdEstado);
    // Columna Acciones con botón Guardar
    var tdAccion = document.createElement('td');
    var btnGuardar = document.createElement('button');
    btnGuardar.textContent = 'Guardar';
    btnGuardar.onclick = function() {
      // Actualiza el array con los nuevos valores
      producto.id = inputId.value;
      producto.titulo = inputNombre.value;
      producto.descripcion = inputDesc.value;
      producto.temporada = inputCat.value;
      producto.precio = inputPrecio.value;
      producto.stock = parseInt(inputStock.value) || 0;
      producto.estado = inputEstado.value;
      btnGuardar.textContent = 'Guardado!';
      setTimeout(function(){ btnGuardar.textContent = 'Guardar'; }, 1000);
    };
    tdAccion.appendChild(btnGuardar);
    tr.appendChild(tdAccion);
    tbody.appendChild(tr);
  });
  return tbody;
}



// Función para renderizar la tabla de usuarios
function renderizarUsuarios() {
  var tablaUsuario = document.getElementById('tablaUsuarios');
  if (tablaUsuario) {
    var oldTbody = tablaUsuario.querySelector('tbody');
    if (oldTbody) tablaUsuario.removeChild(oldTbody);
    tablaUsuario.appendChild(generarTbody(usuarios));
  }
}

// Función para renderizar la tabla de productos
function renderizarProductos() {
  var tablaProducto = document.getElementById('tablaProductos');
  if (tablaProducto) {
    var oldTbody = tablaProducto.querySelector('tbody');
    if (oldTbody) tablaProducto.removeChild(oldTbody);
    tablaProducto.appendChild(generarTbodyProductos(productos));
  }
}

// Cuando la página esté lista, llena las tablas y agrega listeners a los botones
window.addEventListener('DOMContentLoaded', function() {
  renderizarUsuarios();
  renderizarProductos();

  // Botón para agregar usuario
  var btnAgregarUsuario = document.getElementById('btnAgregarUsuario');
  if (btnAgregarUsuario) {
    btnAgregarUsuario.addEventListener('click', function() {
      usuarios.push({ id: '', nombre: '', email: '', rol: '' });
      renderizarUsuarios();
    });
  }

  // Botón para agregar producto
  var btnAgregarProducto = document.getElementById('btnAgregarProducto');
  if (btnAgregarProducto) {
    btnAgregarProducto.addEventListener('click', function() {
      productos.push({ id: '', titulo: '', descripcion: '', precio: '', stock: 0, temporada: '' });
      renderizarProductos();
    });
  }
});

