import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import logo from "../logo_cropped.png";
import timeout from "../utils/timeout";
import { signUp } from "../utils/postItAPIWrapper";

const SignUpForm = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsRequesting(true);

      await timeout(5000);

      await signUp(mail, password);

      history.push("/signin");

      setIsRequesting(false);
    } catch (error) {
      console.log(error);
      setIsRequesting(false);
    }
  };

  const onChangeMail = (event) => {
    setMail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

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
            <h3 className="text-center mb-4">Nouveau compte</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Adresse email</Form.Label>
                <Form.Control
                  onChange={onChangeMail}
                  type="email"
                  placeholder="Saisissez votre adresse email"
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  onChange={onChangePassword}
                  type="password"
                  placeholder="Saisissez votre mot de passe"
                />
              </Form.Group>

              <Button
                className="btn-block"
                variant="primary"
                type="submit"
                disabled={isRequesting}
              >
                {isRequesting ? (
                  <Spinner as="span" size="sm" animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                ) : (
                  "Créer un compte"
                )}
              </Button>

              <Container className="mt-2 mb-0">
                <Row>
                  <Col className="text-center">
                    <Link to="/signin">J'ai déjà un compte</Link>
                  </Col>
                </Row>
              </Container>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
