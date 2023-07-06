"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteUserSchema = exports.ResetPasswordSchema = exports.ForgotPasswordSchema = exports.userSignInSchema = exports.userSignUpSchema = exports.UserSchema = void 0;
var zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.number(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    password: zod_1.z.string(),
    email: zod_1.z.string().email(),
    type: zod_1.z.enum(['admin', 'noice']).optional(),
    age: zod_1.z.string(),
    gender: zod_1.z.string(),
    location: zod_1.z.string()
});
exports.userSignUpSchema = zod_1.z.object({
    firstName: zod_1.z.string().nonempty('firstName field is required'),
    lastName: zod_1.z.string().nonempty('lastName field is required'),
    password: zod_1.z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    email: zod_1.z.string().nonempty('Email field is required').email(),
    type: zod_1.z.string(),
    age: zod_1.z.string(),
    gender: zod_1.z.string(),
    location: zod_1.z.string()
});
exports.userSignInSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.ForgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().nonempty('Email field is required').email(),
}).strict();
exports.ResetPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().nonempty('Email field is required').email(),
    password: zod_1.z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    confirmationCode: zod_1.z.string(),
}).strict();
exports.inviteUserSchema = zod_1.z.object({
    email: zod_1.z.string().nonempty('Email field is required').email(),
});
//# sourceMappingURL=user.types.js.map