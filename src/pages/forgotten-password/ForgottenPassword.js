import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import logo from "../../logo.svg";
import useAutoFocus from "../../hooks/useAutoFocus";

function ForgottenPassword() {
  const { autoFocus } = useAutoFocus();

  const [mail, setMail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(mail);
  };

  const onChangeMail = (event) => {
    setMail(event.target.value);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-gradient h-100 p-3">
      <img className="mb-sm-5 mb-3" src={logo} height="75" alt="logo"></img>
      <Card className="card-form rounded-lg w-100">
        <Card.Body className="p-4">
          <h3 className="text-center mb-4">Mot de passe oublié</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Adresse email</Form.Label>
              <Form.Control
                onChange={onChangeMail}
                type="email"
                placeholder="Saisissez votre adresse email"
                autoFocus={autoFocus}
              />
            </Form.Group>

            <Button
              className="btn-block mt-4"
              variant="primary"
              type="submit"
              disabled
            >
              Réinitialiser le mot de passe
            </Button>

            <div className="d-flex justify-content-center align-items-center mt-3">
              <Link to="/signin">Se connecter</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="whitespace mt-sm-5 mt-3"></div>
    </div>
  );
}

export default ForgottenPassword;
