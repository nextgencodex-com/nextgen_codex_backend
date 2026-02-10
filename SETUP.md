# Backend Setup Guide

## Prerequisites

- Node.js installed
- MySQL server running locally

## Installation Steps

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Create Database

Create a MySQL database named `nextgen_codex`:

```sql
CREATE DATABASE nextgen_codex;
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=nextgen_codex
```

### 4. Start the Server

```bash
npm run dev
```

The server will automatically:

- ✅ Create the `admin` table in the database
- ✅ Create an initial admin user with credentials:
  - **Username**: `admin`
  - **Password**: `admin123`

## API Endpoints

### Admin Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "username": "admin",
    "email": "nextgencodex2025@gmail.com",
    "role": "admin"
  },
  "message": "Login successful",
  "success": true
}
```

### Create New Admin

```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "newadmin",
  "password": "securepassword123",
  "email": "newadmin@example.com"
}
```

### Logout

```bash
POST /api/auth/logout
```

## Database Schema

### Admin Table

```sql
CREATE TABLE admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,          -- Stored as bcrypt hash
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Security Features

✅ **Passwords are hashed** using bcrypt (10 rounds)
✅ **No plain text passwords** stored in database
✅ **Unique username & email** constraints
✅ **Automatic timestamps** for audit trail

## Connecting Frontend to Backend

Your Next.js frontend's login modal should POST to:

```javascript
const response = await fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password }),
});
```
