import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createContext } from "react";
import SignInForm from "./pages/SignInForm";
import SignUpForm from "./pages/SignUpForm";
import ForgottenPasswordForm from "./pages/ForgottenPasswordForm";
import Home from "./pages/Home";
import { NotesProvider } from "./contexts/notes/NotesContext";

export const ConfigContext = createContext();

const configValue = {
  errMessageDuration: 5000,
};

const App = () => {
  return (
    <ConfigContext.Provider value={configValue}>
      <Router>
        <Switch>
          <Route path="/signin">
            <SignInForm />
          </Route>
          <Route path="/forgottenpassword">
            <ForgottenPasswordForm />
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <Route path="/home">
            <NotesProvider>
              <Home />
            </NotesProvider>
          </Route>
          <Route path="/">
            <Redirect to="/signin" />
          </Route>
        </Switch>
      </Router>
    </ConfigContext.Provider>
  );
};

export default App;
