import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { AuthedUserContext } from '../../App';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate();

  const handleSignoutAndRedirect = () => {
    handleSignout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" bg="white" className="border-bottom shadow-sm fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="https://static.thenounproject.com/png/4634819-512.png" alt="Logo" width="50" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>
                <Nav.Link as={Link} to="/tasks/new">New Task</Nav.Link>
                <Nav.Link as={Link} to="/my-lists">My Tasks</Nav.Link>
                <Nav.Link as={Link} to="/users">Users</Nav.Link>
                <Button variant="outline-danger" onClick={handleSignoutAndRedirect} className="ms-3">
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signin"><Button variant="info" className="ms-2">Sign In</Button></Nav.Link>
                <Nav.Link as={Link} to="/signup"><Button variant="primary" className="ms-2">Sign Up</Button></Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
