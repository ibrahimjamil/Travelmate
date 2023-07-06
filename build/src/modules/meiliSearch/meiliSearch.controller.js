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
exports.MeiliSearchController = void 0;
var express_1 = require("express");
var meiliSearch_service_1 = __importDefault(require("./meiliSearch.service"));
var MeiliSearchController = /** @class */ (function () {
    function MeiliSearchController() {
        var _this = this;
        this.meiliSearchService = meiliSearch_service_1.default;
        this.searchTravelers = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, pageNo, pageSize, query, travelerLocation, travelerGender, travelerStatus, toTravelPlaces, minimumQuantity, religion, ridePreference, filterParams, searchResult, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, pageNo = _a.pageNo, pageSize = _a.pageSize, query = _a.query, travelerLocation = _a.travelerLocation, travelerGender = _a.travelerGender, travelerStatus = _a.travelerStatus, toTravelPlaces = _a.toTravelPlaces, minimumQuantity = _a.minimumQuantity, religion = _a.religion, ridePreference = _a.ridePreference;
                        filterParams = {
                            travelerLocation: JSON.parse(String(travelerLocation)),
                            travelerGender: JSON.parse(String(travelerGender)),
                            toTravelPlaces: JSON.parse(String(toTravelPlaces)),
                            ridePreference: JSON.parse(String(ridePreference)),
                            minimumQuantity: minimumQuantity,
                            travelerStatus: travelerStatus,
                            religion: religion,
                        };
                        return [4 /*yield*/, this.meiliSearchService
                                .searchRecommendedTravelers(String(query), filterParams, Number(pageSize), Number(pageNo))];
                    case 1:
                        searchResult = _b.sent();
                        res.status(200).send(searchResult);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        res.status(500).send({
                            error: true,
                            message: error_1.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.router = (0, express_1.Router)();
        this.routes();
    }
    MeiliSearchController.prototype.routes = function () {
        this.router.get('/search', this.searchTravelers);
        return this.router;
    };
    return MeiliSearchController;
}());
exports.MeiliSearchController = MeiliSearchController;
//# sourceMappingURL=meiliSearch.controller.js.map