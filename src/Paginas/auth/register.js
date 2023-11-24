import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container} from 'react-bootstrap';
import axios from 'axios';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('cliente');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRolChange = (e) => {
      const selectedRol = e.target.value;
      console.log('Rol seleccionado:', selectedRol);
      setRol(selectedRol);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom validation for the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, introduzca un correo electrónico válido.');
      return;
    }

    // Custom validation for password length
    if (password.length < 6 || password.length > 20) {
      alert('La contraseña debe tener entre 6 y 20 caracteres.');
      return;
    }

    const formData = {
      nombreU: name,
      emailU: email,
      contraseña: password,
      rol:rol
    };

    try {
      const response = await axios.post('http://localhost:8888/api/v1/devcamps/usuarios/register', formData);

      if (response.data.success) {
        alert('Registro exitoso!');
        // Puedes redirigir al usuario a otra página después del registro exitoso
        // history.push('/otra-ruta');
      } else {
        alert('Registro exitoso!.');
      }
    } catch (error) {
      console.error('Error en el servidor al registrar usuario:', error.message);
      alert(`Error en el servidor al registrar usuario: ${error.message}`);
  }
  };

  return (
    <div>
    <Navbar bg="dark" variant="dark" expand="lg" className="custom_navbar">
                <Container>
                    <Navbar.Brand ><img src="logo_mascotas.jpeg" width="80px" height="80px"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="#">Registro</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    <div className='wrapper d-flex align-items-center justify-content-center w-100'>
      
      <div className='login'>
        <h2>Registrate!</h2>
        <form className='needs-validation' autoComplete='off' noValidate onSubmit={handleSubmit}>
          <div className='form-group was-validated mb-2'>
            <label htmlFor='name' className='form-label'>Nombre</label>
            <input
              type='text'
              className='form-control'
              id='nombreU'
              value={name}
              onChange={handleNameChange}
              required
            />
            <div className='invalid-feedback'>Por favor, introduzca su nombre.</div>
          </div>

          <div className='form-group was-validated mb-2'>
            <label htmlFor='email' className='form-label'>Email</label>
            <input
              type='email'
              className='form-control'
              id='emailU'
              value={email}
              onChange={handleEmailChange}
              required
              pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
            />
            <div className='invalid-feedback'>Por favor, introduzca un correo electrónico válido.</div>
          </div>

          <div className='form-group was-validated mb-2'>
            <label htmlFor='password' className='form-label'>Contraseña</label>
            <input
              type='password'
              className='form-control'
              id='contraseña'
              value={password}
              onChange={handlePasswordChange}
              required
              minLength='6'
              maxLength='20'
            />
            <div className='invalid-feedback'>La contraseña debe tener entre 6 y 20 caracteres.</div>
          </div>

          <div className='form-group was-validated mb-2'>
            <label htmlFor='select'>Seleccione su cuenta</label>
            <select className='form-select' name="rol" onChange={handleRolChange} defaultValue="cliente">
              <option value="cliente">Para compras</option>
              <option value="publicador">Para ventas</option>
            </select>
          </div>

          <button type='submit' className='btn btn-primary w-100 mt-2'>Registrar</button>
        </form>

        <p className="mt-2">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>.
        </p>
      </div>
    </div>
    </div>
  );
}

export default RegistrationForm;
