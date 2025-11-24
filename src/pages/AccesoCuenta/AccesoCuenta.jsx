import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { LoginForm } from "../../componentes/InicioSesion/LoginForm";
import { RegistroForm } from "../../componentes/InicioSesion/RegistroForm";
import { Footer } from "../../componentes/Footer/Footer";

export function AccesoCuenta() {
  const location = useLocation();
  const [formularioVisible, setFormularioVisible] = useState("login");

  useEffect(() => {
    // Si viene del registro exitoso, cambiar a login
    if (location.state?.tab) {
      setFormularioVisible(location.state.tab);
    }
  }, [location]);

  return (
    <>
      <main className="flex-grow-1"> 
        <div className="container">
      <Navbar/>
          <section className="py-5">
            <h2 className="text-center mb-4">Accede a tu cuenta</h2>

            <div className="text-center mb-4">
              <button
                className="btn btn-outline-dark me-2"
                onClick={() => setFormularioVisible("login")}
              >
                Iniciar sesión
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={() => setFormularioVisible("registro")}
              >
                Registrarse
              </button>
            </div>

            {formularioVisible === "login" && <LoginForm />}
            {formularioVisible === "registro" && <RegistroForm />}
          </section>
        </div>
      </main>
      <Footer/>
    </>
  );
}
