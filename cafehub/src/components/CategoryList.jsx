import { Row, Col, Card, Button } from 'react-bootstrap'

function CategoryList({ categories, activeCategory, onSelectCategory }) {
  return (
    <>
      <Button
        className="mb-3"
        variant={activeCategory === null ? 'dark' : 'outline-dark'}
        onClick={() => onSelectCategory(null)}
      >
        Tất cả
      </Button>

      <Row xs={2} sm={3} md={5} className="g-3">
        {categories.map((category) => (
          <Col key={category.id}>
            <Card
              className="text-center h-100"
              onClick={() => onSelectCategory(category.id)}
              style={{ cursor: 'pointer' }}
              border={activeCategory === category.id ? 'dark' : 'light'}
            >
              <Card.Body>
                <div style={{ fontSize: '28px' }}>{category.icon}</div>
                <Card.Text>{category.name}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default CategoryList