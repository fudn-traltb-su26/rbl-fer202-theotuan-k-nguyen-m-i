import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'

// Tuần 7: useCart + useTheme
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'

function Header() {
  // Tuần 7: xóa props drilling cartCount → dùng useCart()
  const { itemCount } = useCart()
  const { theme, toggleTheme } = useTheme()

  // Tuần 7: useEffect cập nhật tab title theo số lượng món
  useEffect(() => {
    document.title =
      itemCount > 0 ? `(${itemCount}) CafeHub — Quản Lý Quán Cafe` : 'CafeHub — Quản Lý Quán Cafe'

    // cleanup khi unmount
    return () => {
      document.title = 'CafeHub — Quản Lý Quán Cafe'
    }
  }, [itemCount])

  const isDark = theme === 'dark'

  return (
    <Navbar bg={isDark ? 'dark' : 'light'} variant={isDark ? 'dark' : 'light'} expand="md" sticky="top" className="shadow-sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-5">
          ☕ CafeHub
        </Navbar.Brand>

        {/* Hamburger toggle — mobile */}
        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          {/* Nav Links — trái */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Trang chủ
            </Nav.Link>
            <Nav.Link as={NavLink} to="/menu">
              Thực đơn
            </Nav.Link>
          </Nav>

          {/* Nav Links — phải */}
          <Nav className="align-items-center gap-1">
            {/* Admin */}
            <Nav.Link as={NavLink} to="/admin/drinks">
              Quản lý
            </Nav.Link>

            {/* Giỏ hàng — Tuần 7: không cần prop, dùng useCart */}
            <Nav.Link as={NavLink} to="/cart">
              🛒 Giỏ hàng{' '}
              {itemCount > 0 && (
                <Badge bg="warning" text="dark" pill>
                  {itemCount}
                </Badge>
              )}
            </Nav.Link>

            {/* Phiếu gọi món */}
            <Nav.Link as={NavLink} to="/order">
              🧾 Phiếu món
            </Nav.Link>

            {/* Tuần 7: Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-outline-light btn-sm ms-2"
              title={isDark ? 'Chuyển sang sáng' : 'Chuyển sang tối'}
              style={{ fontSize: '1rem', lineHeight: 1 }}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header