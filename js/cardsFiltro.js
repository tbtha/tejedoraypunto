const productos = [
  {
    id: 1,
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
    precio: "$58.000",
    stock: 2
  },
  {
    id: 2,
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
    precio: "$65.000",
    stock: 3
  },
  {
    id: 3,
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
    precio: "$70.000",
    stock: 1
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
document.addEventListener("DOMContentLoaded", function () {
  

  
// Función para filtrar y mostrar las cards
window.filtrarCards = function (temporada) {
  const contenedor = document.getElementById("cardsContainer");
  contenedor.innerHTML = "";

  const filtrados = temporada === "all"
    ? productos
    : productos.filter(p => p.temporada === temporada);

  filtrados.forEach((producto, index) => {
    const card = document.createElement("div");
    card.className = "col-md-3 mb-5";
    card.innerHTML = `
      <div class="card h-100">
        <img class="card-img-top" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="card-body text-center">
          <h4 class="card-title">${producto.titulo}</h4>
          <p class="card-text">${producto.descripcion}</p>
          <button class="btn btn-outline-success" onclick="mostrarModal(${index})">Ver más</button>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
};

let indiceActual = null;

// Función para mostrar el modal con detalles del producto
window.mostrarModal = function (index) {
  indiceActual = index; // ← aquí guardamos el índice

  const producto = productos[index];
  // Título, descripción y precio
  document.getElementById("modalTitulo").textContent = producto.titulo;
  document.getElementById("modalDescripcion").textContent = producto.descripcion;
  document.getElementById("modalPrecio").textContent = producto.precio;
  // Carrusel de imágenes
  const carruselInner = document.getElementById("modalCarruselInner");
  carruselInner.innerHTML = "";
  producto.imagenes.forEach((img, i) => {
    const item = document.createElement("div");
    item.className = `carousel-item ${i === 0 ? "active" : ""}`;
    item.innerHTML = `<img src="${img}" class="d-block w-100" alt="${producto.titulo}">`;
    carruselInner.appendChild(item);
  });
  const modal = new bootstrap.Modal(document.getElementById("modalProducto"));
  modal.show();
};

window.agregarAlCarrito = function () {
  if (indiceActual === null) return;

  const producto = productos[indiceActual];
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert("Producto agregado al carrito 🧺");
};

  // Mostrar todos al cargar
  filtrarCards("all");
});