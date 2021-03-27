import { useReducer, useEffect } from "react";
import { decode } from "jsonwebtoken";
import { getCurrentTimeInSeconds } from "../../utils/currentTime";
import authDataReducer from "../../reducers/authDataReducer";

function useAuthDataManager() {
  //TODO ne stocker que le authToken ?
  const retrieveInitialState = () => {
    const userMail = localStorage.getItem("userMail");
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");
    const expiresAt = localStorage.getItem("expiresAt");

    if (userMail && userId && authToken && expiresAt) {
      return { isLoggedIn: true, userMail, userId, authToken, expiresAt };
    } else {
      return {
        isLoggedIn: false,
        userMail: null,
        userId: null,
        authToken: null,
        expiresAt: null,
      };
    }
  };

  const [
    { isLoggedIn, userMail, userId, authToken, expiresAt },
    dispatch,
  ] = useReducer(authDataReducer, null, retrieveInitialState);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("userMail", userMail);
      localStorage.setItem("userId", userId);
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("expiresAt", expiresAt);
    } else {
      localStorage.removeItem("userMail");
      localStorage.removeItem("userId");
      localStorage.removeItem("authToken");
      localStorage.removeItem("expiresAt");
    }
  }, [isLoggedIn, userMail, userId, authToken, expiresAt]);

  const setAuthData = (authToken) => {
    const { mail: userMail, userId, exp: expiresAt } = decode(authToken);

    dispatch({
      type: "SET_AUTH_DATA",
      payload: { userMail, userId, authToken, expiresAt },
    });
  };

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
  };

  // Disconnects if the token expired
  if (expiresAt && getCurrentTimeInSeconds() > expiresAt) {
    logOut();
  }

  return {
    isLoggedIn,
    userMail,
    userId,
    authToken,
    expiresAt,
    setAuthData,
    logOut,
  };
}

export default useAuthDataManager;
