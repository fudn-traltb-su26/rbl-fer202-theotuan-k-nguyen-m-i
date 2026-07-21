import { Row, Col, Card } from 'react-bootstrap'

function CategoryList({ categories = [], activeCategory, onSelectCategory }) {
  const allCategoryItem = { id: null, name: 'Tất cả', icon: '🍽️' }
  const displayCategories = [allCategoryItem, ...categories]

  return (
    <Row xs={2} sm={3} md={6} className="g-2 g-md-3">
      {displayCategories.map((category) => {
        const isActive = activeCategory === category.id
        return (
          <Col key={category.id ?? 'all'}>
            <Card
              className={`text-center h-100 shadow-sm transition-card ${
                isActive ? 'border-warning bg-warning bg-opacity-10' : ''
              }`}
              onClick={() => onSelectCategory(category.id)}
              style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <Card.Body className="p-2 p-md-3 d-flex flex-column align-items-center justify-content-center">
                <div className="fs-3 fs-md-2 mb-1">{category.icon}</div>
                <Card.Text
                  className={`small mb-0 text-truncate w-100 ${
                    isActive ? 'fw-bold text-dark' : 'fw-semibold text-muted'
                  }`}
                >
                  {category.name}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

export default CategoryList