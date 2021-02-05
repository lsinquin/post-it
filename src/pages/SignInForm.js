import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";

import Alert from "../components/Alert";
import { ConfigContext } from "../App";
import { login } from "../postItAPI";

const SignInForm = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  const { errMessageDuration } = useContext(ConfigContext);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const result = await login(mail, password);

      history.push("/home");
      console.log(result);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const onChangeMail = (event) => {
    setMail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleCloseErrorMsg = () => {
    setError(false);
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
          <Button type="submit" variant="contained" color="primary">
            Connexion
          </Button>
          <Snackbar
            open={error}
            autoHideDuration={errMessageDuration}
            onClose={handleCloseErrorMsg}
          >
            <Alert onClose={handleCloseErrorMsg} severity="error">
              Identifiants Incorrect
            </Alert>
          </Snackbar>
        </form>
      </Paper>
    </div>
  );
};

export default SignInForm;
