import { useHistory } from "react-router-dom";

import Header from "../components/Header";
import NotesDisplay from "../components/NotesDisplay";
import { useNotesContext } from "../contexts/notes/NotesContext";

const Home = () => {
  const history = useHistory();

  const { isLoading, notes, addNote, deleteNotes } = useNotesContext();

  const handleLogOut = (event) => {
    history.push("/signin");
  };

  return isLoading ? (
    <div>Loading... </div>
  ) : (
    <div>
      <Header
        handleDeleteAll={deleteNotes}
        handleAddNote={addNote}
        handleLogOut={handleLogOut}
      />
      <NotesDisplay notes={notes} />
    </div>
  );
};

export default Home;
