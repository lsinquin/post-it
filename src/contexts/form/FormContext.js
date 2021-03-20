import { createContext, useContext } from "react";
import useFormDataManager from "./useFormDataManager";

const FormContext = createContext();

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const {
    isRequesting,
    error,
    errorMessage,
    accountCreated,
    setAccountCreated,
    signIn,
    signUp,
  } = useFormDataManager();

  const provider = {
    isRequesting,
    error,
    errorMessage,
    accountCreated,
    setAccountCreated,
    signIn,
    signUp,
  };

  return (
    <FormContext.Provider value={provider}>{children}</FormContext.Provider>
  );
};
