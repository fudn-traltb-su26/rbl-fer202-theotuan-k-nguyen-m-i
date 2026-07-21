import { lazy, Suspense, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Spinner, Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import CartNotification from './components/CartNotification'

// Tuần 10: React.lazy — code splitting theo route
// Mỗi page chỉ được tải khi user navigate đến route đó (không load trước)
const HomePage = lazy(() => import('./pages/HomePage'))
const MenuPage = lazy(() => import('./pages/MenuPage'))
const DrinkDetailPage = lazy(() => import('./pages/DrinkDetailPage'))
const DrinkListPage = lazy(() => import('./pages/DrinkListPage'))
const OrderPage = lazy(() => import('./pages/OrderPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const DrinkManagePage = lazy(() => import('./pages/admin/DrinkManagePage'))

// Loading fallback — hiển thị khi chunk đang được tải
function PageLoader() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '60vh' }}
    >
      <div className="text-center">
        <Spinner animation="border" variant="dark" className="mb-3" />
        <p className="text-muted">Đang tải trang...</p>
      </div>
    </Container>
  )
}

// isAdmin: Tuần 6 ProtectedRoute — set true để test admin page
const IS_ADMIN = true

function App() {
  // --- State Tuần 4: Giỏ hàng / Phiếu gọi món ---
  // (Tuần 7 chuyển sang CartContext cho useCart();
  //  Tuần 10: có thể migrate sang Redux store/cartSlice.js)
  const [orderItems, setOrderItems] = useState([])

  const handleAddToOrder = (drink) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.id === drink.id)
      if (existing) {
        return prev.map((i) =>
          i.id === drink.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...drink, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (id, quantity) => {
    setOrderItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i))
        .filter((i) => i.quantity > 0)
    )
  }

  const handleRemove = (id) => {
    setOrderItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <>
      {/* Header — Tuần 7: useCart() context, không cần props */}
      <Header />
      <CartNotification />

      <main>
        {/* Tuần 10: Suspense bọc quanh Routes để hiển thị fallback khi lazy load */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Trang chủ */}
            <Route path="/" element={<HomePage onAddToOrder={handleAddToOrder} />} />

            {/* Thực đơn */}
            <Route path="/menu" element={<MenuPage onAddToOrder={handleAddToOrder} />} />

            {/* Chi tiết đồ uống — Tuần 6: useParams */}
            <Route
              path="/menu/:id"
              element={<DrinkDetailPage onAddToOrder={handleAddToOrder} />}
            />

            {/* Danh sách đầy đủ */}
            <Route path="/drinks" element={<DrinkListPage />} />

            {/* Phiếu gọi món tạm */}
            <Route
              path="/order"
              element={
                <OrderPage
                  orderItems={orderItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                  onClearOrder={() => setOrderItems([])}
                />
              }
            />

            {/* Giỏ hàng — Tuần 7: CartContext */}
            <Route path="/cart" element={<CartPage />} />

            {/* Admin — Tuần 6: ProtectedRoute */}
            <Route
              path="/admin/drinks"
              element={
                <ProtectedRoute isAllowed={IS_ADMIN} redirectTo="/">
                  <DrinkManagePage />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  )
}

export default App