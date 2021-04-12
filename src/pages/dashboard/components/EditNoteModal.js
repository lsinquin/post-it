import { useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaTrash, FaCheck } from "react-icons/fa";
import { useNotesContext } from "../contexts/notes/NotesContext";
import useAutoFocus from "../../../hooks/useAutoFocus";

function EditNoteModal() {
  const {
    displayStatus,
    selectedNote,
    unselectNote,
    modifyNote,
    removeNote,
  } = useNotesContext();

  const { autoFocus } = useAutoFocus();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isBigScreen = useMediaQuery({
    query: "(min-device-width: 992px)",
  });

  const titleInputRef = useRef(null);

  const show = displayStatus === "modifying";

  const initFields = () => {
    setTitle(selectedNote.title);
    setContent(selectedNote.content);

    // Focusing on title input field
    if (autoFocus && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  };

  const cleanFields = () => {
    setTitle("");
    setContent("");
  };

  const onChangeTitle = (event) => setTitle(event.target.value);

  const onChangeContent = (event) => setContent(event.target.value);

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
      onHide={handleModify}
      onExited={cleanFields}
      centered={!isBigScreen}
    >
      <Modal.Body>
        <h2 className="text-center mb-4">Modification</h2>
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
              rows={isBigScreen ? 15 : 10}
            />
          </Form.Group>

          <div className="d-flex justify-content-end align-items-center">
            <Button className="mr-2" onClick={handleDelete} variant="danger">
              <FaTrash size={20} />
            </Button>
            <Button variant="primary" type="submit">
              <FaCheck size={20} />
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditNoteModal;
