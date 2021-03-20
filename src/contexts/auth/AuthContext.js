import { createContext, useContext } from "react";
import useAuthDataManager from "./useAuthDataManager";

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { authToken, setAuthToken, logOut } = useAuthDataManager();

  const provider = {
    authToken,
    setAuthToken,
    logOut,
  };

  return (
    <AuthContext.Provider value={provider}>{children}</AuthContext.Provider>
  );
};
