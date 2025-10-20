import { Navbar } from "../../componentes/Navbar/Navbar";
import { InventarioProductos } from "../../componentes/Productos/InventarioProductos";


export function Inventario(){

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