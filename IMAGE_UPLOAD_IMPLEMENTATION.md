# Image Upload Implementation Summary

## Changes Made

### 1. **Dependencies Added**

- **multer** (^1.4.5-lts.1) - For handling file uploads

**Installation:**

```bash
npm install
```

### 2. **New Configuration File**

**File:** `src/config/multer.config.js`

- Configures file upload handling
- Sets storage location: `public/uploads/projects/`
- Validates file types (jpg, jpeg, png, gif, webp)
- Enforces 5MB file size limit
- Auto-generates unique filenames with timestamps

### 3. **Updated Files**

#### `src/app.js`

- Added static file serving for uploaded images
- Files accessible at: `http://localhost:3000/uploads/projects/[filename]`

#### `src/modules/project/project.routes.js`

- Added multer middleware for POST and PUT routes
- `router.post("/", upload.single("image"), ...)`
- `router.put("/:id", upload.single("image"), ...)`

#### `src/modules/project/project.controller.js`

- Updated `createProject()` to handle file uploads
- Updated `updateProject()` to replace old images when new ones are uploaded
- Updated `deleteProject()` to delete image files when project is deleted
- Automatic cleanup: Deletes uploaded files on validation errors

#### `src/modules/project/project.service.js`

- Modified validation to require image uploads
- Changed message from "Title, description, and image are required" to "Please upload an image file"
- Handles both new uploads and existing image paths during updates

#### `.gitignore`

- Added `public/uploads/` to ignore uploaded files in version control

### 4. **File Storage Structure**

```
backend/
└── public/
    └── uploads/
        └── projects/
            ├── project-image-1704705000000.jpg
            ├── project-image-1704705120000.png
            └── project-image-1704705240000.webp
```

## How It Works

### **Creating a Project**

1. Frontend sends `multipart/form-data` with image file
2. Multer validates and stores image in `public/uploads/projects/`
3. Generates unique filename: `[original-name]-[timestamp].ext`
4. Returns image path to controller: `/uploads/projects/[filename]`
5. Controller saves path to database (not the actual file)
6. Response includes image path for frontend use

### **Updating a Project**

1. If new image uploaded:
   - Store new image in `public/uploads/projects/`
   - Delete old image file automatically
   - Update database with new image path
2. If no new image:
   - Keep existing image path
   - No file operations needed

### **Deleting a Project**

1. Retrieve project to get image path
2. Delete database record
3. Delete image file automatically

## API Changes

### Request Format - Create/Update

**Content-Type:** `multipart/form-data` (instead of `application/json`)

**Parameters:**

```
image (file) - Image file upload (required for create, optional for update)
title (text) - Project title (required)
description (text) - Project description (required)
tags (JSON string) - Tags array as JSON string
category (JSON string) - Categories array as JSON string
featured (boolean) - Featured status
status (text) - "completed" or "ongoing"
githubLink (text) - GitHub URL
websiteLink (text) - Website URL
```

### Response Format (Unchanged)

Images now return file path instead of URL:

```json
{
  "id": 1,
  "title": "Project Name",
  "image": "/uploads/projects/image-1704705000000.jpg",
  ...
}
```

## Frontend Integration

### Using the Image Path

```javascript
// API returns image path like: "/uploads/projects/image-1704705000000.jpg"

// Display image in HTML
<img src={`http://localhost:3000${project.image}`} alt={project.title} />

// Or with Next.js Image
<Image
  src={project.image}
  alt={project.title}
  width={200}
  height={200}
/>
```

### Sending Image in Request

```javascript
const formData = new FormData();
formData.append("image", fileInput.files[0]); // File from input element
formData.append("title", "Project Title");
formData.append("description", "Project Description");
formData.append("tags", JSON.stringify(["React", "NextJs"]));
formData.append("category", JSON.stringify(["Web Development"]));
formData.append("featured", true);
formData.append("status", "completed");

fetch("http://localhost:3000/api/projects", {
  method: "POST",
  body: formData, // Not JSON
});
```

## Error Handling

### Missing Image

```json
{
  "statusCode": 400,
  "message": "Project image is required. Please upload an image file."
}
```

### Invalid Image Type

```json
{
  "statusCode": 400,
  "message": "Only image files are allowed (jpg, jpeg, png, gif, webp)"
}
```

### File Too Large

```json
{
  "statusCode": 400,
  "message": "File too large"
}
```

## Key Features

✅ **Automatic File Management**

- Old images deleted on updates
- Images deleted with projects
- Unique filenames prevent conflicts

✅ **Validation**

- File type validation
- Size limits (5MB max)
- Required image field

✅ **Performance**

- Static file serving via Express
- Optimized database queries
- Efficient file cleanup

✅ **Security**

- File type validation
- Size restrictions
- Secure filename generation (no user-controlled filenames)

## Directory Structure Updated

```
nextgen_codex_backend/
├── public/
│   └── uploads/
│       └── projects/     ← NEW
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── env.js
│   │   └── multer.config.js     ← NEW
│   ├── modules/
│   │   └── project/
│   │       ├── project.controller.js    (UPDATED)
│   │       ├── project.service.js       (UPDATED)
│   │       ├── project.repository.js
│   │       └── project.routes.js        (UPDATED)
│   ├── app.js                          (UPDATED)
│   └── ...
├── .gitignore                          (UPDATED)
├── package.json                        (UPDATED)
└── ...
```

## Next Steps

1. **Run npm install**

   ```bash
   npm install
   ```

2. **Create public directory**

   ```bash
   mkdir -p public/uploads/projects
   ```

3. **Test Image Upload**

   - Use cURL or Postman to test with `multipart/form-data`
   - See `IMAGE_UPLOAD_SETUP.md` for detailed examples

4. **Update Frontend**
   - Change form submission to use `FormData`
   - Update image display to use the path from API response
   - Remember: Content-Type must be `multipart/form-data`

## Important Notes

- **Always use `multipart/form-data`** for requests with file uploads
- **Image path is stored in DB**, not the actual file
- **Images are public** and served from `public/uploads/projects/`
- **Old images are auto-deleted** when projects are updated or deleted
- **Failed uploads are cleaned up** automatically
