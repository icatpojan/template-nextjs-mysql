# Changelog

Semua perubahan penting pada project ini akan didokumentasikan di file ini.

Format berdasarkan [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
dan project ini mengikuti [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Add unit tests
- Add integration tests
- Add dark mode
- Add file upload functionality
- Add search and filter
- Add pagination

## [1.0.0] - 2024-01-XX

### Added
- **Authentication System**
  - JWT-based authentication
  - Login/Register functionality
  - Password hashing dengan bcrypt
  - Token validation middleware

- **Route Protection**
  - RouteGuard component untuk proteksi halaman
  - Auto-redirect berdasarkan status login
  - Loading screen saat cek token

- **CRUD Posts**
  - Create, Read, Update, Delete posts
  - Modal-based forms
  - Real-time data refresh
  - Form validation

- **UI/UX Features**
  - Bootstrap 5 integration
  - Bootstrap Icons
  - Glassmorphism design
  - Responsive layout
  - Loading screen global
  - Modal backdrop blur effect

- **Database Integration**
  - MySQL database dengan Prisma ORM
  - User dan Post models
  - Database migrations
  - Seed data

- **API Endpoints**
  - `/api/auth/login` - User login
  - `/api/auth/register` - User registration
  - `/api/posts` - CRUD operations untuk posts

- **Development Tools**
  - ESLint configuration
  - Prisma Studio integration
  - Development scripts
  - Environment variables setup

### Technical Details
- **Frontend**: Next.js 15, React 19
- **Backend**: Next.js API Routes
- **Database**: MySQL dengan Prisma ORM
- **Authentication**: JWT tokens
- **Styling**: Bootstrap 5 + Custom CSS
- **Icons**: Bootstrap Icons

### Security Features
- Password hashing dengan bcrypt
- JWT token validation
- Route protection
- Input validation
- SQL injection protection (Prisma)

### Performance Features
- Client-side data refresh
- Optimized database queries
- Responsive design
- Loading states

## [0.1.0] - 2024-01-XX

### Added
- Initial project setup
- Basic Next.js configuration
- Prisma schema setup
- Basic authentication structure

---

## Types of Changes

- **Added** untuk fitur baru
- **Changed** untuk perubahan pada fitur yang sudah ada
- **Deprecated** untuk fitur yang akan dihapus
- **Removed** untuk fitur yang dihapus
- **Fixed** untuk bug fixes
- **Security** untuk security improvements

## Migration Guide

### From 0.1.0 to 1.0.0
- Update dependencies ke versi terbaru
- Run `npx prisma migrate dev` untuk database changes
- Update environment variables sesuai template baru
- Review dan update custom code yang mungkin terpengaruh

---

**Note**: Semua tanggal menggunakan format YYYY-MM-DD 