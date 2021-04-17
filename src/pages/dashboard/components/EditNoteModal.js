import { useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FaTrash, FaCheck } from "react-icons/fa";
import { useNotesContext } from "../contexts/notes/NotesContext";
import useAutoFocus from "../../../hooks/useAutoFocus";

function EditNoteModal() {
  const isBigScreen = useMediaQuery({
    query: "(min-device-width: 768px)",
  });

  const {
    displayStatus,
    selectedNote,
    modifyNote,
    removeNote,
  } = useNotesContext();

  const { autoFocus } = useAutoFocus();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentAction, setCurrentAction] = useState(null);

  const titleInputRef = useRef(null);

  const show = displayStatus === "editing";

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
    setCurrentAction(null);
  };

  const onChangeTitle = (event) => setTitle(event.target.value);

  const onChangeContent = (event) => setContent(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    handleModify();
  };

  const handleModify = (event) => {
    setCurrentAction("modifying");
    modifyNote(selectedNote.id, title, content);
  };

  const handleDelete = (event) => {
    setCurrentAction("deleting");
    removeNote(selectedNote.id);
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
              {currentAction === "deleting" ? (
                <>
                  <Spinner
                    className="mr-1"
                    as="span"
                    size="sm"
                    animation="border"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                  En cours
                </>
              ) : (
                <>
                  <FaTrash className="mr-1" size={20} />
                  Supprimer
                </>
              )}
            </Button>
            <Button variant="primary" type="submit">
              {currentAction === "modifying" ? (
                <>
                  <Spinner
                    className="mr-1"
                    as="span"
                    size="sm"
                    animation="border"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                  En cours
                </>
              ) : (
                <>
                  <FaCheck className="mr-1" size={20} />
                  Valider
                </>
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditNoteModal;
