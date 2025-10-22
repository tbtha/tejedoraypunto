import { Footer } from "../../componentes/Footer/Footer";
import { Navbar } from "../../componentes/Navbar/Navbar";

export function Carrito(){
    return(
    <> 
    <main className="flex-grow-1">
        <div className="container">
            <Navbar/>
        </div>
    </main>
    <Footer/>
    </>
    );
}