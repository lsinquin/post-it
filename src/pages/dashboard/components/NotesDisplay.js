import Note from "./Note";
import Masonry from "react-masonry-css";
import Spinner from "react-bootstrap/Spinner";
import { useNotesContext } from "../contexts/notes/NotesContext";

function NotesDisplay() {
  const { displayStatus, notes } = useNotesContext();

  if (displayStatus === "loading") {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const breakpointCols = {
    default: 6,
    1500: 5,
    1250: 4,
    1000: 3,
    750: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointCols}
      className="my-masonry-grid p-3 p-xl-4"
      columnClassName="my-masonry-grid-column pl-3 pl-xl-4"
    >
      {notes.map((note) => {
        return <Note key={note.id} note={note} />;
      })}
    </Masonry>
  );
}

export default NotesDisplay;
