import Modal from "react-bootstrap/Modal";
import { useNotesContext } from "../contexts/notes/NotesContext";

function ErrorModal() {
  const { isConsistent } = useNotesContext();

  return (
    <Modal backdrop="static" show={!isConsistent}>
      <Modal.Body>
        <p>
          Une erreur critique a eu lieu et nous ne pouvons plus assurer la
          cohérence des données. Vous risquez de perdre vos dernières
          modifications. Merci de revenir plus tard.
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default ErrorModal;
