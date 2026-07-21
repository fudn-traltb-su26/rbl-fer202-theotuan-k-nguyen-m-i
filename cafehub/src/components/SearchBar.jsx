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

  // Real-time search khi gõ (không cần submit)
  const handleChange = (e) => {
    const value = e.target.value
    setKeyword(value)
    setError('')
    if (onSearch && value.trim() === '') {
      onSearch('')
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <InputGroup>
        {/* Tuần 7: ref được chuyển vào Form.Control input */}
        <Form.Control
          ref={ref}
          value={keyword}
          onChange={handleChange}
          placeholder="🔍 Tìm món trong thực đơn..."
        />

        <Button type="submit" variant="dark">
          Tìm
        </Button>

        {keyword && (
          <Button type="button" variant="outline-secondary" onClick={handleClear}>
            ✕ Xóa
          </Button>
        )}
      </InputGroup>

      {error && (
        <Alert variant="danger" className="mt-2 py-2 small">
          {error}
        </Alert>
      )}
    </Form>
  )
})

export default SearchBar