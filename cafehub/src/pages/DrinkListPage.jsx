import { useState, useRef, useEffect } from 'react'
import { Spinner, Badge } from 'react-bootstrap'

import SectionWrapper from '../components/SectionWrapper'
import SearchBar from '../components/SearchBar'
import DrinkGrid from '../components/DrinkGrid'

import drinks from '../data/drinks'

// DrinkListPage: trang danh sách đầy đủ — tách biệt với MenuPage
function DrinkListPage({ onAddToOrder }) {
  const [isLoading, setIsLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const searchInputRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isLoading])

  const filteredDrinks = drinks.filter(
    (d) =>
      keyword === '' || d.name.toLowerCase().includes(keyword.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '65vh' }}>
        <div className="text-center p-5 rounded-4 shadow-sm" style={{ background: 'var(--cafe-card-bg)', border: '1px solid var(--cafe-card-border)' }}>
          <Spinner animation="border" variant="warning" style={{ width: '3.5rem', height: '3.5rem' }} className="mb-3" />
          <p className="text-muted font-heading fw-semibold mb-0">Đang đồng bộ danh sách thức uống...</p>
        </div>
      </div>
    )
  }

  return (
    <SectionWrapper
      title="📋 Tổng Hợp Danh Sách Đồ Uống"
      subtitle={`Tra cứu nhanh toàn bộ ${drinks.length} thức uống đang kinh doanh trong hệ thống CafeHub`}
    >
      <SearchBar ref={searchInputRef} onSearch={setKeyword} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted small font-heading">
          Tìm thấy <strong className="text-warning">{filteredDrinks.length}</strong> kết quả phù hợp
        </span>
        <Badge bg="secondary" className="rounded-pill px-3 py-1 font-heading opacity-75">
          Cập nhật mỗi ngày
        </Badge>
      </div>

      <DrinkGrid drinks={filteredDrinks} onAddToOrder={onAddToOrder} />
    </SectionWrapper>
  )
}

export default DrinkListPage
