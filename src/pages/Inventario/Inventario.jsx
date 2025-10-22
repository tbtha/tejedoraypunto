import { NavbarAdmi } from "../../componentes/Navbar/NavbarAdmi";
import { InventarioProductos } from "../../componentes/Productos/InventarioProductos";
import { Footer } from "../../componentes/Footer/Footer";


export function Inventario(){

    return (
    <>
    <main className="flex-grow-1">
        <div className="container">
            <NavbarAdmi/>
            <InventarioProductos/>
        </div>
    </main>
    <Footer/>
    </>
    );
}