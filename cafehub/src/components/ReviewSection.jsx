import { useState, useEffect } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import { getReviewsByDrinkId, createReview } from '../services/orderService'

function ReviewSection({ drinkId, drinkName }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    fetchReviews()
  }, [drinkId])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const data = await getReviewsByDrinkId(drinkId)
      setReviews(data)
    } catch (err) {
      console.error('Lỗi tải đánh giá:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim() || !authorName.trim()) return
    try {
      setSubmitting(true)
      const newReview = await createReview({
        drinkId,
        drinkName,
        author: authorName.trim(),
        rating,
        comment: comment.trim(),
        createdAt: new Date().toISOString(),
      })
      setReviews((prev) => [newReview, ...prev])
      setComment('')
      setAuthorName('')
      setRating(5)
      setShowForm(false)
      setSuccessMsg('Cảm ơn bạn đã đánh giá! ☕')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      console.error('Lỗi gửi đánh giá:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0'

  const renderStars = (count, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1
      const filled = interactive ? starValue <= (hoverRating || rating) : starValue <= count
      return (
        <span
          key={i}
          style={{
            cursor: interactive ? 'pointer' : 'default',
            fontSize: interactive ? '1.5rem' : '1rem',
            transition: 'transform 0.15s',
            transform: interactive && starValue <= (hoverRating || rating) ? 'scale(1.15)' : 'scale(1)',
          }}
          onClick={interactive ? () => setRating(starValue) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(starValue) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
        >
          {filled ? '⭐' : '☆'}
        </span>
      )
    })
  }

  return (
    <div className="mt-5 pt-4 border-top border-secondary-subtle">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="font-heading fw-bold fs-4 mb-0 d-flex align-items-center gap-2">
          💬 Đánh Giá & Bình Luận
          {reviews.length > 0 && (
            <span className="text-muted fs-6 fw-normal">
              ({avgRating} ⭐ · {reviews.length} đánh giá)
            </span>
          )}
        </h3>
        {!showForm && (
          <Button
            variant="outline-warning"
            size="sm"
            className="rounded-pill px-3 font-heading fw-medium"
            onClick={() => setShowForm(true)}
          >
            ✍️ Viết đánh giá
          </Button>
        )}
      </div>

      {successMsg && (
        <Alert variant="success" className="rounded-3 py-2 font-heading small">
          {successMsg}
        </Alert>
      )}

      {/* Form viết đánh giá */}
      {showForm && (
        <div className="p-4 rounded-4 mb-4 shadow-sm" style={{ background: 'var(--cafe-surface)', border: '1px solid var(--cafe-card-border)' }}>
          <h6 className="font-heading fw-bold mb-3">Viết đánh giá cho "{drinkName}"</h6>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="font-heading small fw-bold">Tên của bạn</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên hiển thị..."
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="rounded-pill"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="font-heading small fw-bold">Đánh giá sao</Form.Label>
              <div className="d-flex gap-1">
                {renderStars(rating, true)}
                <span className="ms-2 font-heading text-muted small">{rating}/5</span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="font-heading small fw-bold">Bình luận</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Chia sẻ trải nghiệm của bạn về món này..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="rounded-3"
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="warning" className="rounded-pill px-4 font-heading fw-medium" disabled={submitting}>
                {submitting ? 'Đang gửi...' : '📤 Gửi đánh giá'}
              </Button>
              <Button variant="outline-secondary" className="rounded-pill px-3 font-heading" onClick={() => setShowForm(false)}>
                Hủy
              </Button>
            </div>
          </Form>
        </div>
      )}

      {/* Danh sách reviews */}
      {loading ? (
        <div className="text-center py-4 text-muted font-heading">Đang tải đánh giá...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-4 rounded-4" style={{ background: 'var(--cafe-surface)', border: '1px solid var(--cafe-card-border)' }}>
          <div style={{ fontSize: '2.5rem' }}>📝</div>
          <p className="text-muted font-heading small mt-2 mb-0">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-3 rounded-4"
              style={{ background: 'var(--cafe-surface)', border: '1px solid var(--cafe-card-border)' }}
            >
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <span className="font-heading fw-bold">{review.author}</span>
                  <div className="d-flex align-items-center gap-1 mt-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <span className="text-muted small font-heading">
                  {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <p className="mb-0 font-body small" style={{ lineHeight: '1.6' }}>
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewSection
