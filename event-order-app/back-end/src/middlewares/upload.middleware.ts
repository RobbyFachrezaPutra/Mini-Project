import multer from "multer";

// Storage in memory
const storage = multer.memoryStorage();

const upload = multer({ storage });

// Export single file upload
export const uploadSingle = (fieldName: string) => upload.single(fieldName);
