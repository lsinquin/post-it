import { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { ConfigContext } from "../App";
import MailInput from "../components/MailInput";
import PasswordInput from "../components/PasswordInput";
import { signUp } from "../postItAPI";

const SignUpForm = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  // a timeoutId of 0 means no error occured
  const [timeoutId, setTimeoutId] = useState(0);

  const history = useHistory();

  const { errMessageDuration } = useContext(ConfigContext);

  useEffect(() => {
    if (timeoutId) {
      return () => clearTimeout(timeoutId);
    }
  }, [timeoutId]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const result = await signUp(mail, password);

      history.push("/signin");
      console.log(result);
    } catch (error) {
      const newTimeoutId = setTimeout(() => {
        setTimeoutId(0);
      }, errMessageDuration);

      setTimeoutId(newTimeoutId);
    }
  };

  const onChangeMail = (event) => {
    setMail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="container">
      <form className="form-connection" onSubmit={handleSubmit}>
        <MailInput onChange={onChangeMail} />
        <PasswordInput onChange={onChangePassword} />
        <div className="form-links-container">
          <Link to="/signin">J'ai déjà un compte</Link>
        </div>

        <button className="form-button">Sign Up</button>
        <label
          style={{ visibility: timeoutId ? "visible" : "hidden" }}
          className="error-message"
        >
          Impossible de créer un compte
        </label>
      </form>
    </div>
  );
};

export default SignUpForm;
