"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
/* we need to initialize dot env before everything else */
/* eslint-disable @typescript-eslint/no-var-requires */
require('custom-env').env(true);
require('dotenv').config();
/* eslint-disable */
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var express_1 = __importDefault(require("express"));
var express_flash_1 = __importDefault(require("express-flash"));
var objection_1 = require("objection");
var express_session_1 = __importDefault(require("express-session"));
var Sentry = __importStar(require("@sentry/node"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var Tracing = __importStar(require("@sentry/tracing"));
var appConfig_1 = __importDefault(require("./config/appConfig"));
var http_1 = require("http");
var knexConnection_1 = __importDefault(require("../knexConnection"));
var logger_1 = require("./utils/logger");
var http_terminator_1 = require("http-terminator");
var routes_1 = require("./routes/routes");
var handleError_1 = __importStar(require("./lib/errors/handleError"));
var socket_1 = __importDefault(require("./socket"));
var socket_io_1 = require("socket.io");
var search_1 = require("./lib/search");
/* eslint-enable */
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1.default)(); // init the application
        this.port = Number(appConfig_1.default.PORT);
        this.server = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.server, {
            cors: {
                origin: ["http://localhost:3000", "http://localhost:3001"]
            }
        });
        this.configuration();
        this.routes();
        this.errorHandling();
    }
    /**
     * Configure the server
     */
    Server.prototype.configuration = function () {
        var app = this.app;
        process.on('unhandledRejection', function (reason) {
            throw reason;
        });
        process.on('uncaughtException', function (error) {
            logger_1.logger.error('Handling uncaught exception...');
            (0, handleError_1.default)(error);
        });
        Sentry.init({
            dsn: appConfig_1.default.SENTRY_DNS,
            integrations: [
                new Sentry.Integrations.Http({ tracing: true }),
                new Tracing.Integrations.Express({ app: app }),
                new Tracing.Integrations.Postgres(),
            ],
            tracesSampleRate: 1.0,
        });
        this.app.use(Sentry.Handlers.requestHandler());
        this.app.use(Sentry.Handlers.tracingHandler());
        var transaction = Sentry.startTransaction({
            op: 'transaction',
            name: 'My Transaction',
        });
        Sentry.configureScope(function (scope) {
            scope.setSpan(transaction);
        });
        this.app.set('port', this.port);
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json({ limit: '1mb', type: 'application/json' }));
        this.app.use(express_1.default.raw({
            inflate: true,
            limit: '1mb',
            type: function () { return true; }, // this matches all content types
        }));
        this.app.use(logger_1.loggerHttp);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, express_session_1.default)({
            secret: appConfig_1.default.SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
        }));
        this.app.use((0, express_flash_1.default)());
        this.app.use((0, cors_1.default)());
        objection_1.Model.knex(knexConnection_1.default[appConfig_1.default.ENV || 'dev']);
    };
    /**
     * Configure the routes
     */
    Server.prototype.routes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                routes_1.noAuthRoutes.forEach(function (route) {
                    _this.app.use("/api".concat(route.path), route.middleware, route.action);
                });
                routes_1.AppRoutes.forEach(function (route) {
                    _this.app.use("/api".concat(route.path), route.middleware, route.action);
                });
                return [2 /*return*/];
            });
        });
    };
    Server.prototype.errorHandling = function () {
        this.app.use(Sentry.Handlers.errorHandler({
            shouldHandleError: function () {
                return true;
            },
        }));
        this.app.use(handleError_1.handleErrorMiddleware);
    };
    Object.defineProperty(Server.prototype, "address", {
        get: function () {
            if (!this.server)
                return null;
            return this.server.address();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * start the server
     */
    Server.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.server.listen(this.app.get('port'), function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                logger_1.logger.info("Server listening ".concat(this.app.get('port') || 'random', " port."));
                                (0, socket_1.default)({ io: this.io });
                                // await deInitialize();
                                return [4 /*yield*/, (0, search_1.initialize)()];
                            case 1:
                                // await deInitialize();
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    Server.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var server, httpTerminator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        server = this.server;
                        if (!server)
                            return [2 /*return*/];
                        httpTerminator = (0, http_terminator_1.createHttpTerminator)({ server: server });
                        return [4 /*yield*/, httpTerminator.terminate()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Server;
}());
var server = new Server();
server.start();
exports.default = server;
//# sourceMappingURL=server.js.map