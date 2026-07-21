import { useState, forwardRef } from 'react'
import { Form, Button, Alert, InputGroup } from 'react-bootstrap'

// Tuần 7: forwardRef — để MenuPage có thể gán ref vào input bên trong
const SearchBar = forwardRef(function SearchBar({ onSearch }, ref) {
  const [keyword, setKeyword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Tuần 4: Validation min 2 ký tự
    if (keyword.trim() !== '' && keyword.trim().length < 2) {
      setError('Từ khóa phải có ít nhất 2 ký tự')
      return
    }

    setError('')
    if (onSearch) onSearch(keyword.trim())
  }

  const handleClear = () => {
    setKeyword('')
    setError('')
    if (onSearch) onSearch('')
  }

  // Real-time search khi gõ
  const handleChange = (e) => {
    const value = e.target.value
    setKeyword(value)
    setError('')
    if (onSearch && value.trim() === '') {
      onSearch('')
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputGroup className="shadow-sm rounded-pill overflow-hidden border border-secondary-subtle" style={{ background: 'var(--cafe-card-bg)' }}>
        <span className="input-group-text bg-transparent border-0 ps-3 pe-2 fs-5" style={{ color: 'var(--cafe-accent)' }}>
          🔍
        </span>
        <Form.Control
          ref={ref}
          value={keyword}
          onChange={handleChange}
          placeholder="Tìm món đồ uống yêu thích (Cà phê, Trà sữa, Sinh tố...)..."
          className="py-2 border-0 shadow-none bg-transparent font-body"
        />

        {keyword && (
          <Button
            type="button"
            variant="link"
            onClick={handleClear}
            className="text-decoration-none px-3 text-muted border-0 d-flex align-items-center"
            title="Xóa tìm kiếm"
          >
            ✕
          </Button>
        )}

        <button
          type="submit"
          className="btn-premium-amber px-4 m-1 rounded-pill font-heading small fw-bold"
          style={{ padding: '8px 24px' }}
        >
          Tìm
        </button>
      </InputGroup>

      {error && (
        <Alert variant="danger" className="mt-2 py-2 px-3 small rounded-pill mb-0 d-inline-block shadow-sm">
          ⚠️ {error}
        </Alert>
      )}
    </Form>
  )
})

export default SearchBar