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
exports.CreateCouponService = CreateCouponService;
exports.GetAllCouponService = GetAllCouponService;
exports.GetCouponService = GetCouponService;
exports.UpdateCouponService = UpdateCouponService;
exports.DeleteCouponService = DeleteCouponService;
const prisma_1 = __importDefault(require("../lib/prisma"));
function CreateCouponService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        const expiredAt = new Date(new Date().setMonth(new Date().getMonth() + 3));
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const coupon = yield prisma.coupon.create({
                    data: {
                        code: param.code,
                        discount_amount: param.discount_amount,
                        max_usage: param.max_usage,
                        is_active: param.is_active,
                        created_by_id: param.created_by_id,
                        created_at: new Date(),
                        updated_at: new Date(),
                        expired_at: expiredAt
                    },
                });
                return coupon;
            }));
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetAllCouponService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const coupon = yield prisma_1.default.coupon.findMany({});
            return coupon;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetCouponService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const coupon = yield prisma_1.default.coupon.findUnique({
                where: { id }
            });
            return coupon;
        }
        catch (err) {
            throw err;
        }
    });
}
function UpdateCouponService(id, param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const coupon = yield prisma.coupon.update({
                    where: { id },
                    data: {
                        code: param.code,
                        discount_amount: param.discount_amount,
                        max_usage: param.max_usage,
                        is_active: param.is_active,
                        created_by_id: param.created_by_id,
                        created_at: new Date(),
                        updated_at: new Date()
                    },
                });
                return coupon;
            }));
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
function DeleteCouponService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const coupon = yield prisma.coupon.delete({
                    where: { id }
                });
                return coupon;
            }));
        }
        catch (err) {
            throw err;
        }
    });
}
