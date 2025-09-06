window.onload = function () {
    // Validación de correo electrónico
    const inputCorreo = document.getElementById("correo");
    const mensajeCorreo = document.getElementById("mensajeCorreo");

    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    inputCorreo.addEventListener("input", function () {
        const email = inputCorreo.value.trim();

        if (email === "") {
            mensajeCorreo.textContent = "El correo no puede estar vacío.";
            mensajeCorreo.className = "text-danger small error";
        } else if (email.length > 100) {
            mensajeCorreo.textContent = "El correo no puede tener más de 100 caracteres.";
            mensajeCorreo.className = "text-danger small error";
        } else if (!regexEmail.test(email)) {
            mensajeCorreo.textContent = "Formato de correo inválido.";
            mensajeCorreo.className = "text-danger small error";
        } else if (!dominiosPermitidos.some(dominio => email.endsWith(dominio))) {
            mensajeCorreo.textContent = "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
            mensajeCorreo.className = "text-danger small error";
        } else {
            mensajeCorreo.textContent = "Correo válido ✔️";
            mensajeCorreo.className = "small valido";
        }
    });
}