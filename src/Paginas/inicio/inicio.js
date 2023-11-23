import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const Inicio = () => {
    const name = localStorage.getItem('nombre')
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Realiza la solicitud para obtener productos al montar el componente
        const fetchProductos = async () => {
            try {
                const response = await axios.get("http://localhost:8888/api/v1/products/");
                setProductos(response.data.results);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        fetchProductos();
    }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Mascotas</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="#">Inicio</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Registro</Nav.Link>
                            <Nav.Link as={Link} to="/products">Productos</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <h1>Bienvendio:{name ? name : 'Invitado'}</h1>
            <Container className="mt-4">
                <h2>Últimas Publicaciones</h2>
                <div className="row">
                    {productos.map((producto) => (
                        <Card key={producto._id} style={{ width: '18rem' }} className="m-3">
                            <Card.Img variant="top" src="imagen.jpg" width="100px" height="200px"/>
                            <Card.Body>
                                <Card.Title>{producto.nombre}</Card.Title>
                                <Card.Text>
                                    {producto.descripcion}
                                </Card.Text>
                                <Button variant="primary">Ver Mas</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Inicio;
