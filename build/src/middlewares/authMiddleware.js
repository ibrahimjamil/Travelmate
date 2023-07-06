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
exports.setUpPem = exports.verifyIdToken = exports.verifyAccessToken = void 0;
var axios_1 = __importDefault(require("axios"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwk_to_pem_1 = __importDefault(require("jwk-to-pem"));
var appConfig_1 = __importDefault(require("../config/appConfig"));
var pems = {};
// eslint-disable-next-line consistent-return
var verifyAccessToken = function (req, res, next) {
    var _a;
    var token = (_a = req === null || req === void 0 ? void 0 : req.header('authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res === null || res === void 0 ? void 0 : res.status(401).json({
            error: true,
            message: 'not receive access token',
        });
    }
    var decodedJwt = jsonwebtoken_1.default.decode(token, { complete: true });
    if (decodedJwt === null) {
        return res.status(401).json({
            error: true,
            message: 'not able to decode access token',
        });
    }
    var kid = decodedJwt.header.kid;
    var pem = pems[kid];
    if (!pem) {
        return res.status(401).json({
            error: true,
            message: 'pem kid not match with decoded token',
        });
    }
    jsonwebtoken_1.default.verify(token, pem, function (err) {
        if (err) {
            res.status(401).json({
                error: true,
                tokenExpired: true,
                message: 'verification of token error',
            });
        }
        else {
            next();
        }
    });
};
exports.verifyAccessToken = verifyAccessToken;
// eslint-disable-next-line consistent-return
var verifyIdToken = function (req, res, next) {
    var token = req === null || req === void 0 ? void 0 : req.header('idToken');
    if (!token) {
        return res === null || res === void 0 ? void 0 : res.status(401).json({
            error: true,
            message: 'not receive id token',
        });
    }
    var decodedJwt = jsonwebtoken_1.default.decode(token, { complete: true });
    if (decodedJwt === null) {
        return res.status(401).json({
            error: true,
            message: 'not able to decode id token',
        });
    }
    req.user = decodedJwt.payload;
    next();
};
exports.verifyIdToken = verifyIdToken;
var setUpPem = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var URL, response, data, keys, i, keyId, modulus, exponent, keyType, jwk, pem, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                URL = "https://cognito-idp.".concat(appConfig_1.default.AWS_REGION, ".amazonaws.com/").concat(appConfig_1.default.AWS_COGNITO_USER_POOL_ID, "/.well-known/jwks.json");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, axios_1.default.get(URL)];
            case 2:
                response = _a.sent();
                if (response.status !== 200) {
                    throw new Error('request not successful');
                }
                return [4 /*yield*/, response.data];
            case 3:
                data = _a.sent();
                keys = data.keys;
                for (i = 0; i < keys.length; i++) {
                    keyId = keys[i].kid;
                    modulus = keys[i].n;
                    exponent = keys[i].e;
                    keyType = keys[i].kty;
                    jwk = { kty: keyType, n: modulus, e: exponent };
                    pem = (0, jwk_to_pem_1.default)(jwk);
                    pems[keyId] = pem;
                }
                next();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                res.status(401).send({
                    error: true,
                    message: "did'\t get pem",
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.setUpPem = setUpPem;
//# sourceMappingURL=authMiddleware.js.map