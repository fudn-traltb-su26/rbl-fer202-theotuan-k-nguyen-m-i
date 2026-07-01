import { Container, Alert } from 'react-bootstrap'

function DrinkManagePage() {
  return (
    <Container className="my-5">
      <h2>Quản lý thực đơn</h2>
      <Alert variant="warning">
        Trang này dùng để thêm, sửa, xóa đồ uống ở Week 8 bằng Axios và JSON Server.
      </Alert>
    </Container>
  )
}

export default DrinkManagePage