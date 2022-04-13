// React Icons
import {
  Container,
  Button,
  Card as CardTheme,
  Row,
  Col,
  Image,
} from "react-bootstrap";
// React
import { useEffect, useState } from "react";
interface IProps {
  id: string;
  nombreArchivo: string;
  estadoFinancieroAnio: string;
  estadoFinancieroPeriodo: string;
  registroActivo: string;
  fechaCreacion: string;
  setImage: any;
}

const Card = ({
  nombreArchivo,
  estadoFinancieroPeriodo,
  estadoFinancieroAnio,
  setImage,
}: IProps) => {
  const handleClickDownload = (event: any) => {
    event.preventDefault();
    setImage({ img: nombreArchivo, periodo: estadoFinancieroPeriodo });
  };

  return (
    <div className="d-flex justify-content-center">
      <CardTheme style={{ width: "18rem" }} className={"shadow"}>
        <CardTheme.Body>
          <CardTheme.Title className={"fs-3"}>
            {estadoFinancieroAnio}
          </CardTheme.Title>
          <CardTheme.Text className={"fs-4"}>
            Periodo {estadoFinancieroPeriodo}
          </CardTheme.Text>
          <Button
            variant="primary"
            onClick={(event) => handleClickDownload(event)}
          >
            {" "}
            Ver estado financiero
          </Button>
        </CardTheme.Body>
      </CardTheme>
    </div>
  );
};

export default Card;
