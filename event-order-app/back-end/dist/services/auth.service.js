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
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
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
function generateReferralCode(firstName) {
    const prefix = firstName.toLowerCase();
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const referralCode = `${prefix}${randomNumber}`;
    return referralCode.length > 20 ? referralCode.slice(0, 20) : referralCode;
}
const defaultProfilePicture = "https://www.w3schools.com/howto/img_avatar.png";
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma_1.default.user.findFirst({
                select: {
                    email: true,
                    first_name: true,
                    last_name: true,
                    profile_picture: true,
                    password: true,
                    role: true,
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
                const referralCode = generateReferralCode(param.first_name).slice(0, 20);
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
            const payload = {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
            };
            const token = (0, jsonwebtoken_1.sign)(payload, String(config_1.SECRET_KEY), { expiresIn: "1h" });
            const data = {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                profile_picture: user.profile_picture,
            };
            return { user: data, token };
        }
        catch (err) {
            throw err;
        }
    });
}
