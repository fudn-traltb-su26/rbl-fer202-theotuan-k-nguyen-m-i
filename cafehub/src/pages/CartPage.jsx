import { Container, Table, Button, Alert, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Tuần 7: dùng useCart() Context thay vì props
import { useCart } from '../context/CartContext'

function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalAmount, clearCart, itemCount } = useCart()

  if (cart.length === 0) {
    return (
      <Container className="my-5 text-center">
        <div style={{ fontSize: '4rem' }}>🛒</div>
        <h4 className="mt-3 mb-2">Giỏ hàng đang trống</h4>
        <p className="text-muted">Bạn chưa thêm món nào vào giỏ hàng.</p>
        <Button as={Link} to="/menu" variant="dark" className="mt-3">
          Xem thực đơn
        </Button>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          Giỏ hàng{' '}
          <Badge bg="dark" pill>
            {itemCount} món
          </Badge>
        </h2>
        <Button variant="outline-danger" size="sm" onClick={clearCart}>
          Xóa tất cả
        </Button>
      </div>

      <Table bordered hover responsive className="align-middle">
        <thead className="table-dark">
          <tr>
            <th>Tên món</th>
            <th>Đơn giá</th>
            <th className="text-center">Số lượng</th>
            <th>Thành tiền</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td className="fw-semibold">{item.name}</td>
              <td>{item.price.toLocaleString('vi-VN')}đ</td>
              <td className="text-center">
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </Button>
                  <span className="fw-semibold px-1">{item.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </td>
              <td className="text-danger fw-semibold">
                {(item.price * item.quantity).toLocaleString('vi-VN')}đ
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Tổng cộng */}
      <div className="d-flex justify-content-end">
        <div className="text-end">
          <h4 className="mb-3">
            Tổng tạm tính:{' '}
            <span className="text-danger">
              {totalAmount.toLocaleString('vi-VN')}đ
            </span>
          </h4>
          <Button variant="dark" size="lg">
            Xác nhận đặt hàng ✓
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default CartPage
