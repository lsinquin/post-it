// import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import NotesDisplay from "../components/NotesDisplay";
import { useNotesContext } from "../contexts/notes/NotesContext";
import EditNoteModal from "../components/EditNoteModal";

// import { useUserContext } from "../contexts/user/UserContext";

const Dashboard = () => {
  const { isLoading, notes } = useNotesContext();
  // const { authToken } = useUserContext();

  return (
    <div>
      <Header />
      <NotesDisplay notes={notes} />
      <Backdrop classes={{ root: "backdrop" }} open={isLoading}>
        <CircularProgress />
      </Backdrop>
      <EditNoteModal />
    </div>
  );
};

export default Dashboard;
