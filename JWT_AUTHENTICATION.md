# JWT Authentication Implementation

## 🔐 Setup

### 1. Install Dependencies

```bash
npm install
```

(jsonwebtoken already added to package.json)

### 2. Configure .env

Add these to your `.env` file:

```env
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRY=7d
```

### 3. Restart Server

```bash
npm start
```

---

## 📋 How JWT Works

```
1. User logs in → Backend generates JWT token
2. Frontend stores token in localStorage
3. Frontend sends token with every protected request
4. Backend verifies token signature
5. Valid? → Allow request ✅
   Invalid/Expired? → Return 401 ❌
```

---

## 🔑 API Endpoints

### Login (Get Token)

```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "username": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  ← SAVE THIS!
  },
  "message": "Login successful"
}
```

### Protected Routes (Create/Update/Delete)

```
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id

Headers:
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

If token missing → 401 Unauthorized
If token invalid → 401 Invalid token
If token expired → 401 Token expired
```

### Public Routes (Read Only)

```
GET /api/projects
GET /api/projects/:id
GET /api/projects/featured
GET /api/projects/status/:status
GET /api/projects/category/:category

No authorization header needed!
```

---

## 💻 Frontend Implementation

### Step 1: Login and Get Token

```javascript
async function login() {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "admin",
      password: "admin123",
    }),
  });

  const data = await response.json();

  if (data.statusCode === 200) {
    const token = data.data.token;

    // Store token in localStorage
    localStorage.setItem("adminToken", token);
    console.log("✅ Login successful!");
  } else {
    console.log("❌ Login failed:", data.message);
  }
}
```

### Step 2: Create Project (Protected)

```javascript
async function createProject(formData) {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    console.log('❌ Please login first!');
    return;
  }

  const response = await fetch('http://localhost:5000/api/projects', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`  ← Send token here
    },
    body: formData  // FormData with image
  });

  const data = await response.json();

  if (data.statusCode === 201) {
    console.log('✅ Project created!');
  } else if (data.statusCode === 401) {
    console.log('❌ Token invalid or expired. Please login again.');
    localStorage.removeItem('adminToken');
  }
}
```

### Step 3: Get All Projects (Public)

```javascript
async function getAllProjects() {
  const response = await fetch("http://localhost:5000/api/projects");
  const data = await response.json();

  console.log("Projects:", data.data);
  // Works WITHOUT token!
}
```

### Step 4: Logout

```javascript
function logout() {
  localStorage.removeItem("adminToken");
  console.log("✅ Logged out");
}
```

---

## 🧪 Testing with cURL

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Save the token from response
# Example response:
# {"data": {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}}
```

### Create Project (With Token)

```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -F "image=@image.jpg" \
  -F "title=My Project" \
  -F "category=[\"Web Development\"]"

# Should work ✅
```

### Create Project (Without Token)

```bash
curl -X POST http://localhost:5000/api/projects \
  -F "image=@image.jpg" \
  -F "title=My Project"

# Response: 401 Unauthorized ❌
```

### Get All Projects (No Token Needed)

```bash
curl http://localhost:5000/api/projects

# Works ✅
```

---

## 🔄 Complete Flow Diagram

```
┌─────────────────────────────────────────┐
│ STEP 1: User Logs In                    │
│ POST /api/auth/login                    │
│ {username, password}                    │
└────────────────┬────────────────────────┘
                 │
                 ▼
        ┌─────────────────────┐
        │ Backend verifies    │
        │ credentials         │
        └────────────┬────────┘
                     │
                     ▼
        ┌─────────────────────────────┐
        │ Backend generates JWT token │
        │ (Signed with JWT_SECRET)    │
        └────────────┬────────────────┘
                     │
                     ▼
        ┌─────────────────────────────┐
        │ Frontend receives token     │
        │ Stores in localStorage      │
        │ token = "eyJhbGc..."        │
        └────────────┬────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│ STEP 2: User Creates Project             │
│ POST /api/projects                       │
│ Header: Authorization: Bearer [token]    │
│ Body: image + project data               │
└────────────┬─────────────────────────────┘
             │
             ▼
    ┌────────────────────────┐
    │ JWT Middleware         │
    │ Extract token from     │
    │ Authorization header   │
    └────────────┬───────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │ Verify signature       │
    │ Using JWT_SECRET       │
    └────────────┬───────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │ Check expiration       │
    │ Not expired? ✅         │
    │ Expired? ❌             │
    └────────────┬───────────┘
                 │
        ✅ Valid │ ❌ Invalid
        ________⬆⬇________
        │                 │
        ▼                 ▼
    ✅ Proceed       ❌ Return 401
    Create project   Unauthorized
```

---

## 🛡️ Protected vs Public Routes

### Protected Routes (Require JWT Token)

```
POST   /api/projects         - Create project
PUT    /api/projects/:id     - Update project
DELETE /api/projects/:id     - Delete project
```

### Public Routes (No Token Needed)

```
GET    /api/projects         - Get all
GET    /api/projects/:id     - Get by ID
GET    /api/projects/featured - Get featured
GET    /api/projects/status/:status - Filter
GET    /api/projects/category/:category - Filter
```

---

## ⏰ Token Expiration

Default: **7 days** (configurable in `.env`)

When token expires:

```json
{
  "statusCode": 401,
  "data": null,
  "message": "Token expired. Please login again."
}
```

**User must login again to get new token**

---

## 🔐 Security Features

✅ **Cryptographic Signing** - Token cannot be forged  
✅ **Expiration** - Tokens automatically expire  
✅ **Secret Key** - Only server knows the secret  
✅ **Tamper Detection** - Any modification invalidates token

---

## 📝 Example React Hook

```javascript
import { useState, useEffect } from "react";

export function useAuth() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (username, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.statusCode === 200) {
      const newToken = data.data.token;
      localStorage.setItem("adminToken", newToken);
      setToken(newToken);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setIsLoggedIn(false);
  };

  return { token, isLoggedIn, login, logout };
}
```

---

## 🚀 Next Steps

1. ✅ Run `npm install`
2. ✅ Add JWT variables to `.env`
3. ✅ Run `npm start`
4. ✅ Test login endpoint
5. ✅ Use token for protected routes
6. ✅ Implement logout

---

## 📞 Common Issues

**Q: "No token provided"**
A: Make sure to send `Authorization: Bearer [token]` header

**Q: "Invalid token"**
A: Token might be corrupted. Login again to get new token

**Q: "Token expired"**
A: Token validity period has passed. Login again.

**Q: Token not saving in localStorage**
A: Check if localStorage is enabled in browser settings

---

## ✨ You're Secure!

Your API is now protected with industry-standard JWT authentication! 🎉
