import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Banner() {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1a0a00 0%, #3e2723 40%, #8d6e63 100%)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center',
      }}
    >
      <Container>
        <p className="text-warning fw-semibold mb-2 fs-6 text-uppercase letter-spacing-1">
          ☕ Chào mừng đến với
        </p>
        <h1
          className="display-4 fw-bold mb-3"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
        >
          CafeHub
        </h1>
        <p className="lead mb-4 opacity-75">
          Hệ thống quản lý thực đơn quán cà phê — Thưởng thức không gian tuyệt vời
        </p>

        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Button
            as={Link}
            to="/menu"
            variant="warning"
            size="lg"
            className="px-4 fw-semibold"
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