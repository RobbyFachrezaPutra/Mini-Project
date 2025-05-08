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
exports.CreateCouponController = CreateCouponController;
exports.GetAllCouponController = GetAllCouponController;
exports.GetCouponController = GetCouponController;
exports.UpdateCouponController = UpdateCouponController;
exports.DeleteCouponController = DeleteCouponController;
const coupon_service_1 = require("../services/coupon.service");
function CreateCouponController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, coupon_service_1.CreateCouponService)(req.body);
            res.status(200).send({
                message: "Coupon successfully saved",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetAllCouponController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, coupon_service_1.GetAllCouponService)();
            res.status(200).send({
                message: "Get All Coupon",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetCouponController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, coupon_service_1.GetCouponService)(Number(req.params.id));
            res.status(200).send({
                message: `Get Coupon with id ${req.params.id}`,
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function UpdateCouponController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, coupon_service_1.UpdateCouponService)(Number(req.params.id), req.body);
            res.status(200).send({
                message: "Coupon successfully updated",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function DeleteCouponController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, coupon_service_1.DeleteCouponService)(Number(req.params.id));
            res.status(200).send({
                message: "Coupon successfully deleted",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
