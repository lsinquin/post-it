import Note from "./Note";

const NotesDisplay = (props) => {
  return (
    <div className="notes-display">
      {props.notes.map((note) => (
        <Note key={note.id} title={note.title} />
      ))}
    </div>
  );
};

export default NotesDisplay;
