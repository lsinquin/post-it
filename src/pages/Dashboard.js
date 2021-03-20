import Header from "../components/Header";
import NotesDisplay from "../components/NotesDisplay";
// import { useNotesContext } from "../contexts/notes/NotesContext";
import EditNoteModal from "../components/EditNoteModal";
import ErrorModal from "../components/ErrorModal";

const Dashboard = () => {
  // const { isLoading } = useNotesContext();

  return (
    <div>
      <Header />
      <NotesDisplay />
      <EditNoteModal />
      <ErrorModal />
    </div>
  );
};

export default Dashboard;
