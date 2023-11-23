// RegistrationForm.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

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

    // Custom validation for password length
    if (password.length < 6 || password.length > 20) {
      alert('La contraseña debe tener entre 6 y 20 caracteres.');
      return;
    }

    const formData = {
      nombreU: name,
      emailU: email,
      contraseña: password,
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
    <div className='wrapper bg-dark d-flex align-items-center justify-content-center w-100'>
      <div className='login'>
        <h2>Formulario de Registro</h2>
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

          <button type='submit' className='btn btn-success w-100 mt-2'>Registrar</button>
        </form>

        <p className="mt-2">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>.
        </p>
      </div>
    </div>
  );
}

export default RegistrationForm;
