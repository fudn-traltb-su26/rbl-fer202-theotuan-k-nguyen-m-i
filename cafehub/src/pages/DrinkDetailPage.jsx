import { useState, useEffect } from 'react'
import { Button, Container, Row, Col, Alert, Badge, Breadcrumb } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import drinks from '../data/drinks'
import { useCart } from '../context/CartContext'
import useLocalStorage from '../hooks/useLocalStorage'
import DrinkCustomizeModal from '../components/DrinkCustomizeModal'
import ReviewSection from '../components/ReviewSection'

function DrinkDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [wishlist, setWishlist] = useLocalStorage('cafehub_wishlist', [])
  const [added, setAdded] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)

  const drink = drinks.find((item) => item.id === parseInt(id))

  if (!drink) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="rounded-4 p-4 shadow-sm">
          <Alert.Heading className="font-heading fw-bold">⚠️ Không tìm thấy thức uống</Alert.Heading>
          <p>Món đồ uống với mã số #{id} không tồn tại hoặc đã được gỡ khỏi thực đơn CafeHub.</p>
          <Button variant="dark" onClick={() => navigate(-1)} className="rounded-pill px-4 mt-2 font-heading">
            ← Quay lại thực đơn
          </Button>
        </Alert>
      </Container>
    )
  }

  const hasDiscount = drink.originalPrice > drink.price
  const discountPercent = hasDiscount
    ? Math.round(((drink.originalPrice - drink.price) / drink.originalPrice) * 100)
    : 0
  const isOutOfStock = drink.stock === 0
  const safeWishlist = Array.isArray(wishlist) ? wishlist : []
  const isWishlisted = safeWishlist.includes(drink.id)

  const toggleWishlist = (e) => {
    if (e) e.preventDefault()
    setWishlist((prev) => {
      const list = Array.isArray(prev) ? prev : []
      return list.includes(drink.id)
        ? list.filter((wId) => wId !== drink.id)
        : [...list, drink.id]
    })
  }

  const handleCustomizedAdd = (cartItem) => {
    addToCart(cartItem)
    setAdded(true)
    window.dispatchEvent(new CustomEvent('cart-item-added', { detail: cartItem }))
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <Container className="my-4 my-md-5">
      {/* Breadcrumb — Tuần 6 */}
      <Breadcrumb className="mb-4 small font-heading">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }} className="text-decoration-none">
          🏠 Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/menu' }} className="text-decoration-none">
          📋 Thực đơn
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="fw-semibold text-warning">
          {drink.name}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4 g-lg-5 align-items-center">
        {/* Ảnh */}
        <Col md={6}>
          <div className="position-relative rounded-4 overflow-hidden shadow-lg border border-secondary border-opacity-10" style={{ background: 'var(--cafe-surface)' }}>
            {hasDiscount && (
              <Badge
                bg="danger"
                className="position-absolute top-0 start-0 m-3 px-3 py-2 shadow rounded-pill font-heading fs-6"
                style={{ zIndex: 1, letterSpacing: '0.5px' }}
              >
                🔥 Ưu đãi -{discountPercent}%
              </Badge>
            )}
            <img
              src={drink.image || `https://picsum.photos/seed/drink${drink.id}/600/450`}
              alt={drink.name}
              loading="lazy"
              className="img-fluid w-100 transition-transform"
              style={{ objectFit: 'cover', maxHeight: '450px' }}
            />
          </div>
        </Col>

        {/* Thông tin chi tiết */}
        <Col md={6}>
          <div className="d-flex align-items-center gap-2 mb-3">
            <Badge className="rounded-pill px-3 py-1 font-heading" style={{ background: 'rgba(255, 179, 0, 0.18)', color: '#d97706', fontSize: '0.85rem' }}>
              #{drink.categoryId} • Thức uống đặc trưng
            </Badge>
            <span className="small fw-bold font-heading" style={{ color: '#f59e0b' }}>
              ⭐ {drink.rating} <span className="text-muted fw-normal">/ 5.0</span>
            </span>
          </div>

          <h1 className="font-heading fw-extrabold display-5 mb-3">{drink.name}</h1>
          
          <p className="text-muted mb-4 font-body opacity-90 fs-6" style={{ lineHeight: '1.8' }}>
            {drink.description}
          </p>

          {/* Giá */}
          <div className="mb-4 p-3 rounded-4 d-flex align-items-center justify-content-between border border-secondary border-opacity-10" style={{ background: 'var(--cafe-surface)' }}>
            <div>
              <div className="small text-muted font-heading">Giá niêm yết</div>
              <div className="d-flex align-items-baseline gap-3">
                <span className="text-danger font-heading fw-extrabold display-6">
                  {drink.price.toLocaleString('vi-VN')}đ
                </span>
                {hasDiscount && (
                  <span className="text-decoration-line-through text-muted fs-5">
                    {drink.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                )}
              </div>
            </div>
            <div className="text-end font-heading">
              {isOutOfStock ? (
                <Badge bg="secondary" className="rounded-pill px-3 py-2 fs-6">❌ Hết hàng</Badge>
              ) : (
                <Badge bg="success" className="rounded-pill px-3 py-2 fs-6">✅ Có sẵn ({drink.stock} phần)</Badge>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="d-grid gap-3 d-sm-flex flex-wrap pt-2">
            <Button
              variant={isWishlisted ? 'danger' : 'outline-danger'}
              size="lg"
              onClick={toggleWishlist}
              className="heart-animated px-4 rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2 font-heading"
              style={{ borderWidth: '1.5px' }}
              title={isWishlisted ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
            >
              <span>{isWishlisted ? '❤️' : '🤍'}</span>
              <span className="fs-6 fw-semibold">{isWishlisted ? 'Đã yêu thích' : 'Yêu thích món'}</span>
            </Button>

            <button
              type="button"
              className={`flex-grow-1 font-heading fs-5 fw-bold transition-all ${
                isOutOfStock
                  ? 'btn btn-secondary rounded-pill disabled'
                  : added
                  ? 'btn btn-success rounded-pill text-white shadow'
                  : 'btn-premium-amber'
              }`}
              style={{ padding: '12px 28px' }}
              onClick={() => {
                if (!isOutOfStock) setShowCustomize(true)
              }}
              disabled={isOutOfStock}
            >
              {isOutOfStock
                ? 'Hết hàng'
                : added
                ? '✓ Đã Thêm Vào Giỏ'
                : '☕ Tuỳ Chọn & Gọi Món'}
            </button>

            <Button
              variant="outline-secondary"
              size="lg"
              className="px-4 rounded-pill font-heading"
              onClick={() => navigate(-1)}
            >
              ← Quay lại
            </Button>
          </div>
        </Col>
      </Row>

      {/* v2.0: Đánh giá & Bình luận */}
      <ReviewSection drinkId={drink.id} drinkName={drink.name} />

      {/* v2.0: Modal tuỳ biến món */}
      <DrinkCustomizeModal
        show={showCustomize}
        onHide={() => setShowCustomize(false)}
        drink={drink}
        onAddToCart={handleCustomizedAdd}
      />
    </Container>
  )
}

export default DrinkDetailPage