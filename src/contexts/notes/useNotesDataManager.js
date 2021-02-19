import { useState, useEffect } from "react";
import { useUserContext } from "../user/UserContext";
import {
  getNotes,
  postNewNote,
  modifyNote,
  deleteNote,
} from "../../utils/postItAPIWrapper";

function useNotesDataManager() {
  const { logOut } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    console.log("fetching notes...");
    const fetchNotes = async () => {
      try {
        console.log("fetching");

        const { data: notes } = await getNotes();

        setNotes(notes);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        logOut();
      }
    };

    fetchNotes();
  }, [logOut]); // ???

  const addNote = (title, content) => {
    const postNote = async function () {
      try {
        setIsLoading(true);
        const { data: note } = await postNewNote(title, content);

        setNotes([
          ...notes,
          { id: note.id, title: note.title, content: note.content },
        ]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        logOut();
      }
    };

    postNote();
  };

  const updateNote = (noteRec) => {
    const putNote = async function () {
      try {
        setIsLoading(true);
        const { data: note } = await modifyNote(
          noteRec.id,
          noteRec.title,
          noteRec.content
        );

        const newNotes = notes.map((item, index) => {
          if (item.id === note.id) {
            return note;
          }
          return item;
        });

        setNotes(newNotes);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        logOut();
      }
    };

    putNote();
  };

  const removeNote = (noteRec) => {
    const asyncRemoveNote = async function () {
      try {
        setIsLoading(true);
        await deleteNote(noteRec.id);

        const newNotes = notes.filter((item, index) => item.id !== noteRec.id);

        setNotes(newNotes);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        logOut();
      }
    };

    asyncRemoveNote();
  };

  return {
    isLoading,
    notes,
    selectedNote,
    addNote,
    updateNote,
    removeNote,
    setSelectedNote,
  };
}

export default useNotesDataManager;
