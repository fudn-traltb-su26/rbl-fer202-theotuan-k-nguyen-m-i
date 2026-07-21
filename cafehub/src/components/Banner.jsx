import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Banner() {
  return (
    <div className="banner-hero py-5">
      <Container className="py-4 py-md-5">
        <div className="text-center mx-auto" style={{ maxWidth: '820px' }}>
          {/* Top Pill Badge */}
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill" style={{ background: 'rgba(255, 179, 0, 0.18)', border: '1px solid rgba(255, 179, 0, 0.4)' }}>
            <span style={{ color: '#ffb300' }}>✨</span>
            <span className="small fw-bold text-uppercase" style={{ color: '#ffc107', letterSpacing: '1.2px' }}>
              Trải nghiệm đẳng cấp hương vị cà phê
            </span>
          </div>

          {/* Hero Title */}
          <h1 className="font-heading fw-extrabold display-4 display-md-3 mb-3 text-white">
            Nghệ Thuật Thưởng Thức Tại <span style={{ color: '#ffb300', textShadow: '0 0 25px rgba(255, 179, 0, 0.5)' }}>CafeHub</span>
          </h1>

          {/* Lead Description */}
          <p className="lead mb-4 mb-md-5 text-light opacity-85 fs-6 fs-md-5 mx-auto" style={{ maxWidth: '680px', lineHeight: '1.7' }}>
            Hệ thống đặt món & quản lý thực đơn thông minh. Chúng tôi tinh tuyển từng hạt cà phê thượng hạng để mang đến cho bạn không gian thư giãn và hương vị nguyên bản tuyệt vời nhất.
          </p>

          {/* CTA Buttons */}
          <div className="d-grid gap-3 d-sm-flex justify-content-center mx-auto mb-5" style={{ maxWidth: '440px' }}>
            <Link
              to="/menu"
              className="btn-premium-amber text-decoration-none d-inline-flex align-items-center justify-content-center gap-2 fs-5"
            >
              <span>Khám phá thực đơn</span>
              <span>→</span>
            </Link>
            <Link
              to="/order"
              className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center justify-content-center fs-5"
              style={{ borderWidth: '1.5px' }}
            >
              🧾 Phiếu gọi món
            </Link>
          </div>

          {/* 3 Stat Boxes */}
          <Row className="g-3 pt-3 pt-md-4 border-top border-secondary border-opacity-25 justify-content-center">
            <Col xs={12} sm={4}>
              <div className="stat-box text-center h-100">
                <div className="fs-3 fw-bold text-warning font-heading mb-1">⭐ 4.9 / 5.0</div>
                <div className="small text-light opacity-75">Đánh giá chất lượng dịch vụ</div>
              </div>
            </Col>
            <Col xs={12} sm={4}>
              <div className="stat-box text-center h-100">
                <div className="fs-3 fw-bold text-warning font-heading mb-1">☕ 30+ Món</div>
                <div className="small text-light opacity-75">Đặc sắc & theo mùa từng tuần</div>
              </div>
            </Col>
            <Col xs={12} sm={4}>
              <div className="stat-box text-center h-100">
                <div className="fs-3 fw-bold text-warning font-heading mb-1">⚡ &lt; 5 Phút</div>
                <div className="small text-light opacity-75">Pha chế & phục vụ siêu tốc tại bàn</div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default Banner