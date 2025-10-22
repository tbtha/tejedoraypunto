import { Navbar } from "../../componentes/Navbar/Navbar";
import { BlogArchivo } from "../../componentes/Blogs/BlogArchivo";
import { Footer } from "../../componentes/Footer/Footer";

export function Blogs() {
  return (
    <>
    <main className="flex-grow-1">
        <div className="container">
            <Navbar/>
                <BlogArchivo/>
        </div>
    </main>
    <Footer/>
    </>
    );
}