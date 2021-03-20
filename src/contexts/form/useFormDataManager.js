import { useState } from "react";
import APIError from "../../utils/APIError";
import { login, postAccount } from "../../utils/postItAPIWrapper";
import { useAuthContext } from "../auth/AuthContext";

function useFormDataManager() {
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [accountCreated, setAccountCreated] = useState(false);

  const { setAuthToken } = useAuthContext();

  const signIn = (mail, password) => {
    (async function () {
      try {
        setIsRequesting(true);

        const {
          data: { token },
        } = await login(mail, password);

        setAuthToken(token);
        setIsRequesting(false);
      } catch (error) {
        if (error instanceof APIError) {
          setError(error.errorId);
          setErrorMessage(error.message);
        }
        // } else {
        //   setError("err_unknown");
        //   setErrorMessage("Une erreur inattendue s'est produite");
        // }

        setIsRequesting(false);
      }
    })();
  };

  const signUp = (mail, password) => {
    (async function () {
      try {
        setIsRequesting(true);

        await postAccount(mail, password);

        setAccountCreated(true);
        setIsRequesting(false);
      } catch (error) {
        if (error instanceof APIError) {
          setError(error.errorId);
          setErrorMessage(error.message);
        }
        // } else {
        //   setError("err_unknown");
        //   setErrorMessage("Error inattendue");
        // }

        setIsRequesting(false);
      }
    })();
  };

  return {
    isRequesting,
    error,
    errorMessage,
    accountCreated,
    setAccountCreated,
    signIn,
    signUp,
  };
}

export default useFormDataManager;
