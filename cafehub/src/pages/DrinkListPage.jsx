import { useState, useRef, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'

import SectionWrapper from '../components/SectionWrapper'
import SearchBar from '../components/SearchBar'
import DrinkGrid from '../components/DrinkGrid'

import drinks from '../data/drinks'

// DrinkListPage: trang danh sách đầy đủ — tách biệt với MenuPage
// Dùng useRef để auto-focus SearchBar sau khi load (Tuần 7)
function DrinkListPage({ onAddToOrder }) {
  const [isLoading, setIsLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const searchInputRef = useRef(null)

  // useEffect Tuần 7: giả lập loading + cleanup
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  // Tuần 7: useRef focus sau khi load xong
  useEffect(() => {
    if (!isLoading && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isLoading])

  // Tuần 4: derived state lọc theo keyword
  const filteredDrinks = drinks.filter(
    (d) =>
      keyword === '' || d.name.toLowerCase().includes(keyword.toLowerCase())
  )

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '60vh' }}
      >
        <div className="text-center">
          <Spinner animation="border" variant="dark" className="mb-3" />
          <p className="text-muted">Đang tải danh sách...</p>
        </div>
      </div>
    )
  }

  return (
    <SectionWrapper
      title="📋 Danh sách đồ uống"
      subtitle={`Tất cả ${drinks.length} món trong thực đơn`}
    >
      {/* SearchBar với ref để auto-focus (Tuần 7) */}
      <SearchBar ref={searchInputRef} onSearch={setKeyword} />

      <p className="text-muted small mb-3">
        Hiển thị <strong>{filteredDrinks.length}</strong> / {drinks.length} món
      </p>

      <DrinkGrid drinks={filteredDrinks} onAddToOrder={onAddToOrder} />
    </SectionWrapper>
  )
}

export default DrinkListPage
