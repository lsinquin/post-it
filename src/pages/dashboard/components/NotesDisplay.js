import Note from "./Note";
import Masonry from "react-masonry-css";
import Spinner from "react-bootstrap/Spinner";
import { useNotesContext } from "../contexts/notes/NotesContext";

function NotesDisplay() {
  const { displayStatus, notes } = useNotesContext();

  if (displayStatus === "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

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
      columnClassName="my-masonry-grid-column"
    >
      {notes.map((note) => {
        return <Note key={note.id} note={note} />;
      })}
    </Masonry>
  );
}

export default NotesDisplay;
