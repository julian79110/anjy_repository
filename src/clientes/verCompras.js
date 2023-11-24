import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Table, Navbar,Container, Nav } from "react-bootstrap";
import axios from "axios";

const VerCompras = () => {
  const [compras, setCompras] = useState([]);
  const{email} = useParams()
  const { correoUsuario } = useParams();
  useEffect(() => {
    // Realiza la solicitud para obtener las compras del usuario al montar el componente
    const fetchCompras = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/api/v1/devcamps/compras/compra/${correoUsuario}`);
        setCompras(response.data.compras);
        console.log(response.data)
      } catch (error) {
        console.error("Error al obtener compras:", error);
      }
    };

    fetchCompras();
  }, [correoUsuario]); // Agrega correoUsuario como dependencia para que se ejecute cuando cambie

  return (
    <div>
        <Navbar bg="dark" variant="dark" expand="lg" classname="custom_navbar">
                <Container>
                    <Navbar.Brand ><h2>Cliente</h2></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={`/cliente/${email}`}>Volver</Nav.Link>
                            <Nav.Link as={Link} to={`/`}>Cerrar Sesion </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
      <h2>Lista de Compras</h2>
      <div className="tabla">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre Producto</th>
            <th>Precio</th>
            <th>Correo</th>
            <th>Numero Usuario</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <tr key={compra._id}>
              <td>{compra.nombreProducto}</td>
              <td>{compra.precioProducto}</td>
              <td>{compra.correoUsuario}</td>
              <td>{compra.numeroUsuario}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
  );
};

export default VerCompras;
