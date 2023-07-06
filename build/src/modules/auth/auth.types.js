"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPassword = void 0;
var zod_1 = require("zod");
exports.ResetPassword = zod_1.z.object({
    password: zod_1.z.string(),
    confirmationCode: zod_1.z.string(),
    email: zod_1.z.string(),
}).strict();
//# sourceMappingURL=auth.types.js.map