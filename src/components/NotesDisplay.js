import Note from "./Note";

const NotesDisplay = (props) => {
  return (
    <div className="notes-display">
      {props.notes.map((note) => {
        return <Note key={note.id} note={note} />;
      })}
    </div>
  );
};

export default NotesDisplay;
