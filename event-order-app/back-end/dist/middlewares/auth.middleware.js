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
        try {
            const token = req.cookies.access_token;
            if (!token) {
                res.status(401).json({
                    message: "Access Unauthorized",
                    details: "You must login to access this resource",
                });
                return;
            }
            ;
            const verifyUser = (0, jsonwebtoken_1.verify)(token, String(config_1.SECRET_KEY));
            if (!verifyUser) {
                res.status(401).json({
                    message: "Token invalid",
                    details: "You must login to access this resource",
                });
                return;
            }
            req.user = verifyUser;
            next();
        }
        catch (err) {
            if (err instanceof Error && err.name === 'TokenExpiredError') {
                res.status(401).json({
                    message: 'Token expired',
                    details: 'Your session has expired. Please login again.',
                });
                return;
            }
            if (err instanceof Error) {
                res.status(401).json({
                    message: 'Token invalid',
                    details: err.message || 'Authentication failed',
                });
                return;
            }
            // fallback jika err bukan Error
            res.status(500).json({
                message: 'Unexpected error',
                details: 'An unknown error occurred.',
            });
            return;
        }
    });
}
function requireEventOrganizerRole(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "event_organizer") {
            res.status(401).json({
                message: "Access Unauthorized",
                details: "You must be an event organizer to access this resource",
            });
            return;
        }
        next();
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
