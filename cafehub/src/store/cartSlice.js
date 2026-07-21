import { createSlice } from '@reduxjs/toolkit'

/**
 * Tuần 10: cartSlice — quản lý giỏ hàng bằng Redux Toolkit
 * RTK dùng Immer dưới nền => có thể viết "mutate" nhưng thực ra vẫn immutable
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    // Thêm món vào giỏ — nếu đã có thì tăng quantity
    addToCart(state, action) {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        // RTK + Immer: mutate trực tiếp nhưng KHÔNG vi phạm immutable
        // (Immer tạo bản copy immutable bên dưới)
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },

    // Xóa 1 món khỏi giỏ theo id
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },

    // Cập nhật số lượng (min = 1)
    updateQuantity(state, action) {
      const item = state.items.find((i) => i.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
      }
    },

    // Xóa toàn bộ giỏ hàng
    clearCart(state) {
      state.items = []
    },
  },
})

// Export actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectTotalItems = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
export const selectTotalPrice = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

export default cartSlice.reducer
