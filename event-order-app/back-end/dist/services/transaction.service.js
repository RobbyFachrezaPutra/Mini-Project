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
exports.UploadPaymentProofService = UploadPaymentProofService;
exports.GetTransactionByUserIdService = GetTransactionByUserIdService;
exports.GetTransactionByOrganizerIdService = GetTransactionByOrganizerIdService;
exports.UpdateTransactionTransIdService = UpdateTransactionTransIdService;
const prisma_1 = __importDefault(require("../lib/prisma"));
const cloudinary_1 = require("../utils/cloudinary");
const sendMailEtheral_1 = require("../utils/sendMailEtheral");
function CreateTransactionService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const details = param.details.map((detail) => (Object.assign(Object.assign({}, detail), { subtotal: detail.price * detail.qty })));
                const subtotal = details.reduce((acc, detail) => acc + detail.subtotal, 0);
                // Hitung final_price
                const voucherAmount = param.voucher_amount || 0;
                const couponAmount = param.coupon_amount || 0;
                const finalCouponAmount = (couponAmount * subtotal) / 100;
                const pointAmount = param.point_amount || 0;
                const finalPrice = subtotal - voucherAmount - finalCouponAmount - pointAmount;
                const data = {
                    code: param.code,
                    voucher_amount: param.voucher_amount,
                    point_amount: param.point_amount,
                    coupon_amount: param.coupon_amount,
                    final_price: finalPrice,
                    payment_proof: param.payment_proof,
                    status: param.status,
                    created_at: new Date(),
                    updated_at: new Date(),
                    user: {
                        connect: { id: param.user_id },
                    },
                    event: {
                        connect: { id: param.event_id },
                    },
                };
                // Conditionally add voucher relation
                if (param.voucher_id) {
                    data.voucher = {
                        connect: { id: param.voucher_id },
                    };
                }
                // Conditionally add coupon relation
                if (param.coupon_id) {
                    data.coupon = {
                        connect: { id: param.coupon_id },
                    };
                }
                const transaction = yield prisma_1.default.transaction.create({
                    data,
                });
                // Simpan detail tiket
                yield tx.transactionDetail.createMany({
                    data: param.details.map((detail) => ({
                        transaction_id: transaction.id,
                        ticket_id: detail.ticket_id,
                        qty: detail.qty,
                        price: detail.price,
                        subtotal: detail.price * detail.qty,
                    })),
                });
                // Update kupon
                if (param.coupon_id) {
                    yield tx.coupon_Usage.create({
                        data: {
                            coupon_id: param.coupon_id,
                            user_id: param.user_id,
                            transaction_id: transaction.id,
                            assigned_at: new Date(),
                            used_at: new Date(),
                        },
                    });
                }
                // Update point user
                if (param.point_amount) {
                    deductPoints(param.user_id, transaction.id, param.point_amount);
                }
                // Update tiket dan event
                for (const detail of param.details) {
                    yield tx.ticket.update({
                        where: { id: detail.ticket_id },
                        data: {
                            remaining: {
                                decrement: detail.qty,
                            },
                        },
                    });
                    yield tx.event.update({
                        where: { id: param.event_id },
                        data: {
                            available_seats: {
                                decrement: detail.qty,
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
function deductPoints(user_id, transaction_id, pointUsed) {
    return __awaiter(this, void 0, void 0, function* () {
        const availablePoints = yield prisma_1.default.point.findMany({
            where: {
                user_id: user_id,
                expired_at: {
                    gte: new Date(), // yang belum expired pada saat transaksi
                },
            },
            orderBy: {
                expired_at: "asc", // FIFO: pakai yang paling cepet expired
            },
        });
        let remaining = pointUsed;
        for (const pointRow of availablePoints) {
            if (remaining <= 0)
                break;
            const usable = Math.min(remaining, pointRow.point);
            yield prisma_1.default.point_Usage.create({
                data: {
                    transaction_id: transaction_id,
                    point_id: pointRow.id,
                    used: usable,
                    usedAt: new Date(),
                },
            });
            yield prisma_1.default.point.update({
                where: {
                    id: pointRow.id,
                    user_id: user_id,
                },
                data: {
                    point: {
                        decrement: usable,
                    },
                },
            });
            remaining -= usable;
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
                where: { id },
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
                        voucher_id: param.voucher_id,
                        coupon_id: param.coupon_id,
                        voucher_amount: param.voucher_amount,
                        point_amount: param.point_amount,
                        coupon_amount: param.coupon_amount,
                        final_price: param.final_price,
                        payment_proof: param.payment_proof,
                        status: param.status,
                        updated_at: new Date(),
                    },
                });
                if (param.coupon_id &&
                    (param.status === "expired" || param.status === "cancel")) {
                    yield prisma.coupon_Usage.delete({
                        where: {
                            coupon_id: param.coupon_id,
                            user_id: param.user_id,
                            transaction_id: transaction.id,
                        },
                    });
                }
                if (param.point_amount &&
                    (param.status === "expired" || param.status === "cancel")) {
                    const point_usages = yield prisma.point_Usage.findMany({
                        where: {
                            transaction_id: transaction.id,
                        },
                    });
                    for (const point_usage of point_usages) {
                        yield prisma.point.update({
                            where: {
                                id: point_usage.id,
                            },
                            data: {
                                point: {
                                    increment: point_usage.used,
                                },
                            },
                        });
                    }
                }
                for (const detail of param.details) {
                    if (param.event_id &&
                        (param.status === "expired" || param.status === "cancel")) {
                        yield prisma.ticket.update({
                            where: { id: detail.ticket_id },
                            data: {
                                remaining: {
                                    decrement: detail.qty,
                                },
                            },
                        });
                    }
                    if (detail.ticket_id &&
                        (param.status === "expired" || param.status === "cancel")) {
                        yield prisma.event.update({
                            where: { id: param.event_id },
                            data: {
                                available_seats: {
                                    decrement: detail.qty,
                                },
                            },
                        });
                    }
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
function UploadPaymentProofService(param, id, file) {
    return __awaiter(this, void 0, void 0, function* () {
        if (file) {
            const uploadResult = yield (0, cloudinary_1.uploadImageToCloudinary)(file);
            param.payment_proof = uploadResult === null || uploadResult === void 0 ? void 0 : uploadResult.secure_url;
        }
        const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
            const transaction = yield prisma.transaction.update({
                where: { id },
                data: {
                    payment_proof: param.payment_proof,
                    status: "pending",
                },
            });
        }));
    });
}
function GetTransactionByUserIdService(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield prisma_1.default.transaction.findMany({
                where: { user_id },
                include: {
                    event: true,
                },
            });
            return transaction;
        }
        catch (err) {
            throw err;
        }
    });
}
function UpdateTransactionTransIdService(id, param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield prisma_1.default.transaction.update({
                where: { id },
                data: {
                    status: "approve",
                },
                include: {
                    user: true,
                },
            });
            if (transaction.user && transaction.user.email) {
                const subject = "Transaksi Anda Diterima";
                const html = `<p>Halo ${transaction.user.first_name || ""},<br>
        Transaksi Anda dengan ID <b>${transaction.id}</b> telah <b>di-approve</b>.<br>
        Terima kasih telah menggunakan layanan kami!</p>`;
                // Kirim email (Ethereal)
                const previewUrl = yield (0, sendMailEtheral_1.sendMailEthereal)(transaction.user.email, subject, html);
                console.log("Preview Email URL:", previewUrl); // Bisa dicek di console
            }
            return transaction;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetTransactionByOrganizerIdService(organizerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transactions = yield prisma_1.default.transaction.findMany({
                where: {
                    event: {
                        organizer_id: organizerId, // Filter transaksi berdasarkan event yang dimiliki oleh organizer
                    },
                },
                include: {
                    user: {
                        select: {
                            first_name: true,
                            last_name: true,
                            email: true,
                        },
                    },
                    event: {
                        select: {
                            name: true,
                        },
                    },
                    detail: {
                        select: {
                            qty: true,
                            ticket: {
                                select: {
                                    type: true,
                                },
                            },
                        },
                    },
                },
            });
            // Jika transaksi ditemukan, format data transaksi
            const formattedTransactions = transactions.map((tx) => {
                var _a, _b, _c, _d, _e;
                // Menangani jika detail lebih dari satu, dan menggabungkan data detailnya
                const totalQuantity = tx.detail.reduce((acc, detail) => acc + detail.qty, 0);
                const ticketType = ((_a = tx.detail[0]) === null || _a === void 0 ? void 0 : _a.ticket.type) || "-"; // Ambil tipe tiket dari detail pertama
                return {
                    id: tx.id,
                    name: `${(_b = tx.user) === null || _b === void 0 ? void 0 : _b.first_name} ${(_c = tx.user) === null || _c === void 0 ? void 0 : _c.last_name}`,
                    email: (_d = tx.user) === null || _d === void 0 ? void 0 : _d.email,
                    event: (_e = tx.event) === null || _e === void 0 ? void 0 : _e.name,
                    ticketType,
                    quantity: totalQuantity,
                    paymentProof: tx.payment_proof,
                    status: tx.status,
                    createdAt: new Date(tx.created_at).toISOString(), // Format tanggal
                };
            });
            return formattedTransactions;
        }
        catch (err) {
            console.error("Error fetching transactions: ", err);
            throw new Error("Failed to fetch transactions");
        }
    });
}
