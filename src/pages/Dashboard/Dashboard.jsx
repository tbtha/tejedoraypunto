import { NavbarAdmi } from "../../componentes/Navbar/NavbarAdmi";
import { ModuloDashboard } from "../../componentes/GestionAdmin/ModuloDashboard";
import { Footer } from "../../componentes/Footer/Footer";


export function Dashboard(){

    return (
    <>
    <main className="flex-grow-1">
        <div className="container">
            <NavbarAdmi/>
            <ModuloDashboard/>
        </div>
    </main>
    <Footer/>
    </>
    );
}