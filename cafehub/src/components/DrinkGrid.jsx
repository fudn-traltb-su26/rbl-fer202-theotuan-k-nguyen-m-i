import { Row, Col, Alert } from 'react-bootstrap'
import DrinkCard from './DrinkCard'

function DrinkGrid({ drinks, onAddToOrder }) {
  if (drinks.length === 0) {
    return <Alert variant="warning">Không tìm thấy món phù hợp.</Alert>
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-3">
      {drinks.map((drink) => (
        <Col key={drink.id}>
          <DrinkCard drink={drink} onAddToOrder={onAddToOrder} />
        </Col>
      ))}
    </Row>
  )
}

export default DrinkGrid