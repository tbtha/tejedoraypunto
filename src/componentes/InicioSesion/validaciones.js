export const validarCorreo = (email) => {
  const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const correo = email.trim();

  if (correo === "") return ["El correo no puede estar vacío.", false];
  if (correo.length > 100) return ["El correo no puede tener más de 100 caracteres.", false];
  if (!regexEmail.test(correo)) return ["Formato de correo inválido.", false];
  if (!dominiosPermitidos.some(d => correo.endsWith(d))) {
    return ["Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.", false];
  }
  return ["Correo válido ✔️", true];
};

export const validarPassword = (password) => {
  const pass = password.trim();
  if (pass === "") return ["La contraseña no puede estar vacía.", false];
  if (pass.length < 4 || pass.length > 10) return ["Debe tener entre 4 y 10 caracteres.", false];
  return ["Contraseña válida ✔️", true];
};

export const validarRut = (rut) => {
  const r = rut.trim().toUpperCase();
  if (r === "") return ["El RUN no puede estar vacío.", false];
  if (r.length < 7 || r.length > 9) return ["Debe tener entre 7 y 9 caracteres.", false];
  if (!/^\d{6,8}[0-9K]$/.test(r)) return ["Formato inválido. Ej: 19011022K", false];

  const cuerpo = r.slice(0, -1);
  const dvIngresado = r.slice(-1);
  let suma = 0, multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const dvCalculado = 11 - (suma % 11);
  const dvEsperado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();

  if (dvIngresado !== dvEsperado) return ["RUN inválido. Dígito verificador incorrecto.", false];
  return ["RUN válido ✔️", true];
};

export const validarNombre = (nombre) => {
  const n = nombre.trim();
  if (n === "") return ["El nombre no puede estar vacío.", false];
  if (n.length > 50) return ["No puede tener más de 50 caracteres.", false];
  return ["Nombre válido ✔️", true];
};

export const validarApellido = (apellido) => {
  const a = apellido.trim();
  if (a === "") return ["El apellido no puede estar vacío.", false];
  if (a.length > 100) return ["No puede tener más de 100 caracteres.", false];
  return ["Apellido válido ✔️", true];
};

export const validarDireccion = (direccion) => {
  const d = direccion.trim();
  if (d === "") return ["La dirección no puede estar vacía.", false];
  if (d.length > 300) return ["No puede tener más de 300 caracteres.", false];
  return ["Dirección válida ✔️", true];
};