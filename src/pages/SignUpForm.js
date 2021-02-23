import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import logo from "../logo_cropped.png";
// import { ConfigContext } from "../App";
import { signUp } from "../utils/postItAPIWrapper";

const SignUpForm = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  // const { errMessageDuration } = useContext(ConfigContext);

  // const hasFailed = errorMessage !== "";

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      await signUp(mail, password);

      history.push("/signin");
    } catch (error) {
      console.log(error);
      // setErrorMessage(error.message);
    }
  };

  const onChangeMail = (event) => {
    setMail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  // const handleCloseErrorMsg = () => {
  //   setErrorMessage("");
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

              <Form.Group controlId="formLinks">
                <Container>
                  <Row>
                    <Col className="text-center">
                      <Link to="/signin">J'ai déjà un compte</Link>
                    </Col>
                  </Row>
                </Container>
              </Form.Group>

              <Button className="btn-block" variant="primary" type="submit">
                Créer un compte
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;