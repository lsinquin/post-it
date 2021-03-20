import { createContext, useContext } from "react";
import useNotesDataManager from "./useNotesDataManager";

const NotesContext = createContext();

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (context === null) {
    throw new Error("useNotesContext must be used within a NotesProvider");
  }
  return context;
};

export const NotesProvider = ({ children }) => {
  const {
    notes,
    selectedNote,
    isLoading,
    hasErrored,
    requestCounter,
    addNote,
    updateNote,
    removeNote,
    setSelectedNote,
  } = useNotesDataManager();

  const provider = {
    notes,
    selectedNote,
    isLoading,
    hasErrored,
    requestCounter,
    addNote,
    updateNote,
    removeNote,
    setSelectedNote,
  };

  return (
    <NotesContext.Provider value={provider}>{children}</NotesContext.Provider>
  );
};
