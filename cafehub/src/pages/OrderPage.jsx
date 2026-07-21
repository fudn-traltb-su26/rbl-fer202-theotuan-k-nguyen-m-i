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
    <Container className="my-4 my-md-5">
      <h2 className="fs-3 fw-bold mb-4">🧾 Phiếu gọi món tạm</h2>

      <Table bordered hover responsive className="align-middle text-nowrap table-sm table-md shadow-sm">
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

      <div className="d-flex justify-content-end mt-4">
        <h4 className="fs-4 fw-bold">
          Tổng tạm tính: <span className="text-danger">{totalPrice.toLocaleString('vi-VN')}đ</span>
        </h4>
      </div>
    </Container>
  )
}

export default OrderPage