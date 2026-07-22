import { useState } from 'react'
import { Card, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// Tuần 9: useLocalStorage cho tính năng Wishlist ❤️
import useLocalStorage from '../hooks/useLocalStorage'
// Tuần 7: useCart để đồng bộ vào giỏ hàng Header
import { useCart } from '../context/CartContext'
import DrinkCustomizeModal from './DrinkCustomizeModal'

function DrinkCard({ drink }) {
  const { addToCart } = useCart()
  const [showCustomize, setShowCustomize] = useState(false)
  const [added, setAdded] = useState(false)

  const hasDiscount = drink.originalPrice > drink.price
  const discountPercent = hasDiscount
    ? Math.round(((drink.originalPrice - drink.price) / drink.originalPrice) * 100)
    : 0

  const isOutOfStock = drink.stock === 0

  // Tuần 9: Wishlist — lưu IDs vào localStorage, persist sau reload
  const [wishlist, setWishlist] = useLocalStorage('cafehub_wishlist', [])
  const safeWishlist = Array.isArray(wishlist) ? wishlist : []
  const isWishlisted = safeWishlist.includes(drink.id)

  const toggleWishlist = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setWishlist((prev) => {
      const list = Array.isArray(prev) ? prev : []
      return list.includes(drink.id)
        ? list.filter((id) => id !== drink.id)
        : [...list, drink.id]
    })
  }

  // v2.0: Callback khi khách xác nhận tuỳ chọn từ modal
  const handleCustomizedAdd = (cartItem) => {
    addToCart(cartItem)
    setAdded(true)
    window.dispatchEvent(new CustomEvent('cart-item-added', { detail: cartItem }))
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <>
      <Card className="premium-card h-100 border-0 w-100">
        {/* Khung ảnh với hiệu ứng zoom mượt */}
        <div className="zoom-wrapper">
          {/* Badge giảm giá */}
          {hasDiscount && (
            <Badge
              bg="danger"
              className="position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm rounded-pill font-heading"
              style={{ zIndex: 2, fontSize: '0.75rem', letterSpacing: '0.5px' }}
            >
              -{discountPercent}%
            </Badge>
          )}

          {/* Badge hết hàng */}
          {isOutOfStock && (
            <Badge
              bg="secondary"
              className="position-absolute top-0 end-0 m-2 px-2 py-1 shadow-sm rounded-pill font-heading"
              style={{ zIndex: 2, fontSize: '0.75rem' }}
            >
              Hết hàng
            </Badge>
          )}

          <Card.Img
            variant="top"
            src={drink.image || `https://picsum.photos/seed/drink${drink.id}/300/200`}
            alt={drink.name}
            loading="lazy"
            className="drink-card-img"
          />
        </div>

        <Card.Body className="d-flex flex-column p-3">
          {/* Category & Rating */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span
              className="badge rounded-pill small px-2 py-1 font-heading"
              style={{ background: 'rgba(255, 179, 0, 0.15)', color: '#d97706' }}
            >
              #{drink.categoryId}
            </span>
            <span className="small fw-bold mobile-fs-sm font-heading" style={{ color: '#f59e0b' }}>
              ⭐ {drink.rating}{' '}
              <span className="text-muted fw-normal">/ 5.0</span>
            </span>
          </div>

          <Card.Title className="font-heading fs-6 fw-bold mb-1 text-truncate" title={drink.name}>
            {drink.name}
          </Card.Title>

          <Card.Text className="text-muted small flex-grow-1 d-none d-sm-block mb-3" style={{ lineHeight: '1.5', minHeight: '38px' }}>
            {drink.description}
          </Card.Text>

          {/* Giá */}
          <div className="mb-2 d-flex align-items-baseline gap-2">
            <strong className="text-danger font-heading fs-5 mobile-fs-sm">
              {drink.price.toLocaleString('vi-VN')}đ
            </strong>
            {hasDiscount && (
              <small className="text-decoration-line-through text-muted small">
                {drink.originalPrice.toLocaleString('vi-VN')}đ
              </small>
            )}
          </div>

          {/* Tồn kho */}
          <div className="mb-3 small d-none d-sm-block font-heading">
            {isOutOfStock ? (
              <span className="text-danger fw-semibold">❌ Hết hàng</span>
            ) : (
              <span className="text-success fw-semibold">✅ Còn {drink.stock} phần</span>
            )}
          </div>

          {/* Action buttons */}
          <div className="d-flex flex-column flex-sm-row gap-1 gap-sm-2 mt-auto pt-2 border-top border-secondary-subtle">
            <div className="d-flex gap-1 w-100 w-sm-auto justify-content-between">
              <Button
                variant={isWishlisted ? 'danger' : 'outline-danger'}
                size="sm"
                onClick={toggleWishlist}
                title={isWishlisted ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
                className="heart-animated px-2 rounded-pill shadow-sm d-flex align-items-center justify-content-center"
                style={{ minWidth: '36px' }}
              >
                {isWishlisted ? '❤️' : '🤍'}
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                as={Link}
                to={`/menu/${drink.id}`}
                className="flex-grow-1 flex-sm-grow-0 text-truncate px-3 rounded-pill font-heading small fw-medium"
              >
                Chi tiết
              </Button>
            </div>
            <button
              type="button"
              className={`w-100 flex-sm-grow-1 mt-1 mt-sm-0 text-truncate font-heading small transition-all ${
                isOutOfStock
                  ? 'btn btn-secondary rounded-pill disabled'
                  : added
                  ? 'btn btn-success rounded-pill fw-bold text-white shadow'
                  : 'btn-premium-amber'
              }`}
              style={{ padding: '6px 14px', fontSize: '0.85rem' }}
              onClick={() => {
                if (!isOutOfStock) setShowCustomize(true)
              }}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'Hết hàng' : added ? '✓ Đã thêm' : '+ Gọi món'}
            </button>
          </div>
        </Card.Body>
      </Card>

      {/* v2.0: Modal tuỳ biến món */}
      <DrinkCustomizeModal
        show={showCustomize}
        onHide={() => setShowCustomize(false)}
        drink={drink}
        onAddToCart={handleCustomizedAdd}
      />
    </>
  )
}

export default DrinkCard