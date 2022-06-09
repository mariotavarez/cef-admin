// React
import { useEffect, useState } from "react";
// Toastify
import { ToastContainer, toast } from "react-toastify";
// Hooks
import useFetch from "../../../hooks/useFetch";
// Components
import Heading from "../LoginCEF/Heading";
// Data
import DATA_HEADING from "../../../data/FormCEF/Heading.json";

import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Table, Alert, Button } from "react-bootstrap";
// Layout
import NavbarLayout from "../../../layout/Navbar";
// React
import { useNavigate } from "react-router-dom";
// Models
import { SolicitantesModel } from "../../../interfaces/solicitantesModel";
// Excel
import exportFromJSON from "export-from-json";

const Solicitantes = () => {
  // Hooks
  const navigate = useNavigate();
  const { postRequest } = useFetch();

  const [solicitantes, setSolicitantes] = useState<SolicitantesModel[]>([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    // Valida que el usuario este logueado
    if (username && password) {
      // Si el usuario y password estan vacios entonces no puede acceder a esta pagina
      if (username === "" && password === "")
        navigate("/admin-estados-financieros");
    } else {
      navigate("/admin-estados-financieros");
    }

    const getSolicitantes = async () => {
      let formData = new FormData();
      formData.append("username", username || "");
      formData.append("password", password || "");
      const response: any = await postRequest({
        url: "admin/obtenerSolicitantes.php",
        body: formData,
      });

      if (response) {
        setSolicitantes(response.data);
      }
    };

    getSolicitantes();
  }, []);
  const data = solicitantes;
  const fileName = `Reporte_solicitantes_${new Date().toLocaleDateString()}`;
  const exportType = "xls";
  const downloadReport = (event: any) => {
    event.preventDefault();
    if (solicitantes.length > 0) {
      exportFromJSON({ data, fileName, exportType });
    } else {
      toast.error("No hay datos para exportar", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <div>
      <NavbarLayout />
      <Container>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* HEADING */}
        <Heading title={DATA_HEADING.TITLE_SOLICITANTES} />
        {/* HEADING */}
        {/* DOWNLOAD */}
        <Row className={"d-flex justify-content-end pb-4"}>
          <Col>
            <Button
              onClick={(event) => {
                downloadReport(event);
              }}
              variant="outline-success"
            >
              Descargar Reporte
            </Button>
          </Col>
        </Row>
        {/* DOWNLOAD */}
        {/* TABLE LIST */}
        <Row
          className={
            "text-center d-flex justify-content-center align-items-lg-center"
          }
        >
          <Col>
            <Table striped bordered hover responsive="md">
              {solicitantes.length > 0 && (
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido paterno</th>
                    <th>Apellido materno</th>
                    <th>RFC</th>
                    <th>Tel. Celular</th>
                    <th>Razón Social</th>
                    <th>Fecha registro</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {solicitantes.length > 0 ? (
                  solicitantes.map((solicitante) => (
                    <tr>
                      <td>{solicitante.nombre}</td>
                      <td>{solicitante.apellidoPaterno}</td>
                      <td>{solicitante.apellidoMaterno}</td>
                      <td>{solicitante.rfc}</td>
                      <td>{solicitante.telefonoCelular}</td>
                      <td>{solicitante.empleoRazonSocial}</td>
                      <td>{solicitante.fechaCreacion}</td>
                    </tr>
                  ))
                ) : (
                  <Alert className={"mt-4"} variant="info" dismissible>
                    <Alert.Heading>Sin registros</Alert.Heading>
                    <p>No se encontraron solicitantes</p>
                  </Alert>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        {/* TABLE LIST */}
        {/* </Container> */}
      </Container>
    </div>
  );
};

export default Solicitantes;
