// React
import { useEffect, useState } from "react";
// Hooks
import useAlert from "../../../hooks/useAlert";
import useFetch from "../../../hooks/useFetch";
// Data
import DATA_HEADING from "../../../data/FormCEF/Heading.json";
// React Router
import { useNavigate } from "react-router-dom";
// Components
import Heading from "../FormCEF/Heading";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../shared/Card";
import { Container, Row, Col, Image } from "react-bootstrap";

const EstadosFinancieros = () => {
  // Hooks
  const { getRequest } = useFetch();
  const navigate = useNavigate();

  // State
  const [estadosFinancieros, setEstadosFinancieros] = useState<any[]>([]);

  const [image, setImage] = useState<any>({ img: null, periodo: null });

  useEffect(() => {
    const executeProcess = async () => {
      const token = localStorage.getItem("tokenCEF");

      if (token) {
        try {
          const response: any = await getRequest({
            url: `obtenerEstadosFinancieros.php?token=${token}`,
          });
          setEstadosFinancieros(response.data);
        } catch (error) {
          navigate("/estados-financieros");
        }
      } else {
        navigate("/estados-financieros");
      }
    };

    executeProcess();
  }, []);

  return (
    <>
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
        <Heading title={DATA_HEADING.TITLE_EF} />
        <Row
          className={
            "text-center d-flex justify-content-center align-items-lg-center"
          }
          style={{ marginTop: "30vh" }}
        >
          {estadosFinancieros.length > 0 &&
            estadosFinancieros.map((estado, index) => (
              <Col key={index}>
                <Card setImage={setImage} {...estado} />
              </Col>
            ))}
        </Row>
        {image.img !== null && (
          <Container
            className="text-center d-flex justify-content-center align-items-lg-center"
            style={{ paddingTop: "2rem" }}
          >
            <Row>
              <Col>
                <h2>Periodo {image.periodo}</h2>
                <Image src={image.img} thumbnail />
              </Col>
            </Row>
          </Container>
        )}

        {/* </Container> */}
      </Container>
    </>
  );
};

export default EstadosFinancieros;
