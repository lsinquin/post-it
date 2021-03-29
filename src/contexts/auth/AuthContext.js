import { createContext, useContext } from "react";
import useAuthDataManager from "./useAuthDataManager";

const AuthContext = createContext();

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
}

function AuthProvider({ children }) {
  const {
    isLoggedIn,
    userMail,
    userId,
    authToken,
    expiresAt,
    setAuthData,
    logOut,
  } = useAuthDataManager();

  const provider = {
    isLoggedIn,
    userMail,
    userId,
    authToken,
    expiresAt,
    setAuthData,
    logOut,
  };

  return (
    <AuthContext.Provider value={provider}>{children}</AuthContext.Provider>
  );
}

export { useAuthContext, AuthProvider };
