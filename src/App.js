import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginForm from './Paginas/auth/login';
import Inicio from './Paginas/inicio/inicio';
import Products from './Paginas/productos/products';
import RegistrationForm from './Paginas/auth/register';
import Publicador from './Paginas/publicador/publicador';
import GestionP from './Paginas/publicador/gestion';
import InicioC from './clientes/inicioC';
import VerCompras from './clientes/verCompras';

function App() {
  return (
   <Fragment>
      <Router>
          <Routes>
              <Route path="/" element={<Inicio/>}></Route>
              <Route path="/login" element={<LoginForm/>}></Route>
              <Route path="/products/:email" element={<Products/>}></Route>
              <Route path="/register" element={<RegistrationForm/>}></Route>
              <Route path="/publicador/:email" element={<Publicador/>}></Route>
              <Route path="/cliente/:email" element={<InicioC/>}></Route>
              <Route path="/verC/:correoUsuario" element={<VerCompras/>}></Route>
              <Route path="/gestion/:email" element={<GestionP/>}></Route>
          </Routes>
      </Router>
   </Fragment>
  );
}

export default App;
