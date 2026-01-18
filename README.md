🚀 JobSphere – Job Portal Web Application (MERN Stack)

A full-stack Job Portal web application built using the MERN stack, designed to replicate a real-world hiring platform where job seekers can apply for jobs and admins can manage hiring workflows.


📌 Features
👤 Job Seeker (User)

User registration & login

Browse available job listings

View complete job details

Apply for jobs with resume upload

Track application status:

Pending

Shortlisted

Rejected

Prevents re-applying to the same job

Clear UI feedback for applied/rejected jobs

🧑‍💼 Admin (Recruiter)

Secure admin login

Create, edit, close & delete job posts

View applicants for each job

Shortlist or reject candidates

Admin dashboard with job statistics

Role-based access control

🛠️ Tech Stack
Frontend

React.js

Vite

Tailwind CSS

Lucide Icons

React Router DOM

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Multer (Resume uploads)

🔐 Authentication & Security

JWT-based authentication

Role-based authorization (User / Admin)

Protected routes for users and admins

Secure resume uploads

Environment variables for sensitive data 

job-portal-mern/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── server/                 # Node + Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
├── .gitignore
└── README.md

 ⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/AdityaVardhanNelatur/job-portal-mern.git
cd job-portal-mern

2️⃣ Backend Setup
cd server
npm install


Create a .env file inside server/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password


Run backend:

npm run dev

3️⃣ Frontend Setup
cd client
npm install
npm run dev


Frontend runs on:

http://localhost:5173


Backend runs on:

http://localhost:5000

🧪 Test Credentials (Optional)

You can create:

One Admin account

Multiple User accounts

(Admin creation is restricted to one account for security.)

 Screenshots:
<img width="3200" height="2000" alt="Screenshot (250)" src="https://github.com/user-attachments/assets/1d88782d-544c-401f-8d53-59b101cd7686" />

<img width="3200" height="2000" alt="Screenshot (251)" src="https://github.com/user-attachments/assets/cfb9ed45-e618-4d12-b937-327211cfafc8" />

<img width="3200" height="2000" alt="Screenshot (252)" src="https://github.com/user-attachments/assets/d35e91ce-dd84-4f27-a189-ea5d912f7774" />

<img width="3200" height="2000" alt="Screenshot (253)" src="https://github.com/user-attachments/assets/a3d0bd41-94b2-4e90-81e7-030d860bd9c5" />

<img width="3200" height="2000" alt="Screenshot (254)" src="https://github.com/user-attachments/assets/794fcb18-3c5d-4870-a230-413aefb0869d" />

<img width="3200" height="2000" alt="Screenshot (255)" src="https://github.com/user-attachments/assets/4cddd2cb-0100-4db6-af09-014372cc4761" />

<img width="3200" height="2000" alt="Screenshot (258)" src="https://github.com/user-attachments/assets/b5cbf3f8-0dca-4133-94da-d94d4def992c" />

<img width="3200" height="2000" alt="Screenshot (257)" src="https://github.com/user-attachments/assets/b5ef9e33-db18-487e-8a68-250c70f66f8d" />












