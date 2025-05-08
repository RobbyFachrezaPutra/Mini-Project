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
exports.VerifyToken = VerifyToken;
exports.requireEventOrganizerRole = requireEventOrganizerRole;
exports.requireAdminRole = requireAdminRole;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
function VerifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            if (!token)
                throw new Error("Unauthorized");
            const verifyUser = (0, jsonwebtoken_1.verify)(token, String(config_1.SECRET_KEY));
            if (!verifyUser)
                throw new Error("Token tidak valid");
            req.user = verifyUser;
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
function requireEventOrganizerRole(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(401).json({
                message: "Access Unauthorized",
                details: "You must be an event organizer to access this resource",
            });
            return;
        }
        catch (err) {
            next(err);
        }
    });
}
function requireAdminRole(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin") {
            res.status(401).json({
                message: "Access Unauthorized",
                details: "You must be an admin to access this resource",
            });
            return;
        }
        next();
    });
}
