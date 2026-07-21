import { useState } from 'react'

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
      // localStorage có thể bị block trong private mode
      console.warn('[useLocalStorage] Không thể đọc localStorage:', error)
      return initialValue
    }
  })

  // setValue: cập nhật cả React state và localStorage
  const setValue = (value) => {
    try {
      // Hỗ trợ functional update: setValue(prev => [...prev, newItem])
      const valueToStore =
        typeof value === 'function' ? value(storedValue) : value

      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn('[useLocalStorage] Không thể ghi localStorage:', error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
