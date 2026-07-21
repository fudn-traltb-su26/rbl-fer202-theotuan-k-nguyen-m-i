import { Card, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// Tuần 9: useLocalStorage cho tính năng Wishlist ❤️
import useLocalStorage from '../hooks/useLocalStorage'
// Tuần 7: useCart để đồng bộ vào giỏ hàng Header
import { useCart } from '../context/CartContext'

function DrinkCard({ drink, onAddToOrder }) {
  const { addToCart } = useCart()

  const hasDiscount = drink.originalPrice > drink.price
  const discountPercent = hasDiscount
    ? Math.round(((drink.originalPrice - drink.price) / drink.originalPrice) * 100)
    : 0

  const isOutOfStock = drink.stock === 0

  // Tuần 9: Wishlist — lưu IDs vào localStorage, persist sau reload
  const [wishlist, setWishlist] = useLocalStorage('cafehub_wishlist', [])
  const isWishlisted = wishlist.includes(drink.id)

  const toggleWishlist = () => {
    setWishlist((prev) =>
      prev.includes(drink.id)
        ? prev.filter((id) => id !== drink.id)
        : [...prev, drink.id]
    )
  }

  return (
    <Card className="h-100 shadow-sm" style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = ''
      }}
    >
      {/* Ảnh đồ uống */}
      <div style={{ position: 'relative' }}>
        {/* Badge giảm giá */}
        {hasDiscount && (
          <Badge
            bg="danger"
            style={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}
          >
            -{discountPercent}%
          </Badge>
        )}

        {/* Badge hết hàng */}
        {isOutOfStock && (
          <Badge
            bg="secondary"
            style={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
          >
            Hết hàng
          </Badge>
        )}

        <Card.Img
          variant="top"
          src={`https://picsum.photos/seed/drink${drink.id}/300/200`}
          alt={drink.name}
          loading="lazy"
          style={{ height: '180px', objectFit: 'cover' }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        {/* Category badge */}
        <Badge bg="info" className="mb-2 align-self-start">
          Danh mục #{drink.categoryId}
        </Badge>

        <Card.Title className="fs-6 fw-semibold">{drink.name}</Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          {drink.description}
        </Card.Text>

        {/* Giá */}
        <div className="mb-2">
          <strong className="text-danger fs-6">
            {drink.price.toLocaleString('vi-VN')}đ
          </strong>{' '}
          {hasDiscount && (
            <small className="text-decoration-line-through text-muted">
              {drink.originalPrice.toLocaleString('vi-VN')}đ
            </small>
          )}
        </div>

        {/* Rating + stock */}
        <div className="mb-3 small text-muted">
          ⭐ {drink.rating} &nbsp;|&nbsp;{' '}
          {isOutOfStock ? (
            <span className="text-danger">Hết hàng</span>
          ) : (
            <span className="text-success">Còn {drink.stock}</span>
          )}
        </div>

        {/* Action buttons — Tuần 9: thêm nút Wishlist ❤️ */}
        <div className="d-flex gap-2 mt-auto">
          {/* Tuần 9: Nút Wishlist — toggle lưu vào localStorage */}
          <Button
            variant={isWishlisted ? 'danger' : 'outline-danger'}
            size="sm"
            onClick={toggleWishlist}
            title={isWishlisted ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
          >
            {isWishlisted ? '❤️' : '🤍'}
          </Button>

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
            className="flex-grow-1"
            onClick={() => {
              if (onAddToOrder) onAddToOrder(drink)
              addToCart(drink)
            }}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? 'Hết hàng' : '+ Gọi món'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default DrinkCard