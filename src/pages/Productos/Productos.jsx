import { Navbar } from "../../componentes/Navbar/Navbar";
import { InventarioProductos } from "../../componentes/Productos/InventarioProductos";
import { Footer } from "../../componentes/Footer/Footer";

export function Productos() {
    return (
    <>
    <main className="flex-grow-1"> 
        <div className="container">
            <Navbar/>
                <InventarioProductos/>
        </div>
    </main>
    <Footer/>
    </>
    );
}