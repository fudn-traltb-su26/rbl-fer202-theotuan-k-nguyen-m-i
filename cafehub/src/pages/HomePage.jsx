import { useNavigate } from 'react-router-dom'
import Banner from '../components/Banner'
import SectionWrapper from '../components/SectionWrapper'
import CategoryList from '../components/CategoryList'
import DrinkGrid from '../components/DrinkGrid'

import categories from '../data/categories'
import drinks from '../data/drinks'

function HomePage({ onAddToOrder }) {
  const navigate = useNavigate()
  const featuredDrinks = drinks.filter((drink) => drink.featured)

  return (
    <>
      <Banner />

      <SectionWrapper
        title="Khám Phá Danh Mục"
        subtitle="Các nhóm thức uống đặc trưng được tinh tuyển theo phong cách riêng"
        backgroundColor="var(--cafe-surface)"
      >
        <CategoryList
          categories={categories}
          activeCategory={null}
          onSelectCategory={(id) => navigate(id ? `/menu?cat=${id}` : '/menu')}
        />
      </SectionWrapper>

      <SectionWrapper
        title="Món Nổi Bật & Được Yêu Thích Nhất"
        subtitle="Những hương vị nguyên bản được khách hàng ưa chuộng và đánh giá cao nhất tuần này"
      >
        <DrinkGrid drinks={featuredDrinks} onAddToOrder={onAddToOrder} />
      </SectionWrapper>
    </>
  )
}

export default HomePage