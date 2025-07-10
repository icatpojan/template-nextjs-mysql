# Template CRUD dengan Auth & MySQL Prisma

Template sederhana untuk membuat project CRUD dengan autentikasi menggunakan Next.js, MySQL, Prisma, dan JWT.

## 🚀 Fitur

- **Autentikasi JWT** - Login/Register dengan token
- **Proteksi Route** - Middleware untuk halaman yang memerlukan auth
- **CRUD Posts** - Create, Read, Update, Delete dengan modal
- **Loading Screen Global** - Loading state untuk semua halaman
- **UI Modern** - Bootstrap dengan efek glassmorphism
- **Responsive Design** - Mobile-first approach
- **MySQL Database** - Menggunakan Prisma ORM

## 📋 Prerequisites

- Node.js 18+ 
- MySQL Database
- npm atau yarn

## 🛠️ Instalasi

1. **Clone repository**
```bash
git clone <repository-url>
cd my-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Database**
```bash
# Buat database MySQL
mysql -u root -p
CREATE DATABASE myapp_db;
```

4. **Setup Environment Variables**
```bash
# Buat file .env.local
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL="mysql://username:password@localhost:3306/myapp_db"
JWT_SECRET="your-super-secret-jwt-key"
```

5. **Setup Prisma**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

6. **Run Development Server**
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Struktur Project

```
my-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.js
│   │   │   │   └── register/route.js
│   │   │   └── posts/route.js
│   │   ├── dashboard/page.js
│   │   ├── login/page.js
│   │   ├── register/page.js
│   │   ├── page.js
│   │   ├── layout.js
│   │   └── globals.css
│   ├── components/
│   │   ├── LoadingContext.js
│   │   ├── LoadingWrapper.js
│   │   └── RouteGuard.js
│   └── utils/
│       └── auth.js
├── prisma/
│   ├── schema.prisma
│   ├── seed.js
│   └── migrations/
├── public/
└── package.json
```

## 🔧 Konfigurasi

### Database Schema (Prisma)

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Environment Variables

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/myapp_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"

# Optional: Next.js
NEXTAUTH_URL="http://localhost:3000"
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Ambil semua posts (dengan auth)
- `POST /api/posts` - Buat post baru (dengan auth)
- `PUT /api/posts/:id` - Update post (dengan auth)
- `DELETE /api/posts/:id` - Hapus post (dengan auth)

## 🔐 Autentikasi

### JWT Token
- Token disimpan di localStorage
- Auto-refresh saat halaman reload
- Middleware untuk proteksi route

### Route Protection
- Halaman dashboard memerlukan login
- Halaman login/register redirect ke dashboard jika sudah login
- Loading screen saat cek token

## 🎨 UI Components

### Loading Screen Global
- Context provider untuk state loading
- Wrapper component untuk semua halaman
- Spinner dengan animasi

### Modal CRUD
- Bootstrap modal untuk add/edit/delete
- Form validation
- Loading state saat submit
- Backdrop blur effect

### Dashboard
- Stats cards dengan glassmorphism
- Table responsive
- Action buttons (edit/delete)
- Empty state

## 🚀 Deployment

### Docker (Recommended)
```bash
# Build dan run dengan Docker Compose
docker-compose up -d

# Atau build manual
docker build -t template-crud-app .
docker run -p 3000:3000 template-crud-app
```

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Manual Deployment
```bash
npm run build
npm start
```

## 📝 Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Database
npx prisma studio
npx prisma migrate dev
npx prisma generate
npx prisma db seed

# Lint
npm run lint
```

## 🔧 Customization

### Menambah Model Baru
1. Edit `prisma/schema.prisma`
2. Buat migration: `npx prisma migrate dev`
3. Buat API route di `src/app/api/`
4. Buat halaman di `src/app/`

### Mengubah UI Theme
- Edit `src/app/globals.css`
- Modifikasi Bootstrap variables
- Update component styles

### Menambah Fitur Auth
- Edit `src/utils/auth.js`
- Update middleware di `src/components/RouteGuard.js`
- Modifikasi API routes

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Cek koneksi database
npx prisma db pull

# Reset database
npx prisma migrate reset
```

### JWT Error
```bash
# Cek environment variables
echo $JWT_SECRET

# Clear localStorage di browser
localStorage.clear()
```

### Build Error
```bash
# Clear cache
rm -rf .next
npm run build
```

## 📄 License

MIT License - feel free to use this template for your projects!

## 🤝 Contributing

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

**Happy Coding! 🚀**
# template-nextjs-mysql
# template-nextjs-mysql
