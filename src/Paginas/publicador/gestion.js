import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar, Nav, Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";

const GestionP = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
  }, [email]);

  const handleDeleteProducto = async (productId) => {
    // Preguntar al usuario si está seguro de eliminar
    const isConfirmed = window.confirm("¿Está seguro de que desea eliminar este producto?");

    if (isConfirmed) {
      try {
        // Realizar la solicitud para eliminar el producto
        await axios.delete(`http://localhost:8888/api/v1/products/${productId}`);

        // Actualizar la lista de productos después de la eliminación
        const updatedProducts = products.filter(product => product._id !== productId);
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };



  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleUpdateProducto = async () => {
    try {
      // Realizar la solicitud para actualizar el producto
      await axios.put(`http://localhost:8888/api/v1/products/${selectedProduct._id}`, selectedProduct);

      // Actualizar la lista de productos después de la actualización
      const updatedProducts = products.map(product =>
        product._id === selectedProduct._id ? selectedProduct : product
      );
      setProducts(updatedProducts);

      // Cerrar la modal
      handleCloseModal();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Publicador</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={`/publicador/${email}`}>Volver</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <div className="tabla">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Eliminar</th>
              <th>Editar</th>
            </tr>
          </thead>
          {products.map((product) => (
            <tbody key={product._id}>
              <tr>
                <td>{product.nombre}</td>
                <td>{product.marca}</td>
                <td>{product.descripcion}</td>
                <td>{product.precio}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDeleteProducto(product._id)}>
                    Eliminar
                  </Button>
                </td>
                <td>
                <Button variant="primary" onClick={() => handleShowModal(product)}>
                    Editar
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>

      {/* Modal de Edición */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre Del Producto"
                name="nombre"
                value={selectedProduct?.nombre || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la marca"
                name="marca"
                value={selectedProduct?.marca || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese descripcion"
                name="descripcion"
                value={selectedProduct?.descripcion || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese precio"
                name="precio"
                value={selectedProduct?.precio || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdateProducto}>
            Actualizar Producto
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GestionP;
