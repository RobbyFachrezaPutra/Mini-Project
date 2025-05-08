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
exports.CreateTransactionService = CreateTransactionService;
exports.GetTransactionService = GetTransactionService;
exports.GetAllTransactionService = GetAllTransactionService;
exports.UpdateTransactionService = UpdateTransactionService;
const prisma_1 = __importDefault(require("../lib/prisma"));
function CreateTransactionService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const transaction = yield prisma.transaction.create({
                    data: {
                        event_id: param.event_id,
                        ticket_id: param.ticket_id,
                        voucher_id: param.voucher_id,
                        coupon_id: param.coupon_id,
                        qty: param.qty,
                        price: param.price,
                        total_price: param.total_price,
                        voucher_amount: param.voucher_amount,
                        point_amount: param.point_amount,
                        coupon_amount: param.coupon_amount,
                        final_price: param.final_price,
                        payment_proof: param.payment_proof,
                        status: param.status,
                        created_at: new Date(),
                        updated_at: new Date(),
                        user_id: param.user_id
                    },
                });
                if (param.coupon_id) {
                    yield prisma.coupon_Usage.create({
                        data: {
                            coupon_id: param.coupon_id,
                            user_id: param.user_id,
                            transaction_id: transaction.id,
                            assigned_at: new Date(),
                            used_at: new Date()
                        },
                    });
                }
                if (param.point_amount) {
                    yield prisma.point.update({
                        where: { user_id: param.user_id },
                        data: {
                            point: {
                                decrement: param.point_amount,
                            },
                        },
                    });
                }
                if (param.event_id) {
                    yield prisma.event.update({
                        where: { id: param.event_id },
                        data: {
                            available_seats: {
                                decrement: param.qty,
                            },
                        },
                    });
                }
                if (param.ticket_id) {
                    yield prisma.ticket.update({
                        where: { id: param.ticket_id },
                        data: {
                            remaining: {
                                decrement: param.qty,
                            },
                        },
                    });
                }
                return transaction;
            }));
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetAllTransactionService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield prisma_1.default.transaction.findMany({});
            return transaction;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetTransactionService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield prisma_1.default.transaction.findUnique({
                where: { id }
            });
            return transaction;
        }
        catch (err) {
            throw err;
        }
    });
}
function UpdateTransactionService(id, param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const transaction = yield prisma.transaction.update({
                    where: { id },
                    data: {
                        event_id: param.event_id,
                        ticket_id: param.ticket_id,
                        voucher_id: param.voucher_id,
                        coupon_id: param.coupon_id,
                        qty: param.qty,
                        price: param.price,
                        total_price: param.total_price,
                        voucher_amount: param.voucher_amount,
                        point_amount: param.point_amount,
                        coupon_amount: param.coupon_amount,
                        final_price: param.final_price,
                        payment_proof: param.payment_proof,
                        status: param.status,
                        updated_at: new Date(),
                    },
                });
                if (param.coupon_id && (param.status === "expired" || param.status === "cancel")) {
                    yield prisma.coupon_Usage.delete({
                        where: {
                            coupon_id: param.coupon_id,
                            user_id: param.user_id,
                            transaction_id: transaction.id
                        }
                    });
                }
                if (param.point_amount && (param.status === "expired" || param.status === "cancel")) {
                    yield prisma.point.update({
                        where: { user_id: param.user_id },
                        data: {
                            point: {
                                increment: param.point_amount,
                            },
                        },
                    });
                }
                if (param.event_id && (param.status === "expired" || param.status === "cancel")) {
                    yield prisma.event.update({
                        where: { id: param.event_id },
                        data: {
                            available_seats: {
                                increment: param.qty,
                            },
                        },
                    });
                }
                if (param.ticket_id && (param.status === "expired" || param.status === "cancel")) {
                    yield prisma.ticket.update({
                        where: { id: param.ticket_id },
                        data: {
                            remaining: {
                                increment: param.qty,
                            },
                        },
                    });
                }
                return transaction;
            }));
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
