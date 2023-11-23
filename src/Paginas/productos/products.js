import React,{useState} from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Form, Button} from 'react-bootstrap';
import axios from 'axios'; 

const Products = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        nombre: "",
        marca: "",
        descripcion: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8888/api/v1/products/", formData);
            console.log(response.data);

            // Verifica si la solicitud fue exitosa antes de mostrar el mensaje
            if (response.data.success) {
                setSuccessMessage("Producto registrado con éxito");
            } else {
                setSuccessMessage(""); // Limpia el mensaje si la solicitud no fue exitosa
            }

            // Puedes redirigir al usuario a otra página después de la creación exitosa del producto
            // history.push("/otra-ruta");
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
        }
    };
    return (
        <div>
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Mascotas</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Registro</Nav.Link>
              <Nav.Link as={Link} to="/products">Productos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <br/>
        {successMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    {successMessage}
                </div>
            )}
        <h2>Registro</h2>
        <div className="centrar">
            <Form autoComplete="off" onSubmit={handleSubmit}> 
                <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre Producto</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nombre Del Producto"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la marca"
                        name="marca"
                        value={formData.marca}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formContraseña">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registrarse
                </Button>
            </Form>
            </div>
        </div>
    );
}

export default Products