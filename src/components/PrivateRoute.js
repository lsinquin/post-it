import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../contexts/auth/AuthContext";

// A wrapping component to redirect user to the signin page if they are not authentified
const PrivateRoute = ({ children, ...rest }) => {
  let { authToken } = useAuthContext();

  return (
    <Route
      {...rest}
      render={() => (authToken ? children : <Redirect to="/signin" />)}
    />
  );
};

export default PrivateRoute;
