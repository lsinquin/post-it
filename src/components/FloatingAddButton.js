import { FaPlusCircle } from "react-icons/fa";
import { useNotesContext } from "../contexts/notes/NotesContext";

const FloatingAddButton = () => {
  const { addNote } = useNotesContext();

  const handleAddNote = () => {
    addNote();
  };

  return (
    <FaPlusCircle
      className="add-floating-button"
      size={64}
      onClick={handleAddNote}
    />
  );
};

export default FloatingAddButton;
