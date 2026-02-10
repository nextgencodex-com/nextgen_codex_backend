# Blog Image Upload Setup

## Overview

Blog image upload functionality has been configured to store images in the `public/uploads/blogs/` directory and store only the image path links in the SQL database.

## Changes Made

### 1. Updated Multer Configuration (`src/config/multer.config.js`)

- Created separate multer instances for **projects** and **blogs**
- **Projects**: Stores images in `public/uploads/projects/`
- **Blogs**: Stores images in `public/uploads/blogs/`
- Both use the same image validation rules:
  - Allowed formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
  - Max file size: 5MB

### 2. Updated Blog Routes (`src/modules/blog/blog.routes.js`)

- Imported `uploadBlogs` from multer config
- Uncommented all blog routes
- Applied `uploadBlogs.single("coverImage")` middleware to:
  - `POST /` - Create blog (with image upload)
  - `PUT /:id` - Update blog (with image upload)

### 3. Blog Controller Already Configured

The blog controller (`src/modules/blog/blog.controller.js`) already handles:

- Converting uploaded file to path: `blogData.coverImage = '/uploads/blogs/${req.file.filename}'`
- Deleting uploaded files if operations fail
- Proper error handling

### 4. Database Schema

The `blogs` table already has a `cover_image` column to store the image path.

## How It Works

### Create Blog with Image

```bash
POST /api/blogs
Headers: Authorization: Bearer {token}
Body (form-data):
  - title: "Blog Title"
  - content: "Blog content..."
  - category: "Technology"
  - coverImage: [image file]
  - Other fields...
```

**Result:**

- Image saved to: `public/uploads/blogs/filename-timestamp.jpg`
- Database stores: `/uploads/blogs/filename-timestamp.jpg`

### Update Blog with Image

```bash
PUT /api/blogs/:id
Headers: Authorization: Bearer {token}
Body (form-data):
  - title: "Updated Title"
  - coverImage: [new image file] (optional)
  - Other fields...
```

## Frontend Usage Example

```javascript
// Using FormData for file upload
const formData = new FormData();
formData.append("title", "My Blog Post");
formData.append("content", "Blog content...");
formData.append("category", "Technology");
formData.append("coverImage", fileInput.files[0]);

const response = await fetch("/api/blogs", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});
```

## File Structure

```
public/
├── uploads/
│   ├── projects/     (Project images)
│   └── blogs/        (Blog images)
```

## Key Points

✅ Images are stored in the public folder for web access
✅ Only image paths are stored in the database (not binary data)
✅ Automatic directory creation if they don't exist
✅ Unique filenames prevent overwrites
✅ Automatic file deletion on failed operations
✅ JWT authentication required for create/update
✅ Same validation rules as project uploads

## Serving Images

Images are served as static files from the `public` folder. The paths stored in the database can be used directly in the frontend:

```html
<img
  src="http://yourdomain.com/uploads/blogs/filename-timestamp.jpg"
  alt="Blog"
/>
```

Or if using a relative path from the public folder:

```html
<img src="/uploads/blogs/filename-timestamp.jpg" alt="Blog" />
```
