import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Tuần 5: Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// Tuần 7: Context Providers
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Tuần 7: ThemeProvider bao ngoài để toàn app dùng được */}
      <ThemeProvider>
        {/* Tuần 7: CartProvider cho useCart() hook */}
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)