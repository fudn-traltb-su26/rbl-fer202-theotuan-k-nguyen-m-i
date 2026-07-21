import { Container, Table, Button, Alert, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalAmount, clearCart, itemCount } = useCart()

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

  return (
    <Container className="my-4 my-md-5">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4 pb-3 border-bottom border-secondary-subtle">
        <h1 className="font-heading fw-extrabold fs-3 mb-0 d-flex align-items-center gap-2">
          <span>🛒 Giỏ Hàng Chi Tiết</span>
          <Badge bg="warning" text="dark" pill className="px-3 py-1 fs-6 font-heading">
            {itemCount} phần
          </Badge>
        </h1>
        <Button variant="outline-danger" size="sm" onClick={clearCart} className="rounded-pill px-3 font-heading fw-medium">
          ✕ Xóa toàn bộ giỏ hàng
        </Button>
      </div>

      <div className="premium-table mb-4 overflow-auto">
        <Table hover responsive className="align-middle text-nowrap table-sm table-md mb-0">
          <thead style={{ background: 'var(--cafe-surface)', borderBottom: '2px solid var(--cafe-card-border)' }}>
            <tr>
              <th className="py-3 px-4">Tên thức uống</th>
              <th className="py-3">Đơn giá</th>
              <th className="text-center py-3">Số lượng</th>
              <th className="py-3">Thành tiền</th>
              <th className="text-end py-3 px-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--cafe-card-border)' }}>
                <td className="fw-bold font-heading py-3 px-4 fs-6">{item.name}</td>
                <td className="text-muted font-heading py-3">{item.price.toLocaleString('vi-VN')}đ</td>
                <td className="text-center py-3">
                  <div className="d-inline-flex align-items-center justify-content-center gap-2 p-1 rounded-pill" style={{ background: 'var(--cafe-surface)', border: '1px solid var(--cafe-card-border)' }}>
                    <button
                      type="button"
                      className="btn btn-sm btn-light rounded-circle shadow-none d-flex align-items-center justify-content-center"
                      style={{ width: '28px', height: '28px', fontWeight: 'bold' }}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="fw-bold px-2 font-heading">{item.quantity}</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-light rounded-circle shadow-none d-flex align-items-center justify-content-center"
                      style={{ width: '28px', height: '28px', fontWeight: 'bold' }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="text-danger fw-extrabold font-heading py-3 fs-6">
                  {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                </td>
                <td className="text-end py-3 px-4">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-pill px-3 font-heading small"
                  >
                    Xóa món
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Tổng cộng & Đặt hàng */}
      <div className="d-flex justify-content-end mt-4">
        <div className="p-4 rounded-4 shadow-sm w-100 w-sm-auto" style={{ background: 'var(--cafe-surface)', border: '1px solid var(--cafe-card-border)', minWidth: '340px' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted font-heading">Tạm tính:</span>
            <span className="font-heading fw-extrabold fs-4 text-danger">
              {totalAmount.toLocaleString('vi-VN')}đ
            </span>
          </div>
          <button
            type="button"
            className="btn-premium-amber w-100 py-3 fs-6 d-flex align-items-center justify-content-center gap-2"
            onClick={() => alert('Đã gửi xác nhận đơn hàng thành công! Cảm ơn bạn đã lựa chọn CafeHub ☕')}
          >
            <span>Xác nhận đặt hàng ngay</span>
            <span>✓</span>
          </button>
        </div>
      </div>
    </Container>
  )
}

export default CartPage
