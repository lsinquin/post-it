import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import logo from "../logo_cropped.png";
import { useFormContext } from "../contexts/form/FormContext";

const SignUpForm = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const {
    isRequesting,
    error,
    errorMessage,
    accountCreated,
    signUp,
  } = useFormContext();

  const history = useHistory();

  useEffect(() => {
    if (accountCreated) {
      history.push("/signin");
    }
  }, [accountCreated, history]);

  const handleSubmit = (event) => {
    event.preventDefault();

    signUp(mail, password);
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
                {error === "err_existing_user" ? (
                  <Form.Text id="passwordHelpBlock" className="text-danger">
                    {errorMessage}
                  </Form.Text>
                ) : null}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  onChange={onChangePassword}
                  type="password"
                  placeholder="Saisissez votre mot de passe"
                />
                {error === "err_invalid_password" ? (
                  <Form.Text id="passwordHelpBlock" className="text-danger">
                    {errorMessage}
                  </Form.Text>
                ) : null}
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
