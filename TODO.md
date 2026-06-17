# TODO — CASE STUDY: ReadMore Bookstore
## Hướng dẫn thực hành từng tuần — ReactJS (FER202)

**Stack:** React 18 + Vite + React-Bootstrap 2.x + Axios + JSON-Server  
**Nhóm:** 5 thành viên — phân công theo vai trò mỗi tuần  
**Repo tham khảo:** `Case-Study/SourceCode/WeekXX-*/`  
**Template báo cáo:** `Case-Study/Template/WeekXX/WeekXX_BaoCaoNhom.docx`

> **Quy ước:**  
> - `[A]` = Thành viên A phụ trách chính  
> - `[ALL]` = Cả nhóm cùng làm  
> - `[REVIEW]` = Một thành viên khác review lại trước khi merge

---

## TUẦN 1 — KHỞI TẠO PROJECT & THIẾT KẾ GIAO DIỆN

### 🎯 Mục tiêu
Thiết lập nền tảng kỹ thuật và tư duy thiết kế trước khi code. Nhóm thống nhất: project là gì, ai làm gì, giao diện trông như thế nào.

### 📋 Phân công nhiệm vụ

| Thành viên | Nhiệm vụ |
|-----------|----------|
| A (Trưởng nhóm) | Tạo GitHub repo, cấu hình Vite project, tổ chức thư mục |
| B | Thiết kế màn hình Trang chủ + Danh sách sách bằng **Google Stitch** |
| C | Thiết kế màn hình Chi tiết sách + Giỏ hàng bằng **Figma Make** |
| D | Thiết kế `db.json` — cấu trúc dữ liệu books, categories |
| E | Vẽ Component Tree, viết `README.md`, tổng hợp prompt log |

### ✅ Checklist công việc

**Môi trường & Cài đặt**
- [ ] Cài Node.js 18+ — kiểm tra: `node -v` phải ra `v18.x.x` trở lên
- [ ] Cài VS Code + extensions: ES7+ React Snippets, Prettier, ESLint, GitLens
- [ ] Cài React DevTools extension cho Chrome

**Khởi tạo project [A]**
- [ ] Chạy: `npm create vite@latest readmore-bookstore -- --template react`
- [ ] Vào thư mục: `cd readmore-bookstore && npm install`
- [ ] Cài thêm: `npm install react-bootstrap bootstrap react-router-dom axios`
- [ ] Tạo cấu trúc thư mục: `src/components` `src/pages` `src/context` `src/hooks` `src/services` `src/assets`
- [ ] Kiểm tra: `npm run dev` → mở `http://localhost:5173` thấy trang Vite mặc định

**Thiết kế mockup với AI Design Tools [B, C]**

> Workflow 5 bước: **Requirements → Prompt → Generate → Đánh giá đầu ra → Handoff sang code.**
> Nguyên tắc: AI tạo bản nháp nhanh, con người quyết định — mọi output phải được đối chiếu với requirements trước khi dùng.

*Bước 1 — Chuẩn bị requirements trước khi prompt [B + C]*
- [ ] Liệt kê 4 màn hình cần thiết kế và components của từng màn hình (lấy từ Component Tree nháp của E):
  - **Trang chủ**: Header (logo, nav, cart icon) + Banner + CategoryList (5 danh mục) + BookGrid (8 sách nổi bật) + Footer
  - **Danh sách sách**: SearchBar + Filter danh mục + BookGrid + Pagination
  - **Chi tiết sách**: ảnh bìa + title, author, price, originalPrice, rating, stock, description + nút Thêm vào giỏ
  - **Giỏ hàng**: bảng sản phẩm (ảnh, tên, đơn giá, số lượng ±, thành tiền, xóa) + tổng tiền + nút Thanh toán
- [ ] Đối chiếu với cấu trúc `db.json` của D: mỗi field hiển thị trên UI phải tồn tại trong data (vd: mockup có rating ⭐ thì books phải có `rating`)
- [ ] Thống nhất style chung của nhóm: màu chủ đạo, font, tone (hiện đại/tối giản) — ghi vào `docs/mockup/style-guide.md`

*Bước 2 — Tạo mockup với Google Stitch [B]* — https://stitch.withgoogle.com (miễn phí, đăng nhập Google)
- [ ] Viết prompt theo công thức: **[Loại app] + [Màn hình] + [Liệt kê components] + [Dữ liệu hiển thị] + [Style]**
- [ ] Prompt mẫu cho Trang chủ (điều chỉnh theo style guide của nhóm):
  ```
  Design a homepage for an online bookstore web app named "ReadMore" (Vietnamese).
  Include: top navbar with logo, nav links (Trang chủ, Sách, Danh mục, Liên hệ) and
  a cart icon with badge; a hero banner with headline and CTA button "Khám phá ngay";
  a category section with 5 category cards (icon + name + book count);
  a featured books grid of 8 book cards — each card shows cover image, title, author,
  discounted price in VND, original price strikethrough, rating stars and
  "Thêm vào giỏ" button. Clean modern style, primary color #0d6efd, light background.
  ```
- [ ] Generate → xem kết quả → **iterate bằng prompt chỉnh sửa** (không vẽ tay lại từ đầu), vd: *"Make the book grid 4 columns, add a discount badge on top-left of each card"*
- [ ] Làm tương tự cho màn Danh sách sách
- [ ] Lưu **toàn bộ prompts đã dùng** (kể cả prompt fail) vào `docs/mockup/prompts.md` — đây là minh chứng quá trình làm việc với AI

*Bước 3 — Tạo prototype tương tác với Figma Make [C]* — https://figma.com → Make (cần tài khoản Figma)
- [ ] Prompt mô tả màn Chi tiết sách + Giỏ hàng (cùng công thức ở Bước 2), yêu cầu thêm **interaction**: *"clicking 'Thêm vào giỏ' increases the cart badge counter"*
- [ ] Nếu Figma Make có **Plan mode**: bật lên để AI hỏi lại yêu cầu trước khi generate — trả lời dựa trên requirements ở Bước 1
- [ ] Có thể paste design từ Stitch sang Figma (Stitch hỗ trợ export sang Figma giữ nguyên layers) để chỉnh tiếp
- [ ] Click thử prototype: luồng *Danh sách → Chi tiết → Thêm giỏ → Giỏ hàng* phải bấm qua lại được

*Bước 4 — Đánh giá kết quả đầu ra [B + C + REVIEW: E]*
- [ ] Chấm từng màn hình theo checklist:

| Tiêu chí đánh giá | Đạt? | Hướng xử lý nếu KHÔNG đạt |
|-------------------|------|---------------------------|
| Đủ components như requirements Bước 1 | ☐ | Re-prompt bổ sung: *"Add a pagination below the grid"* |
| Field hiển thị khớp `db.json` (title, author, price, rating…) | ☐ | Re-prompt hoặc ghi chú để sửa khi code |
| Style nhất quán giữa 4 màn hình (màu, font, spacing) | ☐ | Dùng cùng 1 đoạn mô tả style trong mọi prompt; hoặc chỉnh trong Figma |
| Có trạng thái phụ: empty state, nút disabled khi hết hàng | ☐ | Prompt thêm màn hình biến thể: *"Show empty cart state"* |
| Layout chia được thành React components rõ ràng | ☐ | Đơn giản hóa layout — tránh thiết kế AI quá phức tạp so với scope môn học |

- [ ] Sau tối đa **3 vòng re-prompt** mà vẫn chưa đạt → dừng, chỉnh tay trong Figma hoặc chấp nhận mockup ở mức "đủ dùng" — mục tiêu là làm mốc tham chiếu để code, không phải pixel-perfect

*Bước 5 — Đầu ra & hướng xử lý tiếp theo (handoff sang code) [B + C + E]*
- [ ] Export ảnh PNG 4 màn hình + link project Stitch/Figma → lưu `docs/mockup/`
- [ ] Stitch export được code **HTML/Tailwind CSS** — ⚠️ **KHÔNG copy nguyên code này vào project** (project dùng React-Bootstrap). Chỉ dùng code export làm **tài liệu tham chiếu** về layout, spacing, màu sắc
- [ ] E đánh nhãn component lên mockup (đóng khung + ghi tên: `Header`, `BookCard`, `BookGrid`…) → đây là input trực tiếp cho Component Tree
- [ ] Ghi vào `docs/mockup/handoff.md` bảng map: *Vùng trên mockup → Component sẽ code → Tuần thực hiện* (vd: card sách → `BookCard.jsx` → Tuần 2 hardcode, Tuần 3 nhận props)
- [ ] Mockup này là **hợp đồng giao diện** cho cả 10 tuần: Tuần 2 code static theo mockup, Tuần 5 đối chiếu lại khi làm responsive

**Dữ liệu [D]**
- [ ] Tạo `db.json` tại root project, tham khảo `SourceCode/Week01-Setup/db.json`
- [ ] `books`: ít nhất 8 cuốn, mỗi cuốn có đủ: id, title, author, price, originalPrice, category, categoryId, cover, rating, reviewCount, stock, featured, description
- [ ] `categories`: 5 danh mục, mỗi danh mục có: id, name, icon, bookCount
- [ ] Kiểm tra: `npx json-server --watch db.json --port 3001` → mở `http://localhost:3001/books` thấy JSON

**Component Tree & Tài liệu [E]**
- [ ] Vẽ sơ đồ Component Tree (dùng draw.io, Figma, hoặc ASCII art)
- [ ] Xác định: component nào là **page**, component nào là **reusable**
- [ ] Viết `README.md`: tên project, mô tả, cách cài, cách chạy, danh sách tính năng

**GitHub [A + ALL]**
- [ ] Tạo repo GitHub, đặt tên: `readmore-bookstore`
- [ ] `git init`, `git add .`, `git commit -m "feat: week01 - init project"`
- [ ] Push lên GitHub, mời tất cả thành viên làm Collaborator
- [ ] Tạo file `.gitignore` (có `node_modules`, `dist`, `.env`)

### 📦 ĐẦU RA BẮT BUỘC — Tuần 1

| # | Đầu ra | Tiêu chí hoàn thành | File/Vị trí |
|---|--------|---------------------|-------------|
| 1 | Mockup 4 màn hình (Stitch/Figma Make) | Đủ 4 màn hình, có component labels, đạt checklist Bước 4 | `docs/mockup/` + link Stitch/Figma |
| 2 | Prompt log | Toàn bộ prompts đã dùng + ghi chú vòng iterate nào đạt | `docs/mockup/prompts.md` |
| 3 | Handoff document | Bảng map vùng mockup → component → tuần code | `docs/mockup/handoff.md` |
| 4 | Vite project khởi chạy | `npm run dev` không lỗi, mở localhost được | Root folder |
| 5 | `db.json` đầy đủ | ≥8 sách, ≥5 danh mục, json-server chạy được; field khớp mockup | `db.json` (root) |
| 6 | `README.md` | Có mô tả, hướng dẫn cài đặt, chạy | `README.md` (root) |
| 7 | Component Tree | Liệt kê đủ pages và components, khớp với nhãn trên mockup | `docs/component-tree.png` |
| 8 | Repo GitHub | Code đã push, tất cả thành viên được invite | Link GitHub |

```
✏️ Commit: feat: week01 - init Vite project, structure, db.json, README
```

---

## TUẦN 2 — FUNCTIONAL COMPONENTS & JSX

### 🎯 Mục tiêu
Hiểu JSX là gì (không phải HTML), biết cách viết Functional Component, dùng `map()` để render list, áp dụng conditional rendering.

### 📋 Phân công nhiệm vụ

| Thành viên | Nhiệm vụ |
|-----------|----------|
| A | Header.jsx + Footer.jsx |
| B | Banner.jsx |
| C | BookCard.jsx (hardcode 1 cuốn) |
| D | BookGrid.jsx (map() render list) |
| E | CategoryList.jsx (conditional rendering) + tích hợp App.jsx |

### ✅ Checklist công việc

**Nghiên cứu trước [ALL]**
- [ ] Đọc: JSX compile thành gì? Thử tại https://babeljs.io/repl — dán JSX vào xem JS output
- [ ] Phân biệt: `className` vs `class`, `htmlFor` vs `for`, `onClick` vs `onclick`
- [ ] Biết khi nào cần thẻ self-closing: `<img />`, `<input />`, `<br />`

**Header.jsx [A]**
- [ ] Navbar với logo "📚 ReadMore" bên trái
- [ ] Navigation links: Trang chủ | Sách | Danh mục | Liên hệ
- [ ] Icon giỏ hàng với số lượng (hardcode "0" — tuần 4 sẽ dùng state)
- [ ] Style bằng inline CSS (chưa dùng Bootstrap)

**Banner.jsx [B]**
- [ ] Hero section với gradient background
- [ ] Tiêu đề lớn, mô tả ngắn, nút "Khám phá ngay"
- [ ] Dùng biểu thức JS trong JSX: `style={{ background: '...' }}`

**BookCard.jsx [C]**
- [ ] Hiển thị: ảnh bìa, tên sách, tác giả, giá bán, giá gốc
- [ ] **Dữ liệu hardcode** trực tiếp trong component (không dùng props)
- [ ] Nút "Thêm vào giỏ" — chưa có chức năng

**BookGrid.jsx [D]**
- [ ] Khai báo mảng `BOOKS_DATA` gồm 4 cuốn sách (hardcode)
- [ ] Dùng `map()` để render từng cuốn → phải có `key={book.id}`
- [ ] Dùng template literal cho ảnh: `src={`https://picsum.photos/seed/book${book.id}/200/280`}`
- [ ] Tham khảo: `SourceCode/Week02-Components/src/components/BookGrid.jsx`

**CategoryList.jsx [E]**
- [ ] Khai báo mảng `CATEGORIES` gồm 5 danh mục
- [ ] Dùng `&&` operator: chỉ render danh sách nếu `CATEGORIES.length > 0`
- [ ] Dùng ternary: nếu có data → render grid, nếu không → "Không có danh mục"
- [ ] Tham khảo: `SourceCode/Week02-Components/src/components/CategoryList.jsx`

**App.jsx [E + REVIEW: A]**
- [ ] Import tất cả 5 components vào App.jsx
- [ ] Render theo đúng thứ tự: Header → Banner → CategoryList → BookGrid → Footer
- [ ] `npm run dev` hiển thị đầy đủ, **không có console error** (F12 kiểm tra)

### 📦 ĐẦU RA BẮT BUỘC — Tuần 2

| # | Đầu ra | Tiêu chí hoàn thành | File/Vị trí |
|---|--------|---------------------|-------------|
| 1 | 6 Functional Components | Header, Banner, BookCard, BookGrid, CategoryList, Footer | `src/components/` |
| 2 | Trang chủ chạy được | `npm run dev` → localhost hiển thị giao diện đầy đủ | Demo trực tiếp |
| 3 | Không có console error | F12 → Console tab trống (không có lỗi đỏ) | Screenshot DevTools |
| 4 | Slide giải thích JSX | JSX compile → JS với ví dụ code từ Babel REPL | `docs/week02-jsx.pdf` |

```
✏️ Commit: feat: week02 - static components (Header, Banner, BookCard, BookGrid, CategoryList)
```

---

## TUẦN 3 — PROPS & COMPONENT COMMUNICATION

### 🎯 Mục tiêu
Dữ liệu chảy từ cha xuống con qua Props. Hiểu one-way data flow. Tạo component có thể tái sử dụng với dữ liệu khác nhau. Dùng `props.children` để làm layout component.

### 📋 Phân công nhiệm vụ

| Thành viên | Nhiệm vụ |
|-----------|----------|
| A | Refactor BookCard.jsx — nhận book object qua props |
| B | Refactor BookGrid.jsx — nhận books[] qua props |
| C | Refactor CategoryList.jsx — nhận categories[] qua props |
| D | Viết SectionWrapper.jsx — generic layout với props.children |
| E | Cập nhật App.jsx — truyền dữ liệu xuống components, verify data flow |

### ✅ Checklist công việc

**BookCard.jsx [A]**
- [ ] Thêm `{ book, onAddToCart }` vào function parameters — xóa toàn bộ hardcode
- [ ] Thay các giá trị hardcode bằng: `{book.title}`, `{book.author}`, `{book.price.toLocaleString('vi-VN')}đ`
- [ ] Discount badge: `{book.originalPrice > book.price && <span>-{Math.round(...)}%</span>}`
- [ ] Nút thêm giỏ: `onClick={() => onAddToCart(book)}` + `disabled={book.stock === 0}`
- [ ] Tham khảo: `SourceCode/Week03-Props/src/components/BookCard.jsx`

**BookGrid.jsx [B]**
- [ ] Thêm `{ books, onAddToCart }` vào parameters
- [ ] Map qua `books` (không phải `BOOKS_DATA` hardcode nữa)
- [ ] Xử lý empty state: nếu `books.length === 0` → hiển thị "Không có sách nào"
- [ ] Tham khảo: `SourceCode/Week03-Props/src/components/BookGrid.jsx`

**CategoryList.jsx [C]**
- [ ] Thêm `{ categories }` vào parameters — xóa `CATEGORIES` hardcode
- [ ] Map qua `categories` props
- [ ] Tham khảo: `SourceCode/Week02-Components/src/components/CategoryList.jsx`

**SectionWrapper.jsx [D]**
- [ ] Props: `title` (string, required), `subtitle` (string, optional), `backgroundColor` (string, default `'#fff'`), `children` (node, required)
- [ ] Render: wrapper div → h2 với `title` → p với `subtitle` (nếu có) → `{children}`
- [ ] **Dùng ở ít nhất 3 nơi** trong App.jsx
- [ ] Tham khảo: `SourceCode/Week03-Props/src/components/SectionWrapper.jsx`

**App.jsx [E + REVIEW: D]**
- [ ] Khai báo `BOOKS` và `CATEGORIES` tại App.jsx (chuyển ra khỏi component)
- [ ] Truyền `books={BOOKS}` vào BookGrid, `categories={CATEGORIES}` vào CategoryList
- [ ] Truyền `onAddToCart={handleAddToCart}` (function log ra console tạm thời)
- [ ] Bọc mỗi section bằng `<SectionWrapper>`:
  ```jsx
  <SectionWrapper title="Danh mục" backgroundColor="#f8f9fa">
    <CategoryList categories={CATEGORIES} />
  </SectionWrapper>
  <SectionWrapper title="Sách nổi bật" subtitle="Top tuần này">
    <BookGrid books={BOOKS} onAddToCart={handleAddToCart} />
  </SectionWrapper>
  ```
- [ ] Mở React DevTools → chọn `BookCard` → xem tab Props → xác nhận dữ liệu đúng
- [ ] Tham khảo: `SourceCode/Week03-Props/src/App.jsx`

**Vẽ Data Flow Diagram [E]**
- [ ] Sơ đồ mũi tên: `App → (props) → BookGrid → (props) → BookCard`
- [ ] Chú thích rõ: data nào đi từ đâu đến đâu

### 📦 ĐẦU RA BẮT BUỘC — Tuần 3

| # | Đầu ra | Tiêu chí hoàn thành | File/Vị trí |
|---|--------|---------------------|-------------|
| 1 | BookCard nhận props | Không còn hardcode, render đúng với bất kỳ book object nào | `src/components/BookCard.jsx` |
| 2 | SectionWrapper với children | Tái sử dụng ở ≥3 nơi trong App.jsx | `src/components/SectionWrapper.jsx` |
| 3 | Data flow hoạt động | React DevTools xem props của BookCard hiển thị đúng dữ liệu | Demo DevTools |
| 4 | Data Flow Diagram | Sơ đồ vẽ rõ luồng dữ liệu trong project | `docs/week03-dataflow.png` |

```
✏️ Commit: feat: week03 - props refactor (BookCard, BookGrid, CategoryList), SectionWrapper children
```

---

## TUẦN 4 — XỬ LÝ SỰ KIỆN & useState

### 🎯 Mục tiêu
Thêm "bộ nhớ" cho component bằng `useState`. Hiểu controlled component. Biết tại sao phải immutable update. Thực hành Lifting State Up khi hai component cần dùng chung state.

### 📋 Phân công nhiệm vụ

| Thành viên | Nhiệm vụ |
|-----------|----------|
| A | SearchBar.jsx — controlled component + validation |
| B | Implement cart state + handleAddToCart trong App.jsx |
| C | Implement filter danh mục (activeCategory state) |
| D | Cập nhật Header.jsx — nhận cartCount qua props |
| E | Implement derived state filteredBooks, tích hợp tất cả vào App.jsx |

### ✅ Checklist công việc

**SearchBar.jsx [A]**
- [ ] `const [keyword, setKeyword] = useState('')`
- [ ] Input: `value={keyword}` + `onChange={(e) => setKeyword(e.target.value)}`  → đây là **controlled component**
- [ ] Validation khi submit: `keyword.trim().length < 2` → set error state, hiển thị message đỏ
- [ ] Nút Clear (×): chỉ hiện khi `keyword !== ''`, click → `setKeyword('')` + `onSearch('')`
- [ ] Gọi `onSearch(keyword.trim())` khi submit form (dùng `e.preventDefault()`)
- [ ] Tham khảo: `SourceCode/Week04-Events-State/src/components/SearchBar.jsx`

**Cart state [B]**
- [ ] Trong App.jsx: `const [cart, setCart] = useState([])`
- [ ] `handleAddToCart(book)`:
  - Tìm item đã có: `const existing = cart.find(i => i.id === book.id)`
  - Nếu có → `setCart(prev => prev.map(i => i.id === book.id ? {...i, quantity: i.quantity+1} : i))`
  - Nếu chưa → `setCart(prev => [...prev, {...book, quantity: 1}])`
  - **KHÔNG được làm:** `cart.push(book)` hoặc `cart[i].quantity++` (mutate trực tiếp)
- [ ] `totalItems = cart.reduce((sum, i) => sum + i.quantity, 0)`
- [ ] Tham khảo: `SourceCode/Week04-Events-State/src/App.jsx`

**Filter danh mục [C]**
- [ ] `const [activeCategory, setActiveCategory] = useState(null)` — null = tất cả
- [ ] Render các nút filter từ danh sách categories
- [ ] Active button: style khác khi `activeCategory === cat.id`

**Header nhận cartCount [D]**
- [ ] Thêm prop `cartCount` vào Header.jsx
- [ ] Hiển thị số: `🛒 {cartCount > 0 && <span>{cartCount}</span>}`

**Derived state & tích hợp [E + REVIEW: ALL]**
- [ ] `filteredBooks` tính từ state (không lưu riêng):
  ```js
  const filteredBooks = ALL_BOOKS.filter(book => {
    const matchKw = !keyword || book.title.toLowerCase().includes(keyword.toLowerCase());
    const matchCat = activeCategory === null || book.categoryId === activeCategory;
    return matchKw && matchCat;
  });
  ```
- [ ] Truyền `onSearch={handleSearch}` xuống SearchBar → SearchBar gọi khi submit (lifting state)
- [ ] Truyền `books={filteredBooks}` xuống BookGrid
- [ ] Truyền `cartCount={totalItems}` xuống Header
- [ ] Test: gõ search → danh sách lọc | click filter → lọc theo danh mục | click "Thêm giỏ" → số tăng

**Viết báo cáo giải thích [B]**
- [ ] Giải thích: tại sao `setCart(prev => [...prev, item])` đúng, còn `cart.push(item)` sai?
- [ ] Gợi ý: React so sánh reference của state array để quyết định có re-render không

### 📦 ĐẦU RA BẮT BUỘC — Tuần 4

| # | Đầu ra | Tiêu chí hoàn thành | File/Vị trí |
|---|--------|---------------------|-------------|
| 1 | SearchBar controlled | `value` bind với state, validation min 2 ký tự, có nút Clear | `src/components/SearchBar.jsx` |
| 2 | Cart state hoạt động | Thêm sách → số tăng; thêm sách đã có → số lượng tăng (không duplicate) | `src/App.jsx` — hàm `handleAddToCart` |
| 3 | Filter danh mục | Click danh mục → chỉ hiện sách của danh mục đó | `src/App.jsx` — state `activeCategory` |
| 4 | Lifting State Up | Header nhận `cartCount` từ App, SearchBar nhận `onSearch` từ App | React DevTools props panel |
| 5 | Giải thích immutable update | Lý giải rõ tại sao không mutate state trực tiếp | Mục 3.2 trong báo cáo tuần 4 |

```
✏️ Commit: feat: week04 - useState cart, controlled SearchBar, filter, lifting state up
```

---

## TUẦN 5 — REACT BOOTSTRAP & GIAO DIỆN RESPONSIVE

### 🎯 Mục tiêu
Thay thế toàn bộ inline CSS bằng React-Bootstrap. Hiểu Grid system (Container/Row/Col). Giao diện responsive không vỡ layout ở mọi kích thước màn hình.

### 📋 Phân công nhiệm vụ

| Thành viên | Nhiệm vụ |
|-----------|----------|
| A | Header → Navbar + Nav + Badge |
| B | HomePage Banner → Jumbotron style; CategoryList → Row/Col |
| C | BookCard → Card + Badge + Button |
| D | BookGrid → Row + Col với breakpoints |
| E | CartPage layout + test responsive toàn bộ app |

### ✅ Checklist công việc

**Setup Bootstrap [A]**
- [ ] Thêm vào `main.jsx`: `import 'bootstrap/dist/css/bootstrap.min.css';`
- [ ] Xóa import CSS cũ trong App.jsx (nếu có)

**Header → Navbar [A]**
- [ ] Dùng: `<Navbar bg="dark" variant="dark" expand="md">`
- [ ] Dùng: `<Navbar.Toggle>` + `<Navbar.Collapse>` cho mobile menu
- [ ] Dùng: `<Nav.Link as={NavLink} to="/">` (kết hợp react-router NavLink)
- [ ] Cart icon với `<Badge bg="danger" pill>{cartCount}</Badge>` chỉ hiện khi `cartCount > 0`
- [ ] Tham khảo: `SourceCode/Week05-Bootstrap/src/components/Header.jsx`

**CategoryList → Row/Col [B]**
- [ ] `<Row xs={2} sm={3} md={5} className="g-3">`
- [ ] Mỗi category là một `<Col>` chứa `<Card className="text-center">`

**BookCard → Card [C]**
- [ ] Bọc tất cả bằng `<Card className="h-100 shadow-sm">`
- [ ] Dùng `<Card.Img>`, `<Card.Body>`, `<Card.Title>`, `<Card.Subtitle>`
- [ ] Dùng `<Badge bg="info">` cho category label
- [ ] Dùng `<Button variant="primary" size="sm" className="w-100">`
- [ ] Tham khảo: `SourceCode/Week05-Bootstrap/src/components/BookCard.jsx`

**BookGrid → Row/Col [D]**
- [ ] `<Row xs={2} sm={3} md={4} lg={5} className="g-3">`
- [ ] Mỗi BookCard trong một `<Col>` — class `h-100` để đồng đều chiều cao

**Responsive test [E]**
- [ ] Mở Chrome DevTools → Ctrl+Shift+M (Device Toolbar)
- [ ] Test tại **375px** (iPhone SE): navbar collapse, grid 2 cột → không có overflow ngang
- [ ] Test tại **768px** (iPad): grid 3-4 cột → OK
- [ ] Test tại **1280px** (Desktop): grid 5-6 cột → OK
- [ ] Chụp screenshot 3 breakpoints, lưu vào `docs/week05-responsive/`

### 📦 ĐẦU RA BẮT BUỘC — Tuần 5

| # | Đầu ra | Tiêu chí hoàn thành | File/Vị trí |
|---|--------|---------------------|-------------|
| 1 | Toàn bộ UI dùng React-Bootstrap | Không còn style `{}` inline lớn, dùng Bootstrap classes | `src/components/` |
| 2 | Responsive 3 breakpoints | Screenshot chứng minh không vỡ layout ở 375/768/1280px | `docs/week05-responsive/` |
| 3 | Navbar collapse trên mobile | Hamburger menu hoạt động ở màn hình nhỏ | Demo hoặc screenshot |
| 4 | Báo cáo Bootstrap components | Bảng: component đã dùng + cách customize | Mục 3.2 báo cáo tuần 5 |

```
✏️ Commit: feat: week05 - React Bootstrap UI (Navbar, Card, Row/Col), responsive layout
```

---

## TUẦN 6 — ROUTING VỚI REACT ROUTER DOM

### 🎯 Mục tiêu
SPA điều hướng không reload trang. Biết cấu hình routes, đọc tham số động từ URL, bảo vệ route cần xác thực.

### 📋 Phân công nhiệm vụ

| Thành viên | Nhiệm vụ |
|-----------|----------|
| A | Cấu hình BrowserRouter + khai báo Routes trong App.jsx |
| B | BookDetailPage.jsx — dùng useParams() |
| C | CartPage.jsx — hiển thị giỏ hàng đầy đủ |
| D | ProtectedRoute.jsx + NotFoundPage.jsx |
| E | Cập nhật Header NavLink, vẽ Route Map diagram |

### ✅ Checklist công việc

**Router setup [A]**
- [ ] Bọc App trong `<BrowserRouter>` tại `main.jsx` (hoặc `App.jsx`)
- [ ] Khai báo tất cả routes:
  ```jsx
  <Routes>
    <Route path="/"            element={<HomePage />} />
    <Route path="/books"       element={<BookListPage />} />
    <Route path="/books/:id"   element={<BookDetailPage />} />
    <Route path="/cart"        element={<CartPage />} />
    <Route path="/admin/books" element={<ProtectedRoute>...</ProtectedRoute>} />
    <Route path="*"            element={<NotFoundPage />} />
  </Routes>
  ```
- [ ] Tham khảo: `SourceCode/Week06-Routing/src/App.jsx`

**BookDetailPage [B]**
- [ ] `const { id } = useParams()` — đọc `:id` từ URL `/books/1`
- [ ] Tìm sách: `const book = BOOKS.find(b => b.id === parseInt(id))`
- [ ] Nếu không tìm thấy → hiển thị "Không tìm thấy sách" + nút quay lại
- [ ] Breadcrumb: `<Link to="/">Trang chủ</Link> > <Link to="/books">Sách</Link> > {book.title}`
- [ ] Nút "Quay lại": `const navigate = useNavigate(); navigate(-1)`
- [ ] Tham khảo: `SourceCode/Week06-Routing/src/pages/BookDetailPage.jsx`

**CartPage [C]**
- [ ] Nhận `cartItems` và `onUpdateQuantity`, `onRemove` qua props (hoặc Context)
- [ ] Hiển thị bảng: ảnh | tên sách | đơn giá | số lượng | thành tiền | xóa
- [ ] Nút tăng/giảm số lượng; xóa item
- [ ] Tổng tiền: `cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)`
- [ ] Empty state: "Giỏ hàng trống 🛒" khi `cartItems.length === 0`

**ProtectedRoute & 404 [D]**
- [ ] `ProtectedRoute`: nếu `!isAllowed` → `<Navigate to={redirectTo} replace />`
- [ ] Test: truy cập `/admin/books` khi `isAdmin = false` → redirect về `/`
- [ ] `NotFoundPage`: hiển thị "404 — Trang không tồn tại", nút về trang chủ
- [ ] Tham khảo: `SourceCode/Week06-Routing/src/components/ProtectedRoute.jsx`

**Header NavLink [E]**
- [ ] Thay `<Nav.Link href="/books">` bằng `<Nav.Link as={NavLink} to="/books">`
- [ ] `NavLink` tự thêm class `active` — kiểm tra trong DevTools → Elements tab
- [ ] Dùng prop `end` cho route `/` để tránh match tất cả: `<NavLink to="/" end>`

**Route Map [E]**
- [ ] Vẽ sơ đồ cây routes (có nhánh `*` và nested route)
- [ ] Lưu: `docs/week06-routemap.png`

### 📦 ĐẦU RA BẮT BUỘC — Tuần 6

| # | Đầu ra | Tiêu chí hoàn thành | File/Vị trí |
|---|--------|---------------------|-------------|
| 1 | ≥5 routes hoạt động | URL thay đổi đúng khi click NavLink, không reload trang | `src/App.jsx` |
| 2 | BookDetailPage dùng useParams | `/books/1` → hiển thị sách id=1; `/books/99` → thông báo không tìm thấy | `src/pages/BookDetailPage.jsx` |
| 3 | ProtectedRoute redirect | Truy cập `/admin/books` khi chưa login → tự redirect về `/` | `src/components/ProtectedRoute.jsx` |
| 4 | NavLink highlight đúng | Link trang hiện tại có class `active` (kiểm tra DevTools) | `src/components/Header.jsx` |
| 5 | Route Map diagram | Sơ đồ cây đầy đủ với tất cả routes | `docs/week06-routemap.png` |

```
✏️ Commit: feat: week06 - react-router-dom (BrowserRouter, dynamic route, ProtectedRoute, NavLink)
```

---

## TUẦN 7 — BUILT-IN HOOKS NÂNG CAO

### 🎯 Mục tiêu
Quản lý side effects với `useEffect`. Chia sẻ state toàn app không cần props drilling bằng `useContext`. Truy cập DOM trực tiếp bằng `useRef` mà không trigger re-render.

### 📋 Phân công nhiệm vụ

| Thành viên | Nhiệm vụ |
|-----------|----------|
| A | CartContext.jsx — createContext, Provider, custom hook useCart() |
| B | ThemeContext.jsx — dark/light mode + lưu localStorage |
| C | Cập nhật BookListPage: useEffect fetch mock + useRef focus |
| D | Cập nhật document.title theo cart (useEffect + cleanup) |
| E | Refactor Header + BookCard dùng useCart(); test toàn bộ |

### ✅ Checklist công việc

**CartContext.jsx [A]**
- [ ] `const CartContext = createContext(null)`
- [ ] `CartProvider` component: state `cartItems`, các hàm `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`
- [ ] `totalItems` và `totalPrice` tính từ state (derived values)
- [ ] Export custom hook: `export const useCart = () => useContext(CartContext)`
- [ ] Bọc App trong `<CartProvider>` tại `main.jsx`
- [ ] Tham khảo: `SourceCode/Week07-Hooks/src/context/CartContext.jsx`

**ThemeContext.jsx [B]**
- [ ] `const ThemeContext = createContext()`
- [ ] Provider giữ state `isDark`, hàm `toggleTheme()`
- [ ] `useEffect`: lưu theme vào `localStorage` mỗi khi `isDark` thay đổi
- [ ] Init từ localStorage: `useState(() => localStorage.getItem('theme') === 'dark')`
- [ ] Áp dụng class `data-bs-theme="dark"` lên `<html>` khi `isDark = true`

**useEffect trong BookListPage [C]**
- [ ] **Effect 1** — fetch mock (dependency `[]`):
  ```js
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => { setBooks(ALL_BOOKS); setLoading(false); }, 800);
    return () => clearTimeout(timer); // CLEANUP
  }, []);
  ```
- [ ] **useRef** — focus input sau khi load xong:
  ```js
  const searchRef = useRef(null);
  useEffect(() => {
    if (!loading) searchRef.current?.focus();
  }, [loading]);
  <input ref={searchRef} ... />
  ```
- [ ] Tham khảo: `SourceCode/Week07-Hooks/src/pages/BookListPage.jsx`

**document.title [D]**
- [ ] **Effect 2** — cập nhật tab title (dependency `[totalItems]`):
  ```js
  const { totalItems } = useCart();
  useEffect(() => {
    document.title = totalItems > 0 ? `(${totalItems}) ReadMore` : 'ReadMore Bookstore';
    return () => { document.title = 'ReadMore Bookstore'; }; // cleanup khi unmount
  }, [totalItems]);
  ```

**Refactor dùng Context [E]**
- [ ] Header: xóa prop `cartCount`, thay bằng `const { totalItems } = useCart()`
- [ ] BookCard: xóa prop `onAddToCart`, thay bằng `const { addToCart } = useCart()`
- [ ] Kiểm tra: không còn chuỗi props drilling `App → Header → cartCount`
- [ ] Viết bảng so sánh: khi nào dùng `useEffect` / khi nào dùng `useContext` / khi nào dùng `useRef`

### 📦 ĐẦU RA BẮT BUỘC — Tuần 7

| # | Đầu ra | Tiêu chí hoàn thành | File/Vị trí |
|---|--------|---------------------|-------------|
| 1 | CartContext hoạt động toàn app | Header hiển thị số giỏ hàng đúng mà không cần props drilling | `src/context/CartContext.jsx` |
| 2 | ThemeContext toggle dark/light | Nút toggle đổi theme; reload lại vẫn giữ theme | `src/context/ThemeContext.jsx` |
| 3 | useEffect có cleanup function | Code `return () => clearTimeout(timer)` hoặc tương đương | `src/pages/BookListPage.jsx` |
| 4 | useRef focus input | Search input tự focus sau khi data mock load xong | `src/pages/BookListPage.jsx` |
| 5 | Bảng so sánh 3 hooks | Giải thích use case thực tế của useEffect/useContext/useRef trong project | Mục 3.2 báo cáo tuần 7 |

```
✏️ Commit: feat: week07 - CartContext, ThemeContext, useEffect cleanup, useRef focus
```

---

## TUẦN 8 — AXIOS & JSON-SERVER (CRUD)

### 🎯 Mục tiêu
Kết nối app với REST API thực (json-server). Biết gọi HTTP đầy đủ CRUD. Tách logic API ra service layer. Xử lý 3 trạng thái: loading / error / success.

### 📋 Phân công nhiệm vụ

| Thành viên | Nhiệm vụ |
|-----------|----------|
| A | Cấu hình json-server, viết bookService.js |
| B | Cập nhật BookListPage — thay hardcode bằng getBooks() + loading/error |
| C | Viết BookManagePage (Admin) — bảng CRUD + Modal thêm/sửa |
| D | Implement delete với confirm dialog + thông báo success/error |
| E | Viết tài liệu API endpoints table; test toàn bộ CRUD |

### ✅ Checklist công việc

**json-server [A]**
- [ ] Đảm bảo `db.json` ở root project có đủ dữ liệu
- [ ] Thêm script vào `package.json`: `"server": "json-server --watch db.json --port 3001"`
- [ ] Chạy 2 terminal: `npm run dev` (port 5173) và `npm run server` (port 3001)
- [ ] Kiểm tra: `curl http://localhost:3001/books` trả về JSON

**bookService.js [A]**
- [ ] Tạo `src/services/bookService.js`
- [ ] `const api = axios.create({ baseURL: 'http://localhost:3001', timeout: 5000 })`
- [ ] Export: `getBooks(params)`, `getBookById(id)`, `createBook(data)`, `updateBook(id, data)`, `deleteBook(id)`
- [ ] Thêm interceptor log lỗi
- [ ] Tham khảo: `SourceCode/Week08-Axios/src/services/bookService.js`

**BookListPage fetch [B]**
- [ ] Thay `setBooks(ALL_BOOKS)` bằng `const data = await getBooks()` bên trong `useEffect`
- [ ] `try/catch/finally` đầy đủ: `setLoading(true)` → fetch → `setBooks(data)` → `setError(null)` → `finally: setLoading(false)`
- [ ] Render loading: `if (loading) return <Spinner animation="border" />`
- [ ] Render error: `if (error) return <Alert variant="danger">{error}<Button onClick={refetch}>Thử lại</Button></Alert>`

**BookManagePage [C + D]**
- [ ] Bảng Bootstrap: tên | tác giả | giá | danh mục | tồn kho | actions
- [ ] Nút **Thêm mới** → mở Modal với Form rỗng
- [ ] Nút **Sửa** → mở Modal với Form điền sẵn dữ liệu
- [ ] Submit form: validate → POST hoặc PUT → cập nhật state danh sách
- [ ] Nút **Xóa**: `window.confirm("Bạn chắc chắn muốn xóa?")` → DELETE → xóa khỏi state
- [ ] Tham khảo: `SourceCode/Week08-Axios/src/pages/admin/BookManagePage.jsx`

**API Endpoints Table [E]**
- [ ] Viết bảng đầy đủ:

| Method | URL | Request Body | Response | Mô tả |
|--------|-----|--------------|----------|-------|
| GET | /books | — | Array books | Lấy tất cả |
| GET | /books/:id | — | Book object | Lấy 1 cuốn |
| POST | /books | Book object | Created book | Tạo mới |
| PUT | /books/:id | Book object | Updated book | Cập nhật |
| DELETE | /books/:id | — | `{}` | Xóa |

### 📦 ĐẦU RA BẮT BUỘC — Tuần 8

| # | Đầu ra | Tiêu chí hoàn thành | File/Vị trí |
|---|--------|---------------------|-------------|
| 1 | bookService.js đầy đủ 5 functions | GET/POST/PUT/DELETE đều hoạt động | `src/services/bookService.js` |
| 2 | BookListPage fetch từ json-server | Data thật từ db.json, có loading spinner + error alert | `src/pages/BookListPage.jsx` |
| 3 | Admin CRUD hoàn chỉnh | Thêm/sửa/xóa sách, db.json thay đổi tương ứng | `src/pages/admin/BookManagePage.jsx` |
| 4 | 3 trạng thái async | Loading spinner, error alert có retry, empty state | Screenshot 3 trạng thái |
| 5 | API endpoints table | Đủ 5 endpoints với method, URL, body, response | `docs/week08-api.md` |

```
✏️ Commit: feat: week08 - axios service layer, json-server CRUD, loading/error states
```

---

## TUẦN 9 — CUSTOM HOOKS & REFACTOR CODE

### 🎯 Mục tiêu
Tái sử dụng stateful logic bằng Custom Hook. Biết tách concerns: UI component chỉ lo render, hook lo logic. Áp dụng debounce để tối ưu search. Persist state với localStorage.

### 📋 Phân công nhiệm vụ

| Thành viên | Nhiệm vụ |
|-----------|----------|
| A | Viết useFetch(url, params) |
| B | Viết useDebounce(value, delay) |
| C | Viết useLocalStorage(key, initialValue) |
| D | Refactor BookListPage dùng useFetch + useDebounce |
| E | Implement Wishlist dùng useLocalStorage; kiểm tra Rules of Hooks |

### ✅ Checklist công việc

**useFetch [A]**
- [ ] Input: `url` (string), `params` (object, default `{}`)
- [ ] Output: `{ data, loading, error, refetch }`
- [ ] Dùng `useCallback` để tránh infinite loop khi params thay đổi
- [ ] Serialize params: `JSON.stringify(params)` trong dependency array
- [ ] Tham khảo: `SourceCode/Week09-CustomHooks/src/hooks/useFetch.js`

**useDebounce [B]**
- [ ] Input: `value`, `delay` (default 500ms)
- [ ] Output: `debouncedValue`
- [ ] `useEffect` với `setTimeout` + `clearTimeout` trong cleanup
- [ ] Test: gõ nhanh 5 ký tự → chỉ fetch 1 lần sau khi ngừng gõ 500ms
- [ ] Tham khảo: `SourceCode/Week09-CustomHooks/src/hooks/useDebounce.js`

**useLocalStorage [C]**
- [ ] Input: `key`, `initialValue`
- [ ] Output: `[storedValue, setValue]` — giống interface của `useState`
- [ ] `useState` init từ `localStorage.getItem(key)` (lazy init với callback)
- [ ] `setValue` cập nhật cả React state và `localStorage.setItem`
- [ ] Bọc trong try/catch (localStorage có thể bị block trong private mode)
- [ ] Tham khảo: `SourceCode/Week09-CustomHooks/src/hooks/useLocalStorage.js`

**Refactor BookListPage [D]**
- [ ] Thay `useEffect + axios` bằng `const { data: books, loading, error } = useFetch(URL, { q: debouncedKeyword })`
- [ ] `const debouncedKeyword = useDebounce(keyword, 400)`
- [ ] **So sánh code trước/sau**: đếm số dòng, highlight phần đã rút gọn
- [ ] Tham khảo: `SourceCode/Week09-CustomHooks/src/pages/BookListPage.jsx`

**Wishlist [E]**
- [ ] `const [wishlist, setWishlist] = useLocalStorage('readmore_wishlist', [])`
- [ ] Nút ❤️/🤍 trên BookCard: toggle thêm/xóa khỏi wishlist
- [ ] Test: reload trang → wishlist vẫn còn (kiểm tra DevTools → Application → Local Storage)

**Kiểm tra Rules of Hooks [E]**
- [ ] Không gọi hook trong điều kiện: `if (condition) useState(...)` → SAI
- [ ] Không gọi hook trong loop: `for (...) useState(...)` → SAI
- [ ] Không gọi hook trong function thường (chỉ trong React component hoặc custom hook)
- [ ] Tên custom hook bắt đầu bằng `use`: `useFetch`, `useDebounce`, `useLocalStorage` ✓

### 📦 ĐẦU RA BẮT BUỘC — Tuần 9

| # | Đầu ra | Tiêu chí hoàn thành | File/Vị trí |
|---|--------|---------------------|-------------|
| 1 | useFetch.js | Tái sử dụng được ở ≥2 component | `src/hooks/useFetch.js` |
| 2 | useDebounce.js | Search chỉ gọi API sau khi ngừng gõ (kiểm tra Network tab) | `src/hooks/useDebounce.js` |
| 3 | useLocalStorage.js | Wishlist persist sau reload | `src/hooks/useLocalStorage.js` |
| 4 | BookListPage refactored | Code ngắn hơn so với Week07; so sánh số dòng trước/sau | `src/pages/BookListPage.jsx` |
| 5 | Wishlist hoạt động | Nút ❤️ toggle; reload trang vẫn còn; kiểm tra LocalStorage | DevTools → Application tab |
| 6 | Cấu trúc thư mục src/ | `hooks/`, `services/`, `context/`, `pages/`, `components/` tách biệt | Screenshot VS Code Explorer |

```
✏️ Commit: feat: week09 - useFetch, useDebounce, useLocalStorage, wishlist, refactor BookListPage
```

---

## TUẦN 10 — NÂNG CAO (REDUX, LAZY LOADING, TAILWIND CSS) & DEPLOY

### 🎯 Mục tiêu
Tuần cuối gồm 2 nhóm việc: (1) **Nâng cao tự nghiên cứu** — mở rộng project theo 3 hướng các dự án thực tế thường dùng: quản lý state tập trung với **Redux Toolkit** (thay thế Context khi app phức tạp), **lazy loading** để tối ưu hiệu năng tải trang, và **Tailwind CSS** — phong cách styling utility-first đang phổ biến nhất hiện nay; (2) **Hoàn thiện & Deploy** — fix bug, build production, deploy lên Vercel/Netlify và chuẩn bị demo kết thúc môn. Phần Redux và Tailwind làm trên **branch riêng** (`feature/redux`, `feature/tailwind`) để không ảnh hưởng bản deploy từ `main`.

> **Lưu ý:** Phần nâng cao là tự nghiên cứu — checklist là lộ trình gợi ý. Quan trọng nhất là **bảng so sánh và lý giải trade-off** trong báo cáo, không phải code chạy được là xong.

### 📋 Phân công nhiệm vụ

| Thành viên | Nhiệm vụ |
|-----------|----------|
| A | Setup Redux Toolkit store + cartSlice |
| B | Migrate components từ CartContext sang Redux; viết so sánh Context vs Redux |
| C | Lazy loading: React.lazy + Suspense, lazy images, prefetch, bundle analysis |
| D | Setup Tailwind CSS, migrate BookCard + Banner sang Tailwind |
| E | Fix bug + build + deploy Vercel; đo Lighthouse; slide + video demo |

### ✅ Checklist công việc

#### Phần 1 — Redux Toolkit (branch: `feature/redux`)

**Lý thuyết cần nắm trước [A + B]**
- [ ] Vì sao cần Redux khi đã có Context? Nghiên cứu 3 hạn chế của Context: (1) mọi consumer re-render khi value đổi, (2) khó debug khi nhiều context lồng nhau, (3) logic update phân tán
- [ ] Hiểu mô hình một chiều: `dispatch(action) → reducer → store → useSelector → UI re-render`
- [ ] Redux Toolkit (RTK) là cách viết Redux hiện đại — KHÔNG học cách viết Redux "cổ điển" (switch/case, action types thủ công)

**Setup store [A]**
- [ ] Cài: `npm install @reduxjs/toolkit react-redux`
- [ ] Tạo `src/store/cartSlice.js` với `createSlice`:
  ```js
  import { createSlice } from '@reduxjs/toolkit';

  const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [] },
    reducers: {
      addToCart(state, action) {
        const existing = state.items.find(i => i.id === action.payload.id);
        if (existing) existing.quantity += 1;      // RTK dùng Immer — viết "mutate" nhưng vẫn immutable
        else state.items.push({ ...action.payload, quantity: 1 });
      },
      removeFromCart(state, action) {
        state.items = state.items.filter(i => i.id !== action.payload);
      },
      updateQuantity(state, action) {
        const item = state.items.find(i => i.id === action.payload.id);
        if (item) item.quantity = Math.max(1, action.payload.quantity);
      },
      clearCart(state) { state.items = []; },
    },
  });

  export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
  export const selectTotalItems = (state) => state.cart.items.reduce((s, i) => s + i.quantity, 0);
  export const selectTotalPrice = (state) => state.cart.items.reduce((s, i) => s + i.price * i.quantity, 0);
  export default cartSlice.reducer;
  ```
- [ ] Tạo `src/store/index.js`: `configureStore({ reducer: { cart: cartReducer } })`
- [ ] Bọc App trong `<Provider store={store}>` tại `main.jsx` (thay cho `<CartProvider>`)
- [ ] Giải thích trong báo cáo: tại sao `existing.quantity += 1` trong RTK **không vi phạm** quy tắc immutable của Tuần 4 (từ khóa: **Immer**)

**Migrate components [B]**
- [ ] Header: `const totalItems = useSelector(selectTotalItems)` — xóa `useCart()`
- [ ] BookCard: `const dispatch = useDispatch(); dispatch(addToCart(book))`
- [ ] CartPage: `useSelector(state => state.cart.items)` + dispatch `updateQuantity`/`removeFromCart`
- [ ] Cài Redux DevTools extension → mở tab Redux → click "Thêm vào giỏ" → thấy action log + state diff + **time-travel debugging** (chụp screenshot)

**Câu hỏi nghiên cứu [B]**
- [ ] Khi nào dùng Context là đủ, khi nào nên dùng Redux? (gợi ý: tần suất update, số lượng consumer, nhu cầu debug)
- [ ] Với ReadMore hiện tại, Redux có phải over-engineering không? Lập luận 2 chiều
- [ ] Tìm hiểu thêm (không bắt buộc code): RTK Query thay được gì cho `useFetch` + axios của Tuần 9?

#### Phần 2 — Lazy Loading (branch: `feature/perf`)

**Đo mốc ban đầu [C + E]**
- [ ] Trước khi tối ưu: đo Lighthouse Performance score + tổng KB JS tải trang đầu (Network tab) làm mốc so sánh

**Route-based code splitting [C]**
- [ ] `const BookListPage = lazy(() => import('./pages/BookListPage'))` — làm tương tự cho các page lớn
- [ ] Bọc `<Routes>` trong `<Suspense fallback={<div>Đang tải...</div>}>`
- [ ] Kiểm tra Network tab: chỉ load chunk khi navigate đến route đó
- [ ] Tham khảo: `SourceCode/Week10-Final/src/App.jsx`

**Lazy load images [C]**
- [ ] Thêm `loading="lazy"` cho mọi `<img>`/`<Card.Img>` trong BookCard — ảnh ngoài viewport không tải cho đến khi scroll tới
- [ ] Kiểm chứng: Network tab → throttle "Fast 4G" → load `/books` → scroll xuống → thấy ảnh tải dần theo scroll
- [ ] Nâng cao hơn: viết `useIntersectionObserver(ref)` custom hook (ôn Tuần 9) để hiện skeleton trước khi ảnh vào viewport

**Prefetch on hover [C]**
- [ ] Vấn đề: lazy route → lần đầu click sang trang mới phải chờ tải chunk
- [ ] Giải pháp: prefetch khi hover lên link:
  ```jsx
  const prefetchBookList = () => import('./pages/BookListPage'); // trigger tải chunk trước
  <Nav.Link as={NavLink} to="/books" onMouseEnter={prefetchBookList}>Sách</Nav.Link>
  ```
- [ ] Kiểm chứng: Network tab → hover link "Sách" (chưa click) → thấy chunk `BookListPage-*.js` được tải

**Bundle analysis [C + E]**
- [ ] Cài: `npm install -D rollup-plugin-visualizer` → thêm vào `vite.config.js`
- [ ] `npm run build` → mở `stats.html` → xác định 3 dependency nặng nhất trong bundle
- [ ] Đề xuất 1 cải tiến từ kết quả phân tích (vd: import lodash theo function thay vì cả thư viện)

**Đo lường [E]**
- [ ] Bảng so sánh trước/sau: Lighthouse Performance, FCP, LCP, tổng KB JS trang đầu
- [ ] Lưu screenshots vào `docs/week10-perf/`

#### Phần 3 — Tailwind CSS (branch: `feature/tailwind`)

**Lý thuyết cần nắm trước [D]**
- [ ] **Utility-first** khác gì component-based (Bootstrap)? Bootstrap cho class ngữ nghĩa (`btn btn-primary`) với style định sẵn; Tailwind cho class nguyên tử (`px-4 py-2 bg-blue-600 rounded`) tự ghép
- [ ] Đọc "Reusing Styles" trong docs Tailwind: vì sao Tailwind khuyên tạo **React component** thay vì class CSS mới khi cần tái sử dụng — điểm này khớp với tư duy component của React

**Setup [D]**
- [ ] Trên branch mới: `npm install tailwindcss @tailwindcss/vite`
- [ ] Thêm plugin vào `vite.config.js` + `@import "tailwindcss";` vào file CSS chính (theo docs hiện tại: https://tailwindcss.com/docs/installation)
- [ ] ⚠️ Không trộn Bootstrap và Tailwind trên cùng component — xung đột reset CSS và class. Trong branch này, component nào migrate sang Tailwind thì bỏ hẳn React-Bootstrap ở component đó

**Migrate 2 components [D]**
- [ ] **Banner.jsx**: gradient → `bg-gradient-to-r from-blue-600 to-indigo-700`, spacing → `py-16 px-4`, nút → `bg-white text-blue-700 font-semibold px-6 py-2 rounded-lg hover:bg-blue-50`
- [ ] **BookCard.jsx**: Card → `rounded-xl shadow-sm hover:shadow-md transition`, badge giảm giá → `absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded`
- [ ] Responsive bằng breakpoint prefixes thay cho Row/Col: `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3`
- [ ] Test lại 3 breakpoints 375/768/1280px như Tuần 5

**Câu hỏi nghiên cứu [D + E]**
- [ ] Bảng so sánh Bootstrap vs Tailwind: tốc độ dev ban đầu, khả năng customize, kích thước CSS sau build, độ dài JSX, learning curve
- [ ] Vì sao CSS Tailwind sau build thường nhỏ? (gợi ý: chỉ generate class thực sự được dùng)
- [ ] Nếu làm lại ReadMore từ đầu, nhóm chọn Bootstrap hay Tailwind? Vì sao?

#### Phần 4 — Hoàn thiện, Build & Deploy (branch: `main`)

**Bug fix [E + ALL]**
- [ ] Test tất cả routes: `/`, `/books`, `/books/1`, `/cart`, `/admin/books`
- [ ] Test CRUD admin: thêm sách → sửa → xóa — không lỗi
- [ ] Test giỏ hàng: thêm, tăng/giảm, xóa, tổng tiền đúng
- [ ] Test responsive: mobile 375px không overflow ngang

**Build [E]**
- [ ] `npm run build` — không có error, không có warning về missing keys
- [ ] `npm run preview` — test bản production local
- [ ] Kiểm tra `dist/` folder: có `index.html`, `assets/`

**Deploy Vercel [E]**
- [ ] Tạo file `vercel.json` để fix 404 khi refresh:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
- [ ] Deploy: `vercel` hoặc kết nối GitHub repo trên vercel.com
- [ ] Test live URL: mở trên điện thoại thật

**Slide & Video demo [E]**
- [ ] Slide 8-10 trang: giới thiệu, kiến trúc components, tính năng, phần nâng cao đã nghiên cứu (Redux/Tailwind/perf), challenges, lessons learned
- [ ] Video 3-5 phút: demo live tất cả tính năng (Loom hoặc OBS)

### 📦 ĐẦU RA BẮT BUỘC — Tuần 10

| # | Đầu ra | Tiêu chí hoàn thành | File/Vị trí |
|---|--------|---------------------|-------------|
| 1 | cartSlice + store hoạt động | Giỏ hàng chạy đúng như bản Context; Redux DevTools thấy action log | branch `feature/redux` — `src/store/` |
| 2 | Screenshot Redux DevTools | Action log + state diff + time-travel | `docs/week10-redux/` |
| 3 | So sánh Context vs Redux | Bảng tiêu chí + kết luận khi nào dùng gì, có lý giải Immer | Mục 3.2 báo cáo tuần 10 |
| 4 | React.lazy + lazy images + prefetch | Network tab chứng minh: chunk load khi navigate/hover, ảnh tải theo scroll | branch `feature/perf` |
| 5 | Bundle analysis + bảng đo Lighthouse | `stats.html`, 3 dependency nặng nhất, Performance/FCP/LCP trước-sau | `docs/week10-perf/` |
| 6 | Banner + BookCard bản Tailwind | Hiển thị tương đương bản Bootstrap, responsive 3 breakpoints | branch `feature/tailwind` |
| 7 | So sánh Bootstrap vs Tailwind | Bảng ≥5 tiêu chí + khuyến nghị của nhóm | Mục 3.3 báo cáo tuần 10 |
| 8 | npm run build thành công | Không có error/warning, `dist/` được tạo ra | Screenshot terminal |
| 9 | Live URL deploy + vercel.json | Link công khai chạy trên điện thoại thật; refresh không 404 | URL Vercel/Netlify + `vercel.json` |
| 10 | Slide demo | 8-10 trang, có kiến trúc + phần nâng cao + challenges | `docs/week10-slide.pptx` |
| 11 | Video demo | 3-5 phút, demo đủ tính năng | Link Loom/YouTube |

```
✏️ Commit (mỗi branch riêng):
feat: week10 - redux toolkit cart (branch feature/redux)
perf: week10 - react.lazy, lazy images, prefetch, bundle analysis (branch feature/perf)
feat: week10 - tailwind migration Banner + BookCard (branch feature/tailwind)
chore: week10 - build, deploy Vercel v1.0, finalize ReadMore Bookstore (main)
```

---

## 📊 BẢNG THEO DÕI TIẾN ĐỘ NHÓM

| Tuần | Chủ đề | File/Component chính cần có | Trạng thái |
|------|--------|------------------------------|------------|
| 1 | Setup & Design | `db.json`, `README.md`, mockup 4 màn hình | ☐ |
| 2 | Components & JSX | `Header`, `Banner`, `BookCard`, `BookGrid`, `CategoryList`, `Footer` | ☐ |
| 3 | Props | `BookCard` (props), `SectionWrapper` (children), `BookGrid` (props) | ☐ |
| 4 | Events & State | `SearchBar` (controlled), `App` (cart state, filter, lifting) | ☐ |
| 5 | Bootstrap | Tất cả components dùng Bootstrap, responsive 3 breakpoints | ☐ |
| 6 | Routing | `App` (BrowserRouter), `BookDetailPage` (useParams), `ProtectedRoute` | ☐ |
| 7 | Hooks | `CartContext`, `ThemeContext`, `BookListPage` (useEffect+useRef) | ☐ |
| 8 | Axios CRUD | `bookService.js`, `BookManagePage`, loading/error states | ☐ |
| 9 | Custom Hooks | `useFetch`, `useDebounce`, `useLocalStorage`, refactor BookListPage | ☐ |
| 10 | Nâng cao & Deploy | `cartSlice` (Redux Toolkit), lazy+Suspense, lazy images+prefetch+bundle analysis, Tailwind (Banner, BookCard), live URL, slide+video demo | ☐ |

---

## 🔧 LỆNH THƯỜNG DÙNG

```bash
# Chạy development
npm run dev                                    # Vite dev server (port 5173)
npm run server                                 # json-server mock API (port 3001)

# Kiểm tra trước khi commit
npm run lint                                   # ESLint
npm run build                                  # Build production → dist/
npm run preview                                # Test bản build

# Tuần 10 — Nâng cao
npm install @reduxjs/toolkit react-redux       # Redux Toolkit (branch feature/redux)
npm install -D rollup-plugin-visualizer        # Bundle analysis
npm install tailwindcss @tailwindcss/vite      # Tailwind CSS (branch feature/tailwind)

# Deploy
npm install -g vercel && vercel               # Deploy Vercel
```

## 📁 CẤU TRÚC THƯ MỤC CUỐI PROJECT (Tuần 10)

```
readmore-bookstore/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── BookCard.jsx
│   │   ├── BookGrid.jsx
│   │   ├── CategoryList.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SectionWrapper.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── CartContext.jsx         ← Tuần 7
│   │   └── ThemeContext.jsx        ← Tuần 7
│   ├── hooks/
│   │   ├── useFetch.js             ← Tuần 9
│   │   ├── useDebounce.js          ← Tuần 9
│   │   └── useLocalStorage.js      ← Tuần 9
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── BookListPage.jsx
│   │   ├── BookDetailPage.jsx      ← Tuần 6
│   │   ├── CartPage.jsx
│   │   ├── NotFoundPage.jsx        ← Tuần 6
│   │   └── admin/
│   │       └── BookManagePage.jsx  ← Tuần 8
│   ├── services/
│   │   ├── bookService.js          ← Tuần 8
│   │   └── categoryService.js      ← Tuần 8
│   ├── store/                      ← Tuần 10 (branch feature/redux)
│   │   ├── index.js
│   │   └── cartSlice.js
│   ├── App.jsx
│   └── main.jsx
├── docs/
│   ├── mockup/                     ← Tuần 1 (PNG + prompts.md + handoff.md + style-guide.md)
│   ├── week03-dataflow.png         ← Tuần 3
│   ├── week05-responsive/          ← Tuần 5
│   ├── week06-routemap.png         ← Tuần 6
│   ├── week08-api.md               ← Tuần 8
│   ├── week10-slide.pptx           ← Tuần 10
│   ├── week10-redux/               ← Tuần 10
│   └── week10-perf/                ← Tuần 10
├── db.json                         ← json-server
├── vercel.json                     ← Tuần 10
├── .gitignore
├── package.json
└── README.md
```
