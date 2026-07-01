import { useState } from 'react'

import SectionWrapper from '../components/SectionWrapper'
import CategoryList from '../components/CategoryList'
import SearchBar from '../components/SearchBar'
import DrinkGrid from '../components/DrinkGrid'

import categories from '../data/categories'
import drinks from '../data/drinks'

function MenuPage({ onAddToOrder }) {
  const [keyword, setKeyword] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

  const filteredDrinks = drinks.filter((drink) => {
    const matchKeyword =
      keyword === '' ||
      drink.name.toLowerCase().includes(keyword.toLowerCase())

    const matchCategory =
      activeCategory === null || drink.categoryId === activeCategory

    return matchKeyword && matchCategory
  })

  return (
    <SectionWrapper
      title="Thực đơn CafeHub"
      subtitle="Tìm kiếm, lọc món và tạo phiếu gọi món tạm"
    >
      <SearchBar onSearch={setKeyword} />

      <div className="mb-4">
        <CategoryList
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      <DrinkGrid drinks={filteredDrinks} onAddToOrder={onAddToOrder} />
    </SectionWrapper>
  )
}

export default MenuPage