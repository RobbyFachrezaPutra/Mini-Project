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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTicketService = CreateTicketService;
exports.GetTicketService = GetTicketService;
exports.GetAllTicketService = GetAllTicketService;
exports.UpdateTicketService = UpdateTicketService;
exports.DeleteTicketService = DeleteTicketService;
const prisma_1 = __importDefault(require("../lib/prisma"));
function CreateTicketService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const Ticket = yield prisma.ticket.create({
                    data: {
                        name: param.name,
                        event_id: param.event_id,
                        type: param.type,
                        price: param.price,
                        quota: param.quota,
                        remaining: param.remaining,
                        sales_start: param.sales_start,
                        sales_end: param.sales_end,
                        created_at: new Date(),
                        updated_at: new Date(),
                        created_by_id: param.created_by_id
                    },
                });
                return Ticket;
            }));
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetAllTicketService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Ticket = yield prisma_1.default.ticket.findMany({});
            return Ticket;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetTicketService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Ticket = yield prisma_1.default.ticket.findUnique({
                where: { id }
            });
            return Ticket;
        }
        catch (err) {
            throw err;
        }
    });
}
function UpdateTicketService(id, param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const Ticket = yield prisma.ticket.update({
                    where: { id },
                    data: {
                        name: param.name,
                        event_id: param.event_id,
                        type: param.type,
                        price: param.price,
                        quota: param.quota,
                        remaining: param.remaining,
                        sales_start: param.sales_start,
                        sales_end: param.sales_end,
                        updated_at: new Date(),
                    },
                });
                return Ticket;
            }));
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
function DeleteTicketService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const user = yield prisma.ticket.delete({
                    where: { id }
                });
                return user;
            }));
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
