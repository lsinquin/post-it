import { useState, useReducer, useEffect } from "react";
import {
  getNotes,
  postNewNote,
  modifyNote,
  deleteNote,
} from "../../../../services/postItAPIService";
import notesReducer from "./notesReducer";
import { useAuthContext } from "../../../../contexts/auth/AuthContext";
import backgroundRequestDataReducer from "./backgroundRequestDataReducer";

function useNotesDataManager() {
  const { authToken } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [notes, dispatchNotes] = useReducer(notesReducer, []);
  const [{ isConsistent, requestCounter }, dispatchRequest] = useReducer(
    backgroundRequestDataReducer,
    {
      requestCounter: 0,
      isConsistent: true,
    }
  );

  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const { data: notes } = await getNotes(authToken);

        dispatchNotes({ type: "SET_NOTES", payload: notes });
        setIsLoading(false);
      } catch (error) {
        console.log(error);

        setIsLoading(false);
        dispatchRequest({ type: "REQUEST_CRITICAL_FAILURE" });
      }
    })();
  }, [authToken]);

  const addNote = async () => {
    try {
      dispatchRequest({ type: "REQUEST_START" });

      const { data: note } = await postNewNote("", "", authToken);

      dispatchNotes({ type: "ADD_NOTE", payload: note });

      dispatchRequest({ type: "REQUEST_SUCCESS" });
    } catch (error) {
      console.log(error);

      dispatchRequest({ type: "REQUEST_CRITICAL_FAILURE" });
    }
  };

  const updateNote = async (noteId, title, content) => {
    try {
      dispatchRequest({ type: "REQUEST_START" });

      dispatchNotes({
        type: "MODIFY_NOTE",
        payload: { id: noteId, title, content },
      });

      await modifyNote(noteId, title, content, authToken);

      dispatchRequest({ type: "REQUEST_SUCCESS" });
    } catch (error) {
      console.log(error);

      dispatchRequest({ type: "REQUEST_CRITICAL_FAILURE" });
    }
  };

  const removeNote = async (noteId) => {
    try {
      dispatchRequest({ type: "REQUEST_START" });

      dispatchNotes({ type: "REMOVE_NOTE", payload: { id: noteId } });

      await deleteNote(noteId, authToken);

      dispatchRequest({ type: "REQUEST_SUCCESS" });
    } catch (error) {
      console.log(error);

      dispatchRequest({ type: "REQUEST_CRITICAL_FAILURE" });
    }
  };

  const selectNote = (noteId) => {
    const note = notes.find((e) => e.id === noteId);

    setSelectedNote(note);
  };

  const unselectNote = () => setSelectedNote(null);

  return {
    isLoading,
    notes,
    isConsistent,
    requestCounter,
    selectedNote,
    addNote,
    updateNote,
    removeNote,
    selectNote,
    unselectNote,
  };
}

export default useNotesDataManager;
