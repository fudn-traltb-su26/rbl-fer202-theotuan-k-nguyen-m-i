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
  const [drinks, setDrinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [editingDrink, setEditingDrink] = useState(null)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const fetchDrinks = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getDrinks()
      setDrinks(data)
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách đồ uống từ JSON-Server')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDrinks()
  }, [])

  const handleOpenAdd = () => {
    setEditingDrink(null)
    setFormData(EMPTY_FORM)
    setFormError('')
    setShowModal(true)
  }

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

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingDrink(null)
    setFormError('')
  }

  const validateForm = () => {
    if (!formData.name.trim()) return 'Tên món đồ uống không được để trống'
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      return 'Giá bán phải là số thực hợp lệ lớn hơn 0'
    if (Number(formData.stock) < 0) return 'Tồn kho không được âm'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errMsg = validateForm()
    if (errMsg) {
      setFormError(errMsg)
      return
    }

    try {
      setSaving(true)
      setFormError('')

      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice
          ? Number(formData.originalPrice)
          : Number(formData.price),
        categoryId: Number(formData.categoryId),
        stock: Number(formData.stock),
        rating: Number(formData.rating || 5.0),
      }

      if (editingDrink) {
        const updated = await updateDrink(editingDrink.id, payload)
        setDrinks((prev) =>
          prev.map((d) => (d.id === editingDrink.id ? updated : d))
        )
      } else {
        const created = await createDrink(payload)
        setDrinks((prev) => [...prev, created])
      }

      handleCloseModal()
    } catch (err) {
      setFormError(err.message || 'Lưu thất bại, vui lòng kiểm tra server')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (drink) => {
    if (!window.confirm(`Bạn chắc chắn muốn xóa đồ uống "${drink.name}" khỏi thực đơn?`)) return

    try {
      await deleteDrink(drink.id)
      setDrinks((prev) => prev.filter((d) => d.id !== drink.id))
    } catch (err) {
      alert('Xóa thất bại: ' + err.message)
    }
  }

  return (
    <Container className="my-4 my-md-5">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4 pb-3 border-bottom border-secondary-subtle">
        <div>
          <h1 className="font-heading fw-extrabold fs-3 mb-1 d-flex align-items-center gap-2">
            <span>⚙️ Quản Trị Hệ Thống Đồ Uống</span>
            <Badge bg="warning" text="dark" pill className="px-3 py-1 fs-6 font-heading">
              {drinks.length} món
            </Badge>
          </h1>
          <p className="text-muted small mb-0 font-body opacity-85">
            Quản lý tập trung, cập nhật giá bán, số lượng tồn kho và tình trạng kinh doanh theo thời gian thực
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="btn-premium-amber w-100 w-sm-auto d-flex align-items-center justify-content-center gap-2 fs-6 py-2 px-4"
        >
          <span>+ Thêm món mới</span>
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-5 rounded-4 shadow-sm my-4" style={{ background: 'var(--cafe-card-bg)', border: '1px solid var(--cafe-card-border)' }}>
          <Spinner animation="border" variant="warning" style={{ width: '3.5rem', height: '3.5rem' }} className="mb-3" />
          <p className="text-muted font-heading fw-semibold mb-0">Đang đồng bộ dữ liệu với JSON-Server (chạy port 3001)...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <Alert variant="danger" className="rounded-4 p-4 shadow-sm my-4">
          <Alert.Heading className="font-heading fw-bold">⚠️ Lỗi kết nối API Server</Alert.Heading>
          <p>{error}. Hãy chắc chắn rằng bạn đã mở terminal chạy lệnh <code className="bg-dark text-warning px-2 py-1 rounded">npm run server</code></p>
          <Button
            variant="dark"
            size="sm"
            className="rounded-pill px-4 font-heading"
            onClick={fetchDrinks}
          >
            🔄 Thử lại ngay
          </Button>
        </Alert>
      )}

      {/* Bảng danh sách */}
      {!loading && !error && (
        <div className="premium-table overflow-auto">
          <Table hover responsive className="align-middle text-nowrap table-sm table-md mb-0">
            <thead style={{ background: 'var(--cafe-surface)', borderBottom: '2px solid var(--cafe-card-border)' }}>
              <tr>
                <th className="py-3 px-4">Mã số</th>
                <th className="py-3">Tên thức uống</th>
                <th className="py-3">Giá niêm yết</th>
                <th className="py-3">Nhóm danh mục</th>
                <th className="text-center py-3">Tồn kho</th>
                <th className="py-3">Trạng thái</th>
                <th className="text-center py-3 px-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {drinks.map((drink) => (
                <tr key={drink.id} style={{ borderBottom: '1px solid var(--cafe-card-border)' }}>
                  <td className="text-muted font-heading py-3 px-4">#{drink.id}</td>
                  <td className="fw-bold font-heading py-3 fs-6">
                    <div className="d-flex align-items-center gap-2">
                      <span>{drink.name}</span>
                      {drink.featured && <Badge bg="warning" text="dark" className="rounded-pill small font-heading">⭐ Nổi bật</Badge>}
                    </div>
                  </td>
                  <td className="font-heading fw-semibold text-danger py-3 fs-6">
                    {(drink.price || 0).toLocaleString('vi-VN')}đ
                  </td>
                  <td className="py-3">
                    <span className="badge rounded-pill small px-3 py-1 font-heading" style={{ background: 'rgba(255, 179, 0, 0.15)', color: '#d97706' }}>
                      Danh mục #{drink.categoryId}
                    </span>
                  </td>
                  <td className="text-center font-heading py-3 fw-bold fs-6">
                    {drink.stock}
                  </td>
                  <td className="py-3">
                    {drink.stock === 0 ? (
                      <Badge bg="secondary" className="rounded-pill px-3 py-1 font-heading">Hết hàng</Badge>
                    ) : (
                      <Badge bg="success" className="rounded-pill px-3 py-1 font-heading">Đang kinh doanh</Badge>
                    )}
                  </td>
                  <td className="text-center py-3 px-4">
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary rounded-pill px-3 font-heading small d-flex align-items-center gap-1"
                        onClick={() => handleOpenEdit(drink)}
                      >
                        <span>✏️</span> <span>Sửa</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger rounded-pill px-3 font-heading small d-flex align-items-center gap-1"
                        onClick={() => handleDelete(drink)}
                      >
                        <span>🗑️</span> <span>Xóa</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* ===== Modal Thêm / Sửa ===== */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered contentClassName="rounded-4 border-0 shadow-lg overflow-hidden" style={{ backdropFilter: 'blur(6px)' }}>
        <Modal.Header closeButton style={{ background: 'var(--cafe-surface)', borderBottom: '1px solid var(--cafe-card-border)' }}>
          <Modal.Title className="font-heading fw-bold fs-4">
            {editingDrink ? `✏️ Cập Nhật — ${editingDrink.name}` : '+ Thêm Mới Thức Uống Hảo Hạng'}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit} style={{ background: 'var(--cafe-card-bg)' }}>
          <Modal.Body className="p-4">
            {formError && <Alert variant="danger" className="rounded-pill px-4 small font-heading">{formError}</Alert>}

            <div className="row g-3 font-body">
              <div className="col-12">
                <Form.Label className="fw-bold font-heading small text-uppercase">Tên thức uống *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="VD: Cà Phê Trứng Hà Nội"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-pill px-3 py-2"
                  required
                />
              </div>

              <div className="col-12">
                <Form.Label className="fw-bold font-heading small text-uppercase">Mô tả chi tiết hương vị</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ghi chú hương vị, nguyên liệu và điểm đặc sắc của thức uống..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="rounded-4 p-3"
                />
              </div>

              <div className="col-md-6">
                <Form.Label className="fw-bold font-heading small text-uppercase">Giá bán thực tế (đ) *</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="VD: 45000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="rounded-pill px-3 py-2 font-heading fw-bold text-danger"
                  required
                />
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-bold font-heading small text-uppercase">Giá gốc niêm yết (đ)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="VD: 55000 (để hiển thị % giảm giá)"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, originalPrice: e.target.value })
                  }
                  className="rounded-pill px-3 py-2 font-heading"
                />
              </div>

              <div className="col-md-6">
                <Form.Label className="fw-bold font-heading small text-uppercase">Phân nhóm danh mục</Form.Label>
                <Form.Select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="rounded-pill px-3 py-2 font-heading"
                >
                  <option value={1}>☕ Cà phê</option>
                  <option value={2}>🧋 Trà sữa</option>
                  <option value={3}>🍹 Trà trái cây</option>
                  <option value={4}>🥤 Đá xay</option>
                  <option value={5}>🍊 Nước ép</option>
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label className="fw-bold font-heading small text-uppercase">Số lượng phần sẵn sàng</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="rounded-pill px-3 py-2 font-heading fw-bold"
                />
              </div>

              <div className="col-12 pt-2">
                <div className="p-3 rounded-4 border border-secondary border-opacity-25" style={{ background: 'var(--cafe-surface)' }}>
                  <Form.Check
                    type="switch"
                    id="featured-switch"
                    label="⭐ Đánh dấu là Món nổi bật (Hiển thị ngay tại Hero & mục Món Yêu Thích Nhất trên Trang chủ)"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="fw-bold font-heading small"
                  />
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer className="p-3" style={{ background: 'var(--cafe-surface)', borderTop: '1px solid var(--cafe-card-border)' }}>
            <Button variant="outline-secondary" onClick={handleCloseModal} className="rounded-pill px-4 font-heading">
              Hủy thao tác
            </Button>
            <button type="submit" className="btn-premium-amber py-2 px-4 font-heading" disabled={saving}>
              {saving ? (
                <div className="d-flex align-items-center gap-2">
                  <Spinner size="sm" animation="border" />
                  <span>Đang xử lý...</span>
                </div>
              ) : editingDrink ? (
                '✓ Cập Nhật Thay Đổi'
              ) : (
                '+ Thêm Món Vào Thực Đơn'
              )}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default DrinkManagePage