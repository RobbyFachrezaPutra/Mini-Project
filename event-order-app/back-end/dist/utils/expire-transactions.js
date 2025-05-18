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
exports.runtime = void 0;
exports.GET = GET;
const prisma_1 = __importDefault(require("../lib/prisma"));
exports.runtime = 'edge';
function GET() {
    return __awaiter(this, void 0, void 0, function* () {
        const expired = yield prisma_1.default.transaction.updateMany({
            where: {
                status: 'pending',
                created_at: {
                    lt: new Date(Date.now() - 2 * 60 * 60 * 1000), // lebih dari 2 jam lalu
                },
            },
            data: {
                status: 'expired',
            },
        });
        return Response.json({ message: 'Expired check done', expired });
    });
}
