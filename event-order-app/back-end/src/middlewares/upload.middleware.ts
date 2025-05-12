import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Batasi 5MB (cukup untuk gambar profil)
    files: 1, // Maksimal 1 file
  },
  fileFilter: (req, file, cb) => {
    // Hanya izin ekstensi gambar
    const allowedMimes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Hanya file JPEG/PNG/WEBP yang diizinkan"));
    }
  },
});

export const uploadSingle = (fieldName: string) => upload.single(fieldName);
