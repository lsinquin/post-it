import Card from "@material-ui/core/Card";
import { useNotesContext } from "../contexts/notes/NotesContext";

const Note = (props) => {
  const { setSelectedNote } = useNotesContext();
  const handleClick = (event) => {
    setSelectedNote(props.note);
  };

  return (
    //elevation 3
    <Card variant="outlined" onClick={handleClick} className="note-paper">
      <label className="note-title">{props.note.title || "Placeholder"}</label>
      <p className="note-content">{props.note.content || "Placeholder"}</p>
    </Card>
  );
};

export default Note;
