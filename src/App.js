import "bootstrap/dist/css/bootstrap.min.css";
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
import { AuthProvider } from "./contexts/auth/AuthContext";

export const ConfigContext = createContext();

const configValue = {
  errMessageDuration: 5000,
};

const App = () => {
  return (
    <ConfigContext.Provider value={configValue}>
      <AuthProvider>
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
              <Dashboard />
            </PrivateRoute>
            <Route path="/">
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </ConfigContext.Provider>
  );
};

export default App;
