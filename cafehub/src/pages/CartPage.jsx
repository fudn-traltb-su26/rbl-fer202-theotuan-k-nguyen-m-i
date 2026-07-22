import { useState } from 'react'
import { Container, Table, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CheckoutModal from '../components/CheckoutModal'
import CouponInput from '../components/CouponInput'

function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalAmount, clearCart, itemCount } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [discountAmount, setDiscountAmount] = useState(0)

  const finalTotal = totalAmount - discountAmount

  if (cart.length === 0) {
    return (
      <Container className="my-5 text-center py-5">
        <div className="p-5 rounded-4 mx-auto shadow-sm" style={{ maxWidth: '520px', background: 'var(--cafe-card-bg)', border: '1px solid var(--cafe-card-border)' }}>
          <div style={{ fontSize: '4.5rem' }} className="mb-3">🛒</div>
          <h3 className="font-heading fw-bold mb-2">Giỏ hàng của bạn đang trống</h3>
          <p className="text-muted small mb-4">Hàng tá thức uống thơm ngon đang chờ bạn khám phá và thưởng thức ngay hôm nay.</p>
          <Link to="/menu" className="btn-premium-amber text-decoration-none d-inline-block px-4 py-2 fs-6">
            Khám phá thực đơn ngay →
          </Link>
        </div>
      </Container>
    )
  }

  // Helper hiển thị tuỳ chọn
  const renderOptions = (item) => {
    if (!item.options) return null
    const { size, ice, sugar, toppingLabels } = item.options
    const parts = []
    if (size && size !== 'S') parts.push(`Size ${size}`)
    if (ice && ice !== '100%') parts.push(`${ice} đá`)
    if (sugar && sugar !== '100%') parts.push(`${sugar} đường`)
    if (toppingLabels && toppingLabels.length > 0) parts.push(toppingLabels.join(', '))
    if (parts.length === 0) return <span className="text-muted small">Mặc định (Size S, 100% đá, 100% đường)</span>
    return <span className="text-muted small">{parts.join(' • ')}</span>
  }

  return (
    <Container className="my-4 my-md-5">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4 pb-3 border-bottom border-secondary-subtle">
        <h1 className="font-heading fw-extrabold fs-3 mb-0 d-flex align-items-center gap-2">
          <span>🛒 Giỏ Hàng</span>
          <Badge bg="warning" text="dark" pill className="px-3 py-1 fs-6 font-heading">
            {itemCount} phần
          </Badge>
        </h1>
        <Button variant="outline-danger" size="sm" onClick={clearCart} className="rounded-pill px-3 font-heading fw-medium">
          ✕ Xóa toàn bộ
        </Button>
      </div>

      <div className="premium-table mb-4 overflow-auto">
        <Table hover responsive className="align-middle table-sm table-md mb-0">
          <thead style={{ background: 'var(--cafe-surface)', borderBottom: '2px solid var(--cafe-card-border)' }}>
            <tr>
              <th className="py-3 px-4">Thức uống</th>
              <th className="py-3">Đơn giá</th>
              <th className="text-center py-3">Số lượng</th>
              <th className="py-3">Thành tiền</th>
              <th className="text-end py-3 px-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.cartKey} style={{ borderBottom: '1px solid var(--cafe-card-border)' }}>
                <td className="py-3 px-4">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.image || `https://picsum.photos/seed/drink${item.id}/60/60`}
                      alt={item.name}
                      className="rounded-3 object-fit-cover d-none d-sm-block"
                      style={{ width: '48px', height: '48px' }}
                    />
                    <div>
                      <div className="fw-bold font-heading fs-6">{item.name}</div>
                      {renderOptions(item)}
                    </div>
                  </div>
                </td>
                <td className="text-muted font-heading py-3">
                  {(item.finalPrice || item.price).toLocaleString('vi-VN')}đ
                </td>
                <td className="text-center py-3">
                  <div className="d-inline-flex align-items-center justify-content-center gap-2 p-1 rounded-pill" style={{ background: 'var(--cafe-surface)', border: '1px solid var(--cafe-card-border)' }}>
                    <button
                      type="button"
                      className="btn btn-sm btn-light rounded-circle shadow-none d-flex align-items-center justify-content-center"
                      style={{ width: '28px', height: '28px', fontWeight: 'bold' }}
                      onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="fw-bold px-2 font-heading">{item.quantity}</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-light rounded-circle shadow-none d-flex align-items-center justify-content-center"
                      style={{ width: '28px', height: '28px', fontWeight: 'bold' }}
                      onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="text-danger fw-extrabold font-heading py-3 fs-6">
                  {((item.finalPrice || item.price) * item.quantity).toLocaleString('vi-VN')}đ
                </td>
                <td className="text-end py-3 px-4">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(item.cartKey)}
                    className="rounded-pill px-3 font-heading small"
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Mã giảm giá + Tổng cộng */}
      <div className="d-flex flex-column flex-md-row justify-content-end gap-3 mt-4">
        {/* Coupon */}
        <div className="flex-grow-1" style={{ maxWidth: '400px' }}>
          <CouponInput
            orderTotal={totalAmount}
            onApply={(coupon, discount) => {
              setAppliedCoupon(coupon)
              setDiscountAmount(discount)
            }}
            onRemove={() => {
              setAppliedCoupon(null)
              setDiscountAmount(0)
            }}
          />
        </div>

        {/* Tổng */}
        <div className="p-4 rounded-4 shadow-sm" style={{ background: 'var(--cafe-surface)', border: '1px solid var(--cafe-card-border)', minWidth: '340px' }}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted font-heading">Tạm tính:</span>
            <span className="font-heading fw-bold fs-5">{totalAmount.toLocaleString('vi-VN')}đ</span>
          </div>
          {discountAmount > 0 && (
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-success font-heading small">🎫 Giảm giá ({appliedCoupon?.code}):</span>
              <span className="font-heading fw-bold text-success">-{discountAmount.toLocaleString('vi-VN')}đ</span>
            </div>
          )}
          <hr className="my-2 border-secondary-subtle" />
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="font-heading fw-bold">Tổng thanh toán:</span>
            <span className="font-heading fw-extrabold fs-4 text-danger">
              {finalTotal.toLocaleString('vi-VN')}đ
            </span>
          </div>
          <button
            type="button"
            className="btn-premium-amber w-100 py-3 fs-6 d-flex align-items-center justify-content-center gap-2"
            onClick={() => setShowCheckout(true)}
          >
            <span>Tiến hành đặt hàng</span>
            <span>→</span>
          </button>
        </div>
      </div>

      <CheckoutModal
        show={showCheckout}
        onHide={() => setShowCheckout(false)}
        items={cart}
        total={finalTotal}
        discount={discountAmount}
        coupon={appliedCoupon}
        onConfirmComplete={clearCart}
      />
    </Container>
  )
}

export default CartPage
