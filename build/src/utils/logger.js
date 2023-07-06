"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerHttp = exports.logger = void 0;
var pino_1 = __importDefault(require("pino"));
var pino_http_1 = __importDefault(require("pino-http"));
exports.logger = (0, pino_1.default)({
    transport: {
        target: 'pino-pretty',
    },
    options: {
        colorize: true,
    },
});
exports.loggerHttp = (0, pino_http_1.default)();
//# sourceMappingURL=logger.js.map