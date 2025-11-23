import { NavbarAdmi } from "../../componentes/Navbar/NavbarAdmi";
import { GestionBoletas } from "../../componentes/GestionAdmin/GestionBoletas";
import { Footer } from "../../componentes/Footer/Footer";

export function AdminBoletas() {
    return (
    <>
    <main className="flex-grow-1"> 
        <div className="container">
            <NavbarAdmi/>
                <GestionBoletas/>
        </div>
    </main>
    <Footer/>
    </>
    );
}
