import { useState } from "react";
import {
  validarCorreo,
  validarPassword,
  validarRut,
  validarNombre,
  validarApellido,
  validarDireccion,
} from "./validaciones";
import { regionesYComunas } from "./regionycomuna";

export function RegistroForm() {
  const [form, setForm] = useState({
    rut: "",
    nombre: "",
    apellidos: "",
    email: "",
    region: "",
    comuna: "",
    direccion: "",
    password: "",
  });

  const [mensajes, setMensajes] = useState({});
  const [mensajeFinal, setMensajeFinal] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Validaciones en tiempo real
    let msg = "";
    switch (name) {
      case "email":
        [msg] = validarCorreo(value);
        break;
      case "password":
        [msg] = validarPassword(value);
        break;
      case "rut":
        [msg] = validarRut(value);
        break;
      case "nombre":
        [msg] = validarNombre(value);
        break;
      case "apellidos":
        [msg] = validarApellido(value);
        break;
      case "direccion":
        [msg] = validarDireccion(value);
        break;
      default:
        break;
    }
    setMensajes({ ...mensajes, [name]: msg });
  };

  const handleSubmit = () => {
    const validaciones = {
      email: validarCorreo(form.email),
      password: validarPassword(form.password),
      rut: validarRut(form.rut),
      nombre: validarNombre(form.nombre),
      apellidos: validarApellido(form.apellidos),
      direccion: validarDireccion(form.direccion),
    };

    const nuevosMensajes = {};
    let todoValido = true;

    for (const campo in validaciones) {
      const [msg, valido] = validaciones[campo];
      nuevosMensajes[campo] = msg;
      if (!valido) todoValido = false;
    }

    setMensajes(nuevosMensajes);

    if (todoValido) {
      setMensajeFinal("Registro exitoso.");
    } else {
      setMensajeFinal("Por favor, valida los campos correctamente.");
    }
  };

  return (
    <div className="col-md-6 mx-auto">
      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h4 className="card-title mb-4 text-center">Registro</h4>
          <form>
            {["rut", "nombre", "apellidos", "email", "direccion", "password"].map((campo) => (
              <div className="mb-3" key={campo}>
                <label htmlFor={campo} className="form-label">
                  {campo.charAt(0).toUpperCase() + campo.slice(1)}
                </label>
                <input
                  type={campo === "password" ? "password" : "text"}
                  className="form-control"
                  id={campo}
                  name={campo}
                  value={form[campo]}
                  onChange={handleChange}
                  required
                />
                <small className={mensajes[campo]?.includes("✔️") ? "text-success" : "text-danger small error"}>
                  {mensajes[campo]}
                </small>
              </div>
            ))}

            {/* Región y comuna */}
            <div className="mb-3">
              <label htmlFor="region" className="form-label">Región</label>
              <select
                id="region"
                name="region"
                className="form-select"
                value={form.region}
                onChange={(e) => {
                  setForm({ ...form, region: e.target.value, comuna: "" });
                }}
              >
                <option value="">Selecciona una región</option>
                {Object.keys(regionesYComunas).map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="comuna" className="form-label">Comuna</label>
              <select
                id="comuna"
                name="comuna"
                className="form-select"
                value={form.comuna}
                onChange={handleChange}
              >
                <option value="">Selecciona una comuna</option>
                {(regionesYComunas[form.region] || []).map((comuna) => (
                  <option key={comuna} value={comuna}>{comuna}</option>
                ))}
              </select>
            </div>

            <div className="text-end">
              <button type="button" className="btn btn-dark" onClick={handleSubmit}>
                Registrarse
              </button>
              <br />
              <small className={mensajeFinal.includes("exitoso") ? "text-success" : "text-danger small error"}>
                {mensajeFinal}
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


// export function RegistroForm() {
//   return (
//     <div className="col-md-6 mx-auto">
//       <div className="card shadow-sm mt-4">
//         <div className="card-body">
//           <h4 className="card-title mb-4 text-center">Registro</h4>
//           <form>
//             {/* Campos de registro */}
//             <div className="mb-3">
//               <label htmlFor="rutRegistro" className="form-label">Rut</label>
//               <input type="text" className="form-control" id="rutRegistro" required />
//               <span id="mensajeRutRegistro" className="text-danger small error"></span>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="nombreRegistro" className="form-label">Nombre</label>
//               <input type="text" className="form-control" id="nombreRegistro" required />
//               <span id="mensajeNombreRegistro" className="text-danger small error"></span>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="apellidosRegistro" className="form-label">Apellidos</label>
//               <input type="text" className="form-control" id="apellidosRegistro" required />
//               <span id="mensajeApellidosRegistro" className="text-danger small error"></span>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="emailRegistro" className="form-label">Correo electrónico</label>
//               <input type="text" className="form-control" id="emailRegistro" required />
//               <span id="mensajeemailRegistro" className="text-danger small error"></span>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="regionRegistro" className="form-label">Región</label>
//               <select id="regionSelect" className="form-select">
//                 <option value="">Selecciona una región</option>
//               </select>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="comunaRegistro" className="form-label">Comuna</label>
//               <select id="comunaSelect" className="form-select mt-2">
//                 <option value="">Selecciona una comuna</option>
//               </select>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="direccionRegistro" className="form-label">Dirección</label>
//               <input type="text" className="form-control" id="direccionRegistro" required />
//               <span id="mensajeDireccionRegistro" className="text-danger small error"></span>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="passwordRegistro" className="form-label">Contraseña</label>
//               <input type="password" className="form-control" id="passwordRegistro" minLength="4" maxLength="10" required />
//               <span id="mensajepasswordRegistro" className="text-danger small error"></span>
//             </div>
//             <div className="text-end">
//               <button type="button" className="btn btn-dark text-center" id="btnRegistro">Entrar</button><br />
//               <span id="mensajeRegistro" className="text-danger small error"></span>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }