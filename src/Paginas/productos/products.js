import React,{useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar, Nav, Container, Form, Button} from 'react-bootstrap';
import axios from 'axios'; 

const Products = () => {
    const { email } = useParams();
  const [emailValue, setEmailValue] = useState(email);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    marca: "",
    descripcion: "",
    precio: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setEmailValue(email);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("http://localhost:8888/api/v1/products/", {
            ...formData,
            emailU: email,  // Usar el valor de email en lugar de emailU
          });
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
          <Navbar.Brand href="#home">Publicador</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={`/publicador/${email}`}>Volver</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <br/>
        {successMessage && (
    <div className="alert alert-success alert-dismissible mt-3" role="alert">
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        {successMessage}
    </div>
)}
        <h2>Registro</h2>
        <div className="centrar">
            <Form autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data"> 
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

                <Form.Group className="mb-3" controlId="formDescripcion">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formContraseña">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese precio"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmailU">
                    <Form.Control
                    type="text"
                    placeholder=""
                    name="emailU"
                    value={emailValue}
                    readOnly
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registra el Producto
                </Button>
            </Form>
            </div>
        </div>
    );
}

export default Products