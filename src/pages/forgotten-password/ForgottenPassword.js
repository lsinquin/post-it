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
    <div className="form-page d-flex flex-column justify-content-center align-items-center p-3">
      <img
        className="mt-2 mb-3 mb-sm-5"
        src={logo}
        height="75"
        alt="logo"
      ></img>
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
      <div className="whitespace mb-2 mt-3 mt-sm-5"></div>
    </div>
  );
}

export default ForgottenPassword;
