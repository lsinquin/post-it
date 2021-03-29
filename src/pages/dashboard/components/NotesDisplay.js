import Note from "./Note";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNotesContext } from "../contexts/notes/NotesContext";

const NotesDisplay = () => {
  const { notes } = useNotesContext();

  return (
    // <CardColumns className="mt-2 ml-2 h-100">
    //   {notes.map((note) => {
    //     return <Note key={note.id} note={note} />;
    //   })}
    // </CardColumns>$
    <Container fluid className="mt-3">
      <Row>
        {notes.map((note) => {
          return (
            <Col key={note.id} className="mb-3" md={6} lg={3} xl={2}>
              <Note note={note} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default NotesDisplay;
