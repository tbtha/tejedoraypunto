import { Navbar } from "../../componentes/Navbar/Navbar";
import { FormContacto } from "../../componentes/FormContacto/FormContacto";
import { Footer } from "../../componentes/Footer/Footer";

export function Contacto(){
    return(
    <> 
    <main className="flex-grow-1">
        <div className="container">
            <Navbar/>
                <FormContacto/>
        </div>
    </main>
    <Footer/>
    </>
    );
}