// Formik
import { Form, Formik } from "formik";
// Shared
import { InputField, InputSelect } from "../../shared";
// Data
import FORM_CFE_DATA from "../../../data/FormCEF/FormCEF.json";
import DATA_HEADING from "../../../data/FormCEF/Heading.json";
// Components
import Heading from "./Heading";
import * as Yup from "yup";
// Hooks
import useFetch from "../../../hooks/useFetch";
// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// React Router
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { useEffect } from "react";
import Header from "../../shared/header/Header";
// Inputs Field
const INPUTS = (
  <>
    {FORM_CFE_DATA.map((form: any) => (
      <InputField
        key={form.name}
        name={form.name}
        type={form.type}
        label={form.label}
      />
    ))}
  </>
);

// Initial Values
const initialValues: { [key: string]: any } = {};
// Required Fields
const requiredFields: { [key: string]: any } = {};

for (const input of FORM_CFE_DATA) {
  initialValues[input.name] = input.value;

  if (!input.validations) continue;

  let schema = Yup.string();

  for (const { type, ...validation } of input.validations) {
    if (type === "required") {
      schema = schema.required("Este campo es requerido");
    }

    if (type === "minLength") {
      schema = schema.min(
        (validation as any).value || 3,
        `Mínimo de ${(validation as any).value || 3} caracteres`
      );
    }
    if (type === "maxLength") {
      schema = schema.max(
        (validation as any).value,
        `Máximo de ${(validation as any).value} caracteres`
      );
    }

    if (type === "email") {
      schema = schema.email(`Revise el formato del email`);
    }
  }
  requiredFields[input.name] = schema;
}

const validationSchema = Yup.object({ ...requiredFields });

const FormCEF = () => {
  let navigate = useNavigate();
  const { postRequest } = useFetch();

  useEffect(() => {
    if (localStorage.getItem("tokenCEF")) {
      localStorage.removeItem("tokenCEF");
    }
  });

  return (
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
      <Heading
        title={DATA_HEADING.TITLE}
        titleGradient={DATA_HEADING.TITLE_GRADIENT}
        subTitle={DATA_HEADING.SUB_TITLE}
      />
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            let formData = new FormData();
            for (let key in values) {
              formData.append(key, values[key]);
            }

            try {
              const {
                data: { token },
              } = await postRequest({
                url: `registrarSolicitante.php`,
                body: formData,
              });

              if (token) {
                localStorage.setItem("tokenCEF", token);
                navigate("/estados-financieros/listado");
              }
            } catch (error) {
              toast.error("Por favor revise que sus datos esten correctos", {
                position: toast.POSITION.BOTTOM_CENTER,
              });
            }
          }}
        >
          {(formik) => (
            <Form noValidate>
              <div className="row">
                <div className="offset-md-3 col-md-6">{INPUTS}</div>
              </div>
              <div className="row p-4">
                <div className="offset-md-4 col-md-4">
                  <div className="d-grid gap-2">
                    <Button type={"submit"} variant="success" size="lg">
                      Iniciar sesión
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </Container>
  );
};

export default FormCEF;
