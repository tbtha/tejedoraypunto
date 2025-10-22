import { NavbarAdmi } from "../../componentes/Navbar/NavbarAdmi";
import { GestionUsuarios } from "../../componentes/Usuarios/GestionUsuarios";
import { Footer } from "../../componentes/Footer/Footer";


export function AdminUsuarios(){

    return (
    <>
    <main className="flex-grow-1">
        <div className="container">
            <NavbarAdmi/>
            <GestionUsuarios/>
        </div>
    </main>
    <Footer/>
    </>
    );
}