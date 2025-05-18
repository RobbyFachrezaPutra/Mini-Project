"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const point_controller_1 = require("../controllers/point.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/by-user/:user_id", auth_middleware_1.VerifyToken, point_controller_1.GetPointByUserIdController);
exports.default = router;
