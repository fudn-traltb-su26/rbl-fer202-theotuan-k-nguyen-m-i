import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Banner() {
  return (
    <div className="banner-gradient text-white text-center py-4 py-md-5">
      <Container className="py-2 py-md-4">
        <p className="text-warning fw-semibold mb-2 small text-uppercase" style={{ letterSpacing: '1px' }}>
          ☕ Chào mừng đến với
        </p>
        <h1
          className="fs-1 display-md-4 fw-bold mb-3"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
        >
          CafeHub
        </h1>
        <p className="lead mb-4 opacity-75 fs-6 fs-md-5 mx-auto" style={{ maxWidth: '650px' }}>
          Hệ thống quản lý thực đơn quán cà phê — Thức uống thượng hạng, không gian tuyệt vời
        </p>

        <div className="d-grid gap-2 d-sm-flex justify-content-center mx-auto" style={{ maxWidth: '400px' }}>
          <Button
            as={Link}
            to="/menu"
            variant="warning"
            size="lg"
            className="px-4 fw-bold shadow-sm"
          >
            Xem thực đơn →
          </Button>
          <Button
            as={Link}
            to="/order"
            variant="outline-light"
            size="lg"
            className="px-4"
          >
            Phiếu gọi món
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default Banner