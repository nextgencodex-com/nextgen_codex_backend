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
    const name = path.basename(file.originalname, ext)
      .replace(/\s+/g, '-')           // Replace spaces with hyphens
      .replace(/[^\w\-]/g, '')        // Remove special characters except hyphens
      .toLowerCase();                 // Convert to lowercase
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
    const name = path.basename(file.originalname, ext)
      .replace(/\s+/g, '-')           // Replace spaces with hyphens
      .replace(/[^\w\-]/g, '')        // Remove special characters except hyphens
      .toLowerCase();                 // Convert to lowercase
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

// ===== CLIENT DOCUMENTS UPLOAD CONFIG =====
const clientDocsUploadsDir = path.join(
  __dirname,
  "../../public/uploads/clients"
);
if (!fs.existsSync(clientDocsUploadsDir)) {
  fs.mkdirSync(clientDocsUploadsDir, { recursive: true });
}

const documentFileFilter = (req, file, cb) => {
  const allowedMimes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
    "application/zip",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  const allowedExts = [
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".txt",
    ".zip",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
  ];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedMimes.includes(file.mimetype) && allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Unsupported file type. Allowed: pdf, doc, docx, xls, xlsx, ppt, pptx, txt, zip, jpg, jpeg, png, gif, webp"
      ),
      false
    );
  }
};

const clientDocumentsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, clientDocsUploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)
      .replace(/\s+/g, '-')           // Replace spaces with hyphens
      .replace(/[^\w\-]/g, '')        // Remove special characters except hyphens
      .toLowerCase();                 // Convert to lowercase
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

const uploadClientDocuments = multer({
  storage: clientDocumentsStorage,
  fileFilter: documentFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max size
  },
});

// ===== EMPLOYEE PHOTOS UPLOAD CONFIG =====
const employeeUploadsDir = path.join(
  __dirname,
  "../../public/uploads/Employee"
);
if (!fs.existsSync(employeeUploadsDir)) {
  fs.mkdirSync(employeeUploadsDir, { recursive: true });
}

const employeeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, employeeUploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)
      .replace(/\s+/g, '-')           // Replace spaces with hyphens
      .replace(/[^\w\-]/g, '')        // Remove special characters except hyphens
      .toLowerCase();                 // Convert to lowercase
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

const uploadEmployee = multer({
  storage: employeeStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max size
  },
});

export { uploadProjects, uploadBlogs, uploadClientDocuments, uploadEmployee };
