import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } from "../config";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME || "",
  api_key: CLOUDINARY_KEY || "",
  api_secret: CLOUDINARY_SECRET || "",
});

export const uploadImageToCloudinary = (file: Express.Multer.File) => {
  return new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(file.buffer);
  });
};
