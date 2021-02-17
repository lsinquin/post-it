import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../contexts/user/UserContext";

// A wrapping component to redirect user to the signin page if they are not authentified
const PrivateRoute = ({ children, ...rest }) => {
  let { userName, authToken } = useUserContext();

  return (
    <Route
      {...rest}
      render={() =>
        userName && authToken ? children : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
