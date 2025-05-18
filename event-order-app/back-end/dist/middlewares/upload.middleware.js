"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingle = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
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
        }
        else {
            cb(new Error("Hanya file JPEG/PNG/WEBP yang diizinkan"));
        }
    },
});
const uploadSingle = (fieldName) => upload.single(fieldName);
exports.uploadSingle = uploadSingle;
