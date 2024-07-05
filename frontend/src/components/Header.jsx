import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import logo from "../assets/logo1.png";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems.length);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
        <Container>
          <LinkContainer  to="/">
            <Navbar.Brand>
              <img className="logo" src={logo} alt="PlayShop" />
              PlayShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer  to="/cart"><Nav.Link><FaShoppingCart/> Cart {
                cartItems.length > 0 && (
                  <span className="badge bg-light text-dark ms-1">
                    {cartItems.length}
                  </span>
                )
              }</Nav.Link></LinkContainer>
              <LinkContainer  to="/login"><Nav.Link><FaUser/> Login</Nav.Link></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header