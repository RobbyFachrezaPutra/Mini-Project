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

export async function deleteFromCloudinary(imageUrl: string) {
  try {
    // Ekstrak public_id dari URL
    const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];

    if (!publicId) {
      throw new Error("Invalid Cloudinary URL");
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (err) {
    console.error("Failed to delete from Cloudinary:", err);
    throw err;
  }
}
