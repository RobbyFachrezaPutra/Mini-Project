"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statistic_controller_1 = require("../controllers/statistic.controller");
const router = (0, express_1.Router)();
router.get("/monthly-revenue/:organizerId", statistic_controller_1.GetMonthlyRevenueController);
router.get("/ticket-by-category/:organizerId", statistic_controller_1.GetTicketsSoldByEventCategoryController);
exports.default = router;
