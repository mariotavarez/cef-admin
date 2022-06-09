import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { useNavigate } from "react-router";

const NavbarLayout = () => {
  // Navigate
  let navigate = useNavigate();
  const cerrarSesion = (event: any) => {
    event.preventDefault();
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    navigate("/admin-estados-financieros");
  };

  const goToUrl = (event: any, url: string) => {
    event.preventDefault();
    navigate(`/admin-estados-financieros/${url}`);
  };

  return (
    <Navbar bg="primary" expand={false}>
      <Container fluid>
        <Navbar.Brand className={"text-light"}>SEF</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Sistema de administración de estados financieros
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link
                onClick={(event) => {
                  goToUrl(event, "listado");
                }}
              >
                Ver estados financieros
              </Nav.Link>
              <Nav.Link
                onClick={(event) => {
                  goToUrl(event, "listado-solicitantes");
                }}
              >
                Ver solicitantes
              </Nav.Link>
            </Nav>
            <Form className="d-grid gap-2">
              <Button
                onClick={(event) => {
                  cerrarSesion(event);
                }}
                variant="outline-primary"
                size="lg"
              >
                Cerrar sesión
              </Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarLayout;
