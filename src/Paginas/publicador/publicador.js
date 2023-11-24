import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar, Nav, Container, Card } from 'react-bootstrap';
import axios from 'axios';

const Publicador = () => {
    const [products, setProducts] = useState([]);
    const { email } = useParams();
    useEffect(() => {
        // Función para obtener los productos del usuario
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8888/api/v1/products/user/${email}`);
                setProducts(response.data.products);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        // Llamar a la función para obtener productos al montar el componente
        fetchProducts();
    }, []);  // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente
    
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" className="custom_navbar">
                <Container>
                    <Navbar.Brand >Publicador</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={`/gestion/${email}`}>Gestiona Productos</Nav.Link>
                            <Nav.Link as={Link} to={`/products/${email}`}>Sube Productos</Nav.Link>
                            <Nav.Link as={Link} to={`/`}>Cerrar Sesion</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br/>
            <h2>Tus Productos</h2>
            <Products products={products} />
        </div>
    );
}

const Products = ({ products }) => {
    // Resto del código del componente Products

    // Puedes usar la lista de productos aquí para mostrarlos en el componente Card
    return (
        <div>
            {products.map((product) => (
                <Card key={product._id} style={{ width: '18rem' }} className="m-3">
                <Card.Body>
                    <Card.Title>{product.nombre}</Card.Title>
                    <Card.Text>
                        Marca: {product.marca}
                        Descripcion:{product.descripcion}<br/>
                        Precio:{product.precio}
                    </Card.Text>
                </Card.Body>
            </Card>
            ))}
        </div>
    );
}

export default Publicador;
