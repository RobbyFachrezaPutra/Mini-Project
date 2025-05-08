"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventCategorySchema = void 0;
const zod_1 = require("zod");
exports.eventCategorySchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Category name is required"),
});
