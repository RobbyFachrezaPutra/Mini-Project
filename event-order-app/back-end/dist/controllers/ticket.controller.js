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
exports.CreateTicketController = CreateTicketController;
exports.GetTicketController = GetTicketController;
exports.GetAllTicketController = GetAllTicketController;
exports.UpdateTicketController = UpdateTicketController;
exports.DeleteTicketController = DeleteTicketController;
exports.GetTicketByEventIdController = GetTicketByEventIdController;
const ticket_service_1 = require("../services/ticket.service");
function CreateTicketController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, ticket_service_1.CreateTicketService)(req.body);
            res.status(200).send({
                message: "Ticket successfully saved ",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetAllTicketController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, ticket_service_1.GetAllTicketService)();
            res.status(200).send({
                message: "Get All Ticket",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetTicketController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, ticket_service_1.GetTicketService)(Number(req.params.id));
            res.status(200).send({
                message: `Get Ticket with id ${req.params.id}`,
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function UpdateTicketController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, ticket_service_1.UpdateTicketService)(Number(req.params.id), req.body);
            res.status(200).send({
                message: "Ticket successfully updated",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function DeleteTicketController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, ticket_service_1.DeleteTicketService)(Number(req.params.id));
            res.status(200).send({
                message: "Ticket successfully deleted",
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function GetTicketByEventIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, ticket_service_1.GetTicketByEventIdService)(Number(req.params.event_id));
            res.status(200).send({
                message: `Get Ticket with event id ${req.params.event_id}`,
                data,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
