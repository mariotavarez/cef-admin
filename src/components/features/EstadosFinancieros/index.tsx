// React
import { useEffect, useState } from "react";
// Formik
import { Form, Formik } from "formik";
import * as Yup from "yup";
// Toastify
import { ToastContainer, toast } from "react-toastify";
// Hooks
import useFetch from "../../../hooks/useFetch";
// Data
import DATA_HEADING from "../../../data/FormCEF/Heading.json";
// React Router
import { useNavigate } from "react-router-dom";
// Components
import Heading from "../LoginCEF/Heading";

import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";
import NavbarLayout from "../../../layout/Navbar";
import { InputField, InputSelect } from "../../shared";
import { EstadosFinancierosModel } from "../../../interfaces/estadosFinancierosModel";

const EstadosFinancieros = () => {
  // Hooks
  const navigate = useNavigate();
  const { postRequest } = useFetch();

  // Listado de estados financieros
  const [estadosFinancieros, setEstadosFinancieros] = useState<
    EstadosFinancierosModel[]
  >([]);
  // Archivo Estado financiero
  const [file, setFile] = useState<any>();

  // Initial Values
  const initialValues = {
    estado_financiero_anio: "",
    estado_financiero_periodo: "",
  };
  // show Modal
  const [show, setShow] = useState(false);
  // Is Valid
  const [isValid, setIsValid] = useState("noValido");
  // Close Modal
  const handleClose = () => setShow(false);
  // Handle show modal
  const handleShow = () => setShow(true);
  // Loading
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    estado_financiero_anio: Yup.string()
      .min(4, "El año debe tener 4 dígitos")
      .max(4, "El año debe tener 4 dígitos")
      .required("El año es requerido"),
    estado_financiero_periodo: Yup.string()
      .min(1, "El periodo debe tener al menos 1 caracter")
      .required("Periodo es requerido"),
  });

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

    const getListadoEstadosFinancieros = async () => {
      let formData = new FormData();
      formData.append("username", username || "");
      formData.append("password", password || "");
      formData.append("isValid", isValid || "");
      const response: any = await postRequest({
        url: "admin/obtenerEstadosFinancieros.php",
        body: formData,
      });

      if (response) {
        setEstadosFinancieros(response.data);
        console.log(" ", estadosFinancieros);
      }
    };

    getListadoEstadosFinancieros();
  }, [loading]);
  /**
   * @author Mario Tavarez
   * @date 13/04/2022
   * @description Elimina el estado financiero mediante el id
   * @param event
   * @param id
   */
  const deleteEstadoFinanciero = async (event: any, id: string) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", localStorage.getItem("username") || "");
    formData.append("password", localStorage.getItem("password") || "");
    formData.append("estado_financiero_id", id);

    const response: any = await postRequest({
      url: "admin/eliminarEstadoFinanciero.php",
      body: formData,
    });

    if (response) {
      toast.success("Estado financiero eliminado", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setEstadosFinancieros(
        estadosFinancieros.filter(
          (estadoFinanciero) => estadoFinanciero.id !== id
        )
      );
    } else {
      toast.error("Error al eliminar estado financiero", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <>
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
        <Heading title={DATA_HEADING.TITLE_EF} />
        {/* HEADING */}

        {/* AGREGAR NUEVO */}
        <Row style={{ marginTop: "10vh" }}>
          <Col className={"d-flex justify-content-end"}>
            <Button variant="outline-primary" onClick={handleShow}>
              Agregar nuevo
            </Button>
          </Col>
        </Row>
        {/* AGREGAR NUEVO */}
        {/* TABLE LIST */}
        <Row
          className={
            "text-center d-flex justify-content-center align-items-lg-center"
          }
        >
          <Col>
            <Table striped bordered hover responsive="md">
              {estadosFinancieros.length > 0 && (
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Año</th>
                    <th>Periodo</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {estadosFinancieros.length > 0 ? (
                  estadosFinancieros.map((estado) => (
                    <tr>
                      <td>{estado.nombreArchivo}</td>
                      <td>{estado.estadoFinancieroAnio}</td>
                      <td>{estado.estadoFinancieroPeriodo}</td>
                      <td>{estado.fechaCreacion}</td>
                      <td>
                        {/* ELIMINAR */}
                        <div>
                          <Button
                            onClick={(event) => {
                              deleteEstadoFinanciero(event, estado.id);
                            }}
                            variant="outline-danger"
                          >
                            Eliminar
                          </Button>{" "}
                        </div>
                        {/* ELIMINAR */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <Alert
                    className={"mt-4"}
                    variant="primary"
                    onClose={() => setShow(false)}
                    dismissible
                  >
                    <Alert.Heading>Sin registros</Alert.Heading>
                    <p>No se encontraron estados financieros</p>
                  </Alert>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        {/* TABLE LIST */}
        {/* </Container> */}
      </Container>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Nuevo estado financiero</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values: any) => {
              if (!file) {
                toast.error("Seleccione un archivo", {
                  position: toast.POSITION.BOTTOM_CENTER,
                });
                return;
              }
              setLoading(true);
              let formData = new FormData();
              for (let key in values) {
                formData.append(key, values[key]);
              }
              const username = localStorage.getItem("username");
              const password = localStorage.getItem("password");

              formData.append("username", username || "");
              formData.append("password", password || "");
              formData.append("isValid", isValid || "");
              formData.append(
                "estado_financiero_imagen",
                file,
                `estado_financiero_periodo_${file.name}`
              );

              try {
                const response: any = await postRequest({
                  url: "admin/subirEstadoFinanciero.php",
                  body: formData,
                });
                if (response) {
                  toast.success("Estado financiero creado", {
                    position: toast.POSITION.BOTTOM_CENTER,
                  });
                  handleClose();
                }
              } catch (error) {
                toast.error("Error al subir el estado financiero", {
                  position: toast.POSITION.BOTTOM_CENTER,
                });
                setLoading(false);
              }
              setLoading(false);
            }}
          >
            {(formik) => (
              <Form noValidate>
                <div className="row">
                  <div className="col-md-12">
                    <InputField
                      name={"estado_financiero_anio"}
                      type={"text"}
                      maxLength={4}
                      label={"Año del estado financiero"}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <InputField
                      name={"estado_financiero_periodo"}
                      type={"number"}
                      maxLength={2}
                      label={"Estado financiero periodo"}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <InputField
                      name={"estado_financiero_imagen"}
                      type={"file"}
                      multiple={false}
                      onChange={(e: any) => setFile(e.target.files[0])}
                      label={"Ingrese la imagen del estado financiero"}
                      accept="image/png, image/jpeg"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <InputSelect
                      name={"isValid"}
                      value={isValid}
                      onChange={(e: any) => {
                        setIsValid(e.target.value);
                      }}
                      label={"¿El estado financiero es valido?"}
                    >
                      <option value="valido">Es valido</option>
                      <option value="noValido">No es valido</option>
                    </InputSelect>
                  </div>
                </div>
                <div className="d-flex m-2 justify-content-end">
                  <Button
                    variant="outline-danger"
                    className={"pr-3"}
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>{" "}
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    type={"submit"}
                    className={"pr-4"}
                    variant="outline-primary"
                  >
                    Crear
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EstadosFinancieros;
