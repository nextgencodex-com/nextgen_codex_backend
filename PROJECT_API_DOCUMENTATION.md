# Projects Management API Documentation

## Overview

This document outlines the API endpoints for managing projects in the NextGen Codex Backend. The Projects module follows the same architecture pattern as the Auth and User modules.

## Module Structure

```
src/modules/project/
├── project.controller.js    # HTTP request handlers
├── project.service.js       # Business logic
├── project.repository.js    # Database operations
└── project.routes.js        # Route definitions
```

## API Endpoints

### Base URL

`/api/projects`

### 1. Get All Projects

**Endpoint:** `GET /`

**Description:** Retrieve all projects

**Response:**

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "title": "E-Commerce Platform",
      "description": "A full-stack e-commerce solution built with Next.js and MongoDB",
      "image": "https://example.com/image.jpg",
      "tags": ["React", "NextJs", "MongoDB", "Tailwind"],
      "category": ["E-Commerce", "Web Development"],
      "featured": true,
      "status": "completed",
      "github_link": "https://github.com/user/project",
      "website_link": "https://project.com",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "message": "Projects retrieved successfully"
}
```

---

### 2. Get Project by ID

**Endpoint:** `GET /:id`

**Parameters:**

- `id` (path parameter, required): Project ID

**Response:**

```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "title": "E-Commerce Platform",
    "description": "A full-stack e-commerce solution...",
    "image": "https://example.com/image.jpg",
    "tags": ["React", "NextJs"],
    "category": ["E-Commerce"],
    "featured": true,
    "status": "completed",
    "github_link": "https://github.com/user/project",
    "website_link": "https://project.com",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  "message": "Project retrieved successfully"
}
```

---

### 3. Create New Project

**Endpoint:** `POST /`

**Request Body:**

```json
{
  "title": "AI Chatbot Application",
  "description": "An intelligent chatbot powered by GPT-4 API",
  "image": "https://example.com/image.jpg",
  "tags": ["Python", "AI/ML", "Node.js"],
  "category": ["AI", "Web Development"],
  "featured": true,
  "status": "ongoing",
  "githubLink": "https://github.com/user/ai-chatbot",
  "websiteLink": "https://chatbot.example.com"
}
```

**Response:**

```json
{
  "statusCode": 201,
  "data": {
    "id": 2,
    "title": "AI Chatbot Application",
    "description": "An intelligent chatbot powered by GPT-4 API",
    "image": "https://example.com/image.jpg",
    "tags": ["Python", "AI/ML", "Node.js"],
    "category": ["AI", "Web Development"],
    "featured": true,
    "status": "ongoing",
    "github_link": "https://github.com/user/ai-chatbot",
    "website_link": "https://chatbot.example.com"
  },
  "message": "Project created successfully"
}
```

**Validation:**

- `title`, `description`, `image` are required
- `category` must be an array with at least one item
- `status` must be either "completed" or "ongoing"

---

### 4. Update Project

**Endpoint:** `PUT /:id`

**Parameters:**

- `id` (path parameter, required): Project ID

**Request Body:** (Same structure as Create, all fields are required)

```json
{
  "title": "Updated Project Title",
  "description": "Updated description",
  "image": "https://example.com/new-image.jpg",
  "tags": ["React", "NextJs", "MongoDB"],
  "category": ["Web Development"],
  "featured": false,
  "status": "completed",
  "githubLink": "https://github.com/user/project",
  "websiteLink": "https://updated-project.com"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "title": "Updated Project Title",
    "description": "Updated description",
    "image": "https://example.com/new-image.jpg",
    "tags": ["React", "NextJs", "MongoDB"],
    "category": ["Web Development"],
    "featured": false,
    "status": "completed",
    "github_link": "https://github.com/user/project",
    "website_link": "https://updated-project.com"
  },
  "message": "Project updated successfully"
}
```

---

### 5. Delete Project

**Endpoint:** `DELETE /:id`

**Parameters:**

- `id` (path parameter, required): Project ID

**Response:**

```json
{
  "statusCode": 200,
  "data": null,
  "message": "Project deleted successfully"
}
```

---

### 6. Get Featured Projects

**Endpoint:** `GET /featured`

**Description:** Retrieve all featured projects

**Response:**

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "title": "Featured Project",
      "description": "...",
      "image": "...",
      "tags": [...],
      "category": [...],
      "featured": true,
      "status": "completed",
      "github_link": "...",
      "website_link": "...",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "message": "Featured projects retrieved successfully"
}
```

---

### 7. Get Projects by Status

**Endpoint:** `GET /status/:status`

**Parameters:**

- `status` (path parameter, required): "completed" or "ongoing"

**Response:**

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "title": "Completed Project",
      "status": "completed",
      "..."
    }
  ],
  "message": "Projects with status 'completed' retrieved successfully"
}
```

---

### 8. Get Projects by Category

**Endpoint:** `GET /category/:category`

**Parameters:**

- `category` (path parameter, required): Category name (e.g., "Web Development", "Mobile App", "E-Commerce", etc.)

**Response:**

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "title": "Web Development Project",
      "category": ["Web Development"],
      "..."
    }
  ],
  "message": "Projects in category 'Web Development' retrieved successfully"
}
```

---

## Available Categories

- Web Development
- Mobile App
- E-Commerce
- Portfolio
- Education
- Healthcare
- AI

## Available Technology Tags

- React
- NextJs
- Node.js
- TypeScript
- Tailwind
- MongoDB
- Firebase
- AWS
- Docker
- Python
- AI/ML
- Betique

## Database Schema

### Projects Table

```sql
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description LONGTEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  tags JSON DEFAULT NULL,
  category JSON NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  status ENUM('completed', 'ongoing') DEFAULT 'ongoing',
  github_link VARCHAR(500) NULL,
  website_link VARCHAR(500) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_featured (featured),
  INDEX idx_created_at (created_at)
);
```

## Error Responses

### 400 Bad Request

```json
{
  "statusCode": 400,
  "data": null,
  "message": "Project data is required"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "data": null,
  "message": "Project not found"
}
```

### 500 Internal Server Error

```json
{
  "statusCode": 500,
  "data": null,
  "message": "Error message details"
}
```

## Usage Examples

### Create a Project with cURL

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Portfolio Project",
    "description": "A showcase of my web development skills",
    "image": "https://example.com/image.jpg",
    "tags": ["React", "Tailwind"],
    "category": ["Web Development", "Portfolio"],
    "featured": true,
    "status": "completed",
    "githubLink": "https://github.com/user/project",
    "websiteLink": "https://myproject.com"
  }'
```

### Get All Projects

```bash
curl http://localhost:3000/api/projects
```

### Update a Project

```bash
curl -X PUT http://localhost:3000/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "description": "Updated description",
    "image": "https://example.com/new-image.jpg",
    "tags": ["React", "NextJs"],
    "category": ["Web Development"],
    "featured": false,
    "status": "completed",
    "githubLink": "https://github.com/user/project",
    "websiteLink": "https://myproject.com"
  }'
```

### Delete a Project

```bash
curl -X DELETE http://localhost:3000/api/projects/1
```

---

## Notes

- All dates are returned in ISO 8601 format
- JSON fields (tags, category) are automatically parsed when retrieved
- The API automatically handles timestamps for created_at and updated_at
- Status codes follow REST conventions (201 for creation, 200 for success, 404 for not found, 500 for errors)
