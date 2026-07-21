import { Row, Col, Alert } from 'react-bootstrap'
import DrinkCard from './DrinkCard'

function DrinkGrid({ drinks = [], onAddToOrder }) {
  if (!drinks || drinks.length === 0) {
    return (
      <Alert variant="warning" className="text-center">
        🧋 Không tìm thấy món phù hợp.
      </Alert>
    )
  }

  return (
    // Tuần 5: Responsive Grid — 1 cột mobile, 2 sm, 3 md, 4 lg
    <Row xs={1} sm={2} md={3} lg={4} className="g-3">
      {drinks.map((drink) => (
        <Col key={drink.id} className="d-flex">
          <DrinkCard drink={drink} onAddToOrder={onAddToOrder} />
        </Col>
      ))}
    </Row>
  )
}

export default DrinkGrid