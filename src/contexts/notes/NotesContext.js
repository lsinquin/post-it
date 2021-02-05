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
  const { isLoading, notes, deleteNotes, addNote } = useNotesDataManager();

  const provider = {
    isLoading,
    notes,
    deleteNotes,
    addNote,
  };

  return (
    <NotesContext.Provider value={provider}>{children}</NotesContext.Provider>
  );
};
