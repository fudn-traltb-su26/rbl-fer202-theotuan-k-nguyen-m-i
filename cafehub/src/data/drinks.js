const drinks = [
  {
    id: 1,
    name: 'Cà phê sữa',
    categoryId: 1,
    description: 'Cà phê truyền thống kết hợp sữa đặc thơm béo.',
    price: 30000,
    originalPrice: 35000,
    rating: 4.8,
    stock: 30,
    featured: true,
    status: 'available'
  },
  {
    id: 2,
    name: 'Bạc xỉu',
    categoryId: 1,
    description: 'Vị sữa béo nhẹ hòa quyện cùng cà phê.',
    price: 35000,
    originalPrice: 40000,
    rating: 4.7,
    stock: 25,
    featured: true,
    status: 'available'
  },
  {
    id: 3,
    name: 'Trà sữa trân châu',
    categoryId: 2,
    description: 'Trà sữa thơm béo kèm trân châu dai ngon.',
    price: 45000,
    originalPrice: 50000,
    rating: 4.9,
    stock: 40,
    featured: true,
    status: 'available'
  },
  {
    id: 4,
    name: 'Trà đào cam sả',
    categoryId: 3,
    description: 'Trà trái cây thanh mát, thơm mùi sả.',
    price: 45000,
    originalPrice: 50000,
    rating: 4.9,
    stock: 20,
    featured: true,
    status: 'available'
  },
  {
    id: 5,
    name: 'Matcha đá xay',
    categoryId: 4,
    description: 'Matcha thơm béo, mát lạnh và hấp dẫn.',
    price: 55000,
    originalPrice: 60000,
    rating: 4.6,
    stock: 15,
    featured: false,
    status: 'available'
  },
  {
    id: 6,
    name: 'Nước ép cam',
    categoryId: 5,
    description: 'Nước cam tươi giàu vitamin, tốt cho sức khỏe.',
    price: 40000,
    originalPrice: 45000,
    rating: 4.5,
    stock: 0,
    featured: false,
    status: 'out-of-stock'
  }
]

export default drinks