import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaPlusCircle, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineCloudSync } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import logo from "../logo_cropped.png";
import { useAuthContext } from "../contexts/auth/AuthContext";
import { useNotesContext } from "../contexts/notes/NotesContext";

const Header = () => {
  const { logOut } = useAuthContext();
  const { requestCounter, addNote } = useNotesContext();

  const handleAddNote = () => {
    addNote("", "");
  };

  return (
    <Container fluid className="text-white header static-top ">
      <Row className="justify-content-between align-items-center no-gutters">
        <Col className="">
          <FaPlusCircle className="my-1" size={32} onClick={handleAddNote} />
        </Col>
        <Col>
          <img
            className="mx-auto d-block"
            src={logo}
            width="120"
            height="32"
            alt="logo"
          ></img>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          {requestCounter > 0 ? (
            <AiOutlineCloudSync className="my-1 mr-2" size={32} />
          ) : (
            <TiTick className="my-1 mr-2" size={32} />
          )}
          <h5 className="my-0 ml-0 mr-2">{"lulu2751" || "placeholder"}</h5>
          <FaSignOutAlt className="my-1 mr-2" size={32} onClick={logOut} />
          {/* <div className="userinfo">
            <span>{userName || "placeholder"}</span>
          </div> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
