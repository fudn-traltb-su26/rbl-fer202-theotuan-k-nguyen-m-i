import { useEffect, useRef, useState } from 'react'
import SearchBar from '../components/SearchBar'
import DrinkGrid from '../components/DrinkGrid'
import SectionWrapper from '../components/SectionWrapper'

function DrinkListPage() {
  const [isLoading, setIsLoading] = useState(true)
  const searchInputRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      searchInputRef.current?.focus()
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container py-4">
      <SectionWrapper title="Danh sách đồ uống">
        {isLoading ? (
          <div className="alert alert-info">Đang tải dữ liệu...</div>
        ) : (
          <>
            <SearchBar ref={searchInputRef} />
            <DrinkGrid />
          </>
        )}
      </SectionWrapper>
    </div>
  )
}

export default DrinkListPage
