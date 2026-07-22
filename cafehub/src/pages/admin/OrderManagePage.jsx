import { useState, useEffect, useMemo } from 'react'
import { Container, Badge, Button, Spinner, Alert, Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getOrders, updateOrderStatus, deleteOrder } from '../../services/orderService'
import { useAuth } from '../../context/AuthContext'

function OrderManagePage() {
  const navigate = useNavigate()
  const { switchRole, auth } = useAuth()

  // Tab chính: 'cashier' (Thu ngân & Phục vụ) | 'kds' (Barista KDS)
  const [station, setStation] = useState('kds')

  // Sub-tab cho Thu ngân: 'pending' (Đơn mới) | 'ready' (Chờ bưng món) | 'history' (Lịch sử & Doanh thu)
  const [cashierTab, setCashierTab] = useState('pending')

  // Chế độ hiển thị cho Barista KDS: 'order' (Từng phiếu) | 'batch' (Gom món nhóm)
  const [kdsViewMode, setKdsViewMode] = useState('order')

  // Danh sách đơn hàng từ server
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  // Trạng thái tick từng món trong KDS (lưu tạm trong bộ nhớ theo orderId_itemIdx)
  const [checkedItems, setCheckedItems] = useState({})

  // Đồng hồ thời gian thực mỗi giây cho SLA đếm ngược và đồng hồ ca
  const [currentTime, setCurrentTime] = useState(new Date())

  // Tải đơn hàng
  const fetchOrders = async () => {
    try {
      setLoading(true)
      const data = await getOrders({ _sort: '-createdAt' })
      setOrders(data)
    } catch (err) {
      console.error('Lỗi tải đơn hàng KDS:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
    // Auto-refresh mỗi 3 giây từ json-server (cổng 3001)
    const interval = setInterval(fetchOrders, 3000)
    return () => clearInterval(interval)
  }, [])

  // Cập nhật đồng hồ mỗi giây
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Thao tác chuyển đổi trạng thái API
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o
        )
      )
    } catch (err) {
      alert('Lỗi khi cập nhật trạng thái đơn')
    }
  }

  const handleApproveAllPending = async () => {
    for (const o of pendingOrders) {
      await handleStatusChange(o.id, 'preparing')
    }
  }

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm(`Xác nhận hủy/từ chối đơn hàng #CH-${String(orderId).padStart(4, '0')}?`)) return
    try {
      await deleteOrder(orderId)
      setOrders((prev) => prev.filter((o) => o.id !== orderId))
    } catch (err) {
      alert('Lỗi khi hủy đơn hàng')
    }
  }

  // Chuyển về web khách hàng
  const handleBackToCustomer = () => {
    switchRole('customer')
    navigate('/')
  }

  // Bật/tắt toàn màn hình
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  // Toggle tick item trong KDS
  const toggleItemCheck = (orderId, idx) => {
    const key = `${orderId}_${idx}`
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // Phân loại đơn hàng theo trạng thái
  const pendingOrders = useMemo(() => orders.filter((o) => o.status === 'pending'), [orders])
  const preparingOrders = useMemo(() => orders.filter((o) => o.status === 'preparing'), [orders])
  const readyOrders = useMemo(() => orders.filter((o) => o.status === 'ready'), [orders])
  const completedOrders = useMemo(() => {
    const today = new Date().toDateString()
    return orders.filter((o) => o.status === 'completed' && new Date(o.createdAt).toDateString() === today)
  }, [orders])

  const todayRevenue = useMemo(
    () => completedOrders.reduce((sum, o) => sum + (o.total || 0), 0),
    [completedOrders]
  )

  // Tính SLA (thời gian đã chờ từ createdAt) tính bằng giây
  const getWaitSeconds = (createdAt) => {
    const created = new Date(createdAt).getTime()
    const now = currentTime.getTime()
    return Math.max(0, Math.floor((now - created) / 1000))
  }

  // Định dạng mm:ss cho đồng hồ đếm SLA
  const formatWaitTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`
  }

  // Cảnh báo màu theo SLA (<5 phút xanh, 5-10 phút vàng, >10 phút đỏ)
  const getSlaStatus = (seconds) => {
    if (seconds >= 600) return { bg: '#dc3545', color: '#fff', label: '🔴 KHẨN CẤP (>10 phút)', border: '2px solid #dc3545' }
    if (seconds >= 300) return { bg: '#ffc107', color: '#000', label: '🟡 CHÚ Ý (5-10 phút)', border: '2px solid #ffc107' }
    return { bg: '#198754', color: '#fff', label: '🟢 BÌNH THƯỜNG (<5 phút)', border: '1px solid #2b3040' }
  }

  // Gom món (Batch View) cho Barista
  const batchedItems = useMemo(() => {
    const map = {}
    preparingOrders.forEach((order) => {
      order.items?.forEach((item) => {
        const optStr = item.options
          ? [
              item.options.size ? `Size ${item.options.size}` : '',
              item.options.ice && item.options.ice !== '100%' ? `${item.options.ice} đá` : '',
              item.options.sugar && item.options.sugar !== '100%' ? `${item.options.sugar} đường` : '',
              ...(item.options.toppingLabels || []),
            ].filter(Boolean).join(' • ')
          : 'Mặc định'

        const key = `${item.name}__${optStr}`
        if (!map[key]) {
          map[key] = {
            name: item.name,
            optionsText: optStr,
            totalQuantity: 0,
            fromOrders: [],
          }
        }
        map[key].totalQuantity += item.quantity
        if (!map[key].fromOrders.includes(`Bàn ${order.tableNumber || 'Takeaway'}`)) {
          map[key].fromOrders.push(`CH-${String(order.id).padStart(4, '0')} (${order.tableNumber ? 'Bàn ' + order.tableNumber : 'Mang về'})`)
        }
      })
    })
    return Object.values(map)
  }, [preparingOrders])

  // Helper hiển thị options món
  const renderOptionsText = (item) => {
    if (!item.options) return null
    const { size, ice, sugar, toppingLabels } = item.options
    const parts = []
    if (size) parts.push(`Size ${size}`)
    if (ice && ice !== '100%') parts.push(`${ice} đá`)
    if (sugar && sugar !== '100%') parts.push(`${sugar} đường`)
    if (toppingLabels?.length > 0) parts.push(...toppingLabels)
    return parts.length > 0 ? (
      <div className="text-warning small font-heading" style={{ fontSize: '0.82rem', marginTop: '2px' }}>
        └ {parts.join(' • ')}
      </div>
    ) : null
  }

  if (loading && orders.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100 vh-100" style={{ background: '#0e1117', color: '#fff' }}>
        <div className="text-center">
          <Spinner animation="border" variant="warning" style={{ width: '4rem', height: '4rem' }} className="mb-3" />
          <h3 className="font-heading fw-bold">Đang Khởi Động Trạm POS / KDS Barista...</h3>
          <p className="text-muted">Đồng bộ hóa dữ liệu từ quầy pha chế...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="d-flex flex-column w-100 min-vh-100 font-heading"
      style={{ background: '#0e1117', color: '#f1ebd9', overflowX: 'hidden' }}
    >
      {/* =========================================================
          TOP BAR: KDS / POS DEDICATED HEADER
         ========================================================= */}
      <header
        className="px-4 py-3 d-flex flex-wrap justify-content-between align-items-center shadow-lg"
        style={{ background: '#1c1f2b', borderBottom: '2px solid rgba(255, 179, 0, 0.4)' }}
      >
        {/* Trái: Tên trạm & Đồng hồ */}
        <div className="d-flex align-items-center gap-4">
          <div className="d-flex align-items-center gap-2">
            <span
              className="d-flex align-items-center justify-content-center rounded-3 fw-bold"
              style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #ffb300, #ff8f00)', color: '#000', fontSize: '1.4rem' }}
            >
              ⚡
            </span>
            <div>
              <h1 className="fs-5 fw-extrabold mb-0 text-white" style={{ letterSpacing: '0.5px' }}>
                CAFEHUB <span style={{ color: '#ffb300' }}>STAFF PORTAL</span>
              </h1>
              <div className="text-muted small d-flex align-items-center gap-2" style={{ fontSize: '0.75rem' }}>
                <span>{station === 'kds' ? '☕ Barista Kitchen KDS v3.0' : '🖥️ Thu Ngân & Phục Vụ POS'}</span>
                <span>•</span>
                <span className="text-info fw-bold">
                  🕒 {currentTime.toLocaleTimeString('vi-VN')}
                </span>
              </div>
            </div>
          </div>

          {/* CHUYỂN TRẠM LÀM VIỆC (STATION SWITCHER) */}
          <div className="d-flex rounded-pill p-1" style={{ background: '#0e1117', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-4 fw-bold transition-all d-flex align-items-center gap-2 ${
                station === 'cashier' ? 'btn-warning text-dark shadow' : 'text-light border-0'
              }`}
              style={{ background: station === 'cashier' ? '#ffb300' : 'transparent', fontSize: '0.9rem' }}
              onClick={() => setStation('cashier')}
            >
              <span>🖥️ Trạm 1: Thu Ngân POS</span>
              {(pendingOrders.length > 0 || readyOrders.length > 0) && (
                <Badge bg="danger" text="white" pill className="px-2 py-1">
                  {pendingOrders.length + readyOrders.length}
                </Badge>
              )}
            </button>

            <button
              type="button"
              className={`btn btn-sm rounded-pill px-4 fw-bold transition-all d-flex align-items-center gap-2 ${
                station === 'kds' ? 'btn-warning text-dark shadow' : 'text-light border-0'
              }`}
              style={{ background: station === 'kds' ? '#ffb300' : 'transparent', fontSize: '0.9rem' }}
              onClick={() => setStation('kds')}
            >
              <span>☕ Trạm 2: Barista KDS</span>
              {preparingOrders.length > 0 && (
                <Badge bg={preparingOrders.some(o => getWaitSeconds(o.createdAt) >= 600) ? 'danger' : 'info'} text="white" pill className="px-2 py-1">
                  {preparingOrders.length}
                </Badge>
              )}
            </button>
          </div>
        </div>

        {/* Phải: Các nút điều khiển */}
        <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={fetchOrders}
            className="rounded-pill px-3 text-light border-secondary"
            title="Làm mới dữ liệu từ server"
          >
            🔄 Làm mới
          </Button>

          <Button
            variant="outline-light"
            size="sm"
            onClick={toggleFullscreen}
            className="rounded-pill px-3 border-secondary"
          >
            ⛶ Toàn màn hình
          </Button>

          <Button
            variant="outline-warning"
            size="sm"
            onClick={handleBackToCustomer}
            className="rounded-pill px-3 fw-semibold"
          >
            ← Về Web Khách
          </Button>
        </div>
      </header>

      {/* =========================================================
          NỘI DUNG TRẠM LÀM VIỆC CHÍNH
         ========================================================= */}
      <main className="flex-grow-1 p-3 p-md-4">
        {/* ---------------------------------------------------------
            TRẠM 1: THU NGÂN POS & PHỤC VỤ (CASHIER STATION)
           --------------------------------------------------------- */}
        {station === 'cashier' && (
          <div>
            {/* Sub-tabs cho Thu ngân */}
            <div className="d-flex gap-3 mb-4 border-bottom pb-3" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Button
                variant={cashierTab === 'pending' ? 'warning' : 'outline-secondary'}
                className="rounded-pill px-4 fw-bold d-flex align-items-center gap-2"
                onClick={() => setCashierTab('pending')}
              >
                <span>📥 Đơn Mới Đặt (Chờ Duyệt)</span>
                {pendingOrders.length > 0 && <Badge bg="danger">{pendingOrders.length}</Badge>}
              </Button>

              <Button
                variant={cashierTab === 'ready' ? 'success' : 'outline-secondary'}
                className="rounded-pill px-4 fw-bold d-flex align-items-center gap-2 text-white"
                onClick={() => setCashierTab('ready')}
              >
                <span>🔔 Sẵn Sàng Trả Khách</span>
                {readyOrders.length > 0 && <Badge bg="light" text="dark">{readyOrders.length}</Badge>}
              </Button>

              <Button
                variant={cashierTab === 'history' ? 'info' : 'outline-secondary'}
                className="rounded-pill px-4 fw-bold text-white"
                onClick={() => setCashierTab('history')}
              >
                📊 Lịch Sử & Doanh Thu Ca ({completedOrders.length} đơn)
              </Button>
            </div>

            {/* Sub-tab 1: Đơn Mới Đặt (Pending) */}
            {cashierTab === 'pending' && (
              <div>
                {pendingOrders.length === 0 ? (
                  <div className="text-center py-5 rounded-4 border" style={{ background: '#1c1f2b', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: '3.5rem' }}>✨</div>
                    <h4 className="fw-bold mt-2 text-muted">Hiện không có đơn mới nào</h4>
                    <p className="small text-muted mb-0">Đơn khách đặt từ Web hoặc quét QR tại bàn sẽ tự động hiển thị ở đây.</p>
                  </div>
                ) : (
                  <div className="row g-3">
                    {pendingOrders.map((order) => (
                      <div key={order.id} className="col-12 col-md-6 col-lg-4">
                        <div
                          className="p-3 rounded-4 h-100 d-flex flex-column justify-content-between shadow"
                          style={{ background: '#1c1f2b', border: '2px solid #ffc107' }}
                        >
                          <div>
                            {/* Header phiếu */}
                            <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-secondary">
                              <Badge bg="warning" text="dark" className="fs-6 px-3 py-1 rounded-pill">
                                #CH-{String(order.id).padStart(4, '0')}
                              </Badge>
                              <span className="small text-warning fw-bold">
                                🕒 {new Date(order.createdAt).toLocaleTimeString('vi-VN')}
                              </span>
                            </div>

                            {/* Bàn / Takeaway */}
                            <div className="mb-3">
                              <div className="fs-5 fw-extrabold text-white">
                                {order.orderType === 'dine-in' ? `🪑 Bàn số ${order.tableNumber}` : '🥤 Mang về (Takeaway)'}
                              </div>
                              <div className="small text-muted">
                                Khách: <strong className="text-light">{order.customerName || 'Khách hàng'}</strong>
                                {order.customerPhone && ` • SĐT: ${order.customerPhone}`}
                              </div>
                            </div>

                            {/* Danh sách món */}
                            <div className="p-2 rounded-3 mb-3" style={{ background: '#131620' }}>
                              {order.items?.map((item, idx) => (
                                <div key={idx} className="py-1 border-bottom border-secondary border-opacity-25 last-border-0">
                                  <div className="d-flex justify-content-between fw-bold text-white">
                                    <span>{item.name}</span>
                                    <span className="text-warning">x{item.quantity}</span>
                                  </div>
                                  {renderOptionsText(item)}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tổng & Nút thao tác */}
                          <div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span className="text-muted">Thanh toán:</span>
                              <span className="fs-4 fw-extrabold text-danger">
                                {order.total?.toLocaleString('vi-VN')}đ
                              </span>
                            </div>
                            <div className="d-flex gap-2">
                              <Button
                                variant="warning"
                                className="w-100 py-2 fw-extrabold text-dark shadow"
                                onClick={() => handleStatusChange(order.id, 'preparing')}
                              >
                                ✓ DUYỆT & GỬI BẾP →
                              </Button>
                              <Button
                                variant="outline-danger"
                                className="py-2 px-3 fw-bold"
                                onClick={() => handleCancelOrder(order.id)}
                                title="Hủy / Từ chối đơn"
                              >
                                ✕
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sub-tab 2: Sẵn Sàng Trả Khách (Ready) */}
            {cashierTab === 'ready' && (
              <div>
                {readyOrders.length === 0 ? (
                  <div className="text-center py-5 rounded-4 border" style={{ background: '#1c1f2b', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: '3.5rem' }}>🛎️</div>
                    <h4 className="fw-bold mt-2 text-muted">Chưa có món nào sẵn sàng để phục vụ</h4>
                    <p className="small text-muted mb-0">Khi Barista pha chế xong và bấm "Trả Món", phiếu sẽ xuất hiện tại đây để bưng ra bàn/gọi số.</p>
                  </div>
                ) : (
                  <div className="row g-3">
                    {readyOrders.map((order) => (
                      <div key={order.id} className="col-12 col-md-6 col-lg-4">
                        <div
                          className="p-3 rounded-4 h-100 d-flex flex-column justify-content-between shadow"
                          style={{ background: '#1c1f2b', border: '2px solid #198754' }}
                        >
                          <div>
                            <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-secondary">
                              <Badge bg="success" className="fs-6 px-3 py-1 rounded-pill">
                                ✅ XONG • #CH-{String(order.id).padStart(4, '0')}
                              </Badge>
                              <span className="small text-success fw-bold">Sẵn sàng!</span>
                            </div>

                            <div className="mb-3">
                              <div className="fs-4 fw-extrabold text-success">
                                {order.orderType === 'dine-in' ? `🪑 BÀN SỐ ${order.tableNumber}` : '🥤 MANG VỀ (Gọi số)'}
                              </div>
                              <div className="small text-muted">
                                Khách: <strong className="text-light">{order.customerName}</strong>
                                {order.customerPhone && <span className="text-warning fw-bold d-block mt-1">📞 SĐT: {order.customerPhone}</span>}
                              </div>
                            </div>

                            <div className="p-2 rounded-3 mb-3" style={{ background: '#131620' }}>
                              {order.items?.map((item, idx) => (
                                <div key={idx} className="py-1">
                                  <div className="d-flex justify-content-between fw-bold text-white">
                                    <span>{item.name}</span>
                                    <span className="text-success">x{item.quantity}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span className="text-muted">Thành tiền:</span>
                              <span className="fs-5 fw-extrabold text-white">
                                {order.total?.toLocaleString('vi-VN')}đ
                              </span>
                            </div>
                            <Button
                              variant="success"
                              className="w-100 py-3 fs-6 fw-extrabold text-white shadow"
                              onClick={() => handleStatusChange(order.id, 'completed')}
                            >
                              🎉 ĐÃ PHỤC VỤ & CHỐT ĐƠN ✓
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sub-tab 3: Lịch Sử & Doanh Thu Ca (History) */}
            {cashierTab === 'history' && (
              <div>
                {/* Banner Thống kê nhanh */}
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-4">
                    <div className="p-4 rounded-4 text-center" style={{ background: '#1c1f2b', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div className="small text-muted fw-bold text-uppercase">📦 Tổng đơn hoàn tất ca nay</div>
                      <div className="fs-2 fw-extrabold text-info mt-2">{completedOrders.length} đơn</div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="p-4 rounded-4 text-center" style={{ background: '#1c1f2b', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div className="small text-muted fw-bold text-uppercase">💰 Doanh thu ca hiện tại</div>
                      <div className="fs-2 fw-extrabold text-danger mt-2">{todayRevenue.toLocaleString('vi-VN')}đ</div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="p-4 rounded-4 text-center" style={{ background: '#1c1f2b', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div className="small text-muted fw-bold text-uppercase">🪑 Dine-in vs 🥤 Takeaway</div>
                      <div className="fs-4 fw-bold text-warning mt-2">
                        {completedOrders.filter(o => o.orderType === 'dine-in').length} bàn / {completedOrders.filter(o => o.orderType === 'takeaway').length} mang về
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danh sách đơn hoàn tất */}
                <h5 className="fw-bold mb-3">Lịch Sử Các Đơn Đã Phục Vụ Hôm Nay:</h5>
                <div className="d-flex flex-column gap-2">
                  {completedOrders.length === 0 && (
                    <div className="text-center py-4 text-muted">Chưa có đơn nào hoàn tất trong ngày.</div>
                  )}
                  {completedOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-3 rounded-4 d-flex flex-wrap justify-content-between align-items-center gap-3"
                      style={{ background: '#1c1f2b', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <Badge bg="secondary" className="px-3 py-2 fs-6 rounded-pill">
                          #CH-{String(order.id).padStart(4, '0')}
                        </Badge>
                        <div>
                          <div className="fw-bold text-white">
                            {order.orderType === 'dine-in' ? `🪑 Bàn ${order.tableNumber}` : '🥤 Mang về'} — {order.customerName}
                          </div>
                          <div className="small text-muted">
                            {order.items?.map(i => `${i.name} (${i.quantity})`).join(', ')}
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fs-5 fw-extrabold text-danger">{order.total?.toLocaleString('vi-VN')}đ</div>
                        <div className="small text-muted">{new Date(order.updatedAt || order.createdAt).toLocaleTimeString('vi-VN')}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------------
            TRẠM 2: QUẦY PHA CHẾ BARISTA KDS (KITCHEN DISPLAY SYSTEM)
           --------------------------------------------------------- */}
        {station === 'kds' && (
          <div>
            {/* THÔNG BÁO KHẨN: NẾU CÓ ĐƠN MỚI ĐẶT CHỜ DUYỆT BÊN THU NGÂN */}
            {pendingOrders.length > 0 && (
              <div
                className="p-3 rounded-4 mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #ffb300, #ff8f00)', color: '#000', border: '2px solid #fff' }}
              >
                <div className="d-flex align-items-center gap-3">
                  <span style={{ fontSize: '2.2rem' }}>🔔</span>
                  <div>
                    <div className="fs-5 fw-extrabold">
                      CÓ {pendingOrders.length} ĐƠN MỚI (`PENDING`) ĐANG CHỜ PHÊ DUYỆT BÊN THU NGÂN!
                    </div>
                    <div className="small fw-semibold">
                      Khách vừa đặt món từ Web/QR. Bạn có thể duyệt ngay tại đây để chuyển thẳng vào quầy pha chế KDS.
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant="dark"
                    className="rounded-pill px-4 py-2 fw-extrabold text-warning shadow d-flex align-items-center gap-2"
                    onClick={handleApproveAllPending}
                  >
                    <span>⚡ DUYỆT TẤT CẢ ({pendingOrders.length} ĐƠN) → PHA CHẾ</span>
                  </Button>
                  <Button
                    variant="outline-dark"
                    className="rounded-pill px-3 py-2 fw-bold"
                    onClick={() => { setStation('cashier'); setCashierTab('pending') }}
                  >
                    Xem từng đơn →
                  </Button>
                </div>
              </div>
            )}

            {/* Thanh điều khiển phụ của Barista */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4 pb-3 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              {/* Nút chuyển chế độ xem (Order vs Batch) */}
              <div className="d-flex gap-2">
                <Button
                  variant={kdsViewMode === 'order' ? 'warning' : 'outline-secondary'}
                  size="lg"
                  className="rounded-pill px-4 fw-extrabold d-flex align-items-center gap-2"
                  onClick={() => setKdsViewMode('order')}
                >
                  <span>📋 CHẾ ĐỘ PHIẾU ĐƠN (ORDER VIEW)</span>
                  <Badge bg="dark" text="warning" pill>{preparingOrders.length}</Badge>
                </Button>

                <Button
                  variant={kdsViewMode === 'batch' ? 'info' : 'outline-secondary'}
                  size="lg"
                  className="rounded-pill px-4 fw-extrabold text-white d-flex align-items-center gap-2"
                  onClick={() => setKdsViewMode('batch')}
                >
                  <span>⚡ GOM MÓN NHÓM (BATCH VIEW)</span>
                  <Badge bg="dark" text="white" pill>{batchedItems.length}</Badge>
                </Button>
              </div>

              {/* Chú thích màu SLA */}
              <div className="d-flex gap-3 small fw-bold">
                <span className="text-success">🟢 &lt;5 phút (Tiêu chuẩn)</span>
                <span className="text-warning">🟡 5-10 phút (Chú ý)</span>
                <span className="text-danger">🔴 &gt;10 phút (KHẨN CẤP!)</span>
              </div>
            </div>

            {/* KDS VIEW MODE 1: PHIẾU ĐƠN (TICKET GRID) */}
            {kdsViewMode === 'order' && (
              <div>
                {preparingOrders.length === 0 ? (
                  <div className="text-center py-5 rounded-4 border my-4" style={{ background: '#1c1f2b', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: '4.5rem' }}>☕</div>
                    <h3 className="fw-bold mt-3 text-white">Quầy Bar Đang Rảnh — Chưa Có Phiếu Nào!</h3>
                    <p className="text-muted fs-6">Khi thu ngân xác nhận đơn từ khách, phiếu pha chế sẽ tự động bùng nổ tại đây với thời gian chờ real-time.</p>
                  </div>
                ) : (
                  <div className="row g-3 g-xl-4">
                    {preparingOrders.map((order) => {
                      const waitSecs = getWaitSeconds(order.createdAt)
                      const sla = getSlaStatus(waitSecs)

                      return (
                        <div key={order.id} className="col-12 col-md-6 col-xl-4">
                          <div
                            className="p-3 rounded-4 h-100 d-flex flex-column justify-content-between shadow-lg"
                            style={{
                              background: '#1c1f2b',
                              border: sla.border,
                              boxShadow: waitSecs >= 600 ? '0 0 20px rgba(220, 53, 69, 0.4)' : 'none',
                            }}
                          >
                            <div>
                              {/* KDS Ticket Header với Đồng hồ SLA */}
                              <div
                                className="p-2 rounded-3 mb-3 d-flex justify-content-between align-items-center"
                                style={{ background: sla.bg, color: sla.color }}
                              >
                                <div>
                                  <span className="fs-5 fw-extrabold">#CH-{String(order.id).padStart(4, '0')}</span>
                                  <span className="ms-2 small fw-bold">
                                    ({order.orderType === 'dine-in' ? `Bàn ${order.tableNumber}` : 'Mang về'})
                                  </span>
                                </div>
                                <div className="fs-5 fw-extrabold d-flex align-items-center gap-1">
                                  <span>🕒</span>
                                  <span>{formatWaitTime(waitSecs)}</span>
                                </div>
                              </div>

                              {/* Ghi chú khách */}
                              {order.customerName && (
                                <div className="small text-muted mb-2 px-1">
                                  Khách: <strong className="text-light">{order.customerName}</strong>
                                </div>
                              )}

                              {/* Danh sách món lớn có checkbox gạch chéo */}
                              <div className="d-flex flex-column gap-2 mb-3">
                                {order.items?.map((item, idx) => {
                                  const isChecked = checkedItems[`${order.id}_${idx}`]
                                  return (
                                    <div
                                      key={idx}
                                      className="p-3 rounded-3 cursor-pointer transition-all d-flex align-items-start justify-content-between"
                                      style={{
                                        background: isChecked ? 'rgba(25, 135, 84, 0.15)' : '#131620',
                                        border: isChecked ? '1px solid #198754' : '1px solid rgba(255,255,255,0.08)',
                                        textDecoration: isChecked ? 'line-through' : 'none',
                                        opacity: isChecked ? 0.65 : 1,
                                      }}
                                      onClick={() => toggleItemCheck(order.id, idx)}
                                    >
                                      <div className="d-flex align-items-start gap-3">
                                        {/* Checkbox vuông lớn */}
                                        <div
                                          className="d-flex align-items-center justify-content-center rounded mt-1"
                                          style={{
                                            width: '26px',
                                            height: '26px',
                                            background: isChecked ? '#198754' : 'transparent',
                                            border: '2px solid #ffb300',
                                            color: '#fff',
                                            fontSize: '1rem',
                                            fontWeight: 'bold',
                                          }}
                                        >
                                          {isChecked ? '✓' : ''}
                                        </div>
                                        <div>
                                          <div className="fs-5 fw-extrabold text-white">
                                            {item.name}
                                          </div>
                                          {renderOptionsText(item)}
                                        </div>
                                      </div>

                                      <div className="fs-4 fw-extrabold text-warning ms-2">
                                        x{item.quantity}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>

                            {/* Nút Khổng Lồ TRẢ MÓN / READY */}
                            <button
                              type="button"
                              className="btn btn-success w-100 py-3 rounded-3 fs-5 fw-extrabold shadow d-flex align-items-center justify-content-center gap-2"
                              style={{ letterSpacing: '0.5px' }}
                              onClick={() => handleStatusChange(order.id, 'ready')}
                            >
                              <span>🔔 TRẢ MÓN / PHA XONG</span>
                              <span>→</span>
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* KDS VIEW MODE 2: GOM MÓN NHÓM (BATCH VIEW) */}
            {kdsViewMode === 'batch' && (
              <div>
                {batchedItems.length === 0 ? (
                  <div className="text-center py-5 rounded-4 border my-4" style={{ background: '#1c1f2b', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: '4.5rem' }}>⚡</div>
                    <h3 className="fw-bold mt-3 text-white">Không Có Món Nào Đang Chờ Pha Chế</h3>
                  </div>
                ) : (
                  <div className="row g-3">
                    {batchedItems.map((batch, idx) => (
                      <div key={idx} className="col-12 col-md-6 col-lg-4">
                        <div
                          className="p-4 rounded-4 h-100 d-flex flex-column justify-content-between shadow"
                          style={{ background: '#1c1f2b', border: '2px solid #0dcaf0' }}
                        >
                          <div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <span className="fs-4 fw-extrabold text-info">{batch.name}</span>
                              <Badge bg="warning" text="dark" className="fs-4 px-3 py-2 rounded-pill fw-extrabold">
                                Tổng: {batch.totalQuantity} phần
                              </Badge>
                            </div>

                            <div className="p-3 rounded-3 mb-3" style={{ background: '#131620' }}>
                              <div className="small text-muted text-uppercase fw-bold mb-1">Cấu hình tuỳ biến chung:</div>
                              <div className="fs-6 fw-bold text-warning">{batch.optionsText}</div>
                            </div>

                            <div>
                              <div className="small text-muted text-uppercase fw-bold mb-1">Đang cần cho các phiếu:</div>
                              <div className="d-flex flex-wrap gap-1">
                                {batch.fromOrders.map((ordStr, i) => (
                                  <Badge key={i} bg="dark" className="border border-info text-info px-2 py-1 fs-6">
                                    {ordStr}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default OrderManagePage
