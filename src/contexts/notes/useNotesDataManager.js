import { useState, useReducer, useEffect } from "react";
import {
  getNotes,
  postNewNote,
  modifyNote,
  deleteNote,
} from "../../utils/postItAPIWrapper";
import notesReducer from "../../reducers/notesReducer";
import { useAuthContext } from "../auth/AuthContext";
import backgroundRequestDataReducer from "../../reducers/backgroundRequestDataReducer";

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

  const updateNote = async (noteRec) => {
    try {
      dispatchRequest({ type: "REQUEST_START" });

      dispatchNotes({ type: "MODIFY_NOTE", payload: noteRec });

      await modifyNote(noteRec.id, noteRec.title, noteRec.content, authToken);

      dispatchRequest({ type: "REQUEST_SUCCESS" });
    } catch (error) {
      console.log(error);

      dispatchRequest({ type: "REQUEST_CRITICAL_FAILURE" });
    }
  };

  const removeNote = async (noteRec) => {
    try {
      dispatchRequest({ type: "REQUEST_START" });

      dispatchNotes({ type: "REMOVE_NOTE", payload: { id: noteRec.id } });

      await deleteNote(noteRec.id, authToken);

      dispatchRequest({ type: "REQUEST_SUCCESS" });
    } catch (error) {
      console.log(error);

      dispatchRequest({ type: "REQUEST_CRITICAL_FAILURE" });
    }
  };

  return {
    isLoading,
    notes,
    isConsistent,
    requestCounter,
    selectedNote,
    addNote,
    updateNote,
    removeNote,
    setSelectedNote,
  };
}

export default useNotesDataManager;
