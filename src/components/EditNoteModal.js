import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState, useEffect } from "react";
import { useNotesContext } from "../contexts/notes/NotesContext";

const EditNoteModal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {
    selectedNote,
    setSelectedNote,
    updateNote,
    removeNote,
  } = useNotesContext();

  const showModal = selectedNote !== null;

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const handleClose = () => {
    updateNote({ ...selectedNote, title, content });
    setSelectedNote(null);
  };

  const handleDelete = () => {
    removeNote(selectedNote);
    setSelectedNote(null);
  };

  return (
    <Modal open={showModal} onClose={handleClose}>
      <div className="modal-container">
        <input
          value={title}
          className="note-title hidden-input"
          onChange={onChangeTitle}
        />
        <textarea
          value={content}
          className="note-content hidden-textarea"
          onChange={onChangeContent}
        />
        {/* <label className="note-content"></label> */}
        <div className="modal-action-bar">
          <IconButton onClick={handleDelete} color="secondary">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleClose} color="primary">
            <CheckIcon />
          </IconButton>
        </div>
      </div>
    </Modal>
  );
};

export default EditNoteModal;
