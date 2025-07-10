# Contributing Guide

Terima kasih telah tertarik untuk berkontribusi pada template ini! 🚀

## 🤝 Cara Berkontribusi

### 1. Fork Repository
- Klik tombol "Fork" di halaman repository
- Clone repository yang sudah di-fork ke local machine

```bash
git clone https://github.com/yourusername/template-crud-auth-mysql.git
cd template-crud-auth-mysql
```

### 2. Setup Development Environment
```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local sesuai kebutuhan

# Setup database
npx prisma migrate dev
npx prisma generate
```

### 3. Buat Feature Branch
```bash
git checkout -b feature/nama-feature
# atau
git checkout -b fix/nama-bug
```

### 4. Development Guidelines

#### Code Style
- Gunakan ESLint dan Prettier
- Follow JavaScript/React best practices
- Gunakan meaningful variable names
- Tambahkan comments untuk logic yang kompleks

#### Commit Messages
```bash
# Format: type(scope): description
git commit -m "feat(auth): add password reset functionality"
git commit -m "fix(ui): resolve modal backdrop blur issue"
git commit -m "docs(readme): update installation guide"
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tool changes

#### Testing
- Test semua fitur yang ditambahkan
- Pastikan tidak ada breaking changes
- Test di browser berbeda (Chrome, Firefox, Safari)

### 5. Push dan Pull Request
```bash
git push origin feature/nama-feature
```

- Buat Pull Request ke repository utama
- Jelaskan perubahan yang dilakukan
- Tambahkan screenshots jika ada perubahan UI
- Pastikan semua tests pass

## 🎯 Areas for Contribution

### High Priority
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Improve error handling
- [ ] Add input validation
- [ ] Add rate limiting
- [ ] Add CORS configuration

### Medium Priority
- [ ] Add dark mode
- [ ] Add more UI components
- [ ] Add file upload functionality
- [ ] Add search and filter
- [ ] Add pagination
- [ ] Add export functionality

### Low Priority
- [ ] Add more themes
- [ ] Add animations
- [ ] Add keyboard shortcuts
- [ ] Add accessibility improvements
- [ ] Add internationalization

## 🐛 Bug Reports

### Before Submitting
1. Cek apakah bug sudah dilaporkan
2. Coba reproduce bug di environment yang bersih
3. Cek console untuk error messages

### Bug Report Template
```markdown
**Bug Description**
Jelaskan bug secara detail

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
Apa yang seharusnya terjadi

**Actual Behavior**
Apa yang benar-benar terjadi

**Environment**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 22]

**Screenshots**
Jika applicable, tambahkan screenshots

**Additional Context**
Informasi tambahan yang relevan
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Description**
Jelaskan fitur yang diinginkan

**Use Case**
Kapan dan bagaimana fitur ini akan digunakan

**Proposed Solution**
Bagaimana implementasinya (optional)

**Alternatives Considered**
Alternatif lain yang sudah dipertimbangkan (optional)

**Additional Context**
Informasi tambahan yang relevan
```

## 📝 Documentation

### Updating Documentation
- Update README.md jika ada perubahan setup
- Update API documentation jika ada endpoint baru
- Tambahkan comments di code yang kompleks
- Update screenshots jika ada perubahan UI

### Documentation Standards
- Gunakan bahasa yang jelas dan mudah dipahami
- Tambahkan code examples
- Gunakan emoji untuk readability
- Struktur dengan heading yang jelas

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- Git

### Local Development
```bash
# Clone repository
git clone https://github.com/yourusername/template-crud-auth-mysql.git
cd template-crud-auth-mysql

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local

# Setup database
npx prisma migrate dev
npx prisma generate

# Run development server
npm run dev
```

### Testing
```bash
# Run linting
npm run lint

# Run tests (when available)
npm test

# Build project
npm run build
```

## 🚀 Release Process

### Versioning
Menggunakan [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- Example: `1.2.3`

### Release Checklist
- [ ] Update version di package.json
- [ ] Update CHANGELOG.md
- [ ] Test semua fitur
- [ ] Build project
- [ ] Create git tag
- [ ] Create GitHub release

## 📞 Getting Help

### Questions?
- Buat issue dengan label "question"
- Join discussion di GitHub Discussions
- Kontak maintainer langsung

### Need Help with Setup?
- Cek SETUP.md
- Cek troubleshooting section di README
- Buat issue dengan label "help wanted"

## 🎉 Recognition

Kontributor akan ditampilkan di:
- README.md contributors section
- GitHub contributors page
- Release notes

---

**Thank you for contributing! 🙏**

Setiap kontribusi, besar atau kecil, sangat dihargai dan membantu membuat template ini lebih baik untuk semua orang. 