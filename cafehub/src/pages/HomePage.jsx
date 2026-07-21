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
        title="Danh mục thực đơn"
        subtitle="Các nhóm đồ uống đang kinh doanh"
        backgroundColor="#fff8e1"
      >
        <CategoryList
          categories={categories}
          activeCategory={null}
          onSelectCategory={(id) => navigate(id ? `/menu?cat=${id}` : '/menu')}
        />
      </SectionWrapper>

      <SectionWrapper
        title="Món nổi bật"
        subtitle="Những món được khách hàng gọi nhiều"
      >
        <DrinkGrid drinks={featuredDrinks} onAddToOrder={onAddToOrder} />
      </SectionWrapper>
    </>
  )
}

export default HomePage