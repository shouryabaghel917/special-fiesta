# 🎉 Special Fiesta

A beautiful, modern event landing page built with **Next.js + TypeScript + Tailwind CSS**.  
Designed to be clean, responsive, and production-ready — perfect for celebrations, college fests, parties, or any special event.

---

## ✉️ Email Confirmation (Resend)

The RSVP endpoint can send confirmation emails via Resend.

### Environment variables
- `RESEND_API_KEY` (server-only)
- `RESEND_FROM` (server-only)  
  Example: `Special Fiesta <onboarding@resend.dev>` (or your verified domain sender)
- `RESEND_ADMIN_TO` (optional, server-only)  
  Example: `you@yourdomain.com` to get notified on every RSVP

### Notes
- If `RESEND_API_KEY` or `RESEND_FROM` is missing, emails are skipped (dev-friendly).
- Email failures do not block RSVP success.

---

## ✨ Features

- 🌈 Modern, aesthetic UI with a premium feel
- 📱 Fully responsive (mobile-first)
- 📨 RSVP form with backend API route
- 🎨 Tailwind CSS styling
- ⚡ Fast, SEO-friendly Next.js App Router
- ✅ ESLint + GitHub Actions CI
- 🚀 Vercel-ready deployment

---

## 🔐 Admin Dashboard

A protected admin dashboard is available at `/admin`.

### Environment variables
- `ADMIN_SECRET` — password used on `/admin/login`
- `ADMIN_COOKIE_SECRET` — random secret used to sign the admin session cookie

### Notes
- Auth uses an HttpOnly cookie (no secret exposure in client JS).
- Middleware blocks access to `/admin` unless the session cookie is valid.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes
- **CI:** GitHub Actions

---

## 📂 Project Structure

```text
special-fiesta/
├─ src/
│  ├─ app/            # App Router pages & API
│  ├─ components/     # Reusable UI components
│  ├─ lib/            # Utilities
├─ data/              # Local RSVP storage (dev)
├─ .github/workflows  # CI configuration
├─ README.md
└─ package.json
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/shouryabaghel917/special-fiesta.git
cd special-fiesta
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser 🎉

---

## 📨 RSVP Feature

- Uses a built-in **API route**
- Validates user input
- Stores RSVP submissions locally in `data/rsvps.json` (for development)
- Easy to replace with a real database (MongoDB, PostgreSQL, Firebase, etc.)

---

## 📜 Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

---

## 🌍 Deployment

This project is **Vercel-ready**:

1. Push code to GitHub
2. Import the repository on Vercel
3. Deploy 🚀

---

## ✨ Inspiration

Built with ❤️ to make events feel **special**, simple, and memorable.
