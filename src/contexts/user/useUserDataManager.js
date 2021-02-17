import { useState, useEffect } from "react";

function useUserDataManager() {
  const retrieveInitUserName = () => localStorage.getItem("userName") || null;
  const retrieveInitAuthToken = () => localStorage.getItem("authToken") || null;

  const [userName, setUserName] = useState(retrieveInitUserName);
  const [authToken, setAuthToken] = useState(retrieveInitAuthToken);

  // Persist userName to local storage
  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    } else {
      localStorage.removeItem("userName");
    }
  }, [userName]);

  // Persist authToken to local storage
  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  return {
    userName,
    authToken,
    setUserName,
    setAuthToken,
  };
}

export default useUserDataManager;
