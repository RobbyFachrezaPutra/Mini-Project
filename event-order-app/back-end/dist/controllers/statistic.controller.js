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
exports.GetMonthlyRevenueController = GetMonthlyRevenueController;
exports.GetTicketsSoldByEventCategoryController = GetTicketsSoldByEventCategoryController;
const statistic_service_1 = require("../services/statistic.service");
function GetTicketsSoldByEventCategoryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Ambil organizerId dari user yang sudah login
            const organizerId = Number(req.params.organizerId);
            if (!organizerId) {
                res.status(400).json({ message: "Organizer ID is required" });
                return;
            }
            const data = yield (0, statistic_service_1.GetTicketsSoldByEventCategoryIdService)(organizerId);
            res.status(200).send({
                message: "Get ticket by category successfully",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetMonthlyRevenueController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const organizerId = Number(req.params.organizerId);
            if (!organizerId) {
                res.status(400).json({ message: "Organizer ID is required" });
                return;
            }
            const data = yield (0, statistic_service_1.GetMonthlyRevenueService)(organizerId);
            res.status(200).send({
                message: "Monthly revenue data fetched successfully",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
