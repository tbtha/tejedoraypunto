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
    return [true, email];
  }
}
// //
function validarPassword(inputPassword, mensajePassword) {
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
// //
function validarRut(inputRut, mensajeRut) {
  const rut = inputRut.value.trim().toUpperCase();
  console.log(rut);
  // Validación básica
  if (rut === "") {
    mensajeRut.textContent = "El RUN no puede estar vacío.";
    mensajeRut.className = "text-danger small error";
    return false;
  } else if (rut.length < 7 || rut.length > 9) {
    mensajeRut.textContent = "El RUN debe tener entre 7 y 9 caracteres.";
    mensajeRut.className = "text-danger small error";
    return false;
  } else if (!/^\d{6,8}[0-9K]$/.test(rut)) {
    mensajeRut.textContent = "Formato inválido. Ej: 19011022K (sin puntos ni guion)";
    mensajeRut.className = "text-danger small error";
    return false;
  }
// //
  // Validación del dígito verificador
  const cuerpo = rut.slice(0, -1);
  const dvIngresado = rut.slice(-1);

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const dvCalculado = 11 - (suma % 11);
  let dvEsperado = "";

  if (dvCalculado === 11) {
    dvEsperado = "0";
  } else if (dvCalculado === 10) {
    dvEsperado = "K";
  } else {
    dvEsperado = dvCalculado.toString();
  }
  //
  if (dvIngresado !== dvEsperado) {
    mensajeRut.textContent = "RUN inválido. Dígito verificador incorrecto.";
    mensajeRut.className = "text-danger small error";
    return false;
  }

  // Si todo está bien
  mensajeRut.textContent = "RUN válido ✔️";
  mensajeRut.className = "small text-success";
  return true;
}
// //
function validarNombre(inputNombre, mensajeNombre) {
    const nombre = inputNombre.value.trim();
    if (nombre === "") {
        mensajeNombre.textContent = "El nombre no puede estar vacío.";
        mensajeNombre.className = "text-danger small error";
        return false;
    } else if (nombre.length > 50) {
        mensajeNombre.textContent = "El nombre no puede tener más de 50 caracteres.";
        mensajeNombre.className = "text-danger small error";
        return false;
    } else {
        mensajeNombre.textContent = "Nombre válido ✔️";
        mensajeNombre.className = "small text-success";
        return true;
    }
}
// //
function validarApellido(inputApellido, mensajeApellido) {
    const apellido = inputApellido.value.trim();
    if (apellido === "") {
        mensajeApellido.textContent = "El apellido no puede estar vacío.";
        mensajeApellido.className = "text-danger small error";
        return false;
    } else if (apellido.length > 100) {
        mensajeApellido.textContent = "El apellido no puede tener más de 100 caracteres.";
        mensajeApellido.className = "text-danger small error";
        return false;
    } else {
        mensajeApellido.textContent = "Apellido válido ✔️";
        mensajeApellido.className = "small text-success";
        return true;
    }
}
// // // Selección dinámica de región y comuna
const regionesYComunas = {
  "Región Metropolitana": [
    "Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia",
    "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo",
    "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura",
    "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura"
  ],
  "Región de Valparaíso": [
    "Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Concón", "San Antonio", "Cartagena", "El Tabo",
    "El Quisco", "Algarrobo", "La Calera", "Limache", "Olmué", "Quillota"
  ],
  "Región del Biobío": [
    "Concepción", "Talcahuano", "Chillán", "Los Ángeles", "Coronel", "Hualpén", "San Pedro de la Paz", "Lota",
    "Penco", "Tomé", "Cabrero", "Yumbel", "Mulchén"
  ],
  "Región de La Araucanía": [
    "Temuco", "Padre Las Casas", "Angol", "Villarrica", "Pucón", "Nueva Imperial", "Lautaro", "Victoria"
  ],
  "Región de Coquimbo": [
    "La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuña", "Andacollo", "Monte Patria"
  ],
  "Región de Antofagasta": [
    "Antofagasta", "Calama", "Mejillones", "Tocopilla", "Taltal"
  ],
  "Región de Los Lagos": [
    "Puerto Montt", "Osorno", "Castro", "Ancud", "Quellón", "Frutillar", "Purranque"
  ],
  "Región de Magallanes": [
    "Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"
  ],
  "Región de Tarapacá": [
    "Iquique", "Alto Hospicio", "Pozo Almonte"
  ],
  "Región de Arica y Parinacota": [
    "Arica", "Putre"
  ],
  "Región de Atacama": [
    "Copiapó", "Vallenar", "Caldera", "Chañaral"
  ],
  "Región de Aysén": [
    "Coyhaique", "Puerto Aysén", "Chile Chico"
  ],
  "Región de O'Higgins": [
    "Rancagua", "Machalí", "San Fernando", "Santa Cruz", "Pichilemu"
  ],
  "Región del Maule": [
    "Talca", "Curicó", "Linares", "Constitución", "Cauquenes"
  ],
  "Región de Ñuble": [
    "Chillán", "San Carlos", "Bulnes", "Quirihue"
  ]
};
document.addEventListener("DOMContentLoaded", function () {
  const regionSelect = document.getElementById("regionSelect");
  const comunaSelect = document.getElementById("comunaSelect");

  // Cargar regiones
  for (const region in regionesYComunas) {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
  }

  // Actualizar comunas al cambiar región
  regionSelect.addEventListener("change", function () {
    const comunas = regionesYComunas[this.value] || [];

    // Limpiar comunas anteriores
    comunaSelect.innerHTML = '<option value="">Selecciona una comuna</option>';

    // Cargar nuevas comunas
    comunas.forEach(comuna => {
      const option = document.createElement("option");
      option.value = comuna;
      option.textContent = comuna;
      comunaSelect.appendChild(option);
    });
  });
});

function validarDireccion(inputDireccion, mensajeDireccion) {
    const direccion = inputDireccion.value.trim();
    if (direccion === "") {
        mensajeDireccion.textContent = "La dirección no puede estar vacío.";
        mensajeDireccion.className = "text-danger small error";
        return false;
    } else if (direccion.length > 300) {
        mensajeDireccion.textContent = "La dirección no puede tener más de 100 caracteres.";
        mensajeDireccion.className = "text-danger small error";
        return false;
    } else {
        mensajeDireccion.textContent = "Dirección válido ✔️";
        mensajeDireccion.className = "small text-success";
        return true;
    }
}
// // //
// // Validación de inicio de sesión
window.onload = function () {
    const btnInicioSesion = document.getElementById("btnInicioSesion");
    // Validación de correo electrónico
    const inputCorreo = document.getElementById("correo");
    const mensajeCorreo = document.getElementById("mensajeCorreo");
    // Validación de contraseña
    const inputPassword = document.getElementById("password");
    const mensajePassword = document.getElementById("mensajepassword");
    // Mensaje final
    const mensajeFinal = document.getElementById("mensajeInicioSesion");
    const mensajeNavbarSesion = document.getElementById("mensajeNavbarSesion");

    inputCorreo.addEventListener("input", () => validarCorreo(inputCorreo, mensajeCorreo));
    inputPassword.addEventListener("input", () => validarPassword(inputPassword, mensajePassword));

    btnInicioSesion.addEventListener("click", function () {
        const [correoValido, email]  = validarCorreo(inputCorreo, mensajeCorreo);
        const passwordValido = validarPassword(inputPassword, mensajePassword);

    if (correoValido && passwordValido) {
      let mensaje = "Inicio de sesión exitoso.";

      const usuarioAdmin = window.usuarios.find(u => u.email === email && u.rol === "Administrador");

      if (usuarioAdmin) {
        mensaje += ` | <a href="administracion.html" class="text-primary text-decoration-underline">Acceso especial</a>`;
        mensajeNavbarSesion.innerHTML = `Sesión iniciada como <strong>${usuarioAdmin.nombre}</strong> (Administrador) | <a href="administracion.html" class="text-primary text-decoration-underline">Ir a Administración</a>`;
      }
      else {
        mensajeNavbarSesion.innerHTML = ``;
      }
      mensajeFinal.innerHTML = mensaje;
      mensajeFinal.className = "small text-success";
    } else {
      mensajeFinal.textContent = "Por favor, valida los campos correctamente.";
      mensajeFinal.className = "text-danger small error";
    }
  });

// // //

// // // Validación de registrarse
    const btnRegistro = document.getElementById("btnRegistro");
    // Validación de correo electrónico
    const inputCorreoRegistro = document.getElementById("emailRegistro");
    const mensajeCorreoRegistro = document.getElementById("mensajeemailRegistro");
    // Validación de contraseña
    const inputPasswordRegistro = document.getElementById("passwordRegistro");
    const mensajePasswordRegistro = document.getElementById("mensajepasswordRegistro");
    // Validación de RUT
    const inputRut = document.getElementById("rutRegistro");
    const mensajeRut = document.getElementById("mensajeRutRegistro");
    // Validacion de nombre
    const inputNombre = document.getElementById("nombreRegistro");
    const mensajeNombre = document.getElementById("mensajeNombreRegistro");
    // Validacion de apellido
    const inputApellido = document.getElementById("apellidosRegistro");
    const mensajeApellido = document.getElementById("mensajeApellidosRegistro");
    //
    // tipo de usuario (cliente o administrador) se selecciona pero no se valida ni se muestra mensaje
    //
    //Validar dirección
    const inputDireccion = document.getElementById("direccionRegistro");
    const mensajeDireccion = document.getElementById("mensajeDireccionRegistro");
    // Mensaje final  
    const mensajeFinalRegistro = document.getElementById("mensajeRegistro");
    
    inputCorreoRegistro.addEventListener("input", () => validarCorreo(inputCorreoRegistro, mensajeCorreoRegistro));
    inputPasswordRegistro.addEventListener("input", () => validarPassword(inputPasswordRegistro, mensajePasswordRegistro));
    inputRut.addEventListener("input", () => validarRut(inputRut, mensajeRut));
    inputNombre.addEventListener("input", () => validarNombre(inputNombre, mensajeNombre));
    inputApellido.addEventListener("input", () => validarApellido(inputApellido, mensajeApellido));
    inputDireccion.addEventListener("input", () => validarDireccion(inputDireccion, mensajeDireccion));

    btnRegistro.addEventListener("click", function () {
        const correoValido = validarCorreo(inputCorreoRegistro, mensajeCorreoRegistro);
        const passwordValido = validarPassword(inputPasswordRegistro, mensajePasswordRegistro);
        const rutValido = validarRut(inputRut, mensajeRut);
        const nombreValido = validarNombre(inputNombre, mensajeNombre);
        const apellidoValido = validarApellido(inputApellido, mensajeApellido);
        const direccionValida = validarDireccion(inputDireccion, mensajeDireccion);
        // respuesta de la validaciones, si todas son true, mensaje de exito
        if (correoValido && passwordValido && rutValido && nombreValido && apellidoValido && direccionValida) {
        mensajeFinalRegistro.textContent = "Registro exitoso.";
        mensajeFinalRegistro.className = "small text-success";
        } else {
        mensajeFinalRegistro.textContent = "Por favor, valida los campos correctamente.";
        mensajeFinalRegistro.className = "text-danger small error";
        }
    });
}


