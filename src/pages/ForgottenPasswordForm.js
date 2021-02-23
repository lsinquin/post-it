import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import logo from "../logo_cropped.png";
// import { ConfigContext } from "../App";

const ForgottenPassword = () => {
  const [mail, setMail] = useState("");
  // const [hasError, setHasError] = useState(false);
  // const history = useHistory();

  // const { errMessageDuration } = useContext(ConfigContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(mail);
    // setHasError(true);
  };

  const onChangeMail = (event) => {
    setMail(event.target.value);
  };

  // const handleCloseMsg = () => {
  //   setHasError(false);
  // };

  return (
    <Container fluid className="form-background h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col lg={4}>
          <img
            className="mx-auto d-block mb-4"
            src={logo}
            width="300"
            height="80"
            alt="logo"
          ></img>
          <Card body>
            <h3 className="text-center mb-4">Mot de passe oublié</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Adresse email</Form.Label>
                <Form.Control
                  onChange={onChangeMail}
                  type="email"
                  placeholder="Saisissez votre adresse email"
                />
              </Form.Group>

              <Form.Group controlId="formLinks">
                <Container>
                  <Row>
                    <Col className="text-center">
                      <Link to="/signin">Se connecter</Link>
                    </Col>
                  </Row>
                </Container>
              </Form.Group>

              <Button className="btn-block" variant="primary" type="submit">
                Réinitialiser le mot de passe
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgottenPassword;
