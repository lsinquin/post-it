import { useState, useReducer, useEffect } from "react";
import {
  getNotes,
  postNewNote,
  putNote,
  deleteNote,
} from "../../../../services/postItAPIService";
import notesReducer from "./notesReducer";
import { useAuthContext } from "../../../../contexts/auth/AuthContext";
import backgroundRequestDataReducer from "./backgroundRequestDataReducer";

// const displayValues = ["loading", "displaying", "adding", "editing"];

function useNotesDataManager() {
  const { authToken } = useAuthContext();
  const [displayStatus, setDisplayStatus] = useState("loading");
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
        setDisplayStatus("displaying");
      } catch (error) {
        console.log(error);

        setDisplayStatus("displaying");
        dispatchRequest({ type: "REQUEST_CRITICAL_FAILURE" });
      }
    })();
  }, [authToken]);

  const addNote = async (title, content) => {
    try {
      dispatchRequest({ type: "REQUEST_START" });

      const { data: note } = await postNewNote(title, content, authToken);

      dispatchNotes({ type: "ADD_NOTE", payload: note });
      dispatchRequest({ type: "REQUEST_SUCCESS" });
      setDisplayStatus("displaying");
    } catch (error) {
      console.log(error);

      dispatchRequest({ type: "REQUEST_CRITICAL_FAILURE" });
    }
  };

  const modifyNote = async (noteId, title, content) => {
    try {
      dispatchRequest({ type: "REQUEST_START" });

      const { data: modifiedNote } = await putNote(
        noteId,
        title,
        content,
        authToken
      );

      dispatchNotes({
        type: "MODIFY_NOTE",
        payload: modifiedNote,
      });
      dispatchRequest({ type: "REQUEST_SUCCESS" });
      setDisplayStatus("displaying");
    } catch (error) {
      console.log(error);

      dispatchRequest({ type: "REQUEST_CRITICAL_FAILURE" });
    }
  };

  const removeNote = async (noteId, inBackground = false) => {
    try {
      dispatchRequest({ type: "REQUEST_START" });

      await deleteNote(noteId, authToken);

      dispatchNotes({ type: "REMOVE_NOTE", payload: { id: noteId } });
      dispatchRequest({ type: "REQUEST_SUCCESS" });

      if (!inBackground) {
        setDisplayStatus("displaying");
      }
    } catch (error) {
      console.log(error);

      dispatchRequest({ type: "REQUEST_CRITICAL_FAILURE" });
    }
  };

  const startCreateNote = () => {
    setDisplayStatus("adding");
  };

  const cancelCreateNote = () => {
    setDisplayStatus("displaying");
  };

  const selectNote = (noteId) => {
    const note = notes.find((e) => e.id === noteId);

    setDisplayStatus("editing");
    setSelectedNote(note);
  };

  return {
    displayStatus,
    notes,
    isConsistent,
    requestCounter,
    selectedNote,
    addNote,
    modifyNote,
    removeNote,
    startCreateNote,
    cancelCreateNote,
    selectNote,
  };
}

export default useNotesDataManager;
