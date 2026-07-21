import { useState, useEffect } from 'react'

/**
 * Tuần 9: useDebounce — trì hoãn cập nhật value sau khi user ngừng gõ
 * @param {any} value - Giá trị cần debounce (thường là keyword tìm kiếm)
 * @param {number} delay - Thời gian trì hoãn (ms), mặc định 400ms
 * @returns {any} debouncedValue — giá trị sau khi trì hoãn
 */
function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Đặt timer — chỉ cập nhật debouncedValue sau khi ngừng gõ `delay`ms
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup: hủy timer nếu value thay đổi trước khi hết delay
    // => Đây là lý do tại sao gõ liên tục không trigger request lặp lại
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
