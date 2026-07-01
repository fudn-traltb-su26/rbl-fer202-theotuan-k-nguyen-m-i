import { Container, Table, Button, Alert } from 'react-bootstrap'

function OrderPage({ orderItems, onUpdateQuantity, onRemove }) {
  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (orderItems.length === 0) {
    return (
      <Container className="my-5">
        <Alert variant="info">Phiếu gọi món đang trống 🧾</Alert>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <h2>Phiếu gọi món tạm</h2>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Tên món</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Xóa</th>
          </tr>
        </thead>

        <tbody>
          {orderItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price.toLocaleString('vi-VN')}đ</td>
              <td>
                <Button
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>{' '}
                {item.quantity}{' '}
                <Button
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </td>
              <td>{(item.price * item.quantity).toLocaleString('vi-VN')}đ</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onRemove(item.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>Tổng tạm tính: {totalPrice.toLocaleString('vi-VN')}đ</h4>
    </Container>
  )
}

export default OrderPage