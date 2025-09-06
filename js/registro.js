
function mostrarFormulario(tipo) {
    const login = document.getElementById('form-login');
    const registro = document.getElementById('form-registro');
    if (tipo === 'login') {
        login.classList.remove('d-none');
        registro.classList.add('d-none');
    } else {
        registro.classList.remove('d-none');
        login.classList.add('d-none');
    }
}

// // Validación de inicio de sesión
window.onload = function () {
    const btnEnviar = document.getElementById("btnEnviar");
    const inputCorreo = document.getElementById("correo");
    const mensajeCorreo = document.getElementById("mensajeCorreo");

    const inputPassword = document.getElementById("password");
    const mensajePassword = document.getElementById("mensajepassword");

    const mensajeFinal = document.getElementById("mensajeInicioSesion");

    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validarCorreo() {
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

    function validarPassword() {
        const password = inputPassword.value.trim();
        if (password === "") {
            mensajePassword.textContent = "La contraseña no puede estar vacía.";
            mensajePassword.className = "text-danger small error";
            return false;
        } else if (password.length < 4 || password.length > 10) {
            mensajePassword.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
            mensajePassword.className = "text-danger small error";
            return false;
        } else {
            mensajePassword.textContent = "Contraseña válida ✔️";
            mensajePassword.className = "small text-success";
            return true;
        }
    }

    inputCorreo.addEventListener("input", validarCorreo);
    inputPassword.addEventListener("input", validarPassword);

    btnEnviar.addEventListener("click", function () {
        const correoValido = validarCorreo();
        const passwordValido = validarPassword();

        if (correoValido && passwordValido) {
        mensajeFinal.textContent = "Inicio de sesión exitoso.";
        mensajeFinal.className = "small text-success";
        } else {
        mensajeFinal.textContent = "Por favor, valida los campos correctamente.";
        mensajeFinal.className = "text-danger small error";
        }
    });
}

// // // Validación de registrarse
// window.onload = function () {
//     const btnEnviar = document.getElementById("btnEnviar");
//     const inputCorreo = document.getElementById("correo");
//     const mensajeCorreo = document.getElementById("mensajeCorreo");

//     const inputPassword = document.getElementById("password");
//     const mensajePassword = document.getElementById("mensajepassword");

//     const mensajeFinal = document.getElementById("mensajeInicioSesion");

//     const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
//     const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     function validarCorreo() {
//         const email = inputCorreo.value.trim();
//         if (email === "") {
//             mensajeCorreo.textContent = "El correo no puede estar vacío.";
//             mensajeCorreo.className = "text-danger small error";
//             return false;
//         } else if (email.length > 100) {
//             mensajeCorreo.textContent = "El correo no puede tener más de 100 caracteres.";
//             mensajeCorreo.className = "text-danger small error";
//             return false;
//         } else if (!regexEmail.test(email)) {
//             mensajeCorreo.textContent = "Formato de correo inválido.";
//             mensajeCorreo.className = "text-danger small error";
//             return false;
//         } else if (!dominiosPermitidos.some(d => email.endsWith(d))) {
//             mensajeCorreo.textContent = "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
//             mensajeCorreo.className = "text-danger small error";
//             return false;
//         } else {
//             mensajeCorreo.textContent = "Correo válido ✔️";
//             mensajeCorreo.className = "small text-success";
//             return true;
//         }
//     }

//     function validarPassword() {
//         const password = inputPassword.value.trim();
//         if (password === "") {
//             mensajePassword.textContent = "La contraseña no puede estar vacía.";
//             mensajePassword.className = "text-danger small error";
//             return false;
//         } else if (password.length < 4 || password.length > 10) {
//             mensajePassword.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
//             mensajePassword.className = "text-danger small error";
//             return false;
//         } else {
//             mensajePassword.textContent = "Contraseña válida ✔️";
//             mensajePassword.className = "small text-success";
//             return true;
//         }
//     }

//     inputCorreo.addEventListener("input", validarCorreo);
//     inputPassword.addEventListener("input", validarPassword);

//     btnEnviar.addEventListener("click", function () {
//         const correoValido = validarCorreo();
//         const passwordValido = validarPassword();

//         if (correoValido && passwordValido) {
//         mensajeFinal.textContent = "Inicio de sesión exitoso.";
//         mensajeFinal.className = "small text-success";
//         } else {
//         mensajeFinal.textContent = "Por favor, valida los campos correctamente.";
//         mensajeFinal.className = "text-danger small error";
//         }
//     });
// }



