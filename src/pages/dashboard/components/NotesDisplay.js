import Note from "./Note";
import Masonry from "react-masonry-css";
import { useNotesContext } from "../contexts/notes/NotesContext";

function NotesDisplay() {
  const { notes } = useNotesContext();

  const breakpointCols = {
    default: 6,
    1100: 4,
    800: 3,
    600: 2,
  };

  return (
    <Masonry
      breakpointCols={breakpointCols}
      className="my-masonry-grid p-2"
      columnClassName="my-masonry-grid_column"
    >
      {notes.map((note) => {
        return <Note key={note.id} note={note} />;
      })}
    </Masonry>
  );
}

export default NotesDisplay;
