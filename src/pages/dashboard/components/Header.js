import { AiOutlineCloudSync } from "react-icons/ai";
import Spinner from "react-bootstrap/Spinner";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import UserDropdown from "./UserDropdown";
import logo from "../../../logo.svg";
import { useNotesContext } from "../contexts/notes/NotesContext";

function Header() {
  const { requestCounter } = useNotesContext();

  return (
    <div className="header sticky-top d-flex justify-content-between align-items-center p-2">
      <img src={logo} width="100" alt="logo"></img>
      <div className="d-flex justify-content-end align-items-center">
        {requestCounter > 0 ? (
          <Spinner as="span" animation="border" className="mr-2" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={<Tooltip id={`tooltip-status`}>Synchronisé</Tooltip>}
          >
            <AiOutlineCloudSync className="mr-2" size={48} />
          </OverlayTrigger>
        )}
        <UserDropdown />
      </div>
    </div>
  );
}

export default Header;
