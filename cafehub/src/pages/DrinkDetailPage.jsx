import { Button, Container, Row, Col, Alert } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import drinks from '../data/drinks'

function DrinkDetailPage({ onAddToOrder }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const drink = drinks.find((item) => item.id === parseInt(id))

  if (!drink) {
    return (
      <Container className="my-5">
        <Alert variant="danger">Không tìm thấy món trong thực đơn.</Alert>
        <Button onClick={() => navigate(-1)}>Quay lại</Button>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <p>
        <Link to="/">Trang chủ</Link> / <Link to="/menu">Thực đơn</Link> / {drink.name}
      </p>

      <Row>
        <Col md={5}>
          <img
            src={`https://picsum.photos/seed/drink${drink.id}/500/350`}
            alt={drink.name}
            className="img-fluid rounded"
          />
        </Col>

        <Col md={7}>
          <h2>{drink.name}</h2>
          <p className="text-muted">{drink.description}</p>

          <h4 className="text-danger">
            {drink.price.toLocaleString('vi-VN')}đ
          </h4>

          <p>⭐ {drink.rating}</p>
          <p>{drink.stock > 0 ? `Còn ${drink.stock} phần` : 'Hết hàng'}</p>

          <Button
            variant="dark"
            onClick={() => onAddToOrder(drink)}
            disabled={drink.stock === 0}
          >
            Thêm vào phiếu gọi món
          </Button>{' '}

          <Button variant="secondary" onClick={() => navigate(-1)}>
            Quay lại
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default DrinkDetailPage