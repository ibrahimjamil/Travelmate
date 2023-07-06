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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knexConnection_1 = __importDefault(require("../knexConnection"));
var logger_1 = require("./utils/logger");
function socket(_a) {
    var _this = this;
    var io = _a.io;
    logger_1.logger.info('socket-enabled');
    function getConversationId(userId1, userId2) {
        var sortedIds = [userId1, userId2].sort();
        return "".concat(sortedIds[0], "-").concat(sortedIds[1]);
    }
    // Socket.IO
    io.on("connection", function (socket) {
        logger_1.logger.info('connection established');
        // When a user joins a conversation
        socket.on("join conversation", function (_a) {
            var senderId = _a.senderId, receiverId = _a.receiverId;
            return __awaiter(_this, void 0, void 0, function () {
                var conversationId, messages;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            conversationId = getConversationId(senderId, receiverId);
                            socket.join(conversationId);
                            return [4 /*yield*/, knexConnection_1.default[process.env.NODE_ENV || 'local']("chat")
                                    .where("conversation_id", conversationId)
                                    .andWhere(function () {
                                    this.where("user_id", senderId).orWhere("user_id", receiverId);
                                })
                                    .andWhere(function () {
                                    this.where("recommended_travelers_id", senderId).orWhere("recommended_travelers_id", receiverId);
                                })
                                    .select("id", "user_id", "recommended_travelers_id", "message", "created_at")];
                        case 1:
                            messages = _b.sent();
                            // Send the message history to the client
                            socket.emit("message history", messages);
                            return [2 /*return*/];
                    }
                });
            });
        });
        // When a user sends a message
        socket.on("send message", function (data) { return __awaiter(_this, void 0, void 0, function () {
            var senderId, receiverId, conversationId, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        senderId = data.senderId, receiverId = data.receiverId;
                        conversationId = getConversationId(senderId, receiverId);
                        data.conversation_id = conversationId;
                        return [4 /*yield*/, knexConnection_1.default[process.env.NODE_ENV || 'local']("chat").insert({
                                conversation_id: conversationId,
                                user_id: senderId,
                                recommended_travelers_id: receiverId,
                                message: (data === null || data === void 0 ? void 0 : data.message) || '',
                            }).returning('*')];
                    case 1:
                        res = _a.sent();
                        console.log(res[0]);
                        io.to(conversationId).emit("receive message", res[0]);
                        console.log('send message');
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on("disconnect", function () {
            console.log("a user disconnected");
        });
    });
}
exports.default = socket;
//# sourceMappingURL=socket.js.map