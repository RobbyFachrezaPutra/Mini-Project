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
exports.UploadPaymentProofController = UploadPaymentProofController;
exports.GetTransactionByUserIdController = GetTransactionByUserIdController;
exports.GetTransactionByOrganizerIdController = GetTransactionByOrganizerIdController;
exports.UpdateTransactionTransIdSController = UpdateTransactionTransIdSController;
exports.UpdateTransactionRejectSController = UpdateTransactionRejectSController;
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
function GetTransactionByUserIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, transaction_service_1.GetTransactionByUserIdService)(Number(req.params.user_id));
            res.status(200).send({
                message: `Get Transaction with user id ${req.params.user_id}`,
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
function UploadPaymentProofController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const file = req.file;
            const data = yield (0, transaction_service_1.UploadPaymentProofService)(req.body, Number(req.params.id), file);
            res.status(200).send({
                message: "Event successfully saved ",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function UpdateTransactionTransIdSController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, transaction_service_1.UpdateTransactionTransIdService)(Number(req.params.id), req.body);
            res.status(200).send({
                message: "Event successfully updated ",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetTransactionByOrganizerIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Ambil organizer_id dari params
            const organizerId = Number(req.params.organizer_id);
            // Panggil service yang sesuai untuk mengambil transaksi berdasarkan organizer_id
            const formattedTransactions = yield (0, transaction_service_1.GetTransactionByOrganizerIdService)(organizerId);
            res.status(200).send({
                message: `Get Transactions for organizer with ID ${organizerId}`,
                data: formattedTransactions,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function UpdateTransactionRejectSController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, transaction_service_1.UpdateTransactionRejectService)(Number(req.params.id), req.body);
            res.status(200).send({
                message: "Event successfully updated ",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
