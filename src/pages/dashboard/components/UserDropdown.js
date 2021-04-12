import { forwardRef } from "react";
import { useMediaQuery } from "react-responsive";
import Dropdown from "react-bootstrap/Dropdown";
import { FaUserCircle } from "react-icons/fa";
import { useAuthContext } from "../../../contexts/auth/AuthContext";

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

const IconToogle = forwardRef(({ children, onClick }, ref) => (
  <div
    className="user-dropdown"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

function UserDropdown() {
  const { userMail, logOut } = useAuthContext();

  const isBigScreen = useMediaQuery({
    query: "(min-device-width: 768px)",
  });

  return (
    <Dropdown>
      {isBigScreen ? (
        <Dropdown.Toggle as={TransparentToggle} id="dropdown-custom-components">
          {userMail}
        </Dropdown.Toggle>
      ) : (
        <Dropdown.Toggle as={IconToogle} id="dropdown-custom-components">
          <FaUserCircle size={32} />
        </Dropdown.Toggle>
      )}

      <Dropdown.Menu align="right">
        <Dropdown.Item disabled>Profil</Dropdown.Item>
        <Dropdown.Item onClick={logOut}>Déconnexion</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;
