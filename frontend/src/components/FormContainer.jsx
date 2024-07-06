import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container className="center-container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={5}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
