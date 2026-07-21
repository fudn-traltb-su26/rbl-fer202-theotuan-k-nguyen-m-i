import { useState, useEffect } from 'react'

/**
 * Tuần 9: useLocalStorage — đồng bộ state với localStorage
 * Interface giống useState: trả về [value, setValue]
 * @param {string} key - Key trong localStorage
 * @param {any} initialValue - Giá trị khởi tạo nếu chưa có trong localStorage
 */
function useLocalStorage(key, initialValue) {
  // Lazy init: đọc từ localStorage một lần duy nhất khi khởi tạo
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn('[useLocalStorage] Không thể đọc localStorage:', error)
      return initialValue
    }
  })

  // Lắng nghe sự kiện để đồng bộ thời gian thực giữa tất cả các component cùng dùng key này
  useEffect(() => {
    const handleStorageChange = (e) => {
      const eventKey = e.key || (e.detail && e.detail.key)
      if (eventKey === key) {
        try {
          const item = localStorage.getItem(key)
          const parsed = item ? JSON.parse(item) : initialValue
          setStoredValue(parsed)
        } catch (error) {
          console.error('[useLocalStorage] Lỗi đồng bộ sự kiện:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('local-storage-update', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('local-storage-update', handleStorageChange)
    }
  }, [key, initialValue])

  // setValue: cập nhật cả React state và localStorage, đồng thời phát sự kiện đồng bộ
  const setValue = (value) => {
    try {
      // 1. Luôn đọc dữ liệu mới nhất trực tiếp từ localStorage trước khi tính toán
      // Giúp tránh hoàn toàn lỗi stale closure khi có nhiều thẻ món ăn (DrinkCard) trên cùng 1 trang
      const currentItem = localStorage.getItem(key)
      const latestValue = currentItem ? JSON.parse(currentItem) : initialValue

      // 2. Hỗ trợ functional update từ giá trị mới nhất
      const valueToStore =
        typeof value === 'function' ? value(latestValue) : value

      // 3. Ghi xuống localStorage
      localStorage.setItem(key, JSON.stringify(valueToStore))

      // 4. Cập nhật state local ngay cho component hiện tại
      setStoredValue(valueToStore)

      // 5. Phát sự kiện CustomEvent để tất cả các component khác đang dùng useLocalStorage(key) tự động đồng bộ ngay lập tức
      window.dispatchEvent(
        new CustomEvent('local-storage-update', {
          detail: { key, value: valueToStore },
        })
      )
    } catch (error) {
      console.warn('[useLocalStorage] Không thể ghi localStorage:', error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
