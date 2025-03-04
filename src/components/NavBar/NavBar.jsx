import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { AuthedUserContext } from '../../App';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);

  return (
    <Navbar expand="lg" bg="white" className="border-bottom shadow-sm fixed-top">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img src="https://static.thenounproject.com/png/354384-200.png" alt="Logo" width="50" />
        </Navbar.Brand>

        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/">HOME</Nav.Link>
                <Nav.Link as={Link} to="/tasks">TASKS</Nav.Link>
                <Nav.Link as={Link} to="/tasks/new">NEW TASK</Nav.Link>
                <Nav.Link as={Link} to="/my-lists">My Tasks</Nav.Link>
                <Button variant="outline-danger" onClick={handleSignout} className="ms-3">
                  SIGN OUT
                </Button>

              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <Button variant="primary" className="ms-2">Sign Up</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
