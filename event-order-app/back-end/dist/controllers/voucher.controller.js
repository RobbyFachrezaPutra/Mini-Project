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
exports.CreateVoucherController = CreateVoucherController;
exports.GetVoucherController = GetVoucherController;
exports.GetAllVoucherController = GetAllVoucherController;
exports.UpdateVoucherController = UpdateVoucherController;
exports.DeleteVoucherController = DeleteVoucherController;
exports.GetVoucherByEventIdController = GetVoucherByEventIdController;
const voucher_service_1 = require("../services/voucher.service");
function CreateVoucherController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, voucher_service_1.CreateVoucherService)(req.body);
            res.status(200).send({
                message: "Voucher successfully saved ",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetAllVoucherController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, voucher_service_1.GetAllVoucherService)();
            res.status(200).send({
                message: "Get All Voucher",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetVoucherController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, voucher_service_1.GetVoucherService)(Number(req.params.id));
            res.status(200).send({
                message: `Get Voucher with id ${req.params.id}`,
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function UpdateVoucherController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, voucher_service_1.UpdateVoucherService)(Number(req.params.id), req.body);
            res.status(200).send({
                message: "Voucher successfully updated",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function DeleteVoucherController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, voucher_service_1.DeleteVoucherService)(Number(req.params.id));
            res.status(200).send({
                message: "Voucher successfully deleted",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetVoucherByEventIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, voucher_service_1.GetVoucherByEventIdService)(Number(req.params.event_id));
            res.status(200).send({
                message: `Get Voucher with event id ${req.params.event_id}`,
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
