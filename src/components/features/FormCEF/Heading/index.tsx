import { Container } from "react-bootstrap";

interface IProps {
  title: string;
  titleGradient?: string;
  subTitle?: string;
}

const Heading = ({ title, titleGradient, subTitle }: IProps) => {
  return (
    <>
      <Container className={"text-center "} style={{ marginTop: "5vh" }}>
        <h1 className="fs-1">{title}</h1>
        {titleGradient && (
          <h1 className={"badge fs-1 text-success"}>& {titleGradient}</h1>
        )}
      </Container>
      <Container className={"text-center"}>
        <h6 className="text-secondary">{subTitle}</h6>
      </Container>
    </>
  );
};

export default Heading;
