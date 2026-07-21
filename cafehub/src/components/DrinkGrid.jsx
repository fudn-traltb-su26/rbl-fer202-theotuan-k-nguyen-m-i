import { Row, Col, Alert } from 'react-bootstrap'
import DrinkCard from './DrinkCard'

function DrinkGrid({ drinks = [], onAddToOrder }) {
  if (!drinks || drinks.length === 0) {
    return (
      <Alert variant="warning" className="text-center py-4 my-2">
        <span>🧋 Không tìm thấy đồ uống phù hợp trong danh mục này.</span>
      </Alert>
    )
  }

  return (
    // Tuần 5: Responsive Grid — 2 cột trên điện thoại (xs=2), 2 sm, 3 md, 4 lg
    <Row xs={2} sm={2} md={3} lg={4} className="g-2 g-md-3">
      {drinks.map((drink) => (
        <Col key={drink.id} className="d-flex">
          <DrinkCard drink={drink} onAddToOrder={onAddToOrder} />
        </Col>
      ))}
    </Row>
  )
}

export default DrinkGrid