import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import logo from "../logo_cropped.png";
import useSignIn from "../customHooks/useSignIn";

const SignInForm = () => {
  const {
    isLoggedIn,
    isRequesting,
    errorId,
    errorMessage,
    signIn,
  } = useSignIn();

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    signIn(mail, password);
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
        <Col md={6} xl={4}>
          <img
            className="mx-auto d-block mb-4"
            src={logo}
            width="300"
            height="80"
            alt="logo"
          ></img>
          <Card body>
            <h3 className="text-center mb-4">Connexion</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Adresse email</Form.Label>
                <Form.Control
                  onChange={onChangeMail}
                  type="email"
                  placeholder="Saisissez votre adresse email"
                />
                {errorId === "err_no_user_found" ||
                errorId === "err_invalid_mail" ? (
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
                {errorId === "err_wrong_credentials" ? (
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
                  "Se connecter"
                )}
              </Button>

              <Container className="mt-2 mb-0">
                <Row>
                  <Col xs={12} lg={6} className="text-center ">
                    <Link to="/signup">Créer un compte</Link>
                  </Col>
                  <Col xs={12} lg={6} className="text-center">
                    <Link to="/forgottenpassword">Mot de passe oublié</Link>
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

export default SignInForm;
