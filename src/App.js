import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createContext } from "react";
import PrivateRoute from "./components/PrivateRoute";
import SignInForm from "./pages/signin/SignIn";
import SignUpForm from "./pages/signup/SignUp";
import ForgottenPasswordForm from "./pages/forgotten-password/ForgottenPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import { AuthProvider } from "./contexts/auth/AuthContext";

export const ConfigContext = createContext();

const configValue = {};

function App() {
  return (
    <ConfigContext.Provider value={configValue}>
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/signin">
              <SignInForm />
            </Route>
            <Route path="/forgotten-password">
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
}

export default App;
