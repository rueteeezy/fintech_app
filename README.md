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

## 📁 Project Structure

```text
fintech_app/
├── backend/
│   ├── src/main/java/com/example/fintech/...
│   ├── src/main/resources/application.properties
│   └── pom.xml
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── package-lock.json
└── README.md
```

🌱 Getting Started

🖥️ Backend Setup (Spring Boot)

1. Navigate to the backend folder:
```bash
cd backend
```

2. Configure MySQL in src/main/resources/application.properties:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/fintech
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```

3. Run the backend:
```bash
mvn spring-boot:run
```

Backend will run at:
👉 http://localhost:8080

🌐 Frontend Setup (React)
Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:
```bash
npm install
```
Start development server:
```bash
npm run dev
```
Frontend will run at:
👉 http://localhost:5173

🛡️ API Endpoints
Subscribers
Method	Endpoint	Description
POST	/api/subscribers/add	Add new subscriber
GET	/api/subscribers	Fetch all subscribers

Example payload:
```json
{
  "firstName": "First2073",
  "lastName": "Last955",
  "email": "user855813@mail.com",
  "name": "First2073 Last955",
  "phone": "09993068643"
}
```
🧹 Git Ignore Rules
The repository ignores:
```text
node_modules/
.idea/
.cache/
dist/
build/
This keeps the repository clean and avoids committing large/generated files.
```
