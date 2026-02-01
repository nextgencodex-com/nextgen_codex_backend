import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Filter for image files only
const fileFilter = (req, file, cb) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  const allowedExts = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedMimes.includes(file.mimetype) && allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only image files are allowed (jpg, jpeg, png, gif, webp)"),
      false
    );
  }
};

// ===== PROJECTS UPLOAD CONFIG =====
const projectsUploadsDir = path.join(
  __dirname,
  "../../public/uploads/projects"
);
if (!fs.existsSync(projectsUploadsDir)) {
  fs.mkdirSync(projectsUploadsDir, { recursive: true });
}

const projectsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, projectsUploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

const uploadProjects = multer({
  storage: projectsStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max size
  },
});

// ===== BLOGS UPLOAD CONFIG =====
const blogsUploadsDir = path.join(__dirname, "../../public/uploads/blogs");
if (!fs.existsSync(blogsUploadsDir)) {
  fs.mkdirSync(blogsUploadsDir, { recursive: true });
}

const blogsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, blogsUploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

const uploadBlogs = multer({
  storage: blogsStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max size
  },
});

export { uploadProjects, uploadBlogs };
