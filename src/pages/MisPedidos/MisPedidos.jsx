import { Navbar } from "../../componentes/Navbar/Navbar";
import { MisPedidos } from "../../componentes/CompraUsuario/Pedidos";
import { Footer } from "../../componentes/Footer/Footer";

export function Pedidos() {
    return (
    <>
    <main className="flex-grow-1"> 
        <div className="container">
            <Navbar/>
                <MisPedidos/>
        </div>
    </main>
    <Footer/>
    </>
    );
}
