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
    <Form onSubmit={handleSubmit} className="mb-3 mb-md-4">
      <InputGroup className="shadow-sm">
        <Form.Control
          ref={ref}
          value={keyword}
          onChange={handleChange}
          placeholder="🔍 Tìm món theo tên..."
          className="py-2"
        />

        <Button type="submit" variant="dark" className="px-3 px-md-4 fw-semibold">
          Tìm
        </Button>

        {keyword && (
          <Button
            type="button"
            variant="outline-secondary"
            onClick={handleClear}
            className="px-2 px-md-3"
            title="Xóa tìm kiếm"
          >
            ✕
          </Button>
        )}
      </InputGroup>

      {error && (
        <Alert variant="danger" className="mt-2 py-2 small mb-0">
          {error}
        </Alert>
      )}
    </Form>
  )
})

export default SearchBar