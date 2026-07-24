# 🚀 TaskFlow - Task Management System

A modern full-stack **Task Management System** built with **React, TypeScript, Node.js, Express.js, Prisma ORM, and PostgreSQL**.

TaskFlow helps users efficiently manage tasks, monitor productivity, generate reports, receive notifications, and analyze task performance through an interactive dashboard.

---

# 📸 Screenshots

## Login

![Login](screenshots/Screenshot_Login.png)

---

## Dashboard

![Dashboard 1](screenshots/Screenshot_Dashboard_1.png)

![Dashboard 2](screenshots/Screenshot_Dashboard_2.png)

---

## Task Management

### Task Page

![Task List](screenshots/Screenshot_Task_Page_1.png)

### Create Task

![Create Task](screenshots/Screenshot_Create_Task.png.png)

### View Task Details

![Task Details](screenshots/Screenshot_View_Task_Details.png)

### Edit Task

![Edit Task](screenshots/Screenshot_Edit_Task.png)

### Delete Task

![Delete Task](screenshots/Screenshot_Delete_Task.png)

---

## Notifications

![Notifications](screenshots/Screenshot_Notifications.png)

---

## Reports & Analytics


![Report 1](screenshots/Screenshot_Report_Page_1.png)


![Report 2](screenshots/Screenshot_Report_Page_2.png)


![Report 3](screenshots/Screenshot_Report_Page_3.png)


![Report 4](screenshots/Screenshot_Report_Page_4.png)


![Report 5](screenshots/Screenshot_Report_Page_5.png)


![Report 6](screenshots/Screenshot_Report_Page_6.png)



# ✨ Features

## 🔐 Authentication

- Secure JWT Authentication
- User Login
- Protected Routes
- Password Encryption using bcrypt

---

## 📋 Task Management

- Create Tasks
- Update Tasks
- Delete Tasks
- View Task Details
- Search Tasks
- Filter Tasks
- Sort Tasks
- Task Status Management
- Task Priority Management

---

## 📊 Dashboard

- Task Statistics
- Summary Cards
- Productivity Overview
- Task Analytics
- Recent Tasks
- Notifications Overview

---

## 🔔 Notifications

- Unread Notifications
- Notification Dropdown
- View All Notifications
- Mark as Read
- Task Reminder Notifications

---

## 📈 Reports & Analytics

Generate

- Daily Reports
- Weekly Reports
- Monthly Reports
- Yearly Reports
- Custom Date Reports

Advanced Analytics

- Productivity Score
- Completion Rate
- Average Tasks Per Day
- High Priority Percentage
- Overdue Percentage
- Average Completion Time
- Completed On Time
- Completed Late
- Longest Pending Task

---

## 📊 Charts

- Status Distribution (Pie Chart)
- Priority Distribution (Bar Chart)
- Task Creation Trend
- Due Date Trend

---

## 📄 Export Reports

- PDF Export
- CSV Export
- Excel Export
- Print Reports

---

## 🕒 Sidebar Widgets

- Live Clock
- Current Date
- Expandable Calendar
- Collapsible Sidebar

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- Recharts
- Lucide React
- React Hot Toast
- Day.js

---

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt
- Express Validator

---

## Database

- PostgreSQL

---

# 📂 Project Structure

```
task-management-system/

│

├── backend/

│ ├── prisma/

│ ├── src/

│ │ ├── config/

│ │ ├── controllers/

│ │ ├── middlewares/

│ │ ├── routes/

│ │ ├── services/

│ │ ├── types/

│ │ ├── utils/

│ │ └── app.ts

│

├── frontend/

│ ├── src/

│ │ ├── api/

│ │ ├── components/

│ │ ├── layouts/

│ │ ├── pages/

│ │ ├── routes/

│ │ ├── services/

│ │ ├── types/

│ │ └── App.tsx

│

└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/thilankaK/KONCEPTHIVE-task-management-system.git

cd task-management-system
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create

```
.env
```

```env
DATABASE_URL=

JWT_SECRET=

PORT=5000
```

Run

```bash
npx prisma migrate dev

npx prisma generate

npm run seed

npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Create

```
.env
```

```env
VITE_API_URL=http://localhost:5000/api
```

Run

```bash
npm run dev
```

---

# 🚀 Production Build

Backend

```bash
npm run build
```

Frontend

```bash
npm run build
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

---

## Tasks

```
GET /api/tasks

GET /api/tasks/:id

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id
```

---

## Dashboard

```
GET /api/dashboard
```

---

## Notifications

```
GET /api/notifications

PATCH /api/notifications/:id/read
```

---

## Reports

```
GET /api/reports/tasks
```

---

# 📊 Database

Main Tables

- Users
- Tasks
- Notifications

---

# 🔐 Security

- JWT Authentication
- Password Hashing (bcrypt)
- Protected API Routes
- Environment Variables
- Input Validation
- Error Handling

---

# 🌟 Future Improvements

- Team Collaboration
- Real-Time Notifications (Socket.io)
- Email Reminders
- Dark Mode
- Mobile Responsive Enhancements
- Kanban Board
- Calendar View
- File Attachments
- Activity Logs
- Admin Panel

---

# 👨‍💻 Author

**Thilanka Kuruwitage**

Information Technology Undergraduate

SLIIT

GitHub

https://github.com/thilankaK

LinkedIn

 www.linkedin.com/in/thilanka-kuruwitage
---

# 📄 License

This project is developed for educational purposes and portfolio demonstration.