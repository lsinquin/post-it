import Header from "../components/Header";
import NotesDisplay from "../components/NotesDisplay";
import FloatingAddButton from "../components/FloatingAddButton";
import EditNoteModal from "../components/EditNoteModal";
import ErrorModal from "../components/ErrorModal";
import { NotesProvider } from "../contexts/notes/NotesContext";

const Dashboard = () => (
  <NotesProvider>
    <Header />
    <NotesDisplay />
    <FloatingAddButton />
    <EditNoteModal />
    <ErrorModal />
  </NotesProvider>
);

export default Dashboard;
