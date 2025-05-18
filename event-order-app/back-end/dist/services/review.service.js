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
exports.CreateReviewService = CreateReviewService;
exports.GetReviewByTransactionId = GetReviewByTransactionId;
const prisma_1 = __importDefault(require("../lib/prisma"));
function CreateReviewService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield prisma_1.default.transaction.findUnique({
                where: { id: param.transaction_id },
            });
            if (!transaction || transaction.status !== "approve") {
                throw new Error("Transaksi tidak ditemukan atau belum disetujui.");
            }
            const existing = yield prisma_1.default.review.findFirst({
                where: { transaction_id: param.transaction_id },
            });
            if (existing) {
                throw new Error("Review untuk transaksi ini sudah ada.");
            }
            const review = yield prisma_1.default.review.create({
                data: {
                    transaction_id: param.transaction_id,
                    rating: param.rating,
                    comment: param.comment,
                    created_at: new Date(),
                },
            });
            return review;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetReviewByTransactionId(transaction_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const review = yield prisma_1.default.review.findFirst({
                where: { transaction_id },
            });
            return review;
        }
        catch (err) {
            throw err;
        }
    });
}
