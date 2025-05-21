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
exports.RegisterController = RegisterController;
exports.LoginController = LoginController;
exports.UserController = UserController;
exports.RefreshTokenController = RefreshTokenController;
const auth_service_1 = require("../services/auth.service");
function RegisterController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, auth_service_1.RegisterService)(req.body);
            res.status(200).send({
                message: "Register Berhasil",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function LoginController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, auth_service_1.LoginService)(req.body);
            if (data.status === false) {
                res.status(data.code).send({
                    message: data.message,
                    data: null,
                });
                return;
            }
            res
                .status(200)
                .cookie("access_token", data.token, {
                httpOnly: true, // Lebih aman
                secure: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
                .cookie("refresh_token", data.refreshToken, {
                httpOnly: true, // Lebih aman
                secure: true,
                sameSite: "none",
                path: "/",
            })
                .send({
                message: "Login Berhasil",
                data: data.user,
                token: data.token, // Kirim token dalam response body juga
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function UserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            console.log(user);
            const data = yield (0, auth_service_1.GetAll)();
            res.status(200).send({
                message: "Berhasil",
                data: data,
            });
        }
        catch (err) {
            next();
        }
    });
}
function RefreshTokenController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, auth_service_1.RefreshToken)(req, res);
            const accessToken = result.newAccessToken;
            res
                .status(200)
                .cookie("access_token", accessToken, {
                httpOnly: true, // Lebih aman
                secure: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
                .send({
                message: "Refresh token berhasil",
                token: accessToken, // Kirim token dalam response body juga
            });
        }
        catch (err) {
            next(err);
        }
    });
}
