
// Cambia la sección visible según el botón presionado
function mostrarSeccion(id) {
  // Oculta todas las secciones
  var secciones = document.querySelectorAll('.content-section');
  secciones.forEach(function(sec) {
    sec.classList.remove('active');
  });
  // Muestra la sección seleccionada
  document.getElementById(id).classList.add('active');
}


// Array de productos para la tabla de productos
const productos = [
  {
    id: '001',
    temporada: "winter",
    imagen: "img/winter/chaleco1.jpeg",
    imagenes: [
      "img/winter/chaleco1.jpeg",
      "img/winter/chaleco1.jpeg",
      "img/winter/chaleco1.jpeg"
    ],
    titulo: "Chaleco Bosque",
    descripcion: "Inspirado en texturas naturales y tonos tierra.",
    enlace: "#",
    precio: "$55.000",
    stock: 1
  },
  {
    id: '002',
    temporada: "winter",
    imagen: "img/winter/chaleco2.jpeg",
    imagenes: [
      "img/winter/chaleco2.jpeg",
      "img/winter/chaleco1.jpeg",
      "img/winter/chaleco1.jpeg"
    ],
    titulo: "Chaleco Cobre",
    descripcion: "Diseño clásico con detalles artesanales.",
    enlace: "#",
    precio: "$58.000",
    stock: 2
  },
  {
    id: '003',
    temporada: "winter",
    imagen: "img/winter/chaleco3.jpeg",
    imagenes: [
      "img/winter/chaleco3.jpeg",
      "img/winter/chaleco1.jpeg",
      "img/winter/chaleco1.jpeg"
    ],
    titulo: "Chaleco Invierno",
    descripcion: "Abrigo ligero con punto cerrado.",
    enlace: "#",
    precio: "$62.000",
    stock: 1
  },
  {
    id: '004',
    temporada: "winter",
    imagen: "img/winter/chaleco4.jpeg",
    imagenes: [
      "img/winter/chaleco4.jpeg",
      "img/winter/chaleco1.jpeg",
      "img/winter/chaleco1.jpeg"
    ],
    titulo: "Chaleco Niebla",
    descripcion: "Tejido grueso, ideal para días fríos.",
    enlace: "#",
    precio: "$60.000",
    stock: 2
  },
  {
    id: '005',
    temporada: "summer",
    imagen: "img/summer/summer1_1.jpeg",
    imagenes: [
      "img/summer/summer1_1.jpeg",
      "img/winter/chaleco1.jpeg",
      "img/winter/chaleco1.jpeg"
    ],
    titulo: "Top Lino",
    descripcion: "Fresco y tejido a mano con hilo natural.",
    enlace: "#",
    precio: "$28.000",
    stock: 3
  },
  {
    id: '006',
    temporada: "summer",
    imagen: "img/summer/summer2.jpeg",
    imagenes: [
      "img/winter/chaleco1.jpeg",
      "img/summer/summer2.jpeg",
      "img/winter/chaleco1.jpeg"
    ],
    titulo: "Bolero Sol",
    descripcion: "Ideal para tardes cálidas y looks bohemios.",
    enlace: "#",
    precio: "$27.000",
    stock: 2
  },
  {
    id: '007',
    temporada: "summer",
    imagen: "img/summer/summer3_3.jpeg",
    imagenes: [
      "img/winter/chaleco1.jpeg",
      "img/winter/chaleco1.jpeg",
      "img/winter/chaleco1.jpeg"
    ],
    titulo: "Crop Mandala",
    descripcion: "Diseño circular inspirado en patrones ancestrales.",
    enlace: "#",
    precio: "$25.000",
    stock: 1
  },
  {
    id: '008',
    temporada: "summer",
    imagen: "img/summer/summer4.jpeg",
    imagenes: [
      "img/summer/summer4.jpeg",
      "img/winter/chaleco1.jpeg",
      "img/winter/chaleco1.jpeg"
    ],
    titulo: "Vestido Arena",
    descripcion: "Ligero, con caída suave y textura artesanal.",
    enlace: "#",
    precio: "$30.000",
    stock: 2
  },
  {
    id: '009',
    temporada: "summer",
    imagen: "img/summer/summer5.jpeg",
    imagenes: [
      "img/summer/summer5.jpeg",
      "img/winter/chaleco1.jpeg",
      "img/winter/chaleco1.jpeg"
    ],
    titulo: "Top Coral",
    descripcion: "Color vibrante y tejido en punto calado.",
    enlace: "#",
    precio: "$26.000",
    stock: 3
  },
  {
    id: '010',
    temporada: "summer",
    imagen: "img/summer/summer6.jpeg",
    imagenes: [
      "img/summer/summer6.jpeg",
      "img/winter/chaleco1.jpeg",
      "img/winter/chaleco1.jpeg"
    ],
    titulo: "Kimono Brisa",
    descripcion: "Perfecto para capas ligeras y estilo relajado.",
    enlace: "#",
    precio: "$29.000",
    stock: 2
  }
];


// Array de usuarios para la tabla de usuarios
const usuarios = [
  { id: '001', nombre: "Tabatha", email: "tejedoraypunto@gmail.com", rol: "Administrador" },
  { id: '002', nombre: "Lucía", email: "lucia@email.com", rol: "Cliente" }
];



// Genera el cuerpo de la tabla de usuarios con campos editables (excepto id)
function generarTbody(usuarios) {
  var tbody = document.createElement('tbody');
  usuarios.forEach(function(usuario, idx) {
    var tr = document.createElement('tr');
    // ID (no editable)
    var tdId = document.createElement('td');
    tdId.textContent = usuario.id;
    tr.appendChild(tdId);
    // Nombre (editable)
    var tdNombre = document.createElement('td');
    var inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.value = usuario.nombre;
    tdNombre.appendChild(inputNombre);
    tr.appendChild(tdNombre);
    // Email (editable)
    var tdEmail = document.createElement('td');
    var inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.value = usuario.email;
    tdEmail.appendChild(inputEmail);
    tr.appendChild(tdEmail);
    // Rol (editable)
    var tdRol = document.createElement('td');
    var inputRol = document.createElement('input');
    inputRol.type = 'text';
    inputRol.value = usuario.rol;
    tdRol.appendChild(inputRol);
    tr.appendChild(tdRol);
    // Columna Acciones con botón Guardar
    var tdAccion = document.createElement('td');
    var btnGuardar = document.createElement('button');
    btnGuardar.textContent = 'Guardar';
    btnGuardar.onclick = function() {
      // Actualiza el array con los nuevos valores
      usuario.nombre = inputNombre.value;
      usuario.email = inputEmail.value;
      usuario.rol = inputRol.value;
      btnGuardar.textContent = 'Guardado!';
      setTimeout(function(){ btnGuardar.textContent = 'Guardar'; }, 1000);
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
      // Crea un nuevo usuario con id correlativo y campos vacíos
      var nuevoId = usuarios.length > 0 ? usuarios[usuarios.length-1].id + 1 : 1;
      usuarios.push({ id: nuevoId, nombre: '', email: '', rol: '' });
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

