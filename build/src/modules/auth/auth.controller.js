"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.AuthController = void 0;
var express_1 = require("express");
var auth_service_1 = __importDefault(require("./auth.service"));
var user_service_1 = __importDefault(require("../users/user.service"));
var meiliSearch_service_1 = __importDefault(require("../meiliSearch/meiliSearch.service"));
var user_types_1 = require("../users/user.types");
var AuthController = /** @class */ (function () {
    function AuthController() {
        var _this = this;
        this.authService = auth_service_1.default;
        this.userService = user_service_1.default;
        this.meilisearchService = meiliSearch_service_1.default;
        // eslint-disable-next-line consistent-return
        this.signUp = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var schemaValidation, _a, firstName, lastName, password, email, type, age, gender, location_1, expectedMateAge, expectedVisitingPlaces, travelLocationsPreference, genderPreference, religion, personQty, ridePreference, parsedExpectedMateAge, parsedExpectedVisitingPlaces, parsedTravelLocationsPreference, parsedGenderPreference, parsedRideInfo, userAttr, data, user, error_1, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schemaValidation = user_types_1.userSignUpSchema.safeParse(req.body);
                        if (!schemaValidation.success) return [3 /*break*/, 13];
                        _a = req.body, firstName = _a.firstName, lastName = _a.lastName, password = _a.password, email = _a.email, type = _a.type, age = _a.age, gender = _a.gender, location_1 = _a.location, expectedMateAge = _a.expectedMateAge, expectedVisitingPlaces = _a.expectedVisitingPlaces, travelLocationsPreference = _a.travelLocationsPreference, genderPreference = _a.genderPreference, religion = _a.religion, personQty = _a.personQty, ridePreference = _a.ridePreference;
                        parsedExpectedMateAge = JSON.parse(expectedMateAge);
                        parsedExpectedVisitingPlaces = JSON.parse(expectedVisitingPlaces);
                        parsedTravelLocationsPreference = JSON.parse(travelLocationsPreference);
                        parsedGenderPreference = JSON.parse(genderPreference);
                        parsedRideInfo = JSON.parse(ridePreference);
                        userAttr = [];
                        userAttr.push({ Name: 'email', Value: email });
                        userAttr.push({ Name: 'custom:type', Value: type });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 11, , 12]);
                        return [4 /*yield*/, this.authService.signUpUser(email, password, userAttr)];
                    case 2:
                        data = _b.sent();
                        if (!!data.error) return [3 /*break*/, 9];
                        if (!(!!(data === null || data === void 0 ? void 0 : data.UserConfirmed) && !!(data === null || data === void 0 ? void 0 : data.UserSub))) return [3 /*break*/, 8];
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 7, , 8]);
                        return [4 /*yield*/, this.userService.addUser({
                                email: email,
                                firstName: firstName,
                                lastName: lastName,
                                type: type,
                                age: age,
                                gender: gender,
                                location: location_1,
                                expectedMateAge: expectedMateAge,
                                expectedVisitingPlaces: expectedVisitingPlaces,
                                travelLocationsPreference: travelLocationsPreference,
                                genderPreference: genderPreference,
                                religion: religion,
                                personQty: personQty,
                                ridePreference: ridePreference
                            })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.userService.getOneUser(email)];
                    case 5:
                        user = _b.sent();
                        return [4 /*yield*/, this.meilisearchService.addRecommendedTravelerIndex({
                                id: user === null || user === void 0 ? void 0 : user.id,
                                email: email,
                                firstName: firstName,
                                lastName: lastName,
                                type: type,
                                age: age,
                                gender: gender,
                                location: location_1,
                                expectedMateAge: parsedExpectedMateAge,
                                expectedVisitingPlaces: parsedExpectedVisitingPlaces,
                                travelLocationsPreference: parsedTravelLocationsPreference,
                                genderPreference: parsedGenderPreference,
                                status: 'active',
                                ridePreference: parsedRideInfo,
                                religion: religion,
                                personQty: personQty
                            })];
                    case 6:
                        _b.sent();
                        next();
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _b.sent();
                        res.status(500).json({
                            error: true,
                            message: error_1.message,
                        });
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        res.status(403).json(__assign({ error: true }, data));
                        _b.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_2 = _b.sent();
                        res.status(500).json({
                            error: true,
                            message: error_2.message,
                        });
                        return [3 /*break*/, 12];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (!schemaValidation.success) {
                            res.status(400).send({
                                error: true,
                                zodError: true,
                                errorFields: schemaValidation.error.errors.map(function (error) { return error.path[0]; }),
                            });
                        }
                        _b.label = 14;
                    case 14: return [2 /*return*/];
                }
            });
        }); };
        this.signIn = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, schemaValidation, email, password, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            email: req.body.email,
                            password: req.body.password,
                        };
                        schemaValidation = user_types_1.userSignInSchema.safeParse(body);
                        if (!schemaValidation.success) return [3 /*break*/, 5];
                        email = body.email, password = body.password;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.authService.signInUser(email, password)];
                    case 2:
                        data = _a.sent();
                        if (!data.error) {
                            res.status(200).json(__assign({ error: false }, data));
                        }
                        else {
                            res.status(403).json(__assign({ error: true }, data));
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        res.status(500).json({
                            error: true,
                            message: error_3.message,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (!schemaValidation.success) {
                            res.status(400).send({
                                error: true,
                                zodError: true,
                                errorFields: schemaValidation.error.errors.map(function (error) { return error.path[0]; }),
                            });
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.forgotPassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var schemaValidation, user, data, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schemaValidation = user_types_1.ForgotPasswordSchema.safeParse(req.body);
                        if (!schemaValidation.success) return [3 /*break*/, 8];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.userService.getOneUser(schemaValidation.data.email)];
                    case 2:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.authService.forgotPassword(schemaValidation.data.email)];
                    case 3:
                        data = _a.sent();
                        if (!data.error) {
                            res.status(200).send({
                                error: false,
                                data: data === null || data === void 0 ? void 0 : data.CodeDeliveryDetails,
                                message: 'Reset code send to your destination email',
                            });
                        }
                        else {
                            res.status(404).send({
                                error: true,
                                message: "cognito didn't able to recognize your email",
                            });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(404).send({
                            error: true,
                            message: "Email does not exists",
                        });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        res.status(404).send({
                            error: true,
                            message: error_4.message,
                        });
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        if (!schemaValidation.success) {
                            res.status(400).send({
                                error: true,
                                zodError: true,
                                message: 'schema validation error',
                            });
                        }
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.resetPassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var schemaValidation, user, data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schemaValidation = user_types_1.ResetPasswordSchema.safeParse(req.body);
                        if (!schemaValidation.success) return [3 /*break*/, 8];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.userService.getOneUser(schemaValidation.data.email)];
                    case 2:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.authService.resetPassword({
                                email: schemaValidation.data.email,
                                password: schemaValidation.data.password,
                                confirmationCode: schemaValidation.data.confirmationCode,
                            })];
                    case 3:
                        data = _a.sent();
                        if (!data.error) {
                            res.status(200).send({
                                error: false,
                                message: 'Your password has been set successfully',
                            });
                        }
                        else {
                            res.status(404).send({
                                error: true,
                                message: data.message,
                            });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(404).send({
                            error: true,
                            message: 'Email does not exists',
                        });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_5 = _a.sent();
                        res.status(404).send({
                            error: true,
                            message: error_5.message,
                        });
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        if (!schemaValidation.success) {
                            res.status(400).send({
                                error: true,
                                zodError: true,
                                message: 'schema validation error',
                                errorFields: schemaValidation.error.errors.map(function (error) { return error.path[0]; }),
                            });
                        }
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.router = (0, express_1.Router)();
        this.routes();
    }
    AuthController.prototype.routes = function () {
        this.router.post('/signUp', this.signUp, this.signIn);
        this.router.post('/signIn', this.signIn);
        this.router.post('/forgotPassword', this.forgotPassword);
        this.router.post('/resetPassword', this.resetPassword);
        return this.router;
    };
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map