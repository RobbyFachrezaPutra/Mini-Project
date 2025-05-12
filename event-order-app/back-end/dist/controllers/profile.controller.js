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
exports.ProfileController = ProfileController;
exports.editProfileController = editProfileController;
const profile_service_1 = require("../services/profile.service");
function ProfileController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email; // Mengambil email dari req.user
            if (!userEmail) {
                res.status(400).send({ message: "User  email not found" });
                return;
            }
            const data = yield (0, profile_service_1.getProfileService)(userEmail);
            res.status(200).send({
                message: "Berhasil ambil data profile",
                data,
            });
            return;
        }
        catch (err) {
            next(err); // error dilempar ke global handler
        }
    });
}
function editProfileController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
            if (!userEmail) {
                res.status(400).send({ message: "User email not found" });
                return;
            }
            const file = req.file;
            const data = yield (0, profile_service_1.editProfileService)(userEmail, req.body, file);
            res.status(200).send({
                message: "Profile updated successfully",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
