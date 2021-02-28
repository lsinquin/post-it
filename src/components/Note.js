import { useState } from "react";
import Card from "react-bootstrap/Card";
import { FaTrash } from "react-icons/fa";
import { useNotesContext } from "../contexts/notes/NotesContext";

const Note = (props) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const { setSelectedNote, removeNote } = useNotesContext();
  const handleClick = (event) => {
    setSelectedNote(props.note);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    console.log("deleting...");
    removeNote(props.note);
  };

  const handleShowFloatingButton = () => setShowDeleteButton(true);
  const handleUnshowFloatingButton = () => setShowDeleteButton(false);

  return (
    <Card
      className="note w-100"
      onClick={handleClick}
      onMouseEnter={handleShowFloatingButton}
      onMouseLeave={handleUnshowFloatingButton}
    >
      <Card.Body>
        {showDeleteButton ? (
          <FaTrash
            onClick={handleDelete}
            className="float-right text-danger"
            size={16}
          />
        ) : null}
        <Card.Title className="text-truncate">
          {props.note.title || ""}
        </Card.Title>
        <Card.Text className="note-content text-multi-wrap">
          {props.note.content || ""}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Note;
