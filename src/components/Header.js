import NoteAddIcon from "@material-ui/icons/NoteAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Divider from "@material-ui/core/Divider";

import { useUserContext } from "../contexts/user/UserContext";
import { useNotesContext } from "../contexts/notes/NotesContext";

const Header = () => {
  const { userName, logOut } = useUserContext();
  const { addNote } = useNotesContext();

  const handleAddNote = () => {
    addNote("Title", "Content");
  };

  return (
    <div>
      <div className="header">
        <div className="actionbar">
          <NoteAddIcon onClick={handleAddNote} fontSize="large" />
        </div>
        <div className="userinfo">
          <label>{userName || "placeholder"}</label>
          <ExitToAppIcon onClick={logOut} fontSize="large" />
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default Header;
