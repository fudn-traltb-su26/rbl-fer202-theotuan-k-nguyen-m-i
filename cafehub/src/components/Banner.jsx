import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Banner() {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #3e2723 0%, #8d6e63 100%)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}
    >
      <Container>
        <h1>☕ CafeHub</h1>
        <p>Hệ thống quản lý thực đơn quán cà phê</p>
        <Button as={Link} to="/menu" variant="warning">
          Xem thực đơn
        </Button>
      </Container>
    </div>
  )
}

export default Banner