import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNotesContext } from "../contexts/notes/NotesContext";
import { useAuthContext } from "../contexts/auth/AuthContext";

const ErrorModal = () => {
  const [counter, setCounter] = useState(null);
  // const [timeoutId, setTimeoutId] = useState(0);
  const { hasErrored } = useNotesContext();
  const { logOut } = useAuthContext();

  useEffect(() => {
    if (hasErrored) {
      setCounter(10);
    }
  }, [hasErrored]);

  useEffect(() => {
    if (hasErrored && counter === 0) {
      logOut();
    } else {
      if (hasErrored) {
        setTimeout(() => {
          setCounter(counter - 1);
        }, 1000);
      }

      // setTimeoutId(newTimeoutId);
    }
  }, [hasErrored, counter, logOut]);

  // useEffect(() => {
  //   return () => clearTimeout(timeoutId);
  // }, []);

  const handleClick = (event) => {
    logOut();
  };

  return (
    <Modal show={hasErrored}>
      <Modal.Body>
        <span>
          Une erreur innatendue s'est produite, vous allez être déconnecter dans{" "}
          {counter} secondes. Certaines de vos modifications seront peut être
          perdues
        </span>

        <Button
          className="btn-block my-2"
          onClick={handleClick}
          variant="primary"
        >
          Se deconnecter
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ErrorModal;
