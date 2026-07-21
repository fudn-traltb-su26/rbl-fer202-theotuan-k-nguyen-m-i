import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

/**
 * Tuần 9: useFetch — Custom hook gọi API với trạng thái loading/error/data
 * @param {string} url - URL endpoint
 * @param {object} params - Query params (filter, search...)
 * @returns {{ data, loading, error, refetch }}
 */
function useFetch(url, params = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Serialize params để dependency array hoạt động đúng
  const paramsKey = JSON.stringify(params)

  const fetchData = useCallback(async () => {
    if (!url) return

    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(url, { params })
      setData(response.data)
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Lỗi kết nối'
      setError(msg)
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, paramsKey])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export default useFetch
