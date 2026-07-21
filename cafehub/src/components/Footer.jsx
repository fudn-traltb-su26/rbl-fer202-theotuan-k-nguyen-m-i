import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="py-5 mt-5 border-top border-secondary border-opacity-25"
      style={{
        background: 'linear-gradient(180deg, var(--cafe-surface) 0%, var(--cafe-card-bg) 100%)',
      }}
    >
      <Container>
        <Row className="g-4 mb-4">
          <Col xs={12} md={5}>
            <div className="font-heading fw-bold fs-4 d-flex align-items-center gap-2 mb-3">
              <span
                className="d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'linear-gradient(135deg, #ffb300 0%, #ff8f00 100%)',
                  fontSize: '1.2rem',
                }}
              >
                ☕
              </span>
              <span>Cafe<span style={{ color: '#ffb300' }}>Hub</span></span>
            </div>
            <p className="text-muted small mb-3 opacity-85" style={{ maxWidth: '380px', lineHeight: '1.7' }}>
              Hệ thống đặt món & quản lý thực đơn quán cà phê thông minh. Thưởng thức hương vị nguyên bản trong không gian đẳng cấp, tiện lợi ngay tại bàn.
            </p>
            <div className="d-flex gap-2">
              <span className="badge rounded-pill bg-warning bg-opacity-25 text-warning px-3 py-1 font-heading">
                ☕ 100% Cà phê sạch
              </span>
              <span className="badge rounded-pill bg-warning bg-opacity-25 text-warning px-3 py-1 font-heading">
                ⚡ Phục vụ 24/7
              </span>
            </div>
          </Col>

          <Col xs={6} md={3}>
            <h6 className="font-heading fw-bold text-uppercase small mb-3 letter-spacing-1" style={{ color: 'var(--cafe-accent)' }}>
              Khám phá
            </h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-0">
              <li>
                <Link to="/" className="text-muted text-decoration-none hover-warning transition-all">
                  🏠 Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-muted text-decoration-none hover-warning transition-all">
                  📋 Thực đơn đặc sắc
                </Link>
              </li>
              <li>
                <Link to="/drinks" className="text-muted text-decoration-none hover-warning transition-all">
                  🧋 Tất cả đồ uống
                </Link>
              </li>
              <li>
                <Link to="/order" className="text-muted text-decoration-none hover-warning transition-all">
                  🧾 Phiếu gọi món tạm
                </Link>
              </li>
            </ul>
          </Col>

          <Col xs={6} md={4}>
            <h6 className="font-heading fw-bold text-uppercase small mb-3 letter-spacing-1" style={{ color: 'var(--cafe-accent)' }}>
              Giờ phục vụ & Liên hệ
            </h6>
            <p className="small text-muted mb-2">
              <strong>🕒 Mở cửa:</strong> 07:00 — 23:00 (Tất cả các ngày trong tuần)
            </p>
            <p className="small text-muted mb-2">
              <strong>📍 Địa chỉ:</strong> Khu Công Nghệ Cao, TP. Thủ Đức, TP. Hồ Chí Minh
            </p>
            <p className="small text-muted mb-0">
              <strong>📞 Hotline hỗ trợ:</strong> 1900 6868 — (028) 3868 6868
            </p>
          </Col>
        </Row>

        <div className="pt-4 border-top border-secondary border-opacity-25 text-center d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 small text-muted opacity-75">
          <span>© {currentYear} CafeHub. All rights reserved. Designed with ❤️ & Premium UX.</span>
          <div className="d-flex gap-3">
            <Link to="/admin/drinks" className="text-muted text-decoration-none">
              ⚙️ Quản trị viên
            </Link>
            <span>•</span>
            <span className="text-muted">Bảo mật & Điều khoản</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer