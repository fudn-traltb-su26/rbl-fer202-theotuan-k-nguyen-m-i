import { useState } from 'react'
import { Modal, Button, Table, Badge, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../services/orderService'

function CheckoutModal({ show, onHide, items, total, discount = 0, coupon = null, onConfirmComplete }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [orderType, setOrderType] = useState('dine-in')
  const [tableNumber, setTableNumber] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [completedOrder, setCompletedOrder] = useState(null)

  if (!show) return null

  const handleSubmitOrder = async () => {
    try {
      setSubmitting(true)
      const orderData = {
        items: items.map((item) => ({
          drinkId: item.id,
          name: item.name,
          image: item.image,
          options: item.options || null,
          finalPrice: item.finalPrice || item.price,
          quantity: item.quantity,
        })),
        orderType,
        tableNumber: orderType === 'dine-in' ? tableNumber : null,
        customerPhone: orderType === 'takeaway' ? customerPhone : null,
        customerName: customerName || 'Khách hàng',
        subtotal: total + discount,
        discount,
        couponCode: coupon?.code || null,
        total,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      const created = await createOrder(orderData)
      setCompletedOrder(created)
      setStep(3)
      if (onConfirmComplete) onConfirmComplete()
    } catch (err) {
      console.error('Lỗi tạo đơn:', err)
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!')
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setStep(1)
    setCompletedOrder(null)
    setOrderType('dine-in')
    setTableNumber('')
    setCustomerPhone('')
    setCustomerName('')
    onHide()
  }

  const goToMyOrders = () => {
    handleClose()
    navigate('/my-orders')
  }

  // Render options text
  const renderItemOptions = (item) => {
    if (!item.options) return null
    const { size, ice, sugar, toppingLabels } = item.options
    const parts = []
    if (size) parts.push(`Size ${size}`)
    if (ice) parts.push(`${ice} đá`)
    if (sugar) parts.push(`${sugar} đường`)
    if (toppingLabels?.length > 0) parts.push(toppingLabels.join(', '))
    return parts.length > 0 ? <div className="text-muted small">{parts.join(' • ')}</div> : null
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered contentClassName="rounded-4 border-0 shadow-lg overflow-hidden">
      <Modal.Header closeButton style={{ background: 'var(--cafe-surface)', borderBottom: '1px solid var(--cafe-card-border)' }}>
        <Modal.Title className="font-heading fw-bold fs-5 d-flex align-items-center gap-2">
          {step === 1 && '📋 Bước 1: Chọn hình thức phục vụ'}
          {step === 2 && '🧾 Bước 2: Xác nhận đơn hàng'}
          {step === 3 && '🎉 Đặt hàng thành công!'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4" style={{ background: 'var(--cafe-card-bg)' }}>
        {/* STEP 1: Chọn hình thức */}
        {step === 1 && (
          <div>
            <Form.Group className="mb-4">
              <Form.Label className="font-heading fw-bold">Tên khách hàng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên (không bắt buộc)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="rounded-pill"
              />
            </Form.Group>

            <div className="font-heading fw-bold mb-3">Hình thức phục vụ:</div>
            <div className="d-flex flex-column gap-3">
              {/* Dùng tại bàn */}
              <div
                className={`p-4 rounded-4 cursor-pointer transition-all ${orderType === 'dine-in' ? 'shadow' : ''}`}
                style={{
                  background: orderType === 'dine-in' ? 'rgba(255, 179, 0, 0.1)' : 'var(--cafe-surface)',
                  border: orderType === 'dine-in' ? '2px solid #ffb300' : '1px solid var(--cafe-card-border)',
                  cursor: 'pointer',
                }}
                onClick={() => setOrderType('dine-in')}
              >
                <div className="d-flex align-items-center gap-3 mb-2">
                  <span style={{ fontSize: '2rem' }}>🪑</span>
                  <div>
                    <div className="font-heading fw-bold fs-6">Dùng tại bàn (Dine-in)</div>
                    <div className="text-muted small">Phục vụ tại bàn — barista sẽ mang ra tận nơi</div>
                  </div>
                </div>
                {orderType === 'dine-in' && (
                  <Form.Group className="mt-3">
                    <Form.Label className="font-heading small fw-bold">Chọn số bàn:</Form.Label>
                    <div className="d-flex flex-wrap gap-2">
                      {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                        <button
                          key={num}
                          type="button"
                          className={`btn btn-sm rounded-pill px-3 py-2 font-heading fw-medium ${
                            tableNumber === String(num) ? 'btn-warning text-dark shadow-sm' : 'btn-outline-secondary'
                          }`}
                          onClick={(e) => { e.stopPropagation(); setTableNumber(String(num)) }}
                        >
                          Bàn {num}
                        </button>
                      ))}
                    </div>
                  </Form.Group>
                )}
              </div>

              {/* Mang về */}
              <div
                className={`p-4 rounded-4 cursor-pointer transition-all ${orderType === 'takeaway' ? 'shadow' : ''}`}
                style={{
                  background: orderType === 'takeaway' ? 'rgba(255, 179, 0, 0.1)' : 'var(--cafe-surface)',
                  border: orderType === 'takeaway' ? '2px solid #ffb300' : '1px solid var(--cafe-card-border)',
                  cursor: 'pointer',
                }}
                onClick={() => setOrderType('takeaway')}
              >
                <div className="d-flex align-items-center gap-3 mb-2">
                  <span style={{ fontSize: '2rem' }}>🥤</span>
                  <div>
                    <div className="font-heading fw-bold fs-6">Mang về (Takeaway)</div>
                    <div className="text-muted small">Lấy tại quầy — nhận thông báo khi đồ uống sẵn sàng</div>
                  </div>
                </div>
                {orderType === 'takeaway' && (
                  <Form.Group className="mt-3">
                    <Form.Label className="font-heading small fw-bold">Số điện thoại (Bắt buộc 9 chữ số):</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="VD: 901234567"
                      value={customerPhone}
                      maxLength={9}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 9)
                        setCustomerPhone(onlyDigits)
                      }}
                      className={`rounded-pill ${customerPhone.length > 0 && customerPhone.length !== 9 ? 'is-invalid border-danger' : customerPhone.length === 9 ? 'is-valid border-success' : ''}`}
                      onClick={(e) => e.stopPropagation()}
                    />
                    {customerPhone.length > 0 && customerPhone.length !== 9 && (
                      <div className="text-danger small font-heading mt-1">
                        ⚠️ Vui lòng nhập đúng chuỗi 9 chữ số điện thoại ({customerPhone.length}/9 số)
                      </div>
                    )}
                    {customerPhone.length === 9 && (
                      <div className="text-success small font-heading mt-1 fw-bold">
                        ✓ Số điện thoại hợp lệ
                      </div>
                    )}
                  </Form.Group>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Xác nhận */}
        {step === 2 && (
          <div>
            {/* Thông tin phục vụ */}
            <div className="p-3 rounded-4 mb-4 d-flex flex-wrap justify-content-between gap-3" style={{ background: 'var(--cafe-surface)', border: '1px solid var(--cafe-card-border)' }}>
              <div>
                <span className="text-muted small font-heading d-block">Hình thức:</span>
                <strong className="font-heading">{orderType === 'dine-in' ? `🪑 Bàn số ${tableNumber}` : '🥤 Mang về'}</strong>
              </div>
              {customerName && (
                <div>
                  <span className="text-muted small font-heading d-block">Khách hàng:</span>
                  <strong className="font-heading">{customerName}</strong>
                </div>
              )}
              {orderType === 'takeaway' && customerPhone && (
                <div>
                  <span className="text-muted small font-heading d-block">SĐT:</span>
                  <strong className="font-heading">{customerPhone}</strong>
                </div>
              )}
            </div>

            {/* Chi tiết món */}
            <h6 className="font-heading fw-bold text-uppercase small text-muted mb-2">Chi tiết đơn hàng:</h6>
            <div className="premium-table mb-4 overflow-auto rounded-4 border" style={{ borderColor: 'var(--cafe-card-border)' }}>
              <Table responsive className="align-middle text-nowrap table-sm mb-0">
                <thead style={{ background: 'var(--cafe-surface)' }}>
                  <tr>
                    <th className="py-2 px-3">Món</th>
                    <th className="py-2 text-center">SL</th>
                    <th className="py-2 text-end px-3">Tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.cartKey || item.id}>
                      <td className="py-3 px-3">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={item.image || `https://picsum.photos/seed/drink${item.id}/60/60`}
                            alt={item.name}
                            className="rounded-2 object-fit-cover"
                            style={{ width: '38px', height: '38px' }}
                          />
                          <div>
                            <div className="font-heading fw-bold">{item.name}</div>
                            {renderItemOptions(item)}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-center font-heading fw-semibold">x{item.quantity}</td>
                      <td className="py-3 text-end px-3 font-heading fw-extrabold text-danger">
                        {((item.finalPrice || item.price) * item.quantity).toLocaleString('vi-VN')}đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Tổng */}
            <div className="p-3 rounded-4" style={{ background: 'var(--cafe-surface)', border: '1px solid var(--cafe-card-border)' }}>
              {discount > 0 && (
                <>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="font-heading small">Tạm tính:</span>
                    <span className="font-heading">{(total + discount).toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="font-heading small text-success">🎫 Giảm giá ({coupon?.code}):</span>
                    <span className="font-heading text-success">-{discount.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <hr className="my-2 border-secondary-subtle" />
                </>
              )}
              <div className="d-flex justify-content-between">
                <span className="font-heading fw-bold fs-6">Tổng thanh toán:</span>
                <span className="font-heading fw-extrabold fs-4 text-danger">{total.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Thành công */}
        {step === 3 && completedOrder && (
          <div className="text-center py-3">
            <div style={{ fontSize: '4rem' }} className="mb-3">🎉</div>
            <h3 className="font-heading fw-bold text-success mb-2">Đặt hàng thành công!</h3>
            <div className="mb-4">
              <Badge bg="warning" text="dark" className="px-4 py-2 rounded-pill font-heading fs-5">
                Mã đơn: #CH-{String(completedOrder.id).padStart(4, '0')}
              </Badge>
            </div>
            <p className="text-muted font-heading mb-1">
              {orderType === 'dine-in'
                ? `Đồ uống sẽ được phục vụ tại Bàn ${tableNumber}. Vui lòng chờ trong giây lát!`
                : 'Đồ uống sẽ được chuẩn bị. Chúng tôi sẽ gọi bạn khi sẵn sàng!'}
            </p>
            <p className="text-muted font-heading small">
              Thời gian dự kiến: 5 - 10 phút ☕
            </p>
            <div className="p-3 rounded-4 mx-auto mt-3" style={{ maxWidth: '350px', background: 'var(--cafe-surface)', border: '1px solid var(--cafe-card-border)' }}>
              <div className="d-flex justify-content-between font-heading small mb-1">
                <span className="text-muted">Tổng thanh toán:</span>
                <span className="fw-bold text-danger">{total.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="d-flex justify-content-between font-heading small">
                <span className="text-muted">Trạng thái:</span>
                <Badge bg="info" className="rounded-pill">⏳ Chờ pha chế</Badge>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="p-3 d-flex justify-content-between" style={{ background: 'var(--cafe-surface)', borderTop: '1px solid var(--cafe-card-border)' }}>
        {step === 1 && (
          <>
            <Button variant="outline-secondary" className="rounded-pill px-4 font-heading" onClick={handleClose}>
              Hủy
            </Button>
            <button
              type="button"
              className="btn-premium-amber py-2 px-4 font-heading d-flex align-items-center gap-2"
              onClick={() => setStep(2)}
              disabled={(orderType === 'dine-in' && !tableNumber) || (orderType === 'takeaway' && customerPhone.length !== 9)}
            >
              Tiếp tục →
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <Button variant="outline-secondary" className="rounded-pill px-4 font-heading" onClick={() => setStep(1)}>
              ← Quay lại
            </Button>
            <button
              type="button"
              className="btn-premium-amber py-2 px-4 font-heading d-flex align-items-center gap-2"
              onClick={handleSubmitOrder}
              disabled={submitting}
            >
              {submitting ? 'Đang xử lý...' : '✓ Xác nhận đặt hàng'}
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <Button variant="outline-secondary" className="rounded-pill px-4 font-heading" onClick={handleClose}>
              Đóng
            </Button>
            <button
              type="button"
              className="btn-premium-amber py-2 px-4 font-heading d-flex align-items-center gap-2"
              onClick={goToMyOrders}
            >
              📋 Theo dõi đơn hàng
            </button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default CheckoutModal
