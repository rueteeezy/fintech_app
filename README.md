# 💳 Fintech App

A full-stack financial technology application built with **React**, **Spring Boot**, and **MySQL**.  
This project provides subscriber management, analytics dashboards, and secure backend APIs for fintech operations.

---

## 🚀 Features

### 🔹 Frontend (React + MUI)
- Modern and responsive UI (Material UI)
- Interactive charts using **Recharts**
- Subscriber list with:
  - Search functionality
  - Sorting
  - CRUD dialog forms
- Loading states, alerts, and confirmation dialogs
- Dashboard panels arranged side-by-side

### 🔹 Backend (Spring Boot)
- RESTful API for subscriber management
- MySQL database integration
- Automatic `created_at` timestamp
- Exception handling and proper HTTP responses
- Configurable Spring Security setup

### 🔹 Database
- MySQL schema for subscribers
- Auto-increment ID + timestamp
- Easy setup (local or via Docker)

---

## 🏗️ Tech Stack

### **Frontend**
- React 18+
- Material UI (MUI)
- Recharts
- Axios
- Vite (or CRA)

### **Backend**
- Java 17+
- Spring Boot 3+
- Spring Web
- Spring Data JPA
- Spring Security
- MySQL Driver

---

## 📁 Project Structure

fintech_app/
│
├── backend/
│ ├── src/main/java/com/example/fintech/...
│ ├── src/main/resources/application.properties
│ └── pom.xml
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
└── README.md


---

## ⚙️ Getting Started

### 🖥️ Backend Setup (Spring Boot)

1. Navigate to the backend folder:
   ```bash
   cd backend

2. Configure MySQL in src/main/resources/application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/fintech
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update

3. Run the backend:

mvn spring-boot:run

Backend will run at:
👉 http://localhost:8080

🌐 Frontend Setup (React)

Navigate to the frontend:

cd frontend


Install dependencies:

npm install


Start development server:

npm run dev


Frontend will run at:
👉 http://localhost:5173

🛡️ API Endpoints
Subscribers
Method	Endpoint	Description
POST	/api/subscribers/add	Add new subscriber
GET	/api/subscribers	Fetch all subscribers
DELETE	/api/subscribers/{id}	Delete subscriber

Example subscriber JSON:

{
  "name": "John Doe",
  "email": "john@test.com",
  "created_at": null
}

🧹 Git Ignore Rules

The repository ignores:

node_modules/
.idea/
.cache/
dist/
build/


This prevents large files and IDE configurations from being committed.

