const drinks = [
  {
    id: 1,
    name: 'Cà phê sữa',
    categoryId: 1,
    description: 'Cà phê truyền thống kết hợp sữa đặc thơm béo, đậm đà hương vị Việt.',
    price: 30000,
    originalPrice: 35000,
    rating: 4.8,
    stock: 30,
    featured: true,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Bạc xỉu',
    categoryId: 1,
    description: 'Vị sữa tươi và sữa đặc béo ngậy hòa quyện cùng chút cà phê phai dịu nhẹ.',
    price: 35000,
    originalPrice: 40000,
    rating: 4.7,
    stock: 25,
    featured: true,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Trà sữa trân châu',
    categoryId: 2,
    description: 'Trà sữa thơm béo kèm trân châu đen dai ngon chuẩn vị đài loan.',
    price: 45000,
    originalPrice: 50000,
    rating: 4.9,
    stock: 40,
    featured: true,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1558857563-b3773e7343e0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Trà đào cam sả',
    categoryId: 3,
    description: 'Trà trái cây thanh mát, thơm mùi sả cùng đào miếng giòn ngọt.',
    price: 45000,
    originalPrice: 50000,
    rating: 4.9,
    stock: 20,
    featured: true,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    name: 'Matcha đá xay',
    categoryId: 4,
    description: 'Matcha Nhật Bản thơm béo xay mịn cùng sữa tươi mát lạnh phủ kem sữa.',
    price: 55000,
    originalPrice: 60000,
    rating: 4.6,
    stock: 15,
    featured: false,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    name: 'Nước ép cam',
    categoryId: 5,
    description: 'Nước cam tươi ép nguyên chất giàu vitamin C, thanh mát sảng khoái.',
    price: 40000,
    originalPrice: 45000,
    rating: 4.5,
    stock: 0,
    featured: false,
    status: 'out-of-stock',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80'
  }
]

export default drinks