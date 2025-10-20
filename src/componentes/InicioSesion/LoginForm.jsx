
import { useState } from "react";
import { validarCorreo, validarPassword } from "./validaciones";

export function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeCorreo, setMensajeCorreo] = useState("");
  const [mensajePassword, setMensajePassword] = useState("");
  const [mensajeFinal, setMensajeFinal] = useState("");

  const handleSubmit = () => {
    const [msgCorreo, correoValido] = validarCorreo(correo);
    const [msgPassword, passwordValido] = validarPassword(password);

    setMensajeCorreo(msgCorreo);
    setMensajePassword(msgPassword);

    if (correoValido && passwordValido) {
      setMensajeFinal("Inicio de sesión exitoso.");
    } else {
      setMensajeFinal("Por favor, valida los campos correctamente.");
    }
  };

  return (
    <div className="col-md-6 mx-auto">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-4 text-center">Iniciar sesión</h4>
          <form>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo electrónico</label>
              <input
                type="text"
                className="form-control"
                id="correo"
                value={correo}
                onChange={(e) => {
                  setCorreo(e.target.value);
                  const [msg] = validarCorreo(e.target.value);
                  setMensajeCorreo(msg);
                }}
                required
              />
              <small className={mensajeCorreo.includes("✔️") ? "text-success" : "text-danger small error"}>
                {mensajeCorreo}
              </small>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  const [msg] = validarPassword(e.target.value);
                  setMensajePassword(msg);
                }}
                required
              />
              <small className={mensajePassword.includes("✔️") ? "text-success" : "text-danger small error"}>
                {mensajePassword}
              </small>
            </div>

            <div className="text-end">
              <button type="button" className="btn btn-dark" onClick={handleSubmit}>
                Entrar
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
// export function LoginForm() {
//   return (
//     <div className="col-md-6 mx-auto">
//       <div className="card shadow-sm">
//         <div className="card-body">
//           <h4 className="card-title mb-4 text-center">Iniciar sesión</h4>
//           <form id="loginForm">
//             <div className="mb-3">
//               <label htmlFor="correo" className="form-label">Correo electrónico</label>
//               <input type="text" className="form-control" id="correo" maxLength="100" required />
//               <span id="mensajeCorreo" className="text-danger small error"></span>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">Contraseña</label>
//               <input type="password" className="form-control" id="password" minLength="4" maxLength="10" required />
//               <span id="mensajepassword" className="text-danger small error"></span>
//             </div>
//             <div className="text-end">
//               <button type="button" className="btn btn-dark text-center" id="btnInicioSesion">Entrar</button><br />
//               <span id="mensajeInicioSesion" className="text-danger small error"></span>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }