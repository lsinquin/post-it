import { createContext, useContext } from "react";
import useUserDataManager from "./useUserDataManager";

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const {
    userName,
    authToken,
    setUserName,
    setAuthToken,
    logOut,
  } = useUserDataManager();

  const provider = {
    userName,
    authToken,
    setUserName,
    setAuthToken,
    logOut,
  };

  return (
    <UserContext.Provider value={provider}>{children}</UserContext.Provider>
  );
};
