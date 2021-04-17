import { useState } from "react";
import Card from "react-bootstrap/Card";
import { FaTrash } from "react-icons/fa";
import { useNotesContext } from "../contexts/notes/NotesContext";

function Note({ note }) {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const { selectNote, removeNote } = useNotesContext();

  const handleClick = (event) => {
    selectNote(note.id);
  };

  const handleDelete = (event) => {
    event.stopPropagation();

    removeNote(note.id, true);
  };

  const handleShowFloatingButton = () => setShowDeleteButton(true);
  const handleUnshowFloatingButton = () => setShowDeleteButton(false);

  return (
    <Card
      className="note w-100 mb-3 mb-xl-4"
      onClick={handleClick}
      onMouseEnter={handleShowFloatingButton}
      onMouseLeave={handleUnshowFloatingButton}
    >
      <Card.Body className="p-2">
        {showDeleteButton ? (
          <FaTrash
            onClick={handleDelete}
            className="delete-button float-right text-danger"
            size={16}
          />
        ) : null}
        <Card.Title className="text-truncate mb-1">
          {note.title || ""}
        </Card.Title>
        <Card.Text className="note-content text-multi-wrap">
          {note.content || ""}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Note;
