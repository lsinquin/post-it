import { forwardRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuthContext } from "../contexts/auth/AuthContext";

const TransparentToggle = forwardRef(({ children, onClick }, ref) => (
  <div
    className="user-dropdown"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &nbsp; &#x25bc;
  </div>
));

const UserDropdown = () => {
  const { userMail, logOut } = useAuthContext();

  return (
    <Dropdown>
      <Dropdown.Toggle as={TransparentToggle} id="dropdown-custom-components">
        {userMail}
      </Dropdown.Toggle>

      <Dropdown.Menu align="right">
        <Dropdown.Item disabled>Profil</Dropdown.Item>
        <Dropdown.Item onClick={logOut}>Déconnexion</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
