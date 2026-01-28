🔐 Authentication Backend (Node.js + MongoDB)

A production-ready authentication backend built with Node.js, Express, MongoDB, supporting:

Email & password authentication

JWT-based authorization

Google OAuth (popup-based)

Forgot & reset password with email

Protected routes

Secure best practices

⚠️ Frontend is optional — this repo focuses on backend only.

🚀 Features

✅ User Signup & Login

🔑 JWT Authentication

🌐 Google OAuth 2.0

🔁 Forgot & Reset Password

📧 Email sending via Nodemailer (Gmail SMTP)

🔐 Password hashing (bcrypt)

⏱ Token expiration & security

☁ MongoDB Atlas support


🛠 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT (jsonwebtoken)

Passport.js (Google OAuth)

Nodemailer

bcryptjs

dotenv

📁 Project Structure
auth-backend/
│
├── config/
│   ├── db.js
│   └── passport.js
│
├── controllers/
│   └── authController.js
|
├── models/
│   └── User.js
│
├── routes/
│   └── authRoutes.js
│
├── utils/
│   └── sendEmail.js
│
├── .env
├── .gitignore
├── server.js
└── README.md

⚙️ Environment Variables

Create a .env file in the root directory:
PORT=5000

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/authentication

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

EMAIL_SERVICE=gmail
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=Auth App <yourgmail@gmail.com>

FRONTEND_URL=http://localhost:3000

📦 Installation
git clone https://github.com/yourusername/auth-backend.git
cd auth-backend
npm install

▶️ Run the Server
npm run dev

🔑 API Endpoints
🔹 Signup
POST /api/auth/signup

{
  "name": "User",
  "email": "user@gmail.com",
  "password": "123456",
  "confirmPassword": "123456"
}


🔹 Login
POST /api/auth/login

{
  "email": "user@gmail.com",
  "password": "123456"
}


Response:

{
  "token": "JWT_TOKEN"
}


🔹 Login
POST /api/auth/login

{
  "email": "user@gmail.com",
  "password": "123456"
}


Response:

{
  "token": "JWT_TOKEN"
}

🔹 Google OAuth
GET /api/auth/google
Opens Google login page

Returns JWT after successful login

Forgot Password
POST /api/auth/forgot-password

{
  "email": "user@gmail.com"
}


📩 Sends reset email with secure token.

🔹 Reset Password
POST /api/auth/reset-password/:token

{
  "password": "newpassword",
  "confirmPassword": "newpassword"
}

🔹 Protected Route Example
GET /api/protected/dashboard


Header:

Authorization: Bearer <JWT_TOKEN>

🗄 MongoDB User Schema
{
  name: String,
  email: String,
  password: String,
  googleId: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: Date,
  updatedAt: Date
}


🔐 Security Highlights

Passwords hashed with bcrypt

JWT-based auth with expiration

OAuth tokens handled securely

Reset tokens hashed before storage

No user enumeration in forgot-password

.env secrets protected

🧪 Testing

Use Postman / Thunder Client:

Test signup & login

Copy JWT into Authorization header

Verify protected routes

Test forgot/reset password flow

🚀 Future Enhancements

Refresh tokens

Logout & token revocation

Role-based access (admin/user)

Email service (SendGrid / SES)

Production deployment (Render / AWS)

👨‍💻 Author

Bharath Halemane

Backend-focused authentication system built for real-world usage and learning.

⭐ If you found this useful

Give the repo a ⭐ and feel free to fork & extend it 🚀