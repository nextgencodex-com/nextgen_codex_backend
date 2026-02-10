# Image Upload Configuration - Projects Module

## Overview

Images are now stored in the project folder (`public/uploads/projects/`) and only the file path is stored in the database.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

The `multer` package has been added to handle file uploads.

### 2. Create Public Directory Structure

The following directory will be automatically created when you upload an image:

```
public/
└── uploads/
    └── projects/
        └── [image-files]
```

## Image Upload Configuration

### File Upload Settings

- **Location**: `public/uploads/projects/`
- **Max File Size**: 5MB
- **Allowed Formats**: JPG, JPEG, PNG, GIF, WebP
- **Filename**: Auto-generated with timestamp to prevent conflicts

### Supported Image Types

- `image/jpeg` (.jpg, .jpeg)
- `image/png` (.png)
- `image/gif` (.gif)
- `image/webp` (.webp)

## API Endpoints - Updated

### Create Project with Image Upload

**Endpoint:** `POST /api/projects`

**Content-Type:** `multipart/form-data`

**Request Parameters:**

```
- image (file, required): Image file (max 5MB)
- title (text, required): Project title
- description (text, required): Project description
- tags (JSON array): ["React", "NextJs"]
- category (JSON array, required): ["Web Development"]
- featured (boolean): true/false
- status (text): "completed" or "ongoing"
- githubLink (text): GitHub URL
- websiteLink (text): Website URL
```

**Example with cURL:**

```bash
curl -X POST http://localhost:3000/api/projects \
  -F "image=@/path/to/image.jpg" \
  -F "title=My Project" \
  -F "description=Project Description" \
  -F "tags=[\"React\",\"Tailwind\"]" \
  -F "category=[\"Web Development\"]" \
  -F "featured=true" \
  -F "status=completed" \
  -F "githubLink=https://github.com/user/project" \
  -F "websiteLink=https://myproject.com"
```

**Response:**

```json
{
  "statusCode": 201,
  "data": {
    "id": 1,
    "title": "My Project",
    "description": "Project Description",
    "image": "/uploads/projects/image-1234567890.jpg",
    "tags": ["React", "Tailwind"],
    "category": ["Web Development"],
    "featured": true,
    "status": "completed",
    "github_link": "https://github.com/user/project",
    "website_link": "https://myproject.com"
  },
  "message": "Project created successfully"
}
```

---

### Update Project with Optional Image Upload

**Endpoint:** `PUT /api/projects/:id`

**Content-Type:** `multipart/form-data`

**Request Parameters:**

```
- image (file, optional): New image file (if omitting, existing image is kept)
- title (text, required): Project title
- description (text, required): Project description
- tags (JSON array): Technology tags
- category (JSON array, required): Project categories
- featured (boolean): true/false
- status (text): "completed" or "ongoing"
- githubLink (text): GitHub URL
- websiteLink (text): Website URL
```

**Example with cURL (with new image):**

```bash
curl -X PUT http://localhost:3000/api/projects/1 \
  -F "image=@/path/to/new-image.jpg" \
  -F "title=Updated Project" \
  -F "description=Updated Description" \
  -F "tags=[\"React\",\"NextJs\"]" \
  -F "category=[\"Web Development\"]" \
  -F "featured=false" \
  -F "status=completed" \
  -F "githubLink=https://github.com/user/project" \
  -F "websiteLink=https://updated-project.com"
```

**Example with cURL (without image):**

```bash
curl -X PUT http://localhost:3000/api/projects/1 \
  -F "title=Updated Project" \
  -F "description=Updated Description" \
  -F "tags=[\"React\"]" \
  -F "category=[\"Web Development\"]" \
  -F "featured=false" \
  -F "status=completed" \
  -F "githubLink=https://github.com/user/project" \
  -F "websiteLink=https://updated-project.com"
```

**Response:**

```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "title": "Updated Project",
    "image": "/uploads/projects/image-1234567890.jpg",
    "..."
  },
  "message": "Project updated successfully"
}
```

---

### Get All Projects

**Endpoint:** `GET /api/projects`

**Response:**

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "title": "My Project",
      "description": "...",
      "image": "/uploads/projects/image-1234567890.jpg",
      "tags": ["React"],
      "category": ["Web Development"],
      "featured": true,
      "status": "completed",
      "github_link": "https://github.com/user/project",
      "website_link": "https://myproject.com",
      "created_at": "2024-01-26T10:30:00Z",
      "updated_at": "2024-01-26T10:30:00Z"
    }
  ],
  "message": "Projects retrieved successfully"
}
```

---

### Delete Project

**Endpoint:** `DELETE /api/projects/:id`

**Description:** Deletes the project and automatically removes the associated image file.

**Response:**

```json
{
  "statusCode": 200,
  "data": null,
  "message": "Project deleted successfully"
}
```

---

## Error Handling

### Missing Image File

```json
{
  "statusCode": 400,
  "data": null,
  "message": "Project image is required. Please upload an image file."
}
```

### Invalid Image Format

```json
{
  "statusCode": 400,
  "data": null,
  "message": "Only image files are allowed (jpg, jpeg, png, gif, webp)"
}
```

### File Size Exceeded

```json
{
  "statusCode": 400,
  "data": null,
  "message": "File too large"
}
```

### Project Not Found

```json
{
  "statusCode": 404,
  "data": null,
  "message": "Project not found"
}
```

---

## Frontend Integration Example

### Using JavaScript Fetch API

**Creating a Project with Image:**

```javascript
const formData = new FormData();
formData.append("image", imageFile); // File from input element
formData.append("title", "My Project");
formData.append("description", "Project description");
formData.append("tags", JSON.stringify(["React", "NextJs"]));
formData.append("category", JSON.stringify(["Web Development"]));
formData.append("featured", true);
formData.append("status", "completed");
formData.append("githubLink", "https://github.com/user/project");
formData.append("websiteLink", "https://myproject.com");

const response = await fetch("http://localhost:3000/api/projects", {
  method: "POST",
  body: formData,
});

const data = await response.json();
console.log(data);
```

**Updating a Project with Image:**

```javascript
const formData = new FormData();
formData.append("image", newImageFile); // Optional
formData.append("title", "Updated Title");
formData.append("description", "Updated Description");
formData.append("tags", JSON.stringify(["React"]));
formData.append("category", JSON.stringify(["Web Development"]));
formData.append("featured", false);
formData.append("status", "completed");
formData.append("githubLink", "https://github.com/user/project");
formData.append("websiteLink", "https://updated-project.com");

const response = await fetch(`http://localhost:3000/api/projects/1`, {
  method: "PUT",
  body: formData,
});

const data = await response.json();
console.log(data);
```

**React Example with File Input:**

```jsx
import { useState } from "react";

export function ProjectForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    tags: [],
    category: [],
    featured: false,
    status: "ongoing",
    githubLink: "",
    websiteLink: "",
  });

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("image", formData.image);
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("tags", JSON.stringify(formData.tags));
    form.append("category", JSON.stringify(formData.category));
    form.append("featured", formData.featured);
    form.append("status", formData.status);
    form.append("githubLink", formData.githubLink);
    form.append("websiteLink", formData.websiteLink);

    const response = await fetch("/api/projects", {
      method: "POST",
      body: form,
    });

    const data = await response.json();
    if (data.statusCode === 201) {
      alert("Project created successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <input
        type="text"
        placeholder="Project Title"
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
        required
      />
      <button type="submit">Create Project</button>
    </form>
  );
}
```

---

## File Storage Architecture

```
backend/
├── public/
│   └── uploads/
│       └── projects/
│           ├── image-1704705000000.jpg
│           ├── image-1704705120000.png
│           └── image-1704705240000.webp
├── src/
│   ├── config/
│   │   └── multer.config.js (File upload configuration)
│   ├── modules/
│   │   └── project/
│   │       ├── project.controller.js (Updated - handles file uploads)
│   │       ├── project.service.js (Updated - validates file paths)
│   │       ├── project.repository.js
│   │       └── project.routes.js (Updated - multer middleware)
│   └── app.js (Updated - serves static files)
└── package.json (Updated - multer dependency)
```

---

## Image Access

### Accessing Uploaded Images

Images are stored in the public folder and can be accessed via:

```
http://localhost:3000/uploads/projects/image-1704705000000.jpg
```

When you receive a project response with:

```json
{
  "image": "/uploads/projects/image-1704705000000.jpg"
}
```

You can display it in the frontend:

```jsx
<img src={`http://localhost:3000${project.image}`} alt={project.title} />
```

Or in Next.js:

```jsx
import Image from "next/image";

<Image src={project.image} alt={project.title} width={200} height={200} />;
```

---

## Database Schema

The `image` column stores only the file path:

```sql
image VARCHAR(500) NOT NULL
-- Example: /uploads/projects/image-1704705000000.jpg
```

---

## Key Features

✅ **Automatic File Management**

- Old images deleted when updating projects
- Images deleted when projects are removed
- Unique filenames prevent collisions

✅ **Validation**

- File type validation (only images)
- File size limits (5MB max)
- Required image field

✅ **Performance**

- Static file serving via Express
- Indexed database queries
- Proper error handling

✅ **Security**

- File type validation
- Size restrictions
- Secure filename generation

---

## Troubleshooting

**Q: Where are uploaded images stored?**
A: In the `public/uploads/projects/` directory relative to the backend root.

**Q: Can I change the upload directory?**
A: Yes, modify `uploadsDir` in `src/config/multer.config.js`

**Q: What happens to old images when I update a project?**
A: The old image file is automatically deleted from the filesystem.

**Q: Can I upload images without using the API?**
A: No, images must be uploaded through the file upload endpoints to ensure proper database synchronization.
