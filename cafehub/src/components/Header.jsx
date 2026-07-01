import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function Header({ orderCount }) {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={NavLink} to="/">☕ CafeHub</Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Trang chủ</Nav.Link>
            <Nav.Link as={NavLink} to="/menu">Thực đơn</Nav.Link>
            <Nav.Link as={NavLink} to="/admin/drinks">Quản lý món</Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={NavLink} to="/order">
              🧾 Phiếu gọi món{' '}
              {orderCount > 0 && <Badge bg="warning" text="dark">{orderCount}</Badge>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header