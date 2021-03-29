import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { FaTrash, FaCheck } from "react-icons/fa";
import { useNotesContext } from "../contexts/notes/NotesContext";

function EditNoteModal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {
    selectedNote,
    unselectNote,
    modifyNote,
    removeNote,
  } = useNotesContext();

  const show = !!selectedNote;

  const initFields = () => {
    setTitle(selectedNote.title);
    setContent(selectedNote.content);
  };

  const cleanFields = () => {
    setTitle("");
    setContent("");
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleModify();
  };

  const handleModify = () => {
    modifyNote(selectedNote.id, title, content);
    unselectNote();
  };

  const handleDelete = () => {
    removeNote(selectedNote.id);
    unselectNote();
  };

  return (
    <Modal
      show={show}
      onEnter={initFields}
      onExited={cleanFields}
      onHide={handleModify}
    >
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Control type="text" onChange={onChangeTitle} value={title} />
          </Form.Group>
          <Form.Group controlId="formContent">
            <Form.Control
              as="textarea"
              value={content}
              onChange={onChangeContent}
              rows={15}
            />
          </Form.Group>

          <Container>
            <Row className="justify-content-end align-items-center">
              <Button className="mr-2" onClick={handleDelete} variant="danger">
                <FaTrash size={20} />
              </Button>
              <Button variant="primary" type="submit">
                <FaCheck size={20} />
              </Button>
            </Row>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditNoteModal;
