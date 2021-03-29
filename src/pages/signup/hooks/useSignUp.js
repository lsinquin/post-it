import { useState, useReducer } from "react";
import { postNewUser } from "../../../services/postItAPIService";
import requestDataReducer from "../../../reducers/requestDataReducer";

function useSignUp() {
  const [accountCreated, setAccountCreated] = useState(false);
  const [{ isRequesting, errorId, errorMessage }, dispatch] = useReducer(
    requestDataReducer,
    {
      isRequesting: false,
      errorId: null,
      errorMessage: "",
    }
  );

  const signUp = async (mail, password) => {
    try {
      setAccountCreated(false);
      dispatch({ type: "REQUEST_START" });

      await postNewUser(mail, password);

      dispatch({ type: "REQUEST_SUCCESS" });
      setAccountCreated(true);
    } catch (error) {
      dispatch({ type: "REQUEST_FAILURE", payload: error });
    }
  };

  return {
    isRequesting,
    accountCreated,
    errorId,
    errorMessage,
    signUp,
    setAccountCreated,
  };
}

export default useSignUp;
