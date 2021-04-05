import { FaPlusCircle } from "react-icons/fa";
import { useNotesContext } from "../contexts/notes/NotesContext";

function FloatingAddButton() {
  const { createNoteModal } = useNotesContext();

  const handleAddNote = () => {
    createNoteModal();
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
