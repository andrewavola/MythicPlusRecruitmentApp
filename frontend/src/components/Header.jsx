import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { BiLogIn, BiHome} from "react-icons/bi";
import {BsJournalArrowUp} from "react-icons/bs"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <Navbar style={{ backgroundColor: 'rgba(65, 65, 65, 0.85)' }} className="navbar navbar-expand-lg navbar-dark shadow-5-strong fixed-top" >
      <Navbar.Brand as={Link} to="/">
        <BiHome/> Home
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="container-fluid justify-content-end" style={{ marginRight: '150px' }}>
          {user && (
            <>
              <Nav.Link  as={Link} to="/post">
                Posts
              </Nav.Link>
              <Nav.Link as={Link} to="/message">
                Messages
              </Nav.Link>
              <Nav.Link onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </Nav.Link>
            </>
          )}
          {!user && (
            <>
              
                <Nav.Link as={Link} to="/login">
                  <BiLogIn /> Login
                </Nav.Link>

              <Nav.Link as={Link} to="/register">
                <BsJournalArrowUp /> Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    // <header className='header'>
    //   <div className="logo">
    //     {user ? (
    //       <div className="logo">
    //         <Link to='/'>Home</Link>
    //         <Link to='/post'>Posts</Link>
    //         <Link to='/message'>Messages</Link>
    //       </div>
    //     ) : (
    //       <Link to='/'>Home</Link>
    //     )}
    //   </div>
    //   <ul>
    //     {user ? (
    //     <li>
    //       <button className='btn' onClick={onLogout}>
    //         <FaSignOutAlt />Logout
    //       </button>
    //     </li>
    //     ) : (
    //     <>
    //       <li>
    //         <Link to='/login'>
    //           <FaSignInAlt/> Login
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to='/register'>
    //           <FaUser />Register
    //         </Link>
    //       </li>
    //     </>)
    //   }
    //   </ul>
    // </header>
  );
}

export default Header;
