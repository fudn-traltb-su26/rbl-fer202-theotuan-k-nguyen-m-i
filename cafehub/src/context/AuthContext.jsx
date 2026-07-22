import { createContext, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Tuần 7 + 9: persist role vào localStorage
  const [auth, setAuth] = useLocalStorage('cafehub_auth', {
    role: 'customer', // 'customer' | 'admin'
    username: 'Khách hàng',
  })

  const login = (role, username) => {
    setAuth({ role, username: username || (role === 'admin' ? 'Barista' : 'Khách hàng') })
  }

  const logout = () => {
    setAuth({ role: 'customer', username: 'Khách hàng' })
  }

  const switchRole = (role) => {
    login(role, role === 'admin' ? 'Barista / Quản lý' : 'Khách hàng')
  }

  const isAdmin = auth.role === 'admin'

  const value = useMemo(
    () => ({ auth, login, logout, switchRole, isAdmin }),
    [auth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
