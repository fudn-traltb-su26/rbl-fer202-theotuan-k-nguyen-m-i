import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (keyword.trim() !== '' && keyword.trim().length < 2) {
      setError('Từ khóa phải có ít nhất 2 ký tự')
      return
    }

    setError('')
    onSearch(keyword.trim())
  }

  const handleClear = () => {
    setKeyword('')
    setError('')
    onSearch('')
  }

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <div className="d-flex gap-2">
        <Form.Control
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm món trong thực đơn..."
        />

        <Button type="submit" variant="dark">Tìm</Button>

        {keyword && (
          <Button type="button" variant="secondary" onClick={handleClear}>
            Xóa
          </Button>
        )}
      </div>

      {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
    </Form>
  )
}

export default SearchBar