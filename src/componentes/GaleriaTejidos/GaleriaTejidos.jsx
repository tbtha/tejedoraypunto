export function GaleriaTejidos() {
  return (
    <section className="py-5">
      {/* <h2 className="text-center mb-4">Proyectos</h2> */}
      <div className="row g-3">
        {/* bloque 1 */}
        {/* Imagen grande */}
        <div className="col-12 col-md-6">
          <img src="/img/inicio/gorro.jpeg" alt="Tejido 1" className="img-fluid rounded shadow-sm" width="100%" height="auto" />
        </div>

        {/* Dos bloques de dos img medianas */}
        <div className="col-6 col-md-3">
          <img src="/img/inicio/collage_inicio1.jpeg" alt="Tejido 2" className="img-fluid rounded shadow-sm" />
          <img src="/img/inicio/collage_inicio2.jpeg" alt="Tejido 2" className="img-fluid rounded shadow-sm border-top mt-3" />
        </div>
        <div className="col-6 col-md-3">
          <img src="/img/inicio/collage_inicio2.jpeg" alt="Tejido 3" className="img-fluid rounded shadow-sm" />
          <img src="/img/inicio/collage_inicio1.jpeg" alt="Tejido 3" className="img-fluid rounded shadow-sm border-top mt-3" />
        </div>

        {/* bloque 2 */}
        {/* Cuatro medianas más */}
        <div className="col-6 col-md-3">
          <img src="/img/inicio/collage_inicio16.jpeg" alt="Tejido 9" className="img-fluid rounded shadow-sm" />
          <img src="/img/inicio/collage_inicio17.jpeg" alt="Tejido 9" className="img-fluid rounded shadow-sm border-top mt-3" />
        </div>
        <div className="col-6 col-md-3">
          <img src="/img/inicio/collage_inicio17_1.jpeg" alt="Tejido 10" className="img-fluid rounded shadow-sm" />
          <img src="/img/inicio/collage_inicio16_1.jpeg" alt="Tejido 10" className="img-fluid rounded shadow-sm border-top mt-3" />
        </div>
        {/* Imagen grande */}
        <div className="col-12 col-md-6">
          <img src="/img/inicio/collage_inicio28.jpeg" alt="Tejido 8" className="img-fluid rounded shadow-sm" />
        </div>

        {/* bloque 3 */}
        {/* 4 img pequeñas */}
        <div className="col-6 col-md-3">
          <img src="/img/inicio/collage_inicio30.jpeg" alt="Tejido 5" className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-6 col-md-3">
          <img src="/img/inicio/collage_inicio31.jpeg" alt="Tejido 6" className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-6 col-md-3">
          <img src="/img/inicio/chaleco1.jpeg" alt="Tejido 7" className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-6 col-md-3">
          <img src="/img/inicio/chaleco4.jpeg" alt="Tejido 7" className="img-fluid rounded shadow-sm" />
        </div>

        {/* bloque 4 */}
        {/* Imagen final grande */}
        <div className="col-12 col-md-6">
          <img src="/img/inicio/gorro_morado.jpeg" alt="Tejido 8" className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-12 col-md-6">
          <img src="/img/inicio/collage_inicio3.jpeg" alt="Tejido 14" className="img-fluid rounded shadow-sm" />
        </div>

        {/* bloque 5 */}
        {/* img finales */}
        <div className="col-12 col-md-6">
          <img src="/img/inicio/collage_inicio22.jpeg" alt="Tejido 15" className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-12 col-md-6">
          <img src="/img/inicio/collage_inicio23.jpeg" alt="Tejido 15" className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-12 col-md-6">
          <img src="/img/inicio/collage_inicio26.jpeg" alt="Tejido 15" className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-12 col-md-6">
          <img src="/img/inicio/collage_inicio25.jpeg" alt="Tejido 15" className="img-fluid rounded shadow-sm" />
        </div>

        {/* firma */}
        <div className="text-end">
          <img src="/img/marca/bytbtha blanco.png" alt="by tabatha" style={{ width: '50%', height: 'auto' }} />
        </div>
      </div>
    </section>
  );
}