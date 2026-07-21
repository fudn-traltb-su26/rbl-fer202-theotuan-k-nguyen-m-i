import { Button, Container, Row, Col, Alert, Badge, Breadcrumb } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import drinks from '../data/drinks'
import { useCart } from '../context/CartContext'

// Tuần 6: useParams() đọc :id từ URL /menu/:id
function DrinkDetailPage({ onAddToOrder }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const drink = drinks.find((item) => item.id === parseInt(id))

  // Không tìm thấy món
  if (!drink) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          <Alert.Heading>Không tìm thấy món</Alert.Heading>
          <p>Món đồ uống với mã số #{id} không tồn tại trong thực đơn.</p>
        </Alert>
        <Button variant="dark" onClick={() => navigate(-1)}>
          ← Quay lại
        </Button>
      </Container>
    )
  }

  const hasDiscount = drink.originalPrice > drink.price
  const discountPercent = hasDiscount
    ? Math.round(((drink.originalPrice - drink.price) / drink.originalPrice) * 100)
    : 0
  const isOutOfStock = drink.stock === 0

  return (
    <Container className="my-5">
      {/* Breadcrumb — Tuần 6: điều hướng rõ ràng */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/menu' }}>
          Thực đơn
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{drink.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        {/* Ảnh */}
        <Col md={5} className="mb-4 mb-md-0">
          <div style={{ position: 'relative' }}>
            {hasDiscount && (
              <Badge
                bg="danger"
                style={{ position: 'absolute', top: 12, left: 12, zIndex: 1, fontSize: '0.9rem' }}
              >
                -{discountPercent}%
              </Badge>
            )}
            <img
              src={`https://picsum.photos/seed/drink${drink.id}/500/380`}
              alt={drink.name}
              loading="lazy"
              className="img-fluid rounded shadow-sm w-100"
              style={{ objectFit: 'cover', maxHeight: '380px' }}
            />
          </div>
        </Col>

        {/* Thông tin chi tiết */}
        <Col md={7}>
          <Badge bg="info" className="mb-2">
            Danh mục #{drink.categoryId}
          </Badge>
          <h2 className="fw-bold mb-2">{drink.name}</h2>
          <p className="text-muted mb-3">{drink.description}</p>

          {/* Giá */}
          <div className="mb-3">
            <span className="text-danger fw-bold fs-4">
              {drink.price.toLocaleString('vi-VN')}đ
            </span>
            {hasDiscount && (
              <span className="text-decoration-line-through text-muted ms-3 fs-6">
                {drink.originalPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>

          {/* Rating */}
          <p className="mb-2">
            ⭐ <strong>{drink.rating}</strong>
            <span className="text-muted ms-2">/ 5.0</span>
          </p>

          {/* Tồn kho */}
          <p className="mb-4">
            {isOutOfStock ? (
              <span className="text-danger fw-semibold">❌ Hết hàng</span>
            ) : (
              <span className="text-success fw-semibold">✅ Còn {drink.stock} phần</span>
            )}
          </p>

          {/* Action buttons */}
          <div className="d-grid gap-2 d-sm-flex flex-wrap">
            <Button
              variant="dark"
              size="lg"
              className="px-4 fw-bold shadow-sm"
              onClick={() => {
                if (onAddToOrder) onAddToOrder(drink)
                addToCart(drink)
              }}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'Hết hàng' : '+ Thêm vào phiếu gọi món'}
            </Button>

            {/* useNavigate(-1) — Tuần 6 */}
            <Button variant="outline-secondary" size="lg" className="px-4" onClick={() => navigate(-1)}>
              ← Quay lại
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default DrinkDetailPage