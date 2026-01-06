import React from "react";
import { Container, Navbar, Nav, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  const data = useSelector((state) => state.cart.cartdata);
  const cartCount = data ? data.length : 0;

  return (
    <div className="pt-3 px-3 position-sticky top-0" style={{ zIndex: 1000 }}>
      <Navbar expand="lg" className="glass rounded-4 px-3 py-2 shadow-sm">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-dark d-flex align-items-center gap-2">
            <span className="text-primary-custom">Shop</span>Cart
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto fw-medium gap-3">
              <Nav.Link as={Link} to="/" className="text-dark px-3 py-1 rounded-pill hover-bg-light transition-all">Home</Nav.Link>
              <Nav.Link as={Link} to="/" className="text-dark px-3 py-1 rounded-pill hover-bg-light transition-all">Products</Nav.Link>
              <Nav.Link as={Link} to="/" className="text-dark px-3 py-1 rounded-pill hover-bg-light transition-all">About</Nav.Link>
            </Nav>

            <div className="d-flex align-items-center gap-4">
              <div className="position-relative cursor-pointer text-muted hover-scale p-2 rounded-circle hover-bg-light">
                <FaSearch size={18} />
              </div>

              <Link to="/cart" className="position-relative text-dark hover-scale p-2 rounded-circle hover-bg-light">
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <Badge
                    bg="primary"
                    pill
                    className="position-absolute translate-middle border border-light"
                    style={{ top: '5px', left: '85%', fontSize: '0.65rem', padding: '0.35em 0.6em' }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </Link>

              <div className="d-none d-md-block" style={{ width: '1px', height: '24px', background: '#e2e8f0' }}></div>

              <div className="d-flex align-items-center gap-2">
                <div className="bg-light rounded-circle shadow-sm p-1" style={{ width: 38, height: 38 }}>
                  <img src="https://i.pravatar.cc/150?img=32" alt="User" className="rounded-circle w-100 h-100 object-fit-cover" />
                </div>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
