# 🤖 Autobrainy - WhatsApp Marketing SaaS Dashboard

A production-ready WhatsApp marketing platform built with React + Tailwind CSS + Node.js + MongoDB.

---

## 📁 Project Structure

```
autobrainy-dashboard/
├── frontend/          → React + Vite + Tailwind CSS
├── backend/           → Node.js + Express + MongoDB
└── database/          → DB setup notes
```

---

## 🚀 Quick Start

### 1. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:5173

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and WhatsApp API keys
npm run dev
```

Backend runs at: http://localhost:5000

---

## 🔑 Environment Variables (backend/.env)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/autobrainy
JWT_SECRET=your_super_secret_jwt_key_here

# From Meta Business Suite → WhatsApp API
WHATSAPP_PHONE_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_WABA_ID=your_waba_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token
```

---

## 🖥️ Pages Included

| Page | Route | Description |
|------|-------|-------------|
| Login | /login | Authentication page |
| Dashboard | / | KPI Cards + Charts + Tables |
| Contacts | /contacts | Manage leads & contacts |
| Campaigns | /campaigns | WhatsApp campaigns |
| Automation | /automation | Chatbot flows |
| Analytics | /analytics | Performance charts |
| Billing | /billing | Plans & subscription |
| Settings | /settings | Profile & WhatsApp config |
| Support | /support | Tickets & help |

---

## 📡 Backend API Endpoints

### Auth
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login

### Leads/Contacts
- `GET /api/leads` — Get all contacts (with filters & pagination)
- `POST /api/leads` — Add new contact
- `PUT /api/leads/:id` — Update contact
- `DELETE /api/leads/:id` — Delete contact
- `GET /api/leads/stats/overview` — Stats summary

### Campaigns
- `GET /api/campaigns` — List campaigns
- `POST /api/campaigns` — Create campaign
- `PUT /api/campaigns/:id` — Update campaign
- `DELETE /api/campaigns/:id` — Delete campaign
- `GET /api/campaigns/stats/overview` — Campaign stats

### WhatsApp
- `POST /api/whatsapp/send` — Send text message
- `POST /api/whatsapp/send-template` — Send template message
- `GET /api/whatsapp/templates` — List approved templates
- `GET /api/whatsapp/webhook` — Webhook verification (Meta)
- `POST /api/whatsapp/webhook` — Receive incoming messages

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Router v6
- Chart.js + react-chartjs-2
- Lucide React Icons

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (password hashing)
- Axios (WhatsApp API calls)

---

## 📱 WhatsApp API Setup

1. Go to [Meta for Developers](https://developers.facebook.com)
2. Create a new app → Add **WhatsApp** product
3. Get your `Phone Number ID`, `Access Token`, `WABA ID`
4. Set your webhook URL: `https://yourdomain.com/api/whatsapp/webhook`
5. Add your `WHATSAPP_WEBHOOK_VERIFY_TOKEN` in .env

---

## 🔮 Roadmap

### Phase 1 ✅ (Done)
- Login Page, Dashboard, Contacts, Campaigns, Charts

### Phase 2 (Next)
- MongoDB full integration with live data
- JWT auth in frontend
- Role-based access (Admin/Agent)
- CSV Import/Export

### Phase 3
- WhatsApp API live sending
- AI Chatbot (OpenAI integration)
- Campaign scheduling
- Campaign reports with PDF export

---

Made with ❤️ — Autobrainy
