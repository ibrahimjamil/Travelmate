"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowTimeStampsSchema = void 0;
var zod_1 = require("zod");
exports.RowTimeStampsSchema = {
    isDeleted: zod_1.z.boolean().optional(),
    createdAt: zod_1.z.union([zod_1.z.date(), zod_1.z.string()]).optional(),
    updatedAt: zod_1.z.union([zod_1.z.date(), zod_1.z.string()]).optional(),
};
//# sourceMappingURL=models.types.js.map