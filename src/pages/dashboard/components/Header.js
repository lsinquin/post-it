import { AiOutlineCloudSync } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
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
          <AiOutlineCloudSync className="mr-2" size={32} />
        ) : (
          <TiTick className="mr-2" size={32} />
        )}
        <UserDropdown />
      </div>
    </div>
  );
}

export default Header;
