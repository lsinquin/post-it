import { useReducer } from "react";
import { login } from "../utils/postItAPIWrapper";
import { useAuthContext } from "../contexts/auth/AuthContext";
import requestDataReducer from "../reducers/requestDataReducer";

function useSignIn() {
  const { authToken, setAuthToken } = useAuthContext();

  const [{ isRequesting, errorId, errorMessage }, dispatch] = useReducer(
    requestDataReducer,
    {
      isRequesting: false,
      errorId: null,
      errorMessage: "",
    }
  );

  const isLoggedIn = !!authToken;

  const signIn = async (mail, password) => {
    try {
      dispatch({ type: "REQUEST_START" });

      const {
        data: { token },
      } = await login(mail, password);

      dispatch({ type: "REQUEST_SUCCESS" });
      setAuthToken(token);
    } catch (error) {
      dispatch({ type: "REQUEST_FAILURE", payload: error });
    }
  };

  return {
    isLoggedIn,
    isRequesting,
    errorId,
    errorMessage,
    signIn,
  };
}

export default useSignIn;
