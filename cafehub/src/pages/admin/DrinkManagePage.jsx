import { useState, useEffect } from 'react'
import {
  Container,
  Table,
  Button,
  Alert,
  Spinner,
  Modal,
  Form,
  Badge,
} from 'react-bootstrap'
import {
  getDrinks,
  createDrink,
  updateDrink,
  deleteDrink,
} from '../../services/drinkService'

// Form rỗng cho "Thêm mới"
const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  originalPrice: '',
  categoryId: 1,
  stock: 0,
  rating: 5.0,
  featured: false,
  status: 'available',
}

function DrinkManagePage() {
  // --- State Tuần 8 ---
  const [drinks, setDrinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [editingDrink, setEditingDrink] = useState(null) // null = thêm mới
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  // --- Fetch danh sách đồ uống ---
  const fetchDrinks = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getDrinks()
      setDrinks(data)
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách đồ uống')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDrinks()
  }, [])

  // --- Mở Modal Thêm mới ---
  const handleOpenAdd = () => {
    setEditingDrink(null)
    setFormData(EMPTY_FORM)
    setFormError('')
    setShowModal(true)
  }

  // --- Mở Modal Chỉnh sửa ---
  const handleOpenEdit = (drink) => {
    setEditingDrink(drink)
    setFormData({
      name: drink.name,
      description: drink.description || '',
      price: drink.price,
      originalPrice: drink.originalPrice || '',
      categoryId: drink.categoryId,
      stock: drink.stock,
      rating: drink.rating || 5.0,
      featured: drink.featured || false,
      status: drink.status || 'available',
    })
    setFormError('')
    setShowModal(true)
  }

  // --- Đóng Modal ---
  const handleCloseModal = () => {
    setShowModal(false)
    setEditingDrink(null)
    setFormError('')
  }

  // --- Validate Form ---
  const validateForm = () => {
    if (!formData.name.trim()) return 'Tên món không được để trống'
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      return 'Giá bán phải là số dương'
    if (Number(formData.stock) < 0) return 'Tồn kho không được âm'
    return ''
  }

  // --- Submit Form: Thêm / Sửa ---
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errMsg = validateForm()
    if (errMsg) {
      setFormError(errMsg)
      return
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Number(formData.price),
      categoryId: Number(formData.categoryId),
      stock: Number(formData.stock),
      rating: Number(formData.rating),
    }

    try {
      setSaving(true)
      setFormError('')

      if (editingDrink) {
        // PUT — cập nhật
        const updated = await updateDrink(editingDrink.id, payload)
        setDrinks((prev) =>
          prev.map((d) => (d.id === editingDrink.id ? updated : d))
        )
      } else {
        // POST — thêm mới
        const created = await createDrink(payload)
        setDrinks((prev) => [...prev, created])
      }

      handleCloseModal()
    } catch (err) {
      setFormError(err.message || 'Lưu thất bại, vui lòng thử lại')
    } finally {
      setSaving(false)
    }
  }

  // --- Xóa đồ uống ---
  const handleDelete = async (drink) => {
    if (!window.confirm(`Bạn chắc chắn muốn xóa "${drink.name}"?`)) return

    try {
      await deleteDrink(drink.id)
      setDrinks((prev) => prev.filter((d) => d.id !== drink.id))
    } catch (err) {
      alert('Xóa thất bại: ' + err.message)
    }
  }

  // --- Render ---
  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">☕ Quản lý thực đơn</h2>
          <small className="text-muted">
            Thêm, chỉnh sửa, xóa đồ uống trong hệ thống
          </small>
        </div>
        <Button variant="dark" onClick={handleOpenAdd}>
          + Thêm món mới
        </Button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="dark" />
          <p className="mt-3 text-muted">Đang tải dữ liệu...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <Alert variant="danger">
          {error}
          <Button
            variant="outline-danger"
            size="sm"
            className="ms-3"
            onClick={fetchDrinks}
          >
            Thử lại
          </Button>
        </Alert>
      )}

      {/* Bảng danh sách */}
      {!loading && !error && (
        <Table bordered hover responsive className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Tên món</th>
              <th>Giá</th>
              <th>Danh mục</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th className="text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {drinks.map((drink) => (
              <tr key={drink.id}>
                <td className="text-muted small">#{drink.id}</td>
                <td className="fw-semibold">{drink.name}</td>
                <td>{(drink.price || 0).toLocaleString('vi-VN')}đ</td>
                <td>
                  <Badge bg="info">Danh mục #{drink.categoryId}</Badge>
                </td>
                <td>{drink.stock}</td>
                <td>
                  {drink.stock === 0 ? (
                    <Badge bg="secondary">Hết hàng</Badge>
                  ) : (
                    <Badge bg="success">Còn hàng</Badge>
                  )}
                </td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={() => handleOpenEdit(drink)}
                    >
                      ✏️ Sửa
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(drink)}
                    >
                      🗑️ Xóa
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* ===== Modal Thêm / Sửa ===== */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingDrink ? `Chỉnh sửa — ${editingDrink.name}` : '+ Thêm món mới'}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {formError && <Alert variant="danger">{formError}</Alert>}

            <div className="row g-3">
              {/* Tên món */}
              <div className="col-12">
                <Form.Label className="fw-semibold">Tên món *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="VD: Cà phê sữa"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Mô tả */}
              <div className="col-12">
                <Form.Label className="fw-semibold">Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Mô tả ngắn về món..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              {/* Giá + Giá gốc */}
              <div className="col-md-6">
                <Form.Label className="fw-semibold">Giá bán (đ) *</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="VD: 35000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-semibold">Giá gốc (đ)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="VD: 40000 (để tính % giảm)"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, originalPrice: e.target.value })
                  }
                />
              </div>

              {/* Danh mục + Tồn kho */}
              <div className="col-md-6">
                <Form.Label className="fw-semibold">Danh mục</Form.Label>
                <Form.Select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                >
                  <option value={1}>☕ Cà phê</option>
                  <option value={2}>🧋 Trà sữa</option>
                  <option value={3}>🍹 Trà trái cây</option>
                  <option value={4}>🥤 Đá xay</option>
                  <option value={5}>🍊 Nước ép</option>
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-semibold">Tồn kho</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>

              {/* Nổi bật */}
              <div className="col-12">
                <Form.Check
                  type="switch"
                  id="featured-switch"
                  label="Đánh dấu là Món nổi bật (hiển thị trang chủ)"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                />
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Hủy
            </Button>
            <Button type="submit" variant="dark" disabled={saving}>
              {saving ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Đang lưu...
                </>
              ) : editingDrink ? (
                '✓ Cập nhật'
              ) : (
                '+ Thêm món'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default DrinkManagePage