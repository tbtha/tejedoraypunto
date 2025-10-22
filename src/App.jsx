import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Contacto } from './pages/Contacto/Contacto';
import { Inventario } from './pages/Inventario/Inventario';
import { CrearProducto } from './componentes/Productos/CrearProducto';
import { CrearCategoria } from './componentes/Productos/CrearCategoria';
import { EditarProd } from './componentes/Productos/EditarProd';
import './App.css'  
import { ProductosPage } from './pages/Productos/Productos';
import { Blogs } from './pages/Blogs/Blogs';
import { Me } from './pages/Me/Me';
import { AccesoCuenta } from './pages/AccesoCuenta/AccesoCuenta';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { AdminUsuarios } from './pages/Dashboard/AdminUsuarios';
import {CrearUsuario} from './componentes/Usuarios/CrearUsuario';
import {EditarUsuario} from './componentes/Usuarios/EditarUsuario';

function App() {
  

  return (
    <Router>
      <Routes>
          {/* home */}
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<AccesoCuenta />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/me" element={<Me />} />
          <Route path="/contacto" element={<Contacto />} />
          {/* admin */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/usuarios" element={<AdminUsuarios />} />
          <Route path="/crear-usuario" element={<CrearUsuario />} />
          <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/crear-producto" element={<CrearProducto />} /> 
          <Route path="/crear-categoria" element={<CrearCategoria />} /> 
          <Route path="/editar-producto/:id" element={<EditarProd />} />
       </Routes>
    </Router>
  )
}

export default App
