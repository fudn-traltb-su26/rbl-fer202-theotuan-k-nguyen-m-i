import { useState, useEffect } from 'react'
import { Container, Badge, Button, Alert, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getOrders, deleteOrder } from '../services/orderService'

const STATUS_MAP = {
  pending: { label: 'Chờ xác nhận', emoji: '⏳', bg: 'warning', text: 'dark', step: 1 },
  preparing: { label: 'Đang pha chế', emoji: '👨‍🍳', bg: 'info', text: 'white', step: 2 },
  ready: { label: 'Sẵn sàng', emoji: '✅', bg: 'success', text: 'white', step: 3 },
  completed: { label: 'Hoàn tất', emoji: '🎉', bg: 'secondary', text: 'white', step: 4 },
}

function MyOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getOrders({ _sort: '-createdAt' })
      setOrders(data)
    } catch (err) {
      setError('Không thể tải danh sách đơn hàng')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleCancel = async (orderId) => {
    if (!window.confirm('Bạn chắc chắn muốn hủy đơn hàng này?')) return
    try {
      await deleteOrder(orderId)
      setOrders((prev) => prev.filter((o) => o.id !== orderId))
    } catch (err) {
      alert('Lỗi khi hủy đơn hàng')
    }
  }

  // Timeline steps
  const renderTimeline = (status) => {
    const currentStep = STATUS_MAP[status]?.step || 1
    const steps = [
      { step: 1, label: 'Đã gửi đơn', emoji: '📝' },
      { step: 2, label: 'Đang pha chế', emoji: '👨‍🍳' },
      { step: 3, label: 'Sẵn sàng', emoji: '✅' },
      { step: 4, label: 'Hoàn tất', emoji: '🎉' },
    ]
    return (
      <div className="d-flex align-items-center gap-1 flex-wrap my-3">
        {steps.map((s, idx) => (
          <div key={s.step} className="d-flex align-items-center">
            <div
              className={`d-flex align-items-center justify-content-center rounded-circle ${
                s.step <= currentStep ? 'shadow-sm' : ''
              }`}
              style={{
                width: '36px',
                height: '36px',
                fontSize: '1rem',
                background: s.step <= currentStep ? (s.step === currentStep ? '#ffb300' : '#198754') : 'var(--cafe-surface)',
                border: `2px solid ${s.step <= currentStep ? (s.step === currentStep ? '#ffb300' : '#198754') : 'var(--cafe-card-border)'}`,
                color: s.step <= currentStep ? '#fff' : 'var(--cafe-card-border)',
                transition: 'all 0.3s',
              }}
            >
              {s.step <= currentStep ? s.emoji : s.step}
            </div>
            <span
              className={`ms-1 font-heading small d-none d-sm-inline ${
                s.step <= currentStep ? 'fw-bold' : 'text-muted'
              }`}
              style={{ fontSize: '0.72rem' }}
            >
              {s.label}
            </span>
            {idx < steps.length - 1 && (
              <div
                className="mx-2"
                style={{
                  width: '20px',
                  height: '2px',
                  background: s.step < currentStep ? '#198754' : 'var(--cafe-card-border)',
                  transition: 'all 0.3s',
                }}
              />
            )}
          </div>
        ))}
      </div>
    )
  }

  // Render options
  const renderItemOptions = (item) => {
    if (!item.options) return null
    const { size, ice, sugar, toppingLabels } = item.options
    const parts = []
    if (size) parts.push(`Size ${size}`)
    if (ice) parts.push(`${ice} đá`)
    if (sugar) parts.push(`${sugar} đường`)
    if (toppingLabels?.length > 0) parts.push(toppingLabels.join(', '))
    return parts.length > 0 ? <span className="text-muted small"> — {parts.join(', ')}</span> : null
  }

  return (
    <Container className="my-4 my-md-5">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4 pb-3 border-bottom border-secondary-subtle">
        <h1 className="font-heading fw-extrabold fs-3 mb-0 d-flex align-items-center gap-2">
          <span>📋 Đơn Hàng Của Tôi</span>
          <Badge bg="warning" text="dark" pill className="px-3 py-1 fs-6 font-heading">
            {orders.length} đơn
          </Badge>
        </h1>
        <Button variant="outline-secondary" size="sm" className="rounded-pill px-3 font-heading" onClick={fetchOrders}>
          🔄 Làm mới
        </Button>
      </div>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="warning" className="mb-3" />
          <p className="text-muted font-heading">Đang tải đơn hàng...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="rounded-4">
          {error}
          <Button variant="outline-danger" size="sm" className="ms-3 rounded-pill" onClick={fetchOrders}>
            Thử lại
          </Button>
        </Alert>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="text-center py-5 rounded-4" style={{ background: 'var(--cafe-surface)', border: '1px solid var(--cafe-card-border)' }}>
          <div style={{ fontSize: '4rem' }}>📭</div>
          <h4 className="font-heading fw-bold mt-3">Chưa có đơn hàng nào</h4>
          <p className="text-muted font-heading small mb-4">Hãy đặt đồ uống đầu tiên của bạn tại CafeHub ngay nào!</p>
          <Link to="/menu" className="btn-premium-amber text-decoration-none d-inline-block px-4 py-2 fs-6">
            Xem thực đơn →
          </Link>
        </div>
      )}

      {/* Danh sách đơn */}
      <div className="d-flex flex-column gap-4">
        {orders.map((order) => {
          const statusInfo = STATUS_MAP[order.status] || STATUS_MAP.pending
          return (
            <div
              key={order.id}
              className="rounded-4 shadow-sm overflow-hidden"
              style={{ background: 'var(--cafe-card-bg)', border: '1px solid var(--cafe-card-border)' }}
            >
              {/* Header */}
              <div className="p-3 d-flex flex-wrap justify-content-between align-items-center gap-2" style={{ background: 'var(--cafe-surface)', borderBottom: '1px solid var(--cafe-card-border)' }}>
                <div className="d-flex align-items-center gap-3">
                  <Badge bg="dark" className="rounded-pill px-3 py-2 font-heading">
                    #CH-{String(order.id).padStart(4, '0')}
                  </Badge>
                  <Badge bg={statusInfo.bg} text={statusInfo.text} className="rounded-pill px-3 py-2 font-heading">
                    {statusInfo.emoji} {statusInfo.label}
                  </Badge>
                </div>
                <div className="text-muted small font-heading">
                  {new Date(order.createdAt).toLocaleString('vi-VN')}
                </div>
              </div>

              {/* Timeline */}
              <div className="px-4">
                {renderTimeline(order.status)}
              </div>

              {/* Items */}
              <div className="px-4 pb-2">
                <div className="d-flex flex-column gap-1">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="d-flex justify-content-between align-items-center py-1 font-heading small" style={{ borderBottom: idx < order.items.length - 1 ? '1px dashed var(--cafe-card-border)' : 'none' }}>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={item.image || `https://picsum.photos/seed/drink${item.drinkId}/40/40`}
                          alt={item.name}
                          className="rounded-2 object-fit-cover"
                          style={{ width: '32px', height: '32px' }}
                        />
                        <span className="fw-medium">
                          {item.name} x{item.quantity}
                          {renderItemOptions(item)}
                        </span>
                      </div>
                      <span className="text-danger fw-bold">
                        {(item.finalPrice * item.quantity).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 d-flex flex-wrap justify-content-between align-items-center gap-2" style={{ background: 'var(--cafe-surface)', borderTop: '1px solid var(--cafe-card-border)' }}>
                <div className="font-heading small text-muted">
                  {order.orderType === 'dine-in' ? `🪑 Bàn ${order.tableNumber}` : `🥤 Mang về`}
                  {order.discount > 0 && ` • 🎫 Giảm ${order.discount.toLocaleString('vi-VN')}đ`}
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="font-heading fw-extrabold fs-5 text-danger">
                    {order.total.toLocaleString('vi-VN')}đ
                  </span>
                  {order.status === 'pending' && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="rounded-pill px-3 font-heading"
                      onClick={() => handleCancel(order.id)}
                    >
                      Hủy đơn
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Container>
  )
}

export default MyOrdersPage
