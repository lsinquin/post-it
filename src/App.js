import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createContext } from "react";
import PrivateRoute from "./components/PrivateRoute";
import SignInForm from "./pages/SignInForm";
import SignUpForm from "./pages/SignUpForm";
import ForgottenPasswordForm from "./pages/ForgottenPasswordForm";
import Dashboard from "./pages/Dashboard";
import { NotesProvider } from "./contexts/notes/NotesContext";
import { UserProvider } from "./contexts/user/UserContext";

export const ConfigContext = createContext();

const configValue = {
  errMessageDuration: 5000,
};

const App = () => {
  return (
    <ConfigContext.Provider value={configValue}>
      <UserProvider>
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
            <PrivateRoute path="/dashboard">
              <NotesProvider>
                <Dashboard />
              </NotesProvider>
            </PrivateRoute>
            <Route path="/">
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </ConfigContext.Provider>
  );
};

export default App;
