# 🐦 Itter APP

**Itter APP** — bu Twitter'ga o'xshagan, ammo soddalashtirilgan klon ilova bo‘lib, foydalanuvchilar post yozishi, boshqalarni follow qilishi va real-time chat orqali yozishishi mumkin.

---

## 📌 Xususiyatlar (Features)

- 📝 Foydalanuvchilar tweet yozishi (280 belgigacha)
- ❤️ Like, 💬 Comment tizimi
- 👥 Follow / Unfollow
- 🔐 JWT asosida login / ro‘yxatdan o‘tish
- 💬 Real-time chat (WebSocket orqali)
- 🔍 Foydalanuvchi qidirish
- 📁 Profilni ko‘rish va tahrirlash

---

## 🧰 Texnologiyalar (Stack)

| Texnologiya     | Izoh                           |
|-----------------|--------------------------------|
| NestJS          | Backend framework              |
| PostgreSQL      | Relatsion ma'lumotlar bazasi   |
| TypeORM         | ORM qatlam                     |
| JWT             | Token asosida autentifikatsiya |
| WebSocket       | Real-time chat uchun           |
| Bcrypt          | Parolni xavfsiz saqlash        |

---

## 📁 Loyiha Tuzilishi (Structure)

src/
├── auth/ # Ro'yxatdan o'tish va login
├── user/ # Foydalanuvchi CRUD
├── post/ # Tweet yozish
├── like/ # Like tizimi
├── comment/ # Kommentlar
├── follow/ # Follow tizimi
├── chat/ # Real-time chat (WebSocket)
└── common/ # DTO, Guard, Interceptor va h.k.

---

## 🚀 Quick Start (Ishga tushirish)

### 1. Repositoryni clone qiling:
```bash
git clone https://github.com/ix1osbek/Itter-APP.git
cd itter-app
npm install
npm run start:dev
npm run test

🔮 Kelajakdagi Qo‘shimchalar (Planned Features)
🧵 Thread postlar

📷 Media upload (rasm/video)

📱 Mobil ilova (Flutter)

🛠 Admin panel

👨‍💻 Muallif
Itter APP by Ixlosbek 

Email: bekerkinov2004@gmail.com

Telegram: @ix1osbek