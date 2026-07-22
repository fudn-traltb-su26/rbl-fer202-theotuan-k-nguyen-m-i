import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Spinner, Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import CartNotification from './components/CartNotification'

// Tuần 10: React.lazy — code splitting theo route
const HomePage = lazy(() => import('./pages/HomePage'))
const MenuPage = lazy(() => import('./pages/MenuPage'))
const DrinkDetailPage = lazy(() => import('./pages/DrinkDetailPage'))
const DrinkListPage = lazy(() => import('./pages/DrinkListPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const MyOrdersPage = lazy(() => import('./pages/MyOrdersPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const DrinkManagePage = lazy(() => import('./pages/admin/DrinkManagePage'))
const OrderManagePage = lazy(() => import('./pages/admin/OrderManagePage'))

// Loading fallback
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

function App() {
  const location = useLocation()
  // v3.0: Trang chuyên biệt Barista KDS & Thu Ngân ẩn Header/Footer của web khách hàng
  const isDedicatedStaffPage = location.pathname.startsWith('/admin/orders')

  return (
    <>
      {!isDedicatedStaffPage && <Header />}
      {!isDedicatedStaffPage && <CartNotification />}

      <main className={isDedicatedStaffPage ? 'h-100 d-flex flex-column' : ''}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Trang chủ */}
            <Route path="/" element={<HomePage />} />

            {/* Thực đơn */}
            <Route path="/menu" element={<MenuPage />} />

            {/* Chi tiết đồ uống — Tuần 6: useParams */}
            <Route path="/menu/:id" element={<DrinkDetailPage />} />

            {/* Danh sách đầy đủ */}
            <Route path="/drinks" element={<DrinkListPage />} />

            {/* Giỏ hàng — Tuần 7: CartContext */}
            <Route path="/cart" element={<CartPage />} />

            {/* v2.0: Đơn hàng của tôi */}
            <Route path="/my-orders" element={<MyOrdersPage />} />

            {/* v2.0: Redirect route cũ /order sang /cart */}
            <Route path="/order" element={<Navigate to="/cart" replace />} />

            {/* Admin — Tuần 6: ProtectedRoute */}
            <Route
              path="/admin/drinks"
              element={
                <ProtectedRoute>
                  <DrinkManagePage />
                </ProtectedRoute>
              }
            />

            {/* v3.0: Staff Portal — Thu Ngân POS & Barista KDS */}
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute>
                  <OrderManagePage />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {!isDedicatedStaffPage && <Footer />}
    </>
  )
}

export default App