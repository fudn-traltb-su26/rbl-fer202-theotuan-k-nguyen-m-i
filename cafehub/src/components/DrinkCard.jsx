import { Card, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function DrinkCard({ drink, onAddToOrder }) {
  const hasDiscount = drink.originalPrice > drink.price
  const discountPercent = hasDiscount
    ? Math.round(((drink.originalPrice - drink.price) / drink.originalPrice) * 100)
    : 0

  return (
    <Card className="h-100 shadow-sm">
      <div style={{ position: 'relative' }}>
        {hasDiscount && (
          <Badge bg="danger" style={{ position: 'absolute', top: 8, left: 8 }}>
            -{discountPercent}%
          </Badge>
        )}

        {drink.status === 'out-of-stock' && (
          <Badge bg="secondary" style={{ position: 'absolute', top: 8, right: 8 }}>
            Hết hàng
          </Badge>
        )}

        <Card.Img
          variant="top"
          src={`https://picsum.photos/seed/drink${drink.id}/300/200`}
          style={{ height: '180px', objectFit: 'cover' }}
        />
      </div>

      <Card.Body>
        <Card.Title>{drink.name}</Card.Title>
        <Card.Text className="text-muted">{drink.description}</Card.Text>

        <div className="mb-2">
          <strong className="text-danger">
            {drink.price.toLocaleString('vi-VN')}đ
          </strong>{' '}
          <small className="text-decoration-line-through text-muted">
            {drink.originalPrice.toLocaleString('vi-VN')}đ
          </small>
        </div>

        <div className="mb-2">
          ⭐ {drink.rating} | {drink.stock > 0 ? `Còn ${drink.stock}` : 'Hết hàng'}
        </div>

        <div className="d-flex gap-2">
          <Button
            variant="outline-dark"
            size="sm"
            as={Link}
            to={`/menu/${drink.id}`}
          >
            Chi tiết
          </Button>

          <Button
            variant="dark"
            size="sm"
            onClick={() => onAddToOrder(drink)}
            disabled={drink.stock === 0}
          >
            Gọi món
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default DrinkCard