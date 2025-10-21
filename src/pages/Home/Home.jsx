import { Footer } from "../../componentes/Footer/Footer";
import { GaleriaTejidos } from "../../componentes/GaleriaTejidos/GaleriaTejidos";
import { Navbar } from "../../componentes/Navbar/Navbar";

export function Home(){
    return(
    <> 
    <main className="flex-grow-1">
        <div className="container">
            <Navbar/>
                <GaleriaTejidos/>
        </div>
    </main>
    <Footer/>
    </>
    );
}