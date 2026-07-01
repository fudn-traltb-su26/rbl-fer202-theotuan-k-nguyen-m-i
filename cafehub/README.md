# ☕ CafeHub - Hệ Thống Quản Lý Quán Cafe

## 📌 Giới thiệu

CafeHub là một ứng dụng web quản lý quán cafe được phát triển bằng ReactJS. Hệ thống hỗ trợ khách hàng tìm kiếm và xem thông tin đồ uống, đồng thời hỗ trợ quản trị viên quản lý sản phẩm thông qua các chức năng CRUD.

Dự án được thực hiện trong môn **FER202 - Phát triển Ứng dụng Web với ReactJS** tại Đại học FPT.

---

## 🎯 Mục tiêu dự án

* Xây dựng giao diện hiện đại bằng ReactJS.
* Áp dụng React Router để điều hướng trang.
* Quản lý dữ liệu bằng JSON Server.
* Thực hiện CRUD thông qua Axios.
* Áp dụng React Hooks và Context API.
* Tối ưu trải nghiệm người dùng với giao diện Responsive.

---

## 🚀 Công nghệ sử dụng

* ReactJS 18
* Vite
* React Bootstrap
* React Router DOM
* Axios
* JSON Server
* Figma Make
* Google Stitch
* Git & GitHub

---

## ✨ Chức năng chính

### Khách hàng

* Xem danh sách đồ uống
* Tìm kiếm đồ uống theo tên
* Lọc đồ uống theo danh mục
* Xem chi tiết đồ uống
* Thêm đồ uống vào giỏ hàng
* Quản lý giỏ hàng
* Xem các món nổi bật

### Quản trị viên

* Thêm đồ uống mới
* Chỉnh sửa thông tin đồ uống
* Xóa đồ uống
* Quản lý danh mục đồ uống
* Quản lý số lượng tồn kho

---

## 📂 Cấu trúc thư mục

```text
cafehub/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Banner.jsx
│   │   ├── CategoryList.jsx
│   │   ├── DrinkCard.jsx
│   │   ├── DrinkGrid.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SectionWrapper.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   ├── categories.js
│   │   └── drinks.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── DrinkListPage.jsx
│   │   ├── DrinkDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   └── admin/
│   │       └── DrinkManagePage.jsx
│   ├── context/
│   ├── hooks/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── db.json
├── package.json
├── vite.config.js
└── README.md
```

---

## 📄 Các màn hình chính

### Trang chủ

* Banner giới thiệu
* Danh mục đồ uống
* Đồ uống nổi bật

### Danh sách đồ uống

* Thanh tìm kiếm
* Bộ lọc danh mục
* Danh sách sản phẩm

### Chi tiết đồ uống

* Hình ảnh
* Giá bán
* Mô tả sản phẩm
* Thêm vào giỏ hàng

### Giỏ hàng

* Danh sách sản phẩm đã chọn
* Cập nhật số lượng
* Tính tổng tiền

### Quản lý sản phẩm

* Thêm sản phẩm
* Chỉnh sửa sản phẩm
* Xóa sản phẩm

---

## ⚙️ Cài đặt và chạy dự án

### Clone project

```bash
git clone <repository-url>
```

### Cài đặt thư viện

```bash
npm install
```

### Chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại:

```text
http://localhost:5173
```

### Chạy JSON Server

```bash
npx json-server --watch db.json --port 3001
```

API sẽ chạy tại:

```text
http://localhost:3001
```

---

## 👥 Thành viên nhóm

| STT | Họ và tên          | Vai trò                   |
| --- | ------------------ | ------------------------- |
| 1   | [Tên thành viên 1] | Team Leader / Frontend    |
| 2   | [Tên thành viên 2] | UI/UX Designer / Frontend |

---

## 📅 Tiến độ dự án

### Tuần 1

* Khởi tạo project ReactJS bằng Vite
* Thiết kế UI bằng Google Stitch và Figma Make
* Thiết kế cơ sở dữ liệu db.json
* Xây dựng Component Tree
* Tạo GitHub Repository

### Các tuần tiếp theo

* React Components
* Props
* State Management
* Routing
* Context API
* Axios CRUD
* Custom Hooks
* Deployment

---

## 📜 Giấy phép

Dự án được phát triển phục vụ mục đích học tập trong môn FER202 tại Đại học FPT.
