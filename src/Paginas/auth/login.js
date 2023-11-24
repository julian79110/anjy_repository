import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container} from 'react-bootstrap';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom validation for the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, introduzca un correo electrónico válido.');
      return;
    }

    // Custom validation for password presence and length
    if (!password || password.length < 6 || password.length > 20) {
      alert('La contraseña debe tener entre 6 y 20 caracteres y no puede estar vacía.');
      return;
    }

    const formData = {
      emailU: email,
      contraseña: password,
    };

    try {
      const response = await axios.post('http://localhost:8888/api/v1/devcamps/usuarios/login', formData);

      if (response.data.success) {
        // Guardar el token en localStorage
        localStorage.setItem('token', response.data.token);

        // Validar el rol antes de redirigir
        const userRole = response.data.rol;
        const email = response.data.emailU
        if (userRole === 'cliente') {
          alert('Inicio de sesión exitoso!');
          navigate(`/cliente/${email}`)
        } else if(userRole ==='publicador'){
          alert('inicio de sesión exitoso!')
          navigate(`/publicador/${email}`)
        } else {
          // Si el rol no es válido, puedes redirigir a una página de acceso no autorizado
          alert('Acceso no autorizado');
        }
      } else {
        alert('Error en el inicio de sesión. Por favor, verifica tus datos.');
      }
    } catch (error) {
      console.error('Error en el servidor al iniciar sesión:', error);
    }
  };

  return (
    <div>
    <Navbar bg="dark" variant="dark" expand="lg" classname="custom_navbar">
                <Container>
                    <Navbar.Brand ><img src="logo_mascotas.jpeg" width="80px" height="80px"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                            <Nav.Link as={Link} to="#">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Registro</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    <div className='wrapper d-flex align-items-center justify-content-center w-100'>
      <div className='login'>
        <h2>Formulario de Inicio de Sesión</h2>
        <form className='needs-validation' autoComplete='off' noValidate onSubmit={handleSubmit}>
          <div className='form-group was-validated mb-2'>
            <label htmlFor='email' className='form-label'>Email</label>
            <input
              type='email'
              className='form-control'
              id='email'
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
              id='password'
              value={password}
              onChange={handlePasswordChange}
              required
              minLength='6'
              maxLength='20'
            />
            <div className='invalid-feedback'>La contraseña debe tener entre 6 y 20 caracteres y no puede estar vacía.</div>
          </div>

          <button type='submit' className='btn btn-success w-100 mt-2'>Iniciar Sesión</button>
        </form>
        <p className="mt-2">
          ¿No tienes Cuenta? <Link to="/login">Registrate Aqui</Link>.
        </p>
      </div>
    </div>
    </div>
  );
}

export default LoginForm;
