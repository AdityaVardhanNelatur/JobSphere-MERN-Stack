🚀 JobSphere – MERN Authentication & Interview Management System
JobSphere is a production-ready MERN stack application implementing JWT-based authentication, role-based authorization (User/Admin), protected routes, and an Admin Interview Scheduling workflow.
This project reflects how authentication, authorization, and admin workflows are handled in real-world SaaS and enterprise applications.


📌 Project Overview
JobSphere uses a single login system for both users and admins.
Based on the role embedded inside the JWT token, users are redirected to appropriate dashboards with strict access control.

Admins can:
View job applications
Schedule interviews
Update application status
Notify users about interview schedules

Users can:
Register & login
Apply for jobs
Track application status
View interview schedules (when assigned)

✨ Key Features
🔐 Authentication & Authorization
JWT-based authentication
Single login page for User & Admin
Role stored securely inside JWT
Token-based session handling

🛡️ Access Control
Protected routes (logged-in users only)
Admin-only routes
Unauthorized access prevention

🧑‍💼 Admin Interview Scheduling
Admin can schedule interviews
Interview status updates (Scheduled / Pending)
“View Details” popup for interview information
User receives interview schedule confirmation

🌐 RESTful API
Clean controller-service architecture
Secure middleware-based authorization
Scalable backend structure

🏗️ Tech Stack
Frontend
React (Vite)
React Router DOM
Axios
Tailwind CSS

Backend
Node.js
Express.js
MongoDB (MongoDB Atlas)
JSON Web Tokens (JWT)

🔐 Authentication & Authorization Flow
User/Admin accesses /login
Credentials are submitted to backend
Backend verifies credentials
JWT token is generated with role information
Token is stored on client (localStorage)
Route access is controlled using middleware

Role-Based Redirection
User → User Dashboard
Admin → Admin Dashboard

🧑‍💼 Admin Interview Scheduling Flow
Admin logs into dashboard
Views list of job applications
Schedules interview for a candidate
Application status updates to Interview Scheduled
User clicks View Details
Popup message shows:
Interview Scheduled – All the Best!

▶️ Run the Project Locally

Backend Setup
cd backend
npm install
npm start

Frontend Setup
cd frontend
npm install
npm run dev 

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
