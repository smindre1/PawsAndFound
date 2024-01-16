import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "../Signup/index";
import LoginForm from "../Login/index";
import Auth from "../../../utils/auth";
import "../../index.css"

const Header = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand className="title" as={Link} to="/">
            Paws And Found
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="navbar" /> */}

          {/* <Navbar.Collapse id="navbar" className="d-flex flex-row-reverse"> */}
          <Nav className="navigation">
            <Nav.Link className="searchpets" as={Link} to="/">
              Search For Pets
            </Nav.Link>
            <Nav.Link className="abtus" as={Link} to="/aboutus">
              About Us
            </Nav.Link>
            {/* if user is logged in show profile and logout buttons */}
            {Auth.loggedIn() ? (
              <>
                <Nav.Link as={Link} to="/me">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/newpost">
                  Create Post
                </Nav.Link>
                <Nav.Link className="logoutbtn" onClick={Auth.logout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link className="loginbtn" onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
            )}
          </Nav>
          {/* </Navbar.Collapse> */}

        </Container>
      </Navbar>
      {/* Modal data setup */}
      <Modal className="tab" size="lg" show={showModal} onHide={() => setShowModal(false)} aria-labelledby="signup-modal">
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton="close">
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          {/* Login and Signup Forms */}
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default Header;
