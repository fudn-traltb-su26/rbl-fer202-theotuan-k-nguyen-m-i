import { useState, useRef, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
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
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <Spinner animation="border" variant="dark" className="mb-3" />
          <p className="text-muted">Đang tải thực đơn...</p>
        </div>
      </div>
    )
  }

  return (
    <SectionWrapper
      title="☕ Thực đơn CafeHub"
      subtitle={`Tìm kiếm, lọc món và tạo phiếu gọi món — ${drinks.length} món đang có`}
    >
      {/* Tuần 7: ref truyền vào SearchBar → focus sau khi load */}
      <SearchBar onSearch={setKeyword} ref={searchRef} />

      <div className="mb-4">
        <CategoryList
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* Kết quả lọc */}
      <p className="text-muted small mb-3">
        Hiển thị <strong>{filteredDrinks.length}</strong> / {drinks.length} món
      </p>

      <DrinkGrid drinks={filteredDrinks} onAddToOrder={onAddToOrder} />
    </SectionWrapper>
  )
}

export default MenuPage