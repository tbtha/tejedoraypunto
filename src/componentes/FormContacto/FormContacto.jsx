export function FormContacto() {
  return (
      <section className="container py-5">
        <header className="text-center mb-4">
            <h2 className="text-center">Contáctame</h2>
        </header>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form>
              {/* Nombre */}
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Escribe tu nombre"
                  required
                />
                <span id="mensajeNombreContact" className="text-danger small error"></span>
              </div>

              {/* Correo */}
              <div className="mb-3">
                <label htmlFor="correoContact" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="correoContact"
                  placeholder="ejemplo@correo.com"
                  required
                />
                <span id="mensajeCorreoContact" className="text-danger small error"></span>
              </div>

              {/* Comentario */}
              <div className="mb-3">
                <label htmlFor="comentarioContact" className="form-label">Mensaje</label>
                <textarea
                  className="form-control campo-expandido"
                  id="comentarioContact"
                  placeholder="Escribe tu mensaje aquí..."
                  required
                ></textarea>
                <span id="mensajeComentarioContact" className="text-danger small error"></span>
              </div>

              {/* Botón */}
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-dark text-center"
                  id="btnContact"
                >
                  Enviar
                </button>
                <br />
                <span id="mensajeContact" className="text-danger small error"></span>
              </div>
            </form>
          </div>
        </div>
      </section>
  );
}
