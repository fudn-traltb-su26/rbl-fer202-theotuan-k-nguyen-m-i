import { useState, useEffect } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CartNotification() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handleItemAdded = (e) => {
      const drink = e.detail
      if (!drink) return

      const newToast = {
        id: Date.now() + Math.random(),
        drink,
      }

      setToasts((prev) => [...prev, newToast])
    }

    window.addEventListener('cart-item-added', handleItemAdded)
    return () => window.removeEventListener('cart-item-added', handleItemAdded)
  }, [])

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 9999, position: 'fixed' }}>
      {toasts.map((item) => (
        <Toast
          key={item.id}
          onClose={() => removeToast(item.id)}
          show={true}
          delay={4000}
          autohide
          className="rounded-4 shadow-lg border-0 overflow-hidden"
          style={{ background: 'var(--cafe-card-bg)', borderLeft: '5px solid #ffb300' }}
        >
          <Toast.Header closeButton style={{ background: 'var(--cafe-surface)', borderBottom: '1px solid var(--cafe-card-border)' }}>
            <span className="fs-5 me-2">🎉</span>
            <strong className="me-auto font-heading text-warning">Đã thêm vào giỏ!</strong>
            <small className="text-muted font-heading">Vừa xong</small>
          </Toast.Header>
          <Toast.Body className="d-flex align-items-center justify-content-between gap-3 p-3 font-body">
            <div className="d-flex align-items-center gap-2">
              <img
                src={item.drink.image || `https://picsum.photos/seed/drink${item.drink.id}/80/80`}
                alt={item.drink.name}
                className="rounded-3 object-fit-cover"
                style={{ width: '45px', height: '45px' }}
              />
              <div>
                <div className="fw-bold font-heading small text-truncate" style={{ maxWidth: '160px' }}>
                  {item.drink.name}
                </div>
                <div className="text-danger small fw-semibold font-heading">
                  +1 phần ({item.drink.price.toLocaleString('vi-VN')}đ)
                </div>
              </div>
            </div>
            <Link
              to="/cart"
              className="btn btn-sm btn-dark rounded-pill px-3 font-heading small fw-bold text-nowrap"
              onClick={() => removeToast(item.id)}
            >
              Xem giỏ →
            </Link>
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  )
}

export default CartNotification
