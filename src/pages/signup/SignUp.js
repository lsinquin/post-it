import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import logo from "../../logo.svg";
import useSignUp from "./hooks/useSignUp";
import useAutoFocus from "../../hooks/useAutoFocus";

function SignUpForm() {
  const {
    isRequesting,
    accountCreated,
    errorId,
    errorMessage,
    signUp,
    setAccountCreated,
  } = useSignUp();

  const { autoFocus } = useAutoFocus();

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

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

  const onCloseAlert = (event) => {
    setAccountCreated(false);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-gradient h-100 p-3">
      <img className="mb-sm-5 mb-3" src={logo} height="75" alt="logo" />
      <Card className="card-form rounded-lg w-100">
        <Card.Body className="p-4">
          <h3 className="text-center mb-4">Nouveau compte</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Adresse email</Form.Label>
              <Form.Control
                onChange={onChangeMail}
                type="email"
                placeholder="Saisissez votre adresse email"
                autoFocus={autoFocus}
                isInvalid={
                  errorId === "err_existing_user" ||
                  errorId === "err_invalid_mail"
                }
              />
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                onChange={onChangePassword}
                type="password"
                placeholder="Saisissez votre mot de passe"
                isInvalid={errorId === "err_invalid_password"}
              />
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              className="btn-block mt-4"
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

            <Container className="mt-3 mb-0">
              <Row>
                <Col className="text-center">
                  <Link to="/signin">J'ai déjà un compte</Link>
                </Col>
              </Row>
            </Container>
          </Form>
        </Card.Body>
      </Card>
      <div className="whitespace mt-sm-5 mt-3">
        <Alert
          className="alert-new-user mx-auto"
          show={accountCreated}
          variant="success"
          dismissible
          onClose={onCloseAlert}
        >
          Votre compte a bien été créé. Vous pouvez&nbsp;
          {<Link to="/signin">vous connecter</Link>}.
        </Alert>
      </div>
    </div>
  );
}

export default SignUpForm;
