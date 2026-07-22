import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, redirectTo = '/' }) {
  const { isAdmin } = useAuth()

  if (!isAdmin) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}

export default ProtectedRoute