import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { validateCoupon, calculateDiscount } from '../services/orderService'

function CouponInput({ orderTotal, onApply, onRemove }) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [applied, setApplied] = useState(null) // coupon object

  const handleApply = async (e) => {
    e.preventDefault()
    if (!code.trim()) return
    try {
      setLoading(true)
      setError('')
      const coupon = await validateCoupon(code.trim().toUpperCase())
      const { discount, error: discountError } = calculateDiscount(coupon, orderTotal)
      if (discountError) {
        setError(discountError)
        return
      }
      setApplied(coupon)
      onApply(coupon, discount)
    } catch (err) {
      setError(err.message || 'Mã giảm giá không hợp lệ')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = () => {
    setApplied(null)
    setCode('')
    setError('')
    onRemove()
  }

  if (applied) {
    return (
      <div className="p-3 rounded-4" style={{ background: 'rgba(25, 135, 84, 0.08)', border: '1px solid rgba(25, 135, 84, 0.3)' }}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="font-heading fw-bold text-success">🎫 {applied.code}</span>
              <span className="badge bg-success rounded-pill px-2 py-1 small">Đã áp dụng</span>
            </div>
            <p className="text-muted small mb-0 font-heading">{applied.description}</p>
          </div>
          <Button variant="outline-danger" size="sm" className="rounded-pill px-3 font-heading small" onClick={handleRemove}>
            Gỡ mã
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 rounded-4" style={{ background: 'var(--cafe-surface)', border: '1px solid var(--cafe-card-border)' }}>
      <label className="font-heading fw-bold small mb-2 d-block">🎫 Mã giảm giá</label>
      <Form onSubmit={handleApply} className="d-flex gap-2">
        <Form.Control
          type="text"
          placeholder="Nhập mã (VD: WELCOME10)"
          value={code}
          onChange={(e) => { setCode(e.target.value.toUpperCase()); setError('') }}
          className="rounded-pill font-heading"
          style={{ textTransform: 'uppercase' }}
        />
        <Button
          type="submit"
          variant="outline-warning"
          className="rounded-pill px-4 font-heading fw-medium text-nowrap"
          disabled={loading || !code.trim()}
        >
          {loading ? '...' : 'Áp dụng'}
        </Button>
      </Form>
      {error && (
        <Alert variant="danger" className="mt-2 py-1 px-3 rounded-3 small font-heading mb-0">
          {error}
        </Alert>
      )}
      <div className="mt-2 text-muted small font-heading">
        Thử: <code>WELCOME10</code>, <code>CAFE20K</code>, <code>SUMMER15</code>
      </div>
    </div>
  )
}

export default CouponInput
