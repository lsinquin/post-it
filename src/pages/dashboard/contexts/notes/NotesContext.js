import { createContext, useContext } from "react";
import useNotesDataManager from "./useNotesDataManager";

const NotesContext = createContext();

function useNotesContext() {
  const context = useContext(NotesContext);
  if (context === null) {
    throw new Error("useNotesContext must be used within a NotesProvider");
  }
  return context;
}

function NotesProvider({ children }) {
  const {
    isLoading,
    notes,
    isConsistent,
    requestCounter,
    selectedNote,
    addNote,
    modifyNote,
    removeNote,
    selectNote,
    unselectNote,
  } = useNotesDataManager();

  const provider = {
    isLoading,
    notes,
    isConsistent,
    requestCounter,
    selectedNote,
    addNote,
    modifyNote,
    removeNote,
    selectNote,
    unselectNote,
  };

  return (
    <NotesContext.Provider value={provider}>{children}</NotesContext.Provider>
  );
}

export { useNotesContext, NotesProvider };
