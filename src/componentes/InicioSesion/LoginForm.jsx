
import { useState } from "react";
import { validarCorreo, validarPassword } from "./validaciones";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

export function LoginForm() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeCorreo, setMensajeCorreo] = useState("");
  const [mensajePassword, setMensajePassword] = useState("");
  const [mensajeFinal, setMensajeFinal] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const [msgCorreo, correoValido] = validarCorreo(correo);
    const [msgPassword, passwordValido] = validarPassword(password);

    setMensajeCorreo(msgCorreo);
    setMensajePassword(msgPassword);

    if (correoValido && passwordValido) {
      setLoading(true);
      try {
        // Usar el nuevo servicio de autenticación con JWT
        const result = await login(correo, password);
        
        if (result.success) {
          // Login exitoso
          setMensajeFinal("Inicio de sesión exitoso.");
          
          // Redirigir según el rol del usuario
          setTimeout(() => {
            if (result.user && result.user.rol === 'ADMIN') {
              // Si es administrador, redirigir al dashboard
              navigate('/dashboard');
            } else {
              // Si es usuario normal, redirigir al home
              navigate('/');
            }
          }, 500);
        } else {
          // Credenciales incorrectas
          setMensajeFinal(result.message || "Correo o contraseña incorrectos.");
        }
        
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        setMensajeFinal("Error en el inicio de sesión. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false);
      }
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
              <button 
                type="button" 
                className="btn btn-dark" 
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Iniciando sesión..." : "Entrar"}
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
