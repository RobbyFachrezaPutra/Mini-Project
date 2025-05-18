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
exports.CreateReviewController = CreateReviewController;
exports.GetReviewByTransactionController = GetReviewByTransactionController;
const review_service_1 = require("../services/review.service");
function CreateReviewController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, review_service_1.CreateReviewService)(req.body);
            res
                .status(201)
                .json({ message: "Review berhasil ditambahkan", data: result });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetReviewByTransactionController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.transaction_id);
            const result = yield (0, review_service_1.GetReviewByTransactionId)(id);
            res.status(200).json({ data: result });
        }
        catch (err) {
            next(err);
        }
    });
}
