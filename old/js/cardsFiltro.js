window.productos;

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