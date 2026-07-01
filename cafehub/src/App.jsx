import './App.css'

const categories = [
  { id: 1, icon: '☕', name: 'Tất cả' },
  { id: 2, icon: '☕', name: 'Cà phê' },
  { id: 3, icon: '🧋', name: 'Trà sữa' },
  { id: 4, icon: '🍹', name: 'Trà trái cây' },
  { id: 5, icon: '🥤', name: 'Đá xay' },
  { id: 6, icon: '🍊', name: 'Nước ép' }
]

const drinks = [
  {
    id: 1,
    name: 'Cà phê sữa',
    desc: 'Cà phê truyền thống kết hợp sữa đặc thơm béo.',
    price: 30000,
    oldPrice: 35000,
    rating: 4.8,
    review: 120,
    badge: '-14%',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600'
  },
  {
    id: 2,
    name: 'Bạc xỉu',
    desc: 'Vị sữa béo nhẹ hòa quyện cùng cà phê.',
    price: 35000,
    oldPrice: 40000,
    rating: 4.7,
    review: 98,
    badge: '-13%',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600'
  },
  {
    id: 3,
    name: 'Trà đào cam sả',
    desc: 'Trà trái cây thanh mát, thơm mùi sả.',
    price: 45000,
    oldPrice: null,
    rating: 4.9,
    review: 76,
    badge: 'MỚI',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600'
  },
  {
    id: 4,
    name: 'Matcha đá xay',
    desc: 'Matcha thơm béo, mát lạnh và hấp dẫn.',
    price: 55000,
    oldPrice: 60000,
    rating: 4.6,
    review: 64,
    badge: '-8%',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600'
  }
]

function App() {
  return (
    <div className="app">
      <div className="topbar">
        <span>📍 123 Nguyễn Văn Linh, Đà Nẵng</span>
        <span>📞 0905 123 456</span>
        <span>🚚 FREESHIP cho đơn hàng từ 99K</span>
        <span>Đăng nhập / Đăng ký 👤</span>
      </div>

      <header className="header">
        <div className="logo">
          <div className="logo-icon">☕</div>
          <div>
            <h2>CafeHub</h2>
            <p>Good coffee, good mood</p>
          </div>
        </div>

        <nav>
          <a className="active">TRANG CHỦ</a>
          <a>THỰC ĐƠN</a>
          <a>KHUYẾN MÃI</a>
          <a>BLOG</a>
          <a>LIÊN HỆ</a>
        </nav>

        <div className="search-cart">
          <div className="search">
            <input placeholder="Tìm đồ uống..." />
            <span>🔍</span>
          </div>
          <div className="cart">
            🛒
            <b>3</b>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="welcome">Chào mừng đến với</p>
          <h1>CAFEHUB</h1>
          <p className="subtitle">Thưởng thức cà phê chất lượng và không gian tuyệt vời</p>
          <button>KHÁM PHÁ NGAY →</button>
        </div>
      </section>

      <main className="main">
        <aside className="sidebar">
          <div className="category-box">
            <h3>DANH MỤC</h3>
            {categories.map((cat) => (
              <div key={cat.id} className={cat.id === 1 ? 'cat active-cat' : 'cat'}>
                <span>{cat.icon}</span>
                <p>{cat.name}</p>
              </div>
            ))}
          </div>

          <div className="promo">
            <h2>Giảm 20%</h2>
            <p>Cho đơn hàng đầu tiên</p>
            <button>NHẬN NGAY</button>
          </div>
        </aside>

        <section className="products">
          <div className="section-title">
            <h2>☕ ĐỒ UỐNG NỔI BẬT</h2>
            <a>Xem tất cả →</a>
          </div>

          <div className="product-grid">
            {drinks.map((drink) => (
              <div className="card" key={drink.id}>
                <div className="img-wrap">
                  <img src={drink.image} alt={drink.name} />
                  <span className={drink.badge === 'MỚI' ? 'badge new' : 'badge'}>
                    {drink.badge}
                  </span>
                  <span className="heart">♡</span>
                </div>

                <div className="card-body">
                  <h3>{drink.name}</h3>
                  <p>{drink.desc}</p>

                  <div className="rating">
                    ⭐ <b>{drink.rating}</b>
                    <span>({drink.review})</span>
                  </div>

                  <div className="price">
                    <b>{drink.price.toLocaleString('vi-VN')}đ</b>
                    {drink.oldPrice && <span>{drink.oldPrice.toLocaleString('vi-VN')}đ</span>}
                  </div>

                  <button>+ THÊM VÀO GIỎ</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App