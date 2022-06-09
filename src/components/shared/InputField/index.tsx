import { ErrorMessage, useField } from "formik";
import { Form } from "react-bootstrap";

interface IProps {
  label: string;
  name: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "file"
    | "checkbox";
  placeholder?: string;
  [x: string]: any;
}

const InputField = ({ label, ...props }: IProps) => {
  const [field] = useField(props);

  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={props.name}> {label} </Form.Label>
      <Form.Control className={"shadow-input"} {...field} {...props} />
      <Form.Text className="text-danger">
        <ErrorMessage name={props.name} component="span" />
      </Form.Text>
    </Form.Group>
  );
};

export default InputField;
