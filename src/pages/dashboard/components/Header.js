import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiOutlineCloudSync } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import UserDropdown from "./UserDropdown";
import logo from "../../../logo.svg";
import { useNotesContext } from "../contexts/notes/NotesContext";

function Header() {
  const { requestCounter } = useNotesContext();

  return (
    <Container fluid className="text-black header static-top ">
      <Row className="align-items-center no-gutters h-100">
        <Col>
          <img src={logo} width="100" alt="logo"></img>
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
}

export default Header;
