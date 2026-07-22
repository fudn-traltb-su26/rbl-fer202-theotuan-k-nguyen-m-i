import { useState, useMemo } from 'react'
import { Modal, Button, Badge, Form } from 'react-bootstrap'

// Tuỳ chọn cấu hình
const SIZE_OPTIONS = [
  { value: 'S', label: 'Size S', extra: 0 },
  { value: 'M', label: 'Size M', extra: 5000 },
  { value: 'L', label: 'Size L', extra: 10000 },
]

const ICE_OPTIONS = [
  { value: '100%', label: '100% Đá' },
  { value: '50%', label: '50% Đá' },
  { value: '30%', label: '30% Ít đá' },
  { value: '0%', label: 'Không đá' },
]

const SUGAR_OPTIONS = [
  { value: '100%', label: '100% Đường' },
  { value: '70%', label: '70% Đường' },
  { value: '50%', label: '50% Đường' },
  { value: '30%', label: '30% Đường' },
  { value: '0%', label: 'Không đường' },
]

const TOPPING_OPTIONS = [
  { value: 'tran-chau', label: 'Trân châu đen', extra: 5000 },
  { value: 'thach-cafe', label: 'Thạch cà phê', extra: 5000 },
  { value: 'kem-cheese', label: 'Kem Cheese', extra: 10000 },
  { value: 'pudding', label: 'Pudding trứng', extra: 8000 },
  { value: 'tran-chau-trang', label: 'Trân châu trắng', extra: 5000 },
]

function DrinkCustomizeModal({ show, onHide, drink, onAddToCart }) {
  const [size, setSize] = useState('S')
  const [ice, setIce] = useState('100%')
  const [sugar, setSugar] = useState('100%')
  const [toppings, setToppings] = useState([])
  const [quantity, setQuantity] = useState(1)

  const toggleTopping = (value) => {
    setToppings((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    )
  }

  // Tính giá real-time
  const sizeExtra = SIZE_OPTIONS.find((s) => s.value === size)?.extra || 0
  const toppingExtra = useMemo(
    () => toppings.reduce((sum, t) => sum + (TOPPING_OPTIONS.find((o) => o.value === t)?.extra || 0), 0),
    [toppings]
  )
  const unitPrice = drink ? drink.price + sizeExtra + toppingExtra : 0
  const totalPrice = unitPrice * quantity

  const handleConfirm = () => {
    if (!drink) return
    const toppingLabels = toppings.map((t) => TOPPING_OPTIONS.find((o) => o.value === t)?.label || t)
    const cartItem = {
      ...drink,
      cartKey: `${drink.id}_${size}_${ice}_${sugar}_${toppings.sort().join('-')}`,
      options: { size, ice, sugar, toppings, toppingLabels },
      finalPrice: unitPrice,
      quantity,
    }
    onAddToCart(cartItem)
    // Reset
    setSize('S')
    setIce('100%')
    setSugar('100%')
    setToppings([])
    setQuantity(1)
    onHide()
  }

  if (!drink) return null

  return (
    <Modal show={show} onHide={onHide} centered size="lg" contentClassName="rounded-4 border-0 shadow-lg overflow-hidden">
      <Modal.Header closeButton style={{ background: 'var(--cafe-surface)', borderBottom: '1px solid var(--cafe-card-border)' }}>
        <Modal.Title className="font-heading fw-bold fs-5 d-flex align-items-center gap-2">
          <span>☕ Tuỳ Biến Món</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0" style={{ background: 'var(--cafe-card-bg)' }}>
        <div className="row g-0">
          {/* Ảnh + Tên món */}
          <div className="col-md-5 p-4 d-flex flex-column align-items-center justify-content-center" style={{ background: 'var(--cafe-surface)' }}>
            <img
              src={drink.image || `https://picsum.photos/seed/drink${drink.id}/300/300`}
              alt={drink.name}
              className="rounded-4 shadow mb-3 object-fit-cover"
              style={{ width: '100%', maxWidth: '220px', height: '220px' }}
            />
            <h5 className="font-heading fw-bold text-center mb-1">{drink.name}</h5>
            <p className="text-muted small text-center mb-2">{drink.description}</p>
            <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill font-heading fs-6">
              Giá gốc: {drink.price.toLocaleString('vi-VN')}đ
            </Badge>
          </div>

          {/* Form tuỳ chọn */}
          <div className="col-md-7 p-4">
            {/* Size */}
            <div className="mb-3">
              <label className="font-heading fw-bold small text-uppercase text-muted mb-2 d-block">
                Kích cỡ (Size)
              </label>
              <div className="d-flex gap-2 flex-wrap">
                {SIZE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-2 font-heading fw-medium transition-all ${
                      size === opt.value
                        ? 'btn-warning text-dark shadow-sm'
                        : 'btn-outline-secondary'
                    }`}
                    onClick={() => setSize(opt.value)}
                  >
                    {opt.label}
                    {opt.extra > 0 && <span className="ms-1 opacity-75">+{opt.extra.toLocaleString('vi-VN')}đ</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Đá */}
            <div className="mb-3">
              <label className="font-heading fw-bold small text-uppercase text-muted mb-2 d-block">
                🧊 Mức đá
              </label>
              <div className="d-flex gap-2 flex-wrap">
                {ICE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-2 font-heading fw-medium transition-all ${
                      ice === opt.value
                        ? 'btn-info text-white shadow-sm'
                        : 'btn-outline-secondary'
                    }`}
                    onClick={() => setIce(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Đường */}
            <div className="mb-3">
              <label className="font-heading fw-bold small text-uppercase text-muted mb-2 d-block">
                🍯 Mức đường
              </label>
              <div className="d-flex gap-2 flex-wrap">
                {SUGAR_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-2 font-heading fw-medium transition-all ${
                      sugar === opt.value
                        ? 'btn-success text-white shadow-sm'
                        : 'btn-outline-secondary'
                    }`}
                    onClick={() => setSugar(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Topping */}
            <div className="mb-3">
              <label className="font-heading fw-bold small text-uppercase text-muted mb-2 d-block">
                🧋 Topping (chọn nhiều)
              </label>
              <div className="d-flex flex-column gap-2">
                {TOPPING_OPTIONS.map((opt) => (
                  <Form.Check
                    key={opt.value}
                    type="checkbox"
                    id={`topping-${opt.value}`}
                    label={
                      <span className="font-heading small">
                        {opt.label}{' '}
                        <span className="text-warning fw-bold">+{opt.extra.toLocaleString('vi-VN')}đ</span>
                      </span>
                    }
                    checked={toppings.includes(opt.value)}
                    onChange={() => toggleTopping(opt.value)}
                    className="user-select-none"
                  />
                ))}
              </div>
            </div>

            {/* Số lượng */}
            <div className="mb-3">
              <label className="font-heading fw-bold small text-uppercase text-muted mb-2 d-block">
                Số lượng
              </label>
              <div
                className="d-inline-flex align-items-center gap-2 p-1 rounded-pill"
                style={{ background: 'var(--cafe-surface)', border: '1px solid var(--cafe-card-border)' }}
              >
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '32px', height: '32px' }}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="fw-bold font-heading px-3 fs-5">{quantity}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '32px', height: '32px' }}
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>

      {/* Footer — Tổng giá + Nút thêm */}
      <Modal.Footer className="p-3 d-flex justify-content-between align-items-center" style={{ background: 'var(--cafe-surface)', borderTop: '1px solid var(--cafe-card-border)' }}>
        <div>
          <div className="small text-muted font-heading">Tổng cộng:</div>
          <div className="font-heading fw-extrabold fs-4 text-danger">
            {totalPrice.toLocaleString('vi-VN')}đ
          </div>
          {(sizeExtra > 0 || toppingExtra > 0) && (
            <div className="text-muted small font-heading">
              ({drink.price.toLocaleString('vi-VN')}
              {sizeExtra > 0 && ` + size ${(sizeExtra).toLocaleString('vi-VN')}`}
              {toppingExtra > 0 && ` + topping ${(toppingExtra).toLocaleString('vi-VN')}`}
              ) × {quantity}
            </div>
          )}
        </div>
        <button
          type="button"
          className="btn-premium-amber py-3 px-4 font-heading fs-6 fw-bold d-flex align-items-center gap-2"
          onClick={handleConfirm}
        >
          <span>🛒 Thêm vào giỏ hàng</span>
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default DrinkCustomizeModal
