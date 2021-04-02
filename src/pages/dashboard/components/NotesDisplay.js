import Note from "./Note";
import Masonry from "react-masonry-css";
import { useNotesContext } from "../contexts/notes/NotesContext";

function NotesDisplay() {
  const { notes } = useNotesContext();

  const breakpointCols = {
    default: 6,
    1200: 5,
    992: 4,
    768: 3,
    576: 2,
  };

  return (
    <Masonry
      breakpointCols={breakpointCols}
      className="my-masonry-grid p-4 m-2"
      columnClassName="my-masonry-grid_column"
    >
      {notes.map((note) => {
        return <Note key={note.id} note={note} />;
      })}
    </Masonry>
  );
}

export default NotesDisplay;
