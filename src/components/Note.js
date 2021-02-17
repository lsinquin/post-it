import Paper from "@material-ui/core/Paper";
import { useNotesContext } from "../contexts/notes/NotesContext";

const Note = (props) => {
  const { setSelectedNote } = useNotesContext();
  const handleClick = (event) => {
    setSelectedNote(props.note);
  };

  return (
    <Paper onClick={handleClick} className="note-paper" elevation={3}>
      <label className="note-title">{props.note.title || "Placeholder"}</label>
      <label className="note-content">
        {props.note.content || "Placeholder"}
      </label>
    </Paper>
  );
};

export default Note;
