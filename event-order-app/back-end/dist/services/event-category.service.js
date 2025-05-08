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
exports.CreateEventCategoryService = CreateEventCategoryService;
exports.UpdateEventCategoryService = UpdateEventCategoryService;
exports.GetEventCategoryService = GetEventCategoryService;
exports.GetAllEventCategoryService = GetAllEventCategoryService;
const prisma_1 = __importDefault(require("../lib/prisma"));
function CreateEventCategoryService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const event_Category = yield prisma.event_Category.create({
                    data: {
                        name: param.name,
                        description: param.description,
                        created_at: new Date(),
                        updated_at: new Date(),
                        created_by_id: param.created_by_id
                    },
                });
                return event_Category;
            }));
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetAllEventCategoryService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const event_Category = yield prisma_1.default.event_Category.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    created_at: true,
                    updated_at: true
                }
            });
            return event_Category;
        }
        catch (err) {
            throw err;
        }
    });
}
function GetEventCategoryService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const event_Category = yield prisma_1.default.event_Category.findUnique({
                where: { id },
            });
            if (!event_Category) {
                throw new Error("Event category not found");
            }
            return event_Category;
        }
        catch (err) {
            throw err;
        }
    });
}
function UpdateEventCategoryService(id, param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const event_Category = yield prisma.event_Category.update({
                    where: { id },
                    data: {
                        name: param.name,
                        description: param.description,
                        updated_at: new Date()
                    },
                });
                return event_Category;
            }));
            return result;
        }
        catch (err) {
            throw err;
        }
    });
}
