import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar, Nav, Container, Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const InicioC = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const { email } = useParams();
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // Realiza la solicitud para obtener productos al montar el componente
        const fetchProductos = async () => {
            try {
                const response = await axios.get("http://localhost:8888/api/v1/products/");
                setProductos(response.data.results);
                setSuccessMessage("Producto registrado con éxito");
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        fetchProductos();
    }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

    const handleShowModal = (producto) => {
        setSelectedProduct(producto);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleComprar = async () => {
        try {
            // Realizar la solicitud POST para registrar la compra
            await axios.post("http://localhost:8888/api/v1/devcamps/compras", {
                nombreProducto: selectedProduct.nombre,
                precioProducto: selectedProduct.precio,
                correousuario: email,
                numeroUsuario: document.querySelector('input[name="numeroUsuario"]').value,
            });
    
            // Cierra la modal después de realizar la compra
            handleCloseModal();
        } catch (error) {
            console.error("Error al realizar la compra:", error);
            handleCloseModal();
            // Aquí puedes manejar el error de alguna manera, mostrar un mensaje al usuario, etc.
        }
    };


    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" classname="custom_navbar">
                <Container>
                    <Navbar.Brand ><h2>Cliente</h2></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={`/verC/${email}`}>Ver Tus Compras</Nav.Link>
                            <Nav.Link as={Link} to={`/`}>Cerrar Sesion </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-4">
                <h2>Nuestros Productos</h2>
                {successMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    {successMessage}
                </div>
            )}
                <div className="row">
                {productos.map((producto) => (
                    <Card key={producto._id} style={{ width: '18rem' }} className="m-3">
                        <Card.Body>
                        <Card.Img variant="top" src="../imagen.jpg" width="100px" height="200px"/>
                                <Card.Title>{producto.nombre}</Card.Title>
                                <Card.Text>
                                    Marca: {producto.marca}<br/>
                                    Descripcion:{producto.descripcion}<br/>
                                    Precio:{producto.precio}
                                </Card.Text>
                            </Card.Body>
                        <Button variant="primary" onClick={() => handleShowModal(producto)}>Comprar</Button>
                    </Card>
                ))}
            </div>

            {/* Modal para la compra */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles de la compra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <div>
                            <label>Nombre Producto</label>
                            <input type="text" className="form-control" name="nombreProducto" readOnly value={selectedProduct.nombre}/><br/>
                            <label>Precio</label> 
                            <input type="text" className="form-control" name="precioProducto" value={selectedProduct.precio} readOnly/> 
                            <label>Correo</label>
                            <input type="text" className="form-control" name="correoUsuario" value={email} readOnly/>
                            <label>Cuenta de Nequi</label>
                            <input type="number" className="form-control" name="numeroUsuario" placeholder="Digite Su Cuenta De Nequi"/> 
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleComprar}>
                        Comprar
                    </Button>
                </Modal.Footer>
            </Modal>
            </Container>
            </div>
    );
};

export default InicioC;
