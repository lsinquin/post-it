import Header from "../components/Header";
import NotesDisplay from "../components/NotesDisplay";
import EditNoteModal from "../components/EditNoteModal";
import ErrorModal from "../components/ErrorModal";
import { NotesProvider } from "../contexts/notes/NotesContext";

const Dashboard = () => {
  return (
    <NotesProvider>
      <Header />
      <NotesDisplay />
      <EditNoteModal />
      <ErrorModal />
    </NotesProvider>
  );
};

export default Dashboard;
