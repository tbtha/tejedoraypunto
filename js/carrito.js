document.addEventListener("DOMContentLoaded", function () {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("carritoContainer");

  if (carrito.length === 0) {
    contenedor.innerHTML = `<p class="text-center">Tu carrito está vacío 🧵</p>`;
    return;
  }

  carrito.forEach((producto, index) => {
    if (!producto || (!producto.imagen && !producto.imagenes)) return;

    const card = document.createElement("div");
    card.className = "col-md-3 mb-4";
    card.innerHTML = `
      <div class="card h-100">
        <img src="${producto.imagenes?.[0] || producto.imagen}" class="card-img-top" alt="${producto.titulo || 'Producto'}">
        <div class="card-body text-center">
          <h5 class="card-title">${producto.titulo || 'Sin título'}</h5>
          <p>${producto.descripcion || 'Sin descripción'}</p>
          <p class="fw-bold">${producto.precio || ''}</p>
          <button class="btn btn-sm btn-outline-danger mt-2" onclick="eliminarProducto(${index})">Eliminar</button>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
});

function eliminarProducto(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1); // elimina el producto en esa posición
  localStorage.setItem("carrito", JSON.stringify(carrito));
  location.reload(); // recarga para actualizar la vista
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  location.reload();
}

function pagarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🧵");
    return;
  }

  // Aquí podrías redirigir a una página de pago o mostrar un resumen
  alert("Gracias por tu compra ✨ Nos pondremos en contacto contigo pronto.");
  localStorage.removeItem("carrito");
  location.reload();
}