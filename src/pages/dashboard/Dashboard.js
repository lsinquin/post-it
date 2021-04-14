import Header from "./components/Header";
import NotesDisplay from "./components/NotesDisplay";
import FloatingAddButton from "./components/FloatingAddButton";
import AddNoteModal from "./components/AddNoteModal";
import EditNoteModal from "./components/EditNoteModal";
import ErrorModal from "./components/ErrorModal";
import { NotesProvider } from "./contexts/notes/NotesContext";

function Dashboard() {
  return (
    <div className="dashboard bg-white">
      <NotesProvider>
        <Header />
        <NotesDisplay />
        <FloatingAddButton />
        <AddNoteModal />
        <EditNoteModal />
        <ErrorModal />
      </NotesProvider>
    </div>
  );
}

export default Dashboard;
