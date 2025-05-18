"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToCloudinary = void 0;
exports.deleteFromCloudinary = deleteFromCloudinary;
const cloudinary_1 = require("cloudinary");
const config_1 = require("../config");
cloudinary_1.v2.config({
    cloud_name: config_1.CLOUDINARY_NAME || "",
    api_key: config_1.CLOUDINARY_KEY || "",
    api_secret: config_1.CLOUDINARY_SECRET || "",
});
const uploadImageToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload_stream({ resource_type: "auto" }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        })
            .end(file.buffer);
    });
};
exports.uploadImageToCloudinary = uploadImageToCloudinary;
function deleteFromCloudinary(imageUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Ekstrak public_id dari URL
            const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];
            if (!publicId) {
                throw new Error("Invalid Cloudinary URL");
            }
            const result = yield cloudinary_1.v2.uploader.destroy(publicId);
            return result.result === "ok";
        }
        catch (err) {
            console.error("Failed to delete from Cloudinary:", err);
            throw err;
        }
    });
}
