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
exports.CreateVoucherService = CreateVoucherService;
exports.GetVoucherService = GetVoucherService;
exports.GetAllVoucherService = GetAllVoucherService;
exports.UpdateVoucherService = UpdateVoucherService;
exports.DeleteVoucherService = DeleteVoucherService;
exports.GetVoucherByEventIdService = GetVoucherByEventIdService;
const prisma_1 = __importDefault(require("../lib/prisma"));
function CreateVoucherService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const Voucher = yield prisma.voucher.create({
                    data: {
                        code: param.code,
                        description: param.description,
                        event_id: param.event_id,
                        discount_amount: param.discount_amount,
                        sales_start: param.sales_start,
                        sales_end: param.sales_end,
                        created_at: new Date(),
                        updated_at: new Date(),
                        created_by_id: param.created_by_id
                    },
                });
                return Voucher;
            }));
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetAllVoucherService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Voucher = yield prisma_1.default.voucher.findMany({});
            return Voucher;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetVoucherService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Voucher = yield prisma_1.default.voucher.findUnique({
                where: { id }
            });
            return Voucher;
        }
        catch (err) {
            throw err;
        }
    });
}
function UpdateVoucherService(id, param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const Voucher = yield prisma.voucher.update({
                    where: { id },
                    data: {
                        code: param.code,
                        description: param.description,
                        event_id: param.event_id,
                        discount_amount: param.discount_amount,
                        sales_start: param.sales_start,
                        sales_end: param.sales_end,
                        updated_at: new Date()
                    },
                });
                return Voucher;
            }));
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
function DeleteVoucherService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const user = yield prisma.voucher.delete({
                    where: { id }
                });
                return user;
            }));
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetVoucherByEventIdService(eventId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Voucher = yield prisma_1.default.voucher.findMany({
                where: {
                    event_id: eventId,
                    sales_start: {
                        lte: new Date(), // start_date <= now
                    },
                    sales_end: {
                        gte: new Date(), // end_date >= now
                    },
                }
            });
            return Voucher;
        }
        catch (err) {
            throw err;
        }
    });
}
