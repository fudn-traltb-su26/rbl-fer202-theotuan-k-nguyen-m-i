import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor log lỗi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg = error.response?.data?.message || error.message || 'Lỗi kết nối API'
    console.error('[OrderService Error]', msg, error)
    return Promise.reject(new Error(msg))
  }
)

/** Lấy danh sách đơn hàng từ json-server */
export const getOrders = async (params = {}) => {
  const queryParams = { ...params }
  // Chuẩn hóa cú pháp sắp xếp cho json-server v1+ (_sort: '-createdAt')
  if (queryParams._order === 'desc' && queryParams._sort === 'createdAt') {
    delete queryParams._order
    queryParams._sort = '-createdAt'
  } else if (!queryParams._sort) {
    queryParams._sort = '-createdAt'
  }

  const response = await api.get('/orders', { params: queryParams })
  return response.data
}

/** Lấy chi tiết 1 đơn hàng theo id */
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`)
  return response.data
}

/** Tạo đơn hàng mới */
export const createOrder = async (data) => {
  const newOrder = {
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  const response = await api.post('/orders', newOrder)
  return response.data
}

/** Cập nhật trạng thái đơn hàng */
export const updateOrderStatus = async (id, status) => {
  const response = await api.patch(`/orders/${id}`, {
    status,
    updatedAt: new Date().toISOString(),
  })
  return response.data
}

/** Xóa / hủy đơn hàng */
export const deleteOrder = async (id) => {
  const response = await api.delete(`/orders/${id}`)
  return response.data
}

// --- Reviews ---

/** Lấy reviews cho 1 đồ uống */
export const getReviewsByDrinkId = async (drinkId) => {
  const response = await api.get('/reviews', {
    params: {
      drinkId,
      _sort: '-createdAt',
    },
  })
  return response.data
}

/** Tạo review mới */
export const createReview = async (data) => {
  const newReview = {
    ...data,
    createdAt: new Date().toISOString(),
  }
  const response = await api.post('/reviews', newReview)
  return response.data
}

// --- Coupons ---

/** Kiểm tra và lấy thông tin mã giảm giá */
export const validateCoupon = async (code) => {
  if (!code) throw new Error('Vui lòng nhập mã giảm giá')
  const cleanCode = code.trim().toUpperCase()
  const response = await api.get('/coupons', { params: { code: cleanCode } })
  const coupons = response.data

  if (!coupons || coupons.length === 0) {
    throw new Error('Mã giảm giá không tồn tại')
  }

  const coupon = coupons[0]
  if (!coupon.active) {
    throw new Error('Mã giảm giá đã bị khóa hoặc hết hạn')
  }
  if (coupon.usedCount >= coupon.usageLimit) {
    throw new Error('Mã giảm giá đã hết lượt sử dụng')
  }
  if (new Date(coupon.expiresAt) < new Date()) {
    throw new Error('Mã giảm giá đã quá hạn')
  }

  return coupon
}

/** Tính toán số tiền giảm */
export const calculateDiscount = (coupon, orderTotal) => {
  if (orderTotal < coupon.minOrderAmount) {
    return {
      discount: 0,
      error: `Đơn hàng tối thiểu ${coupon.minOrderAmount.toLocaleString('vi-VN')}đ để dùng mã này`,
    }
  }

  let discount = 0
  if (coupon.discountType === 'percent') {
    discount = Math.round((orderTotal * coupon.discountValue) / 100)
    if (coupon.maxDiscount) {
      discount = Math.min(discount, coupon.maxDiscount)
    }
  } else if (coupon.discountType === 'fixed') {
    discount = coupon.discountValue
  }

  return { discount, error: null }
}

export default {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getReviewsByDrinkId,
  createReview,
  validateCoupon,
  calculateDiscount,
}
