import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";

import Alert from "../components/Alert";
import { ConfigContext } from "../App";

const ForgottenPassword = () => {
  const [mail, setMail] = useState("");
  const [hasError, setHasError] = useState(false);
  // const history = useHistory();

  const { errMessageDuration } = useContext(ConfigContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(mail);
    setHasError(true);
  };

  const onChangeMail = (event) => {
    setMail(event.target.value);
  };

  const handleCloseMsg = () => {
    setHasError(false);
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
          <div className="form-links-container">
            <Link to="/signin">Se connecter</Link>
          </div>
          <Box mt={1} mb={2}>
            <Button
              fullWidth
              type="submit"
              margin="normal"
              variant="contained"
              color="primary"
            >
              Réinitialiser mot de passe
            </Button>
          </Box>

          <Snackbar
            open={hasError}
            autoHideDuration={errMessageDuration}
            onClose={handleCloseMsg}
          >
            <Alert onClose={handleCloseMsg} severity="success">
              Mail Envoyé (pas encore)
            </Alert>
          </Snackbar>
        </form>
      </Paper>
    </div>
  );
};

export default ForgottenPassword;
