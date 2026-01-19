🚀 MERN Authentication System (User & Admin Roles)

A full-stack MERN application implementing JWT-based authentication, role-based authorization (User/Admin), protected routes, and a clean production-ready architecture.

📌 Project Overview

This project demonstrates how authentication and authorization are handled in a real-world MERN stack application.
A single login page is used to authenticate both users and admins, while access control is enforced based on roles stored in JWT tokens.

✨ Features

🔐 JWT-based authentication
👤 Single login page for all users
🛡️ Role-based authorization (User / Admin)
🔒 Protected routes
🚫 Admin-only routes
🌐 RESTful API design

🏗️ Tech Stack

*Frontend*
React (Vite)
React Router DOM
Axios
Tailwind CSS

*Backend*
Node.js
Express.js
MongoDB (MongoDB Atlas)
JSON Web Tokens (JWT)

📁 Project Structure
JobSphere/
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   ├── config/
│   │   └── db.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Login.jsx
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md

🔐 Authentication & Authorization Flow

User accesses /login
Credentials are submitted
Backend verifies user
JWT token is generated with role information
Token is stored on the client
Protected routes are accessed based on role:
User → User dashboard
Admin → Admin dashboard

▶️ Run the Project Locally
*Backend Setup*
cd backend
npm install
npm start

*Frontend Setup*
cd frontend
npm install
npm run dev
