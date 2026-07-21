function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white text-center py-4 py-md-5 mt-4 mt-md-5 border-top border-secondary">
      <div className="container">
        <h5 className="fw-bold mb-2">☕ CafeHub</h5>
        <p className="mb-1 text-light opacity-75 small">
          Hệ thống quản lý thực đơn quán cà phê — Giao diện chuẩn mực, tương tác thời gian thực
        </p>
        <p className="mb-0 text-secondary small">
          © {currentYear} CafeHub. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer