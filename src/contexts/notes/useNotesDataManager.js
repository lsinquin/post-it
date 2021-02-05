import { useState, useEffect } from "react";
import { getNotes } from "../../postItAPI";

function useNotesDataManager() {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      console.log("fetching");
      const notes = await getNotes();
      setNotes(notes);
      setIsLoading(false);
    };

    fetchNotes();
  }, []);

  const deleteNotes = () => {
    setNotes([]);
  };

  const addNote = () => {
    setNotes([
      ...notes,
      { id: notes.length + 1, title: "created Note", content: "" },
    ]);
  };

  return {
    isLoading,
    notes,
    deleteNotes,
    addNote,
  };
}

export default useNotesDataManager;
