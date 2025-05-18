"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const overview_controller_1 = require("../controllers/overview.controller");
const router = (0, express_1.Router)();
router.get("/:organizerId", overview_controller_1.GetOverviewStatisticController);
exports.default = router;
