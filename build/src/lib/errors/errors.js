"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationError = exports.notFoundError = exports.nonexistantFieldError = exports.emptyReqBodyError = exports.errorArray = void 0;
var AppError_1 = __importDefault(require("./AppError"));
var errorArray = function (errArray) {
    var errData = errArray.reduce(function (acc, err) {
        var httpCode = err.httpCode > acc.httpCode ? err.httpCode : acc.httpCode;
        var isOperational = !(acc.isOperational && !err.isOperational);
        var descriptions = "".concat(acc.descriptions, "\n\n").concat(err.description);
        var messages = "".concat(acc.messages, "\n\n").concat(err.message, "\n").concat(err.stack);
        return {
            httpCode: httpCode,
            isOperational: isOperational,
            descriptions: descriptions,
            messages: messages,
        };
    }, {
        httpCode: 400,
        isOperational: true,
        descriptions: '',
        messages: '',
    });
    var httpCode = errData.httpCode, isOperational = errData.isOperational, messages = errData.messages;
    return new AppError_1.default('Multiple Errors Encountered', "The following errors have been encountered: ".concat(messages), httpCode, isOperational);
};
exports.errorArray = errorArray;
var emptyReqBodyError = function () {
    return new AppError_1.default('Validation Error', 'Request body is empty or only references fields that do not exist', 400, true);
};
exports.emptyReqBodyError = emptyReqBodyError;
var nonexistantFieldError = function () {
    return new AppError_1.default('Validation Error', 'Request references fields that do not exist', 400, true);
};
exports.nonexistantFieldError = nonexistantFieldError;
var notFoundError = function () {
    return new AppError_1.default('Not Found Error', 'Could not find the resource specified', 404, true);
};
exports.notFoundError = notFoundError;
var validationError = function (description) {
    return new AppError_1.default('Data Validation Error', description, 400, true);
};
exports.validationError = validationError;
//# sourceMappingURL=errors.js.map