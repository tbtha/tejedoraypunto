

// main.js

function crearOptionSeleccionado(valor, opciones) {
  return opciones
    .map(
      (opcion) =>
        `<option ${opcion === valor ? "selected" : ""}>${opcion}</option>`
    )
    .join("");
}

function renderUsuarios(usuarios) {
  const tbody = document.getElementById("usuarios-tbody");
  tbody.innerHTML = "";

  usuarios.forEach(({ id, nombre, email, rol }) => {
    const roles = ["Administrador", "Cliente"];
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><input type="text" class="form-control" value="${id}" readonly></td>
      <td><input type="text" class="form-control" value="${nombre}"></td>
      <td><input type="email" class="form-control" value="${email}"></td>
      <td>
        <select class="form-select">
          ${crearOptionSeleccionado(rol, roles)}
        </select>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

function renderProductos(productos) {
  const tbody = document.getElementById("productos-tbody");
  tbody.innerHTML = "";

  productos.forEach(({ id, nombre, descripcion, categoria, precio, stock }) => {
    const categorias = ["Winter", "Summer", "All"];
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><input type="text" class="form-control" value="${id}" readonly></td>
      <td><input type="text" class="form-control" value="${nombre}"></td>
      <td><input type="text" class="form-control" value="${descripcion}"></td>
      <td>
        <select class="form-select">
          ${crearOptionSeleccionado(categoria, categorias)}
        </select>
      </td>
      <td><input type="text" class="form-control" value="${precio}"></td>
      <td><input type="number" class="form-control" value="${stock}"></td>
      <td><button class="btn btn-sm btn-dark">Guardar</button></td>
    `;
    tbody.appendChild(fila);
  });
}

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  renderUsuarios(usuarios);
  renderProductos(productos);
});
