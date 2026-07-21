import { useState, useEffect } from 'react'
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

// Tuần 7: useCart + useTheme
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'

function Header() {
  const { itemCount } = useCart()
  const { theme, toggleTheme } = useTheme()
  const [expanded, setExpanded] = useState(false)

  // Tuần 7: useEffect cập nhật tab title theo số lượng món
  useEffect(() => {
    document.title =
      itemCount > 0
        ? `(${itemCount}) CafeHub — Quản Lý Quán Cafe`
        : 'CafeHub — Quản Lý Quán Cafe'

    return () => {
      document.title = 'CafeHub — Quản Lý Quán Cafe'
    }
  }, [itemCount])

  const isDark = theme === 'dark'
  const closeMenu = () => setExpanded(false)

  return (
    <Navbar
      expanded={expanded}
      onToggle={(navExpanded) => setExpanded(navExpanded)}
      bg={isDark ? 'dark' : 'light'}
      variant={isDark ? 'dark' : 'light'}
      expand="lg"
      sticky="top"
      className="glass-header shadow-sm py-2 py-lg-3"
    >
      <Container>
        {/* Logo sang trọng */}
        <Navbar.Brand
          as={NavLink}
          to="/"
          onClick={closeMenu}
          className="font-heading fw-bold fs-4 d-flex align-items-center gap-2 text-decoration-none"
        >
          <span
            className="d-flex align-items-center justify-content-center rounded-circle shadow-sm"
            style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #ffb300 0%, #ff8f00 100%)',
              fontSize: '1.3rem',
            }}
          >
            ☕
          </span>
          <span className="d-flex align-items-center">
            Cafe<span style={{ color: '#ffb300' }}>Hub</span>
          </span>
        </Navbar.Brand>

        {/* Hamburger toggle — mobile */}
        <Navbar.Toggle aria-controls="main-navbar" className="border-0 px-2 py-1 shadow-none" />

        <Navbar.Collapse id="main-navbar" className="mt-3 mt-lg-0">
          {/* Nav Links — trái */}
          <Nav className="me-auto gap-1 gap-lg-3 fw-medium">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              onClick={closeMenu}
              className="py-2 py-lg-1 px-3 rounded-pill transition-all"
            >
              🏠 Trang chủ
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/menu"
              onClick={closeMenu}
              className="py-2 py-lg-1 px-3 rounded-pill transition-all"
            >
              📋 Thực đơn
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/drinks"
              onClick={closeMenu}
              className="py-2 py-lg-1 px-3 rounded-pill transition-all"
            >
              🧋 Danh sách món
            </Nav.Link>
          </Nav>

          {/* Nav Links — phải */}
          <Nav className="align-items-start align-items-lg-center gap-2 mt-2 mt-lg-0 pt-2 pt-lg-0 border-top border-lg-0 border-secondary-subtle">
            {/* Admin */}
            <Nav.Link
              as={NavLink}
              to="/admin/drinks"
              onClick={closeMenu}
              className="py-2 py-lg-1 px-3 rounded-pill transition-all small"
            >
              ⚙️ Quản lý
            </Nav.Link>

            {/* Phiếu gọi món */}
            <Nav.Link
              as={NavLink}
              to="/order"
              onClick={closeMenu}
              className="py-2 py-lg-1 px-3 rounded-pill transition-all small"
            >
              🧾 Phiếu gọi món
            </Nav.Link>

            {/* Giỏ hàng — Tuần 7: useCart */}
            <Nav.Link
              as={NavLink}
              to="/cart"
              onClick={closeMenu}
              className="py-2 py-lg-1 px-3 rounded-pill d-flex align-items-center gap-2 fw-bold text-warning transition-all"
              style={{
                background: isDark ? 'rgba(255, 179, 0, 0.12)' : 'rgba(255, 179, 0, 0.18)',
                border: '1px solid rgba(255, 179, 0, 0.3)',
              }}
            >
              <span>🛒 Giỏ hàng</span>
              <Badge
                bg="warning"
                text="dark"
                pill
                className="px-2 py-1 fw-bold fs-6 shadow-sm"
              >
                {itemCount}
              </Badge>
            </Nav.Link>

            {/* Tuần 7: Dark/Light mode toggle */}
            <Button
              variant={isDark ? 'outline-warning' : 'outline-dark'}
              size="sm"
              onClick={toggleTheme}
              className="d-flex align-items-center gap-1 px-3 py-2 my-1 my-lg-0 rounded-pill fw-semibold shadow-sm"
              title={isDark ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
            >
              <span>{isDark ? '☀️ Sáng' : '🌙 Tối'}</span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header