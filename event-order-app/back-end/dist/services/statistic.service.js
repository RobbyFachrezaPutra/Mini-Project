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
exports.GetTicketsSoldByEventCategoryIdService = GetTicketsSoldByEventCategoryIdService;
exports.GetMonthlyRevenueService = GetMonthlyRevenueService;
const prisma_1 = __importDefault(require("../lib/prisma"));
function GetTicketsSoldByEventCategoryIdService(organizerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Ambil semua kategori event
            const categories = yield prisma_1.default.event_Category.findMany({
                select: {
                    id: true,
                    name: true,
                },
            });
            // Untuk setiap kategori, hitung jumlah tiket terjual (sum qty di TransactionDetail)
            const results = yield Promise.all(categories.map((category) => __awaiter(this, void 0, void 0, function* () {
                const tickets = yield prisma_1.default.transactionDetail.aggregate({
                    _sum: {
                        qty: true,
                    },
                    where: {
                        transaction: {
                            status: "approve", // Pastikan status sesuai dengan transaksi sukses di database
                        },
                        ticket: {
                            event: {
                                category_id: category.id,
                                organizer_id: organizerId,
                            },
                        },
                    },
                });
                return {
                    event_category_id: category.id,
                    category_name: category.name,
                    tickets_sold: tickets._sum.qty || 0,
                };
            })));
            return results;
        }
        catch (error) {
            throw error;
        }
    });
}
function GetMonthlyRevenueService(organizerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentYear = new Date().getFullYear();
            const labels = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];
            // Inisialisasi array untuk revenue per bulan
            const monthlyRevenue = Array(12).fill(0);
            // Ambil data transaksi berdasarkan bulan untuk tahun ini dan organizerId
            const transactions = yield prisma_1.default.transaction.findMany({
                where: {
                    created_at: {
                        gte: new Date(`${currentYear}-01-01`), // Tahun ini
                        lt: new Date(`${currentYear + 1}-01-01`), // Sampai akhir tahun
                    },
                    status: "approve",
                    event: {
                        organizer_id: organizerId,
                    },
                },
                include: {
                    event: true,
                },
            });
            // Hitung total revenue per bulan
            transactions.forEach((transaction) => {
                const monthIndex = new Date(transaction.created_at).getMonth(); // Dapatkan bulan (0-11)
                monthlyRevenue[monthIndex] += transaction.final_price.toNumber(); // Tambah total transaksi ke bulan yang sesuai
            });
            // Kembalikan data dalam format yang cocok untuk chart
            return {
                labels, // Bulan-bulan
                data: monthlyRevenue, // Total revenue per bulan
            };
        }
        catch (error) {
            throw new Error("Error fetching monthly revenue data");
        }
    });
}
