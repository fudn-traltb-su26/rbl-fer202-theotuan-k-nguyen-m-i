import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  // Tuần 7 + v2.0: addToCart hỗ trợ item có options (size, ice, sugar, toppings)
  const addToCart = (item) => {
    setCart((prevCart) => {
      // v2.0: dùng cartKey (nếu có) để phân biệt cùng 1 món với tuỳ chọn khác
      const itemKey = item.cartKey || String(item.id)
      const existingItem = prevCart.find((cartItem) => (cartItem.cartKey || String(cartItem.id)) === itemKey)

      if (existingItem) {
        return prevCart.map((cartItem) =>
          (cartItem.cartKey || String(cartItem.id)) === itemKey
            ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
            : cartItem,
        )
      }

      return [...prevCart, {
        ...item,
        cartKey: itemKey,
        quantity: item.quantity || 1,
        // v2.0: lưu finalPrice (giá sau khi cộng size + topping)
        finalPrice: item.finalPrice || item.price,
        options: item.options || null,
      }]
    })
  }

  const updateQuantity = (cartKey, quantity) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          (cartItem.cartKey || String(cartItem.id)) === cartKey
            ? { ...cartItem, quantity: Math.max(0, quantity) }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    )
  }

  const removeFromCart = (cartKey) => {
    setCart((prevCart) => prevCart.filter((cartItem) => (cartItem.cartKey || String(cartItem.id)) !== cartKey))
  }

  const clearCart = () => setCart([])

  const itemCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  )

  const totalAmount = useMemo(
    () =>
      cart.reduce((total, item) => {
        const price = Number(item.finalPrice) || Number(item.price) || 0
        return total + price * item.quantity
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
