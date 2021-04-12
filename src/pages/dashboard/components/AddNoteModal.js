import { useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FaBan, FaCheck } from "react-icons/fa";
import { useNotesContext } from "../contexts/notes/NotesContext";
import useAutoFocus from "../../../hooks/useAutoFocus";

function AddNoteModal() {
  const isBigScreen = useMediaQuery({
    query: "(min-device-width: 992px)",
  });

  const { displayStatus, addNote, cancelCreateNote } = useNotesContext();

  const { autoFocus } = useAutoFocus();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const titleInputRef = useRef(null);

  const show = displayStatus === "adding";

  const autoFocusTitleField = () => {
    if (autoFocus) {
      titleInputRef.current.focus();
    }
  };

  const cleanFields = () => {
    setTitle("");
    setContent("");
    setIsAdding(false);
  };

  const onChangeTitle = (event) => setTitle(event.target.value);

  const onChangeContent = (event) => setContent(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsAdding(true);
    handleAdd();
  };

  const handleAdd = () => addNote(title, content);

  const handleCancel = () => cancelCreateNote();

  return (
    <Modal
      show={show}
      onEnter={autoFocusTitleField}
      onHide={handleCancel}
      onExited={cleanFields}
      centered={!isBigScreen}
    >
      <Modal.Body>
        <h2 className="text-center mb-4">Nouvelle note</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Titre</Form.Label>
            <Form.Control
              type="text"
              onChange={onChangeTitle}
              value={title}
              ref={titleInputRef}
            />
          </Form.Group>
          <Form.Group controlId="formContent">
            <Form.Label>Contenu</Form.Label>
            <Form.Control
              as="textarea"
              value={content}
              onChange={onChangeContent}
              rows={isBigScreen ? 15 : 8}
            />
          </Form.Group>

          <Container>
            <Row className="justify-content-end align-items-center">
              <Button className="mr-2" onClick={handleCancel} variant="danger">
                <FaBan size={20} />
              </Button>
              <Button variant="primary" type="submit">
                {isAdding ? (
                  <Spinner as="span" size="sm" animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                ) : (
                  <FaCheck size={20} />
                )}
              </Button>
            </Row>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddNoteModal;
