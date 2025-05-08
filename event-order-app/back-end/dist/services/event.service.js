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
exports.CreateEventService = CreateEventService;
exports.GetEventService = GetEventService;
exports.GetAllEventService = GetAllEventService;
exports.UpdateEventService = UpdateEventService;
exports.DeleteEventService = DeleteEventService;
const prisma_1 = __importDefault(require("../lib/prisma"));
function CreateEventService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const event = yield prisma.event.create({
                    data: {
                        name: param.name,
                        description: param.description,
                        category_id: param.category_id,
                        location: param.location,
                        start_date: param.start_date,
                        end_date: param.end_date,
                        available_seats: param.available_seats,
                        banner_url: param.banner_url,
                        status: param.status,
                        created_at: new Date(),
                        updated_at: new Date(),
                        organizer_id: param.organizer_id,
                    },
                });
                return event;
            }));
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetAllEventService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const event = yield prisma_1.default.event.findMany({});
            return event;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetEventService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const event = yield prisma_1.default.event.findUnique({
                where: { id }
            });
            return event;
        }
        catch (err) {
            throw err;
        }
    });
}
function UpdateEventService(id, param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const event = yield prisma.event.update({
                    where: { id },
                    data: {
                        name: param.name,
                        description: param.description,
                        category_id: param.category_id,
                        location: param.location,
                        start_date: param.start_date,
                        end_date: param.end_date,
                        available_seats: param.available_seats,
                        banner_url: param.banner_url,
                        status: param.status,
                        updated_at: new Date()
                    },
                });
                return event;
            }));
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
function DeleteEventService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const user = yield prisma.event.delete({
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
