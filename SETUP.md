# Panduan Setup Lengkap

## 📋 Environment Variables

Buat file `.env.local` di root project dengan konfigurasi berikut:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/myapp_db"

# JWT Configuration  
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Next.js Configuration (Optional)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Environment
NODE_ENV="development"
```

## 🗄️ Database Setup

### 1. Install MySQL
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server

# macOS
brew install mysql

# Windows
# Download dari https://dev.mysql.com/downloads/mysql/
```

### 2. Start MySQL Service
```bash
# Ubuntu/Debian
sudo systemctl start mysql
sudo systemctl enable mysql

# macOS
brew services start mysql

# Windows
# Start dari Services atau MySQL Installer
```

### 3. Create Database
```bash
mysql -u root -p
```

```sql
CREATE DATABASE myapp_db;
CREATE USER 'myapp_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON myapp_db.* TO 'myapp_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4. Update DATABASE_URL
```env
DATABASE_URL="mysql://myapp_user:your_password@localhost:3306/myapp_db"
```

## 🔧 Prisma Setup

### 1. Install Prisma CLI
```bash
npm install -g prisma
```

### 2. Initialize Prisma
```bash
npx prisma init
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run Migrations
```bash
npx prisma migrate dev --name init
```

### 5. Seed Database (Optional)
```bash
npx prisma db seed
```

### 6. Open Prisma Studio
```bash
npx prisma studio
```

## 🚀 Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
Buka [http://localhost:3000](http://localhost:3000)

## 📱 Testing

### 1. Register User
- Buka halaman register
- Isi form dengan data valid
- Submit dan cek database

### 2. Login User
- Buka halaman login
- Masukkan credentials yang sudah register
- Cek token di localStorage

### 3. CRUD Posts
- Login ke dashboard
- Test create post
- Test edit post
- Test delete post
- Cek data di database

## 🔍 Debugging

### Database Connection
```bash
# Test koneksi
npx prisma db pull

# Reset database
npx prisma migrate reset

# View logs
npx prisma studio
```

### JWT Token
```bash
# Cek token di browser console
localStorage.getItem('token')

# Clear token
localStorage.clear()
```

### API Routes
```bash
# Test API dengan curl
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password"}'
```

## 🚀 Production Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables di Vercel dashboard
```

### Manual Deployment
```bash
# Build
npm run build

# Start production
npm start

# Set environment variables
export DATABASE_URL="mysql://user:pass@host:port/db"
export JWT_SECRET="production-secret"
```

## 🔒 Security Checklist

- [ ] Ganti JWT_SECRET dengan random string
- [ ] Gunakan HTTPS di production
- [ ] Set NODE_ENV=production
- [ ] Gunakan strong password untuk database
- [ ] Restrict database user privileges
- [ ] Enable CORS jika diperlukan
- [ ] Rate limiting untuk API
- [ ] Input validation di semua form

## 📊 Performance

### Database Optimization
```sql
-- Add indexes
CREATE INDEX idx_user_email ON User(email);
CREATE INDEX idx_post_userid ON Post(userId);
CREATE INDEX idx_post_created ON Post(createdAt);
```

### Next.js Optimization
```bash
# Enable compression
npm install compression

# Enable caching
# Edit next.config.mjs
```

## 🐛 Common Issues

### "Prisma Client not found"
```bash
npx prisma generate
```

### "Database connection failed"
```bash
# Cek MySQL service
sudo systemctl status mysql

# Cek credentials
mysql -u username -p database_name
```

### "JWT token invalid"
```bash
# Clear localStorage
localStorage.clear()

# Cek JWT_SECRET
echo $JWT_SECRET
```

### "Modal backdrop not blurring"
```bash
# Cek browser support
# Chrome/Edge: Supported
# Safari: Supported with -webkit-
# Firefox: Supported with -moz-
# IE: Not supported (fallback)
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT.io](https://jwt.io/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)

---

**Need Help?** Buat issue di repository atau kontak developer. 