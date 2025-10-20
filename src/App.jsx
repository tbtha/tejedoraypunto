import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Contacto } from './pages/Contacto/Contacto';
import { Inventario } from './pages/Inventario/inventario';
import { CrearProducto } from './componentes/Productos/CrearProducto';
import { EditarProd } from './componentes/Productos/EditarProd';
import './App.css'  
import { Productos } from './pages/Productos/Productos';
import { Blogs } from './pages/Blogs/Blogs';
import { Me } from './pages/Me/Me';
import { AccesoCuenta } from './pages/AccesoCuenta/AccesoCuenta';

function App() {
  

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<AccesoCuenta />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/me" element={<Me />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/crear-producto" element={<CrearProducto />} /> 
          <Route path="/editar-producto/:id" element={<EditarProd />} />
       </Routes>
    </Router>
  )
}

export default App
