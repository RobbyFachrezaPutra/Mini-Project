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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileService = getProfileService;
exports.updateProfileService = updateProfileService;
exports.deleteProfilePictureService = deleteProfilePictureService;
const prisma_1 = __importDefault(require("../lib/prisma"));
const cloudinary_1 = require("../utils/cloudinary");
function getProfileService(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                profile_picture: true,
                role: true,
            },
        });
        if (!user) {
            return {
                status: false,
                code: 404,
                message: "User not found",
            };
        }
        return user;
    });
}
function updateProfileService(email, data, file) {
    return __awaiter(this, void 0, void 0, function* () {
        if (file) {
            const uploadResult = yield (0, cloudinary_1.uploadImageToCloudinary)(file);
            data.profile_picture = uploadResult === null || uploadResult === void 0 ? void 0 : uploadResult.secure_url;
        }
        return yield prisma_1.default.user.update({
            where: { email },
            data,
        });
    });
}
function deleteProfilePictureService(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findUnique({
            where: { email },
            select: { profile_picture: true },
        });
        if ((user === null || user === void 0 ? void 0 : user.profile_picture) &&
            user.profile_picture !== "Profile_avatar_placeholder_large.png") {
            try {
                yield (0, cloudinary_1.deleteFromCloudinary)(user.profile_picture);
            }
            catch (err) {
                console.error("Failed to delete from Cloudinary:", err);
            }
        }
        return yield prisma_1.default.user.update({
            where: { email },
            data: { profile_picture: "Profile_avatar_placeholder_large.png" },
        });
    });
}
