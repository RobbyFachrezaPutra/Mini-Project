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
exports.CreateEventCategoryController = CreateEventCategoryController;
exports.GetEventCategoryController = GetEventCategoryController;
exports.GetAllEventCategoryController = GetAllEventCategoryController;
exports.UpdateEventCategoryController = UpdateEventCategoryController;
const event_category_service_1 = require("../services/event-category.service");
function CreateEventCategoryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, event_category_service_1.CreateEventCategoryService)(req.body);
            res.status(200).send({
                message: "Event category successfully saved ",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetEventCategoryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, event_category_service_1.GetEventCategoryService)(Number(req.params.id));
            res.status(200).send({
                message: "Get Event category",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetAllEventCategoryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, event_category_service_1.GetAllEventCategoryService)();
            res.status(200).send({
                message: "Get All Event category",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function UpdateEventCategoryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, event_category_service_1.UpdateEventCategoryService)(Number(req.params.id), req.body);
            res.status(200).send({
                message: "Event category successfully updated ",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
