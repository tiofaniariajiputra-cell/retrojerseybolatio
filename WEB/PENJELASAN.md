# Jersey Bola Retro - Dokumentasi Lengkap

## 📋 Deskripsi Project
Website e-commerce untuk penjualan jersey bola retro klasik dari berbagai klub dan era. Dibangun dengan Next.js 16, Prisma, dan Supabase untuk memberikan pengalaman belanja yang modern dan responsif.

---

## 🔐 Akun Admin

### Kredensial Admin
- **Email**: `admin@gmail.com` atau `admin@example.com`
- **Password**: `admin123`
- **Role**: Admin

### Cara Membuat Admin Baru
1. Register di halaman `/register` menggunakan salah satu email admin:
   - `admin@gmail.com` 
   - `admin@example.com`
2. Sistem otomatis akan memberikan role admin
3. Setelah login, menu "Dashboard Admin" akan muncul di navbar

### Fitur Admin
- ✅ Kelola Produk (CRUD)
- ✅ Kelola Kategori (CRUD)
- ✅ Dashboard dengan statistik
- ✅ Lihat produk stok rendah
- ✅ Manajemen ukuran dan stok

---

## 💻 Tech Stack

### Frontend
- **Next.js 16.0.6** - React framework dengan App Router
- **React 19** - Library UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Turbopack** - Fast bundler untuk development

### Backend & Database
- **Prisma 5.22.0** - ORM untuk database
- **Supabase** - PostgreSQL database + Authentication
- **PostgreSQL** - Relational database

### Authentication
- **Supabase Auth** - User authentication & authorization
- **Role-based access** - Admin dan User roles

### Deployment & Development
- **Node.js 22.20.0** - JavaScript runtime
- **npm** - Package manager
- **Git** - Version control

---

## 📦 Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/VOLTXDHARMA/jersey-bola.git
cd jersey-bola
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy `.env.example` ke `.env` dan isi dengan kredensial Anda:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key"
SUPABASE_SERVICE_ROLE_KEY="your_service_role_key"

# WhatsApp (Optional)
NEXT_PUBLIC_WHATSAPP_NUMBER="62xxx"
```

### 4. Generate Prisma Client
```bash
npx prisma generate
```

### 5. Run Database Migration
```bash
npx prisma db push
```

### 6. Run Development Server
```bash
npm run dev
```

Website akan berjalan di `http://localhost:3000`

---

## 🗂️ Struktur Project

```
jersey-bola-retro/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin panel
│   │   ├── layout.tsx           # Admin layout dengan sidebar
│   │   ├── page.tsx             # Dashboard admin
│   │   ├── products/            # Kelola produk
│   │   │   ├── page.tsx        # List produk
│   │   │   ├── new/            # Tambah produk
│   │   │   └── [id]/edit/      # Edit produk
│   │   └── categories/          # Kelola kategori
│   │       ├── page.tsx        # List kategori
│   │       ├── new/            # Tambah kategori
│   │       └── [id]/edit/      # Edit kategori
│   ├── api/                     # API Routes
│   │   ├── auth/
│   │   │   └── signup/         # Register endpoint
│   │   ├── admin/
│   │   │   ├── products/       # CRUD produk
│   │   │   └── categories/     # CRUD kategori
│   │   └── categories/         # Public API
│   ├── login/                   # Halaman login
│   ├── register/                # Halaman register
│   ├── products/                # Katalog produk
│   │   ├── page.tsx            # List produk dengan filter
│   │   └── [slug]/             # Detail produk
│   ├── more-info/               # Halaman informasi
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
│
├── src/
│   ├── frontend/
│   │   ├── components/          # React components
│   │   │   ├── Navbar.tsx      # Navigation bar
│   │   │   ├── Footer.tsx      # Footer
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── DeleteProductButton.tsx
│   │   │   └── DeleteCategoryButton.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx # Authentication context
│   │   └── lib/
│   │       └── supabase-client.ts
│   └── backend/
│       └── utils/
│           └── prisma.ts        # Prisma client
│
├── prisma/
│   └── schema.prisma            # Database schema
│
├── .env                         # Environment variables (gitignored)
├── .env.example                 # Template environment
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

---

## 🔄 Alur Aplikasi

### 1. User Flow (Pengunjung)
```
Homepage (/)
  ↓
Lihat Katalog (/products)
  ↓
Filter by Kategori (Home, Away, Third, dll)
  ↓
Klik Produk → Detail Produk (/products/[slug])
  ↓
Pilih Ukuran → Order via WhatsApp
```

### 2. Authentication Flow
```
Register (/register)
  ↓
Input: Email, Password, Nama
  ↓
API: POST /api/auth/signup
  ↓
- Buat user di Supabase Auth
- Simpan ke database (User table)
- Auto-assign role (admin/user)
  ↓
Redirect ke Login
  ↓
Login (/login)
  ↓
Supabase Auth check credentials
  ↓
Set session & redirect ke homepage
```

### 3. Admin Flow
```
Login sebagai Admin
  ↓
Dashboard Admin (/admin)
  ├─ Lihat statistik (produk, kategori, stok)
  ├─ Produk stok rendah
  └─ Produk terbaru
  ↓
Kelola Produk (/admin/products)
  ├─ Tambah produk baru
  ├─ Edit produk existing
  ├─ Hapus produk
  └─ Update stok per ukuran
  ↓
Kelola Kategori (/admin/categories)
  ├─ Tambah kategori
  ├─ Edit kategori
  └─ Hapus kategori (jika tidak ada produk)
```

---

## 🗄️ Database Schema

### User Table
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  role      String   @default("user")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Category Table
```prisma
model Category {
  id       String    @id @default(uuid())
  name     String
  slug     String    @unique
  products Product[]
}
```

### Product Table
```prisma
model Product {
  id          String         @id @default(uuid())
  name        String
  slug        String         @unique
  club        String
  season      String
  description String?
  price       Decimal        @db.Decimal(10, 2)
  stock       Int            @default(0)
  isAvailable Boolean        @default(true)
  categoryId  String
  category    Category       @relation(...)
  images      ProductImage[]
  sizes       ProductSize[]
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
}
```

### ProductImage Table
```prisma
model ProductImage {
  id        String   @id @default(uuid())
  productId String
  product   Product  @relation(...)
  url       String
  alt       String?
  isPrimary Boolean  @default(false)
  order     Int      @default(0)
}
```

### ProductSize Table
```prisma
model ProductSize {
  id        String  @id @default(uuid())
  productId String
  product   Product @relation(...)
  size      String  // S, M, L, XL, XXL
  stock     Int     @default(0)
  
  @@unique([productId, size])
}
```

---

## 🚀 Fitur Utama

### Public Features
- ✅ Homepage dengan hero section
- ✅ Katalog produk dengan filter kategori
- ✅ Detail produk lengkap
- ✅ Pilih ukuran dan cek stok
- ✅ Order via WhatsApp
- ✅ Halaman More Info
- ✅ Responsive design
- ✅ Authentication (Login/Register)

### Admin Features
- ✅ Dashboard dengan statistik
- ✅ CRUD Produk
  - Tambah produk dengan multiple ukuran
  - Edit produk dan stok
  - Hapus produk
  - Upload gambar via URL
- ✅ CRUD Kategori
  - Tambah kategori baru
  - Edit nama dan slug
  - Hapus kategori
- ✅ Protected admin routes
- ✅ Role-based access control

---

## 📱 Halaman Website

### Public Pages
1. **Homepage** (`/`) - Landing page dengan info toko
2. **Products** (`/products`) - Katalog dengan filter
3. **Product Detail** (`/products/[slug]`) - Detail jersey
4. **More Info** (`/more-info`) - Tentang toko
5. **Login** (`/login`) - Halaman login
6. **Register** (`/register`) - Halaman registrasi

### Admin Pages (Protected)
1. **Dashboard** (`/admin`) - Statistik dan overview
2. **Manage Products** (`/admin/products`) - Kelola produk
3. **Add Product** (`/admin/products/new`) - Tambah produk
4. **Edit Product** (`/admin/products/[id]/edit`) - Edit produk
5. **Manage Categories** (`/admin/categories`) - Kelola kategori
6. **Add Category** (`/admin/categories/new`) - Tambah kategori
7. **Edit Category** (`/admin/categories/[id]/edit`) - Edit kategori

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register user baru

### Admin - Products
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create product
- `GET /api/admin/products/[id]` - Get single product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

### Admin - Categories
- `GET /api/admin/categories` - Get all categories
- `POST /api/admin/categories` - Create category
- `GET /api/admin/categories/[id]` - Get single category
- `PUT /api/admin/categories/[id]` - Update category
- `DELETE /api/admin/categories/[id]` - Delete category

### Public
- `GET /api/categories` - Get all categories (public)

---

## 🎨 Design System

### Colors
- **Primary**: Blue-600 (#2563EB)
- **Success**: Green-500 (#10B981)
- **Warning**: Orange-500 (#F59E0B)
- **Danger**: Red-600 (#DC2626)
- **Dark**: Gray-900 (#111827)

### Components
- Modern card designs
- Gradient backgrounds
- Shadow effects
- Hover transitions
- Responsive grid layouts

---

## 📝 Scripts

```json
{
  "dev": "next dev",              // Run development server
  "build": "next build",          // Build for production
  "start": "next start",          // Start production server
  "lint": "next lint"             // Run ESLint
}
```

---

## 🔐 Environment Variables Required

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Supabase PostgreSQL connection string |
| `DIRECT_URL` | Direct database connection |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (SECRET) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number for orders |

---

## 🚨 Troubleshooting

### Server tidak bisa start
```bash
# Kill proses node yang berjalan
Get-Process -Name node | Stop-Process -Force

# Generate Prisma client
npx prisma generate

# Restart server
npm run dev
```

### Database error
```bash
# Push schema ke database
npx prisma db push

# Reset database (hati-hati, hapus semua data)
npx prisma db push --force-reset
```

### Environment variables tidak terbaca
- Restart development server setelah edit `.env`
- Pastikan nama variabel benar (case-sensitive)
- Cek file `.env` ada di root folder

---

## 📚 Dependencies Utama

```json
{
  "next": "16.0.6",
  "react": "^19.0.0",
  "prisma": "^5.22.0",
  "@prisma/client": "^5.22.0",
  "@supabase/supabase-js": "^2.48.1",
  "tailwindcss": "^3.4.17",
  "typescript": "^5"
}
```

---

## 👨‍💻 Developer

**VOLTXDHARMA**
- GitHub: https://github.com/VOLTXDHARMA
- Repository: https://github.com/VOLTXDHARMA/jersey-bola.git

---

## 📄 License

This project is for educational purposes.

---

## 🆘 Support

Jika ada pertanyaan atau masalah, silakan buka issue di GitHub repository.
