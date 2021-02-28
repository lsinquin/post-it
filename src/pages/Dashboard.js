// import { useHistory } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import Header from "../components/Header";
import NotesDisplay from "../components/NotesDisplay";
// import { useNotesContext } from "../contexts/notes/NotesContext";
import EditNoteModal from "../components/EditNoteModal";

const Dashboard = () => {
  // const { isLoading } = useNotesContext();

  return (
    <div>
      <Header />
      <NotesDisplay />
      <EditNoteModal />
    </div>
  );
};

export default Dashboard;
