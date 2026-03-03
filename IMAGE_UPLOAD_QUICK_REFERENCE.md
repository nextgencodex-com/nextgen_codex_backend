# Image Upload - Quick Reference Guide

## ⚡ Quick Start

### Backend Ready ✅

Images are now stored in the project folder and only the path is stored in the database.

### Change Required in Frontend

#### OLD (localStorage)

```javascript
// Frontend stored full data in localStorage
const formData = {
  image: "https://example.com/image.jpg", // Full URL
  ...
};
localStorage.setItem("projects", JSON.stringify([formData]));
```

#### NEW (with Backend API)

```javascript
// Frontend sends file to backend
const formData = new FormData();
formData.append("image", fileInput.files[0]); // Actual file
formData.append("title", "Project Title");
// ... other fields

const response = await fetch("/api/projects", {
  method: "POST",
  body: formData, // FormData, NOT JSON
});
```

---

## API Endpoints

### Create Project

```
POST /api/projects
Content-Type: multipart/form-data

Body:
- image: File (required, max 5MB)
- title: string (required)
- description: string (required)
- tags: JSON string (optional) - ["React", "NextJs"]
- category: JSON string (required) - ["Web Development"]
- featured: boolean (optional) - true/false
- status: string (optional) - "completed" or "ongoing"
- githubLink: string (optional)
- websiteLink: string (optional)

Response:
{
  "image": "/uploads/projects/image-1704705000000.jpg",
  ...
}
```

### Update Project

```
PUT /api/projects/:id
Content-Type: multipart/form-data

Body: Same as Create (image is optional)
```

### Get All Projects

```
GET /api/projects
```

### Get Project by ID

```
GET /api/projects/:id
```

### Delete Project

```
DELETE /api/projects/:id
```

### Get Featured Projects

```
GET /api/projects/featured
```

### Get by Status

```
GET /api/projects/status/completed
GET /api/projects/status/ongoing
```

### Get by Category

```
GET /api/projects/category/Web%20Development
```

---

## Frontend Code Example - React

### File Input Component

```jsx
import { useState } from "react";

export function ProjectForm() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("tags", JSON.stringify(["React", "NextJs"]));
    formData.append("category", JSON.stringify(["Web Development"]));
    formData.append("featured", e.target.featured.checked);
    formData.append("status", e.target.status.value);
    formData.append("githubLink", e.target.githubLink.value);
    formData.append("websiteLink", e.target.websiteLink.value);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        body: formData, // NOT JSON
      });

      const data = await response.json();

      if (data.statusCode === 201) {
        console.log("Project created:", data.data);
        // Project image is now at: data.data.image
        // e.g., "/uploads/projects/image-1704705000000.jpg"
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <input type="text" name="title" required />
      <textarea name="description" required />
      <input type="text" name="githubLink" />
      <input type="text" name="websiteLink" />
      <select name="status">
        <option>ongoing</option>
        <option>completed</option>
      </select>
      <label>
        Featured:
        <input type="checkbox" name="featured" />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Create Project"}
      </button>
    </form>
  );
}
```

### Display Images

```jsx
import Image from "next/image";

export function ProjectCard({ project }) {
  return (
    <div>
      <h3>{project.title}</h3>
      <Image
        src={project.image} // e.g., "/uploads/projects/image-1704705000000.jpg"
        alt={project.title}
        width={300}
        height={200}
      />
      <p>{project.description}</p>
      {project.featured && <span>⭐ Featured</span>}
      <span className="badge">{project.status}</span>
    </div>
  );
}
```

---

## Common Issues & Solutions

### ❌ Issue: "Content-Type" error

**Problem:** Sending `Content-Type: application/json` with FormData
**Solution:** Don't set Content-Type header - let the browser set it automatically

```javascript
// ❌ WRONG
const response = await fetch("/api/projects", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: formData,
});

// ✅ CORRECT
const response = await fetch("/api/projects", {
  method: "POST",
  body: formData, // No Content-Type header!
});
```

### ❌ Issue: Image shows as broken link

**Problem:** Not using the correct image path
**Solution:** Use the path returned from API response

```javascript
// ❌ WRONG - Using URL input value
<img src={imageUrl} /> // Won't work if imageUrl is user input

// ✅ CORRECT - Using API response path
const response = await fetch('/api/projects', { ... });
const { data } = await response.json();
<img src={`http://localhost:3000${data.image}`} /> // Works!
```

### ❌ Issue: File not uploading

**Problem:** Using JSON.stringify(FormData)
**Solution:** Send FormData directly

```javascript
// ❌ WRONG
const response = await fetch("/api/projects", {
  method: "POST",
  body: JSON.stringify(formData), // Doesn't work with files!
});

// ✅ CORRECT
const response = await fetch("/api/projects", {
  method: "POST",
  body: formData, // Send FormData directly
});
```

---

## Testing with cURL

### Create Project

```bash
curl -X POST http://localhost:3000/api/projects \
  -F "image=@/path/to/image.jpg" \
  -F "title=My Project" \
  -F "description=Project Description" \
  -F "tags=[\"React\",\"NextJs\"]" \
  -F "category=[\"Web Development\"]" \
  -F "featured=true" \
  -F "status=completed"
```

### Update Project

```bash
curl -X PUT http://localhost:3000/api/projects/1 \
  -F "image=@/path/to/new-image.jpg" \
  -F "title=Updated Title" \
  -F "description=Updated Description" \
  -F "category=[\"Web Development\"]"
```

### Get All Projects

```bash
curl http://localhost:3000/api/projects
```

### Delete Project

```bash
curl -X DELETE http://localhost:3000/api/projects/1
```

---

## Database

### Image Column

Stores only the file path:

```sql
image VARCHAR(500) NOT NULL
-- Value: /uploads/projects/image-1704705000000.jpg
```

### Access Uploaded Images

Images are stored in `public/uploads/projects/` and can be accessed:

```
http://localhost:3000/uploads/projects/[filename]
```

---

## Summary

| Aspect        | Before          | After               |
| ------------- | --------------- | ------------------- |
| Image Storage | localStorage    | Backend filesystem  |
| Request Type  | JSON            | multipart/form-data |
| Image Data    | Full URL string | File object         |
| Database      | Full URL        | File path only      |
| Access        | localStorage    | HTTP requests       |
| File Deletion | Manual          | Automatic           |

---

## Files to Check

- `IMAGE_UPLOAD_SETUP.md` - Detailed setup instructions
- `IMAGE_UPLOAD_IMPLEMENTATION.md` - Technical implementation details
- `src/config/multer.config.js` - Upload configuration
- `src/modules/project/project.controller.js` - File handling logic
