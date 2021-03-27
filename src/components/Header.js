import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiOutlineCloudSync } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import UserDropdown from "./UserDropdown";
import logo from "../logo_cropped.png";
import { useNotesContext } from "../contexts/notes/NotesContext";

const Header = () => {
  const { requestCounter } = useNotesContext();

  return (
    <Container fluid className="text-white header static-top ">
      <Row className="justify-content-between align-items-center no-gutters">
        <Col>
          <img src={logo} width="120" height="32" alt="logo"></img>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          {requestCounter > 0 ? (
            <AiOutlineCloudSync className="my-1 mr-2" size={32} />
          ) : (
            <TiTick className="my-1 mr-2" size={32} />
          )}
          <UserDropdown />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
