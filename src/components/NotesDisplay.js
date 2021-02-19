import Note from "./Note";
import { useNotesContext } from "../contexts/notes/NotesContext";

const NotesDisplay = () => {
  const { notes } = useNotesContext();
  return (
    <div className="notes-display">
      {notes.map((note) => {
        return <Note key={note.id} note={note} />;
      })}
    </div>
  );
};

export default NotesDisplay;
