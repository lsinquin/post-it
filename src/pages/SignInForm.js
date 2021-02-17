import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";

import Alert from "../components/Alert";
import { ConfigContext } from "../App";
import { useUserContext } from "../contexts/user/UserContext";
import { login } from "../utils/postItAPIWrapper";

const SignInForm = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const { errMessageDuration } = useContext(ConfigContext);
  const { setUserName, setAuthToken } = useUserContext();

  const hasFailed = errorMessage !== "";

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
      setErrorMessage(error.message);
    }
  };

  const onChangeMail = (event) => {
    setMail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleCloseErrorMsg = () => {
    setErrorMessage("");
  };

  return (
    <div className="container">
      <Paper elevation={6} className="paper-form">
        <form className="form-connection" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            className="input-form"
            onChange={onChangeMail}
            label="Adresse mail"
            variant="filled"
          />
          <TextField
            type="password"
            margin="normal"
            className="input-form"
            onChange={onChangePassword}
            label="Mot de passe"
            variant="filled"
          />
          <div className="form-links-container">
            <Link to="/signup">Créer un compte</Link>
            <Link to="/forgottenpassword">Mot de passe oublié</Link>
          </div>
          <Box mt={1} mb={2}>
            <Button
              fullWidth
              type="submit"
              margin="normal"
              variant="contained"
              color="primary"
            >
              Connexion
            </Button>
          </Box>

          <Snackbar
            open={hasFailed}
            autoHideDuration={errMessageDuration}
            onClose={handleCloseErrorMsg}
          >
            <Alert onClose={handleCloseErrorMsg} severity="error">
              {errorMessage}
            </Alert>
          </Snackbar>
        </form>
      </Paper>
    </div>
  );
};

export default SignInForm;
