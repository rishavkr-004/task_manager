# 🚀 Team Task Manager (MERN Stack)

A full-stack **Task Management System** built using the MERN stack (MongoDB, Express, React, Node.js) with role-based access control, authentication, and real-time task tracking.

---

## 🌐 Live Demo

* 🔗 Frontend (Vercel): https://task-manager-pink-omega.vercel.app
* 🔗 Backend (Railway): https://taskmanager-production-18a4.up.railway.app

---

## 📌 Features

* 🔐 **Authentication & Authorization (JWT)**

  * User Registration & Login
  * Role-based access (Admin / Member)

* 📁 **Project Management**

  * Admin can create, update, and delete projects
  * Assign team members to projects

* ✅ **Task Management**

  * Create tasks and assign to users
  * Update task status (Todo, In Progress, Done)
  * Only assigned user or admin can update tasks

* 📊 **Dashboard Analytics**

  * Total tasks
  * Completed tasks
  * Pending tasks
  * Overdue tasks

* 🔄 **Secure API Handling**

  * Axios interceptors for token handling
  * Auto logout on token expiry

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* React Router DOM
* CSS (Inline styling / Custom UI)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Deployment

* Frontend: Vercel
* Backend: Railway
* Database: MongoDB Atlas

---

## 📂 Project Structure

```
task_manager/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔧 Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm start
```

---

## 🔐 API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Projects

* GET `/api/projects`
* POST `/api/projects` (Admin only)

### Tasks

* GET `/api/tasks`
* POST `/api/tasks` (Admin only)
* PUT `/api/tasks/:id` (Update status)

### Dashboard

* GET `/api/tasks/dashboard`

---

## 🚀 Deployment

### Backend (Railway)

* Set environment variables:

  * `MONGO_URI`
  * `JWT_SECRET`
  * `PORT`

### Frontend (Vercel)

* Set environment variable:

  * `REACT_APP_API_URL`

---

## 🧪 Future Improvements

* 📊 Add charts for dashboard (Recharts)
* 🎨 Improve UI with Tailwind CSS
* 🔔 Notifications for task updates
* 📅 Deadline reminders
* 👥 Team collaboration features

---

## 👨‍💻 Author

**Rishav Kumar Mishra**

* 🎓 MCA Student
* 💻 MERN Stack Developer
* 📍 Gurugram, India

