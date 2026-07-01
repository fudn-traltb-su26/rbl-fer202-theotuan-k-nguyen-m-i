import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        )
      }

      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.id === id ? { ...cartItem, quantity: Math.max(0, quantity) } : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    )
  }

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id))
  }

  const clearCart = () => setCart([])

  const itemCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  )

  const totalAmount = useMemo(
    () =>
      cart.reduce((total, item) => {
        const numericPrice = Number(String(item.priceValue ?? item.price ?? 0).replace(/\D/g, '')) || 0
        return total + numericPrice * item.quantity
      }, 0),
    [cart],
  )

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      itemCount,
      totalAmount,
    }),
    [cart, itemCount, totalAmount],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
