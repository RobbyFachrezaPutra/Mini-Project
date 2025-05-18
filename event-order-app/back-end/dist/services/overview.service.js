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
exports.GetOverviewService = GetOverviewService;
const prisma_1 = __importDefault(require("../lib/prisma"));
function GetOverviewService(organizerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Total Events
            const total_events = yield prisma_1.default.event.count({
                where: {
                    organizer_id: organizerId,
                },
            });
            // Total Transactions (status: approved)
            const total_transactions = yield prisma_1.default.transaction.count({
                where: {
                    status: "approve",
                    event: {
                        organizer_id: organizerId,
                    },
                },
            });
            // Total Revenue (sum final_price, status: approved)
            const revenueAgg = yield prisma_1.default.transaction.aggregate({
                _sum: {
                    final_price: true,
                },
                where: {
                    status: "approve",
                    event: {
                        organizer_id: organizerId,
                    },
                },
            });
            return {
                total_events,
                total_transactions,
                total_revenue: revenueAgg._sum.final_price
                    ? Number(revenueAgg._sum.final_price)
                    : 0,
            };
        }
        catch (error) {
            throw error;
        }
    });
}
