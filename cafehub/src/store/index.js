import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'

/**
 * Tuần 10: Redux Store — cấu hình với cartReducer
 * Để dùng Redux thay CartContext, bọc App trong <Provider store={store}> tại main.jsx
 * và thay useCart() bằng useSelector/useDispatch trong các component
 */
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

export default store
