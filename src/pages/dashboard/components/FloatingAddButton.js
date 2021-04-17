import { FaPlusCircle } from "react-icons/fa";
import { useNotesContext } from "../contexts/notes/NotesContext";

function FloatingAddButton() {
  const { startCreateNote } = useNotesContext();

  const handleAddNote = () => {
    startCreateNote();
  };

  return (
    <FaPlusCircle
      className="floating-add-button bg-white"
      size={64}
      onClick={handleAddNote}
    />
  );
}

export default FloatingAddButton;
