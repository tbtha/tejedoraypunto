import { Navbar } from "../../componentes/Navbar/Navbar";
import { Footer } from "../../componentes/Footer/Footer";

export function Me(){

  return (
    <>
    <main className="flex-grow-1">
        <div className="container">
            <Navbar/>
            <section className="container py-5">
            <header className="text-center mb-4">
                <h2 className="text-center">Bienvenidos</h2>
            </header>

            <div className="row justify-content-center">
                <div className="col-md-8">
                {/* <img src="img/otros/aboutme.jpeg" alt="" width="100%" height="auto" className="mb-4 rounded" /> */}
                <p className="fs-5 text-muted">
                    Hola, soy Tabatha. En <strong>Tejedora y Punto</strong> diseño y creo piezas tejidas a mano, pensadas para quienes valoran lo único, lo hecho con dedicación y lo funcional con estilo.
                </p>
                <p className="fs-5 text-muted">
                    Aprendí a tejer durante la pandemia, buscando nuevas formas de ocupar mi tiempo. Lo que comenzó como un pasatiempo se convirtió en una forma de trabajo y expresión. Hoy, cada prenda que ofrezco está hecha por mí, desde el diseño hasta el último punto.
                </p>
                <p className="fs-5 text-muted">
                    Este sitio reúne mi catálogo de tejidos, junto con algunos artículos y contenidos que comparto sobre el proceso, los materiales y el valor de lo artesanal. Gracias por visitar mi espacio. Espero que encuentres algo que te acompañe y te inspire.
                </p>

                <div className="text-end mt-4">
                    <img
                    src="img/marca/bytbtha blanco.png"
                    alt="by tabatha"
                    style={{ width: "50%", height: "auto" }}
                    />
                </div>
                </div>
            </div>
            </section>
        </div>
    </main>
    <Footer/>
    </>
  );
}
