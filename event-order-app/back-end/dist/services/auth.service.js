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
exports.RegisterService = RegisterService;
exports.LoginService = LoginService;
exports.GetAll = GetAll;
exports.RefreshToken = RefreshToken;
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const sendMailEtheral_1 = require("../utils/sendMailEtheral");
const config_1 = require("../config");
function GetAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma_1.default.user.findMany();
        }
        catch (err) {
            throw err;
        }
    });
}
function generateReferralCode(length = 8) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return code;
}
const defaultProfilePicture = "Profile_avatar_placeholder_large.png";
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma_1.default.user.findFirst({
                select: {
                    id: true,
                    email: true,
                    first_name: true,
                    last_name: true,
                    profile_picture: true,
                    password: true,
                    role: true,
                    referral_code: true,
                },
                where: {
                    email,
                },
            });
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
function sendRegistrationEmail(user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (user && user.email) {
            const subject = "Selamat! Registrasi Anda Berhasil";
            const html = `<p>Halo ${user.first_name || ""},<br>
      Terima kasih telah mendaftar di <b>Tiketin.com</b><br>
      Selamat datang dan selamat menggunakan platform kami!</p>`;
            // Kirim email pake fungsi yang kamu punya, misal sendMailEthereal
            const previewUrl = yield (0, sendMailEtheral_1.sendMailEthereal)(user.email, subject, html);
            console.log("Preview Email URL:", previewUrl);
        }
    });
}
function RegisterService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isExist = yield findUserByEmail(param.email);
            if (isExist) {
                return {
                    status: false,
                    code: 404,
                    message: "Email sudah terdaftar",
                };
            }
            const result = yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const { referral_code } = param;
                const salt = (0, bcrypt_1.genSaltSync)(10);
                const hashedPassword = yield (0, bcrypt_1.hash)(param.password, salt);
                const referralCode = generateReferralCode(8);
                const user = yield prisma_1.default.user.create({
                    data: {
                        first_name: param.first_name,
                        last_name: param.last_name,
                        email: param.email,
                        password: hashedPassword,
                        role: param.role,
                        referral_code: referralCode,
                        profile_picture: defaultProfilePicture,
                        created_at: new Date(),
                    },
                });
                if (referral_code) {
                    const referrer = yield tx.user.findFirst({
                        where: { referral_code: referral_code },
                    });
                    if (referrer) {
                        yield tx.referral_log.create({
                            data: {
                                referrer_id: referrer.id,
                                referred_user_id: user.id,
                                created_at: new Date(),
                            },
                        });
                        yield tx.coupon.create({
                            data: {
                                created_by_id: user.id,
                                is_active: true,
                                max_usage: 1,
                                code: "REGCOUPON",
                                discount_amount: 10,
                                expired_at: new Date(new Date().setMonth(new Date().getMonth() + 3)), // expired 3 bulan
                                created_at: new Date(),
                                updated_at: new Date(),
                            },
                        });
                        yield tx.point.create({
                            data: {
                                user_id: referrer.id,
                                point: 10000,
                                expired_at: new Date(new Date().setMonth(new Date().getMonth() + 3)), // expired 3 bulan
                                created_at: new Date(),
                            },
                        });
                    }
                }
                return user;
            }));
            yield sendRegistrationEmail(result);
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
function LoginService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield findUserByEmail(param.email);
            if (!user) {
                return {
                    status: false,
                    code: 404,
                    message: "Email belum terdaftar",
                };
            }
            const checkPass = yield (0, bcrypt_1.compare)(param.password, user.password);
            if (!checkPass) {
                return {
                    status: false,
                    code: 404,
                    message: "Password salah",
                };
            }
            // Ambil total points aktif user (belum expired)
            const now = new Date();
            const pointsAgg = yield prisma_1.default.point.aggregate({
                _sum: {
                    point: true,
                },
                where: {
                    user_id: user.id,
                    expired_at: {
                        gt: now,
                    },
                },
            });
            const totalPoints = pointsAgg._sum.point || 0;
            const payload = {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                referral_code: user.referral_code,
            };
            const token = (0, jsonwebtoken_1.sign)(payload, String(config_1.SECRET_KEY), { expiresIn: "24h" });
            const refreshToken = (0, jsonwebtoken_1.sign)(payload, String(config_1.REFRESH_SECRET), {
                expiresIn: "7d",
            });
            const data = {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                profile_picture: user.profile_picture,
                referral_code: user.referral_code,
                points: totalPoints,
            };
            return { user: data, token, refreshToken };
        }
        catch (err) {
            throw err;
        }
    });
}
function RefreshToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.refresh_token;
        const cookie = req.cookies;
        if (!token)
            return res.status(401).json({ message: "No token provided", cookie });
        try {
            const payload = (0, jsonwebtoken_1.verify)(token, String(config_1.REFRESH_SECRET));
            const newRefreshToken = (0, jsonwebtoken_1.sign)(payload, String(config_1.REFRESH_SECRET), {
                expiresIn: "7d",
            });
            // Kirim refresh token baru di cookie
            res.status(200).cookie('refresh_token', newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            const newAccessToken = (0, jsonwebtoken_1.sign)({
                id: payload.id,
                email: payload.email,
                first_name: payload.first_name,
                last_name: payload.last_name,
                role: payload.role,
                referral_code: payload.referral_code
            }, String(config_1.SECRET_KEY), { expiresIn: "24h" });
            return { newAccessToken };
        }
        catch (err) {
            return token;
        }
    });
}
