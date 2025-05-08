"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToCloudinary = void 0;
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
