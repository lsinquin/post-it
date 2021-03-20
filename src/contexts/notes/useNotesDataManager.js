import { useState, useEffect } from "react";
import {
  getNotes,
  postNewNote,
  modifyNote,
  deleteNote,
} from "../../utils/postItAPIWrapper";

function useNotesDataManager() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  const [requestCounter, setRequestCounter] = useState(0);

  const incrementCounter = (prevValue) => prevValue + 1;
  const decrementCounter = (prevValue) => prevValue - 1;

  useEffect(() => {
    (async function () {
      try {
        const { data: notes } = await getNotes();

        setNotes(notes);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setHasErrored(true);
      }
    })();
  }, []); // ???

  const addNote = (title, content) => {
    (async function () {
      try {
        setRequestCounter(incrementCounter);

        const { data: note } = await postNewNote(title, content);

        setNotes([
          ...notes,
          { id: note.id, title: note.title, content: note.content },
        ]);

        setRequestCounter(decrementCounter);
      } catch (error) {
        console.log(error);
        setHasErrored(true);
      }
    })();
  };

  const updateNote = (noteRec) => {
    (async function () {
      try {
        setRequestCounter(incrementCounter);

        const newNotes = notes.map((item, index) => {
          if (item.id === noteRec.id) {
            return noteRec;
          }
          return item;
        });

        setNotes(newNotes);

        await modifyNote(noteRec.id, noteRec.title, noteRec.content);

        setRequestCounter(decrementCounter);
      } catch (error) {
        console.log(error);
        setHasErrored(true);
      }
    })();
  };

  const removeNote = (noteRec) => {
    (async function () {
      try {
        setRequestCounter(incrementCounter);

        const newNotes = notes.filter((item, _) => item.id !== noteRec.id);
        setNotes(newNotes);

        await deleteNote(noteRec.id);

        setRequestCounter(decrementCounter);
      } catch (error) {
        console.log(error);
        setHasErrored(true);
      }
    })();
  };

  return {
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
}

export default useNotesDataManager;
