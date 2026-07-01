import { useCart } from '../context/CartContext'

function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart()

  return (
    <div className="container py-4">
      <h2>Giỏ hàng</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng đang trống.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="card mb-3 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p className="mb-0">{item.price}</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <h4>Tổng tiền: {totalAmount}đ</h4>
            <button className="btn btn-outline-danger me-2" onClick={clearCart}>
              Xóa tất cả
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
