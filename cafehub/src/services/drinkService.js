import axios from 'axios'

// Tuần 8 & v3.2: Axios instance kết nối với json-server (cổng 3001)
const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor: log lỗi tập trung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg = error.response?.data?.message || error.message || 'Lỗi kết nối'
    console.error('[API Error]', msg, error)
    return Promise.reject(new Error(msg))
  }
)

/** Lấy tất cả đồ uống (hỗ trợ filter params: q, categoryId, featured...) */
export const getDrinks = async (params = {}) => {
  const response = await api.get('/drinks', { params })
  return response.data
}

/** Lấy chi tiết 1 đồ uống theo id */
export const getDrinkById = async (id) => {
  const response = await api.get(`/drinks/${id}`)
  return response.data
}

/** Tạo mới đồ uống */
export const createDrink = async (data) => {
  const response = await api.post('/drinks', data)
  return response.data
}

/** Cập nhật đồ uống theo id */
export const updateDrink = async (id, data) => {
  const response = await api.put(`/drinks/${id}`, data)
  return response.data
}

/** Xóa đồ uống theo id */
export const deleteDrink = async (id) => {
  const response = await api.delete(`/drinks/${id}`)
  return response.data
}

/** Lấy tất cả categories */
export const getCategories = async () => {
  const response = await api.get('/categories')
  return response.data
}

export default api
