import { FaPlusCircle } from "react-icons/fa";
import { useNotesContext } from "../contexts/notes/NotesContext";

function FloatingAddButton() {
  const { addNote } = useNotesContext();

  const handleAddNote = () => {
    addNote();
  };

  return (
    <FaPlusCircle
      className="floating-add-button"
      size={64}
      onClick={handleAddNote}
    />
  );
}

export default FloatingAddButton;
