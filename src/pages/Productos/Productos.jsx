import { Navbar } from "../../componentes/Navbar/Navbar";
import { Productos } from "../../componentes/Productos/Productos";
import { Footer } from "../../componentes/Footer/Footer";

export function ProductosPage() {
    return (
    <>
    <main className="flex-grow-1"> 
        <div className="container">
            <Navbar/>
                <Productos/>
        </div>
    </main>
    <Footer/>
    </>
    );
}