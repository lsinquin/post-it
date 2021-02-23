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
import { useUserContext } from "../contexts/user/UserContext";
import { login } from "../utils/postItAPIWrapper";

const SignInForm = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  // const { errMessageDuration } = useContext(ConfigContext);
  const { setUserName, setAuthToken } = useUserContext();

  // const hasFailed = errorMessage !== "";

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const {
        data: { token },
      } = await login(mail, password);

      setUserName("lsinquin51");
      setAuthToken(token);

      history.push("/dashboard");
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
            <h3 className="text-center mb-4">Connexion</h3>
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
                    <Col xs={12} lg={6} className="text-center">
                      <Link to="/signup">Créer un compte</Link>
                    </Col>
                    <Col xs={12} lg={6} className="text-center">
                      <Link to="/forgottenpassword">Mot de passe oublié</Link>
                    </Col>
                  </Row>
                </Container>
              </Form.Group>

              <Button className="btn-block" variant="primary" type="submit">
                Se connecter
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInForm;
