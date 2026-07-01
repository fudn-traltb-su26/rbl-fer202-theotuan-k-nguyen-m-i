import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <Container className="my-5 text-center">
      <h1>404</h1>
      <p>Trang không tồn tại.</p>
      <Button as={Link} to="/" variant="dark">
        Về trang chủ
      </Button>
    </Container>
  )
}

export default NotFoundPage