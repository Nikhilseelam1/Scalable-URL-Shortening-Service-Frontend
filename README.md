# 🎨 Scalable URL Shortening Service Frontend

> A modern, responsive frontend engineered for a production-grade URL shortening platform featuring secure authentication, analytics dashboards, and seamless backend integration.

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?style=for-the-badge)
![React Router](https://img.shields.io/badge/React_Router-7.x-CA4245?style=for-the-badge\&logo=react-router\&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge\&logo=vercel\&logoColor=white)

---

# 📌 Overview

This project is the frontend client for a scalable URL shortening platform designed with a strong focus on user experience, authentication flow management, analytics visualization, and seamless communication with a distributed backend architecture.

The frontend integrates with a production-style backend powered by:

* Node.js
* Express.js
* MongoDB Atlas
* Redis
* BullMQ Workers

The application provides:

* secure authentication
* URL management dashboard
* analytics visualization
* protected routing
* token refresh automation
* responsive UI workflows

---

# 🏛️ Frontend Architecture

```text id="xbc4je"
Client Browser
      │
      ▼
React Application
      │
 ┌────┴─────────────────┐
 │                      │
 ▼                      ▼
Auth Context        Protected Routes
 │                      │
 ▼                      ▼
Axios Interceptors   Dashboard Pages
 │                      │
 ▼                      ▼
Backend API      Analytics & URL Data
```

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* React Router DOM
* Axios
* Context API

## Authentication

* JWT Access Tokens
* Refresh Token Rotation
* HTTP-only Cookie Flow

## Deployment

* Vercel

---

# ✨ Features

* 🔐 User authentication
* 🍪 Refresh token handling
* 🔄 Automatic access token refresh
* 📊 Analytics dashboard
* 🔗 URL shortening interface
* 🏷️ Custom alias support
* 🗑️ URL deletion
* 📱 Responsive UI
* 🚪 Protected routes
* ⚡ Axios interceptor architecture

---

# 🧠 Frontend Engineering Concepts

## 1. Authentication Flow

The frontend implements a production-style authentication architecture using:

* short-lived JWT access tokens
* refresh token rotation
* Axios interceptor automation
* HTTP-only cookies

---

## Authentication Lifecycle

```text id="e48vsm"
Login
  │
  ▼
Access Token Stored
(Session Storage)
  │
  ▼
Protected API Requests
  │
  ▼
401 Unauthorized
  │
  ▼
Axios Interceptor
  │
  ▼
Refresh Access Token
  │
  ▼
Retry Original Request
```

---

## Why This Architecture?

### Benefits

* Reduced login interruptions
* Improved security
* Automatic session recovery
* Stateless frontend auth flow
* Better UX during token expiration

---

# 🔄 Axios Interceptor Architecture

```text id="vfczxa"
Request
   │
   ▼
Attach JWT Access Token
   │
   ▼
Send API Request
   │
   ▼
401 Response?
   │
 ┌─┴────────────┐
 │              │
No             Yes
 │              │
 ▼              ▼
Return       Refresh Token
Response         │
                 ▼
         Retry Original Request
```

---

# 🛡️ Protected Route System

Protected routes prevent unauthorized access to dashboard pages.

```text id="a6m5jz"
User Request
     │
     ▼
Protected Route
     │
 ┌───┴──────────┐
 │              │
Authenticated   Not Authenticated
 │              │
 ▼              ▼
Render Page    Redirect Login
```

---

# 📊 Dashboard Features

The dashboard provides:

* total URL count
* click analytics
* active URL tracking
* URL expiration details
* URL management actions

---

# 🔀 Frontend Request Flow

## URL Shortening

```text id="d5t7h0"
User Input
     │
     ▼
Form Submission
     │
     ▼
Axios API Request
     │
     ▼
Backend Validation
     │
     ▼
Short URL Response
     │
     ▼
Dashboard Update
```

---

## Analytics Fetching

```text id="c3z71y"
Dashboard Load
      │
      ▼
Protected API Request
      │
      ▼
Axios Interceptor
      │
      ▼
Backend Analytics API
      │
      ▼
Render Analytics Data
```

---

# 📁 Folder Structure

```text id="z1yd6u"
src/
├── api/
├── components/
├── context/
├── pages/
├── routes/
├── hooks/
├── layouts/
├── utils/
├── styles/
└── App.jsx
```

---

# ⚙️ Local Development Setup

## Clone Repository

```bash id="nm7q3e"
git clone https://github.com/Nikhilseelam1/Scalable-URL-Shortening-Service-Frontend.git
cd Scalable-URL-Shortening-Service-Frontend
```

---

## Install Dependencies

```bash id="x9w7mz"
npm install
```

---

## Configure Environment Variables

Create `.env`

```env id="r5z9g1"
VITE_API_URL=http://localhost:5000/api
```

---

## Start Development Server

```bash id="vw5mnd"
npm run dev
```

---

# 🔧 Production Environment Variables

```env id="g4e3s2"
VITE_API_URL=https://your-backend.onrender.com/api
```

---

# 🚀 Deployment

## Frontend Deployment

* Vercel

## Backend API

* Render

## Database

* MongoDB Atlas

## Cache Layer

* Upstash Redis

---

# 📡 Backend Integration

The frontend communicates with the backend using:

* Axios
* JWT Bearer Tokens
* HTTP-only Refresh Cookies
* Cross-Origin Credential Handling

---

# 🔒 Security Features

* JWT authentication
* Refresh token rotation
* Automatic token refresh
* Protected routes
* HTTP-only cookie flow
* Secure credential handling
* Cross-origin auth support

---

# 📈 Performance Optimizations

| Optimization         | Benefit                    |
| -------------------- | -------------------------- |
| Axios Interceptors   | Automatic session recovery |
| Context API          | Centralized auth state     |
| Protected Routes     | Controlled access          |
| Vite Bundling        | Fast build performance     |
| Component Separation | Maintainability            |

---

# 🔭 Future Improvements

* Dark mode
* Real-time analytics charts
* QR code generation
* Advanced dashboard filters
* Device analytics visualization
* User profile settings
* Link grouping & tagging

---

# 📸 Screenshots

> Add dashboard screenshots and UI previews here.

---

# 👨‍💻 Author

## Nikhil Seelam

* GitHub: https://github.com/Nikhilseelam1

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Final Notes

This frontend demonstrates production-oriented frontend engineering concepts including:

* authentication lifecycle management
* token refresh architecture
* secure session handling
* protected routing
* API integration patterns
* scalable frontend structure

Designed to complement a distributed backend architecture focused on scalability, caching, and async processing.
