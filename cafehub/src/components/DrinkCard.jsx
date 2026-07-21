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
    <Card className="h-100 shadow-sm border-0 bg-body w-100">
      {/* Ảnh đồ uống */}
      <div style={{ position: 'relative' }}>
        {/* Badge giảm giá */}
        {hasDiscount && (
          <Badge
            bg="danger"
            className="position-absolute top-0 start-0 m-2 shadow-sm"
            style={{ zIndex: 1 }}
          >
            -{discountPercent}%
          </Badge>
        )}

        {/* Badge hết hàng */}
        {isOutOfStock && (
          <Badge
            bg="secondary"
            className="position-absolute top-0 end-0 m-2 shadow-sm"
            style={{ zIndex: 1 }}
          >
            Hết hàng
          </Badge>
        )}

        <Card.Img
          variant="top"
          src={`https://picsum.photos/seed/drink${drink.id}/300/200`}
          alt={drink.name}
          loading="lazy"
          className="drink-card-img"
        />
      </div>

      <Card.Body className="d-flex flex-column p-2 p-md-3">
        {/* Category badge */}
        <div className="d-flex justify-content-between align-items-center mb-1">
          <Badge bg="info" className="mobile-fs-sm opacity-75">
            #{drink.categoryId}
          </Badge>
          <span className="small text-warning fw-bold mobile-fs-sm">
            ⭐ {drink.rating}
          </span>
        </div>

        <Card.Title className="fs-6 fw-bold mb-1 text-truncate" title={drink.name}>
          {drink.name}
        </Card.Title>
        
        <Card.Text className="text-muted small flex-grow-1 d-none d-sm-block mb-2">
          {drink.description}
        </Card.Text>

        {/* Giá */}
        <div className="mb-2">
          <strong className="text-danger fs-6 mobile-fs-sm">
            {drink.price.toLocaleString('vi-VN')}đ
          </strong>{' '}
          {hasDiscount && (
            <small className="text-decoration-line-through text-muted ms-1">
              {drink.originalPrice.toLocaleString('vi-VN')}đ
            </small>
          )}
        </div>

        {/* Stock */}
        <div className="mb-2 small text-muted d-none d-sm-block">
          {isOutOfStock ? (
            <span className="text-danger">❌ Hết hàng</span>
          ) : (
            <span className="text-success">✅ Còn {drink.stock} phần</span>
          )}
        </div>

        {/* Action buttons — Tối ưu tuyệt đối cho mobile column 170px */}
        <div className="d-flex flex-column flex-sm-row gap-1 gap-sm-2 mt-auto pt-2 border-top border-secondary-subtle">
          <div className="d-flex gap-1 w-100 w-sm-auto justify-content-between">
            <Button
              variant={isWishlisted ? 'danger' : 'outline-danger'}
              size="sm"
              onClick={toggleWishlist}
              title={isWishlisted ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
              className="px-2"
            >
              {isWishlisted ? '❤️' : '🤍'}
            </Button>
            <Button
              variant="outline-dark"
              size="sm"
              as={Link}
              to={`/menu/${drink.id}`}
              className="flex-grow-1 flex-sm-grow-0 text-truncate px-2"
            >
              Chi tiết
            </Button>
          </div>
          <Button
            variant="dark"
            size="sm"
            className="w-100 flex-sm-grow-1 mt-1 mt-sm-0 text-truncate fw-semibold"
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