import { useState, useEffect } from "react";

function useAuthDataManager() {
  // const retrieveInitMail = () => localStorage.getItem("mail") || null;
  // const retrieveInitUserId = () => localStorage.getItem("userId") || null;
  const retrieveInitAuthToken = () => localStorage.getItem("authToken") || null;

  // const [mail, setMail] = useState(retrieveInitMail);
  // const [userId, setUserId] = useState(retrieveInitUserId);
  const [authToken, setAuthToken] = useState(retrieveInitAuthToken);

  // useEffect(() => {
  //   if (mail) {
  //     localStorage.setItem("mail", mail);
  //   } else {
  //     localStorage.removeItem("mail");
  //   }
  // }, [mail]);

  // useEffect(() => {
  //   if (userId) {
  //     localStorage.setItem("userId", userId);
  //   } else {
  //     localStorage.removeItem("userId");
  //   }
  // }, [userId]);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  const logOut = () => {
    // setUserId(null);
    // setMail(null);
    setAuthToken(null);
  };

  return {
    // mail,
    // userId,
    authToken,
    // setMail,
    // setUserId,
    setAuthToken,
    logOut,
  };
}

export default useAuthDataManager;
