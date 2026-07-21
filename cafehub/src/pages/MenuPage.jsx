import { useState, useRef, useEffect } from 'react'
import { Spinner, Badge } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'

import SectionWrapper from '../components/SectionWrapper'
import CategoryList from '../components/CategoryList'
import SearchBar from '../components/SearchBar'
import DrinkGrid from '../components/DrinkGrid'

import categories from '../data/categories'
import drinks from '../data/drinks'

// Tuần 4: state filter keyword + activeCategory
// Tuần 7: useRef auto-focus SearchBar khi trang load
function MenuPage({ onAddToOrder }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [keyword, setKeyword] = useState('')
  const [activeCategory, setActiveCategory] = useState(() => {
    const cat = searchParams.get('cat')
    return cat ? Number(cat) : null
  })
  const [isLoading, setIsLoading] = useState(true)

  const handleSelectCategory = (id) => {
    setActiveCategory(id)
    if (id) {
      setSearchParams({ cat: id })
    } else {
      setSearchParams({})
    }
  }

  // Tuần 7: useRef — tham chiếu đến SearchBar input để focus
  const searchRef = useRef(null)

  // Tuần 7: useEffect — giả lập loading, sau khi xong thì focus vào SearchBar
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer) // cleanup — Tuần 7
  }, [])

  // Tuần 7: focus SearchBar khi loading kết thúc
  useEffect(() => {
    if (!isLoading && searchRef.current) {
      searchRef.current.focus()
    }
  }, [isLoading])

  // Tuần 4: derived state — lọc dựa trên keyword + category
  const filteredDrinks = drinks.filter((drink) => {
    const matchKeyword =
      keyword === '' ||
      drink.name.toLowerCase().includes(keyword.toLowerCase())

    const matchCategory =
      activeCategory === null || drink.categoryId === activeCategory

    return matchKeyword && matchCategory
  })

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '65vh' }}>
        <div className="text-center p-5 rounded-4 shadow-sm" style={{ background: 'var(--cafe-card-bg)', border: '1px solid var(--cafe-card-border)' }}>
          <Spinner animation="border" variant="warning" style={{ width: '3.5rem', height: '3.5rem' }} className="mb-3" />
          <p className="text-muted font-heading fw-semibold mb-0">Đang chuẩn bị thực đơn hảo hạng...</p>
        </div>
      </div>
    )
  }

  return (
    <SectionWrapper
      title="☕ Thực Đơn Thức Uống Đặc Sắc"
      subtitle="Khám phá trọn bộ hương vị hảo hạng được chế biến từ công thức độc quyền CafeHub"
    >
      {/* Tuần 7: ref truyền vào SearchBar → focus sau khi load */}
      <SearchBar onSearch={setKeyword} ref={searchRef} />

      <div className="mb-4 pb-2 border-bottom border-secondary-subtle">
        <CategoryList
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* Kết quả lọc */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted small font-heading">
          Hiển thị <strong className="text-warning">{filteredDrinks.length}</strong> / {drinks.length} thức uống
        </span>
        {activeCategory && (
          <Badge bg="warning" text="dark" className="rounded-pill px-3 py-1 font-heading">
            Đang lọc theo danh mục #{activeCategory}
          </Badge>
        )}
      </div>

      <DrinkGrid drinks={filteredDrinks} onAddToOrder={onAddToOrder} />
    </SectionWrapper>
  )
}

export default MenuPage