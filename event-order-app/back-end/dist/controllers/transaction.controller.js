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
exports.CreateTransactionController = CreateTransactionController;
exports.GetTransactionController = GetTransactionController;
exports.GetAllTransactionController = GetAllTransactionController;
exports.UpdateTransactionController = UpdateTransactionController;
const transaction_service_1 = require("../services/transaction.service");
function CreateTransactionController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, transaction_service_1.CreateTransactionService)(req.body);
            res.status(200).send({
                message: "Transaction successfully saved ",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetAllTransactionController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, transaction_service_1.GetAllTransactionService)();
            res.status(200).send({
                message: "Get All Transaction",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetTransactionController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, transaction_service_1.GetTransactionService)(Number(req.params.id));
            res.status(200).send({
                message: `Get Transaction with id ${req.params.id}`,
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function UpdateTransactionController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, transaction_service_1.UpdateTransactionService)(Number(req.params.id), req.body);
            res.status(200).send({
                message: "Transaction successfully updated ",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
