function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <h5>☕ CafeHub</h5>
      <p className="mb-1">Hệ thống quản lý thực đơn quán cà phê</p>
      <p className="mb-0">© {currentYear} CafeHub. All rights reserved.</p>
    </footer>
  )
}

export default Footer