import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginForm from './Paginas/auth/login';
import Inicio from './Paginas/inicio/inicio';
import Products from './Paginas/productos/products';
import RegistrationForm from './Paginas/auth/register';

function App() {
  return (
   <Fragment>
      <Router>
          <Routes>
              <Route path="/" element={<Inicio/>}></Route>
              <Route path="/login" element={<LoginForm/>}></Route>
              <Route path="/products" element={<Products/>}></Route>
              <Route path="/register" element={<RegistrationForm/>}></Route>
          </Routes>
      </Router>
   </Fragment>
  );
}

export default App;
