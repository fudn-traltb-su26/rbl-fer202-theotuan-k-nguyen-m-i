import { Row, Col } from 'react-bootstrap'

function CategoryList({ categories = [], activeCategory, onSelectCategory }) {
  const allCategoryItem = { id: null, name: 'Tất cả', icon: '🍽️' }
  const displayCategories = [allCategoryItem, ...categories]

  return (
    <Row xs={2} sm={3} md={6} className="g-2 g-md-3">
      {displayCategories.map((category) => {
        const isActive = activeCategory === category.id
        return (
          <Col key={category.id ?? 'all'}>
            <div
              className={`category-card p-3 text-center h-100 d-flex flex-column align-items-center justify-content-center ${
                isActive ? 'active-category' : ''
              }`}
              onClick={() => onSelectCategory(category.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="fs-2 mb-1 transition-transform" style={{ transform: isActive ? 'scale(1.15)' : 'scale(1)' }}>
                {category.icon}
              </div>
              <div
                className={`small mb-0 text-truncate w-100 font-heading ${
                  isActive ? 'fw-bold text-dark' : 'fw-semibold text-muted'
                }`}
              >
                {category.name}
              </div>
            </div>
          </Col>
        )
      })}
    </Row>
  )
}

export default CategoryList