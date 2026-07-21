import { Modal, Button, Table, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function CheckoutModal({ show, onHide, items, total, title = 'Xác Nhận Đơn Hàng Thành Công', isKitchenOrder = false, onConfirmComplete }) {
  const navigate = useNavigate()
  const orderId = `CH-${Math.floor(1000 + Math.random() * 9000)}`
  const timeStr = new Date().toLocaleString('vi-VN')

  if (!show) return null

  const handleFinish = () => {
    if (onConfirmComplete) onConfirmComplete()
    onHide()
    navigate('/')
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered contentClassName="rounded-4 border-0 shadow-lg overflow-hidden" style={{ backdropFilter: 'blur(8px)' }}>
      <Modal.Header closeButton style={{ background: 'var(--cafe-surface)', borderBottom: '1px solid var(--cafe-card-border)' }}>
        <Modal.Title className="font-heading fw-bold fs-4 d-flex align-items-center gap-2">
          <span>{isKitchenOrder ? '👨‍🍳 Gửi Phiếu Vào Bếp Thành Công' : '🎉 Đặt Hàng & Thanh Toán Thành Công'}</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4 font-body" style={{ background: 'var(--cafe-card-bg)' }}>
        {/* Banner cảm ơn */}
        <div className="p-4 rounded-4 text-center mb-4 border border-warning border-opacity-50" style={{ background: 'rgba(255, 179, 0, 0.1)' }}>
          <h4 className="font-heading fw-bold text-warning mb-2">
            {isKitchenOrder ? 'Phiếu món đã được chuyển đến khu vực pha chế!' : 'Cảm ơn bạn đã lựa chọn thưởng thức tại CafeHub ☕'}
          </h4>
          <p className="small mb-0 opacity-85 font-heading">
            {isKitchenOrder
              ? 'Nhân viên bar đang chuẩn bị đồ uống cho bàn của bạn. Thời gian dự kiến: 5 - 8 phút.'
              : 'Đơn hàng của bạn đã được hệ thống ghi nhận và đang trong quá trình chuẩn bị ưu tiên.'}
          </p>
        </div>

        {/* Thông tin hóa đơn */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 p-3 rounded-4 mb-4" style={{ background: 'var(--cafe-surface)', border: '1px solid var(--cafe-card-border)' }}>
          <div>
            <span className="text-muted small d-block font-heading">Mã số hóa đơn:</span>
            <strong className="font-heading fs-5 text-warning">#{orderId}</strong>
          </div>
          <div>
            <span className="text-muted small d-block font-heading">Thời gian ghi nhận:</span>
            <strong className="font-heading small">{timeStr}</strong>
          </div>
          <div>
            <span className="text-muted small d-block font-heading">Trạng thái:</span>
            <Badge bg="success" className="rounded-pill px-3 py-1 font-heading">
              {isKitchenOrder ? '⏳ Đang pha chế' : '✅ Đã thanh toán / chờ phục vụ'}
            </Badge>
          </div>
        </div>

        {/* Bảng chi tiết món ăn */}
        <h6 className="font-heading fw-bold text-uppercase small text-muted mb-2">Chi tiết món đã chọn:</h6>
        <div className="premium-table mb-4 overflow-auto rounded-4 border" style={{ borderColor: 'var(--cafe-card-border)' }}>
          <Table responsive className="align-middle text-nowrap table-sm mb-0">
            <thead style={{ background: 'var(--cafe-surface)', borderBottom: '1px solid var(--cafe-card-border)' }}>
              <tr>
                <th className="py-2 px-3">Tên thức uống</th>
                <th className="py-2 text-center">Số lượng</th>
                <th className="py-2 text-end px-3">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--cafe-card-border)' }}>
                  <td className="py-3 px-3 font-heading fw-bold">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={item.image || `https://picsum.photos/seed/drink${item.id}/60/60`}
                        alt={item.name}
                        className="rounded-2 object-fit-cover"
                        style={{ width: '38px', height: '38px' }}
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-center font-heading fw-semibold">x{item.quantity}</td>
                  <td className="py-3 text-end px-3 font-heading fw-extrabold text-danger">
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Tổng thanh toán */}
        <div className="d-flex justify-content-between align-items-center p-3 rounded-4" style={{ background: 'var(--cafe-surface)', border: '1px solid var(--cafe-card-border)' }}>
          <span className="font-heading fw-bold fs-6">Tổng Thanh Toán Hóa Đơn:</span>
          <span className="font-heading fw-extrabold fs-4 text-danger">
            {total.toLocaleString('vi-VN')}đ
          </span>
        </div>
      </Modal.Body>

      <Modal.Footer className="p-3 d-flex justify-content-between" style={{ background: 'var(--cafe-surface)', borderTop: '1px solid var(--cafe-card-border)' }}>
        <Button
          variant="outline-secondary"
          className="rounded-pill px-4 font-heading small d-flex align-items-center gap-2"
          onClick={() => window.print()}
        >
          <span>🖨️</span>
          <span>In Phiếu / Tải Hóa Đơn</span>
        </Button>
        <button
          type="button"
          className="btn-premium-amber py-2 px-4 font-heading d-flex align-items-center gap-2"
          onClick={handleFinish}
        >
          <span>✓ Hoàn Tất & Quay Lại Trang Chủ</span>
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default CheckoutModal
