"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("../controllers/review.controller");
const router = (0, express_1.Router)();
router.post("/", review_controller_1.CreateReviewController);
router.get("/:transaction_id", review_controller_1.GetReviewByTransactionController);
exports.default = router;
