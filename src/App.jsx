import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Contacto } from './pages/Contacto/Contacto';
import { Inventario } from './pages/Inventario/Inventario';
import { CrearProducto } from './componentes/Productos/CrearProducto';
import { CrearCategoria } from './componentes/Productos/CrearCategoria';
import { EditarProd } from './componentes/Productos/EditarProd';
import { ProductosPage } from './pages/Productos/Productos';
import { Blogs } from './pages/Blogs/Blogs';
import { Me } from './pages/Me/Me';
import { AccesoCuenta } from './pages/AccesoCuenta/AccesoCuenta';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { AdminUsuarios } from './pages/Dashboard/AdminUsuarios';
import {CrearUsuario} from './componentes/Usuarios/CrearUsuario';
import {EditarUsuario} from './componentes/Usuarios/EditarUsuario';
// import {InicioSesion} from './pages/InicioSesion/inicioSesion';
import { Carrito } from './pages/Carrito/Carrito';
import { Checkout } from './pages/Checkout/Checkout';
import { Pedidos } from './pages/MisPedidos/MisPedidos';
import { AdminBoletas } from './pages/GestionBoletas/GestionBoletas';
import { AdminRoute } from './componentes/AdminRoute/AdminRoute';
import { ProtectedRoute } from './componentes/ProtectedRoute/ProtectedRoute';
// import './App.css'  

function App() {
  

  return (
    <Router>
      <Routes>
          {/* home - Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<AccesoCuenta />} />
          {/* <Route path="/iniciosesion" element={<InicioSesion/>} />  */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/me" element={<Me />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/productos" element={<ProductosPage />} />
          
          {/* admin - Rutas protegidas que requieren rol ADMIN */}
          <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/inventario" element={<AdminRoute><Inventario /></AdminRoute>} />
          <Route path="/usuarios" element={<AdminRoute><AdminUsuarios /></AdminRoute>} />
          <Route path="/boletas" element={<AdminRoute><AdminBoletas /></AdminRoute>} />
          <Route path="/crear-usuario" element={<AdminRoute><CrearUsuario /></AdminRoute>} />
          <Route path="/editar-usuario/:id" element={<AdminRoute><EditarUsuario /></AdminRoute>} />
          <Route path="/crear-producto" element={<AdminRoute><CrearProducto /></AdminRoute>} /> 
          <Route path="/crear-categoria" element={<AdminRoute><CrearCategoria /></AdminRoute>} /> 
          <Route path="/editar-producto/:id" element={<AdminRoute><EditarProd /></AdminRoute>} />
          
          {/* user - Rutas protegidas que requieren autenticación (cualquier rol) */}
          <Route path="/carrito" element={<ProtectedRoute><Carrito /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/mis-pedidos" element={<ProtectedRoute><Pedidos /></ProtectedRoute>} />
       </Routes>
    </Router>
  )
}

export default App
