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
            <Navbar bg="dark" variant="dark" expand="lg" classname="custom_navbar">
                <Container>
                    <Navbar.Brand ><img src="logo_mascotas.jpeg" width="80px" height="80px"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="#">Inicio</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Registro</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-4">
                <h2>Nuestros Productos</h2>
                <div className="row">
                    {productos.map((producto) => (
                        <Card key={producto._id} style={{ width: '18rem' }} className="m-3">
                            <Card.Img variant="top" src="imagen.jpg" width="100px" height="200px"/>
                            <Card.Body>
                                <Card.Title>{producto.nombre}</Card.Title>
                                <Card.Text>
                                    Marca: {producto.marca}<br/>
                                    Descripcion:{producto.descripcion}<br/>
                                    Precio:{producto.precio}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Inicio;
