function validarCorreo(inputCorreo, mensajeCorreo) {
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = inputCorreo.value.trim();
    if (email === "") {
        mensajeCorreo.textContent = "El correo no puede estar vacío.";
        mensajeCorreo.className = "text-danger small error";
        return false;
    } else if (email.length > 100) {
        mensajeCorreo.textContent = "El correo no puede tener más de 100 caracteres.";
        mensajeCorreo.className = "text-danger small error";
        return false;
    } else if (!regexEmail.test(email)) {
        mensajeCorreo.textContent = "Formato de correo inválido.";
        mensajeCorreo.className = "text-danger small error";
        return false;
    } else if (!dominiosPermitidos.some(d => email.endsWith(d))) {
        mensajeCorreo.textContent = "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        mensajeCorreo.className = "text-danger small error";
        return false;
    } else {
        mensajeCorreo.textContent = "Correo válido ✔️";
        mensajeCorreo.className = "small text-success";
        return true;
    }
}
function validarNombre(inputNombre, mensajeNombre) {
    const nombre = inputNombre.value.trim();
    if (nombre === "") {
        mensajeNombre.textContent = "El nombre no puede estar vacío.";
        mensajeNombre.className = "text-danger small error";
        return false;
    } else if (nombre.length > 100) {
        mensajeNombre.textContent = "El nombre no puede tener más de 100 caracteres.";
        mensajeNombre.className = "text-danger small error";
        return false;
    } else {
        mensajeNombre.textContent = "Nombre válido ✔️";
        mensajeNombre.className = "small text-success";
        return true;
    }
}
function validarMensaje(inputComentario, mensajeComentario) {
    const nombre = inputComentario.value.trim();
    if (nombre === "") {
        mensajeComentario.textContent = "El mensaje no puede estar vacío.";
        mensajeComentario.className = "text-danger small error";
        return false;
    } else if (nombre.length > 100) {
        mensajeComentario.textContent = "El mensaje no puede tener más de 100 caracteres.";
        mensajeComentario.className = "text-danger small error";
        return false;
    } else {
        mensajeComentario.textContent = "Mensaje válido ✔️";
        mensajeComentario.className = "small text-success";
        return true; 
    }
}
window.onload = function () {
    const btnContact = document.getElementById("btnContact");
    // Validación de correo electrónico
    const inputCorreo = document.getElementById("correoContact");
    const mensajeCorreo = document.getElementById("mensajeCorreoContact");
    // Validación de nombre
    const inputNombre = document.getElementById("nombre");
    const mensajeNombre = document.getElementById("mensajeNombreContact");
    // Validación de comentario
    const inputComentario = document.getElementById("comentarioContact");
    const mensajeComentario = document.getElementById("mensajeComentarioContact");

    const mensajeFinal = document.getElementById("mensajeContact");

    inputCorreo.addEventListener("input", () => validarCorreo(inputCorreo, mensajeCorreo));
    inputNombre.addEventListener("input", () => validarNombre(inputNombre, mensajeNombre));
    inputComentario.addEventListener("change", () => validarMensaje(inputComentario, mensajeComentario));

    btnContact.addEventListener("click", function () {
        const correoValido = validarCorreo(inputCorreo, mensajeCorreo);
        const nombreValido = validarNombre(inputNombre, mensajeNombre);
        const comentarioValido = validarMensaje(inputComentario, mensajeComentario);

        if (correoValido && nombreValido && comentarioValido) { //&& 
        mensajeFinal.textContent = "Mensaje enviado con exito.";
        mensajeFinal.className = "small text-success";
        } else {
        mensajeFinal.textContent = "Por favor, valida los campos correctamente.";
        mensajeFinal.className = "text-danger small error";
        }
    });
}