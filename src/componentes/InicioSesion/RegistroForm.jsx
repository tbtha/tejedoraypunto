import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validarCorreo,
  validarPassword,
  validarRut,
  validarNombre,
  validarApellido,
  validarDireccion,
} from "./validaciones";
import { regionesYComunas } from "./regionycomuna";
import axios from "axios";

export function RegistroForm() {
  const navigate = useNavigate();
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
  const [cargando, setCargando] = useState(false);
  const [contador, setContador] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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

    // Validar región y comuna
    if (!form.region) {
      nuevosMensajes.region = "Debes seleccionar una región";
      todoValido = false;
    }
    if (!form.comuna) {
      nuevosMensajes.comuna = "Debes seleccionar una comuna";
      todoValido = false;
    }

    setMensajes(nuevosMensajes);

    if (!todoValido) {
      setMensajeFinal("Por favor, valida los campos correctamente.");
      return;
    }

    // Enviar datos al backend
    setCargando(true);
    setMensajeFinal("");

    try {
      const response = await axios.post('http://localhost:8082/api/usuarios', {
        rut: form.rut,
        nombre: form.nombre,
        apellidos: form.apellidos,
        email: form.email,
        region: form.region,
        comuna: form.comuna,
        direccion: form.direccion,
        password: form.password,
        rol: 'CLIENTE' // Por defecto los usuarios registrados son CLIENTE
      });

      if (response.status === 200 || response.status === 201) {
        setMensajeFinal("✔️ Registro exitoso. Redirigiendo en 10 segundos...");
        setContador(10);
        
        // Limpiar formulario
        setForm({
          rut: "",
          nombre: "",
          apellidos: "",
          email: "",
          region: "",
          comuna: "",
          direccion: "",
          password: "",
        });
        
        // Contador regresivo
        let segundos = 10;
        const intervalo = setInterval(() => {
          segundos--;
          setContador(segundos);
          setMensajeFinal(`✔️ Registro exitoso. Redirigiendo en ${segundos} segundos...`);
          
          if (segundos === 0) {
            clearInterval(intervalo);
            navigate('/registro', { state: { tab: 'login' } });
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      if (error.response?.data?.message) {
        setMensajeFinal(`❌ Error: ${error.response.data.message}`);
      } else if (error.response?.data) {
        setMensajeFinal(`❌ Error: ${error.response.data}`);
      } else {
        setMensajeFinal("❌ Error al registrar usuario. Intenta nuevamente.");
      }
    } finally {
      setCargando(false);
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
              <button 
                type="submit" 
                className="btn btn-dark" 
                onClick={handleSubmit}
                disabled={cargando}
              >
                {cargando ? 'Registrando...' : 'Registrarse'}
              </button>
              <br />
              <small className={mensajeFinal.includes("✔️") || mensajeFinal.includes("exitoso") ? "text-success" : "text-danger small error"}>
                {mensajeFinal}
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
