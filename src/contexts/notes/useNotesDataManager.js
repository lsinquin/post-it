import { useState, useEffect } from "react";
import {
  getNotes,
  postNewNote,
  modifyNote,
  deleteNote,
} from "../../utils/postItAPIWrapper";
function useNotesDataManager() {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      console.log("fetching");

      const { data: notes } = await getNotes();

      setNotes(notes);
      setIsLoading(false);
    };

    fetchNotes();
  }, []);

  // const deleteNotes = () => {
  //   setNotes([]);
  // };

  const addNote = (title, content) => {
    const postNote = async function () {
      setIsLoading(true);
      const { data: note } = await postNewNote(title, content);

      setNotes([
        ...notes,
        { id: note.id, title: note.title, content: note.content },
      ]);
      setIsLoading(false);
    };

    postNote();
  };

  const updateNote = (noteRec) => {
    const putNote = async function () {
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
    };

    putNote();
  };

  const removeNote = (noteRec) => {
    console.log(noteRec);
    const asyncRemoveNote = async function () {
      setIsLoading(true);
      await deleteNote(noteRec.id);

      const newNotes = notes.filter((item, index) => item.id !== noteRec.id);

      setNotes(newNotes);
      setIsLoading(false);
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
