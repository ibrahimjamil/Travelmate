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
exports.updateIndexesIfRequired = exports.deInitialize = exports.updateIndexSettings = exports.initialize = exports.getTotalCountOfDoc = exports.getDocument = exports.deleteDocument = exports.deleteAllDocuments = exports.deleteIndex = exports.search = exports.update = exports.addOrUpdateMultiple = exports.add = exports.client = void 0;
var lodash_1 = __importDefault(require("lodash"));
var meilisearch_1 = require("meilisearch");
var appConfig_1 = __importDefault(require("../../config/appConfig"));
var logger_1 = require("../../utils/logger");
var search_config_1 = require("./search.config");
exports.client = new meilisearch_1.MeiliSearch({
    host: "http://".concat(appConfig_1.default.MEILI_HOST),
    apiKey: process.env.MEILI_MASTER_KEY,
});
var initIndex = function (index) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.client.createIndex(index.name, { primaryKey: index.primaryKey || 'id' })];
            case 1:
                _a.sent();
                return [4 /*yield*/, exports.client.index(index.name).updateSettings(index.config)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var add = function (index, documents, batchSize) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.client.index(index).addDocumentsInBatches(documents, batchSize)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.add = add;
var addOrUpdateMultiple = function (index, documents) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.client.index(index).updateDocumentsInBatches(documents)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.addOrUpdateMultiple = addOrUpdateMultiple;
var update = function (index, documents) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.client.index(index).updateDocuments(documents)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.update = update;
var search = function (index, searchParam, filter, limit, offset) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.client.index(index).search(searchParam, {
                    filter: filter,
                    limit: limit,
                    offset: offset,
                })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.search = search;
var deleteIndex = function (index) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.client.index(index).delete()];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.deleteIndex = deleteIndex;
var deleteAllDocuments = function (index) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.client.index(index).deleteAllDocuments()];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.deleteAllDocuments = deleteAllDocuments;
var deleteDocument = function (index, documentId) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.client.index(index).deleteDocument(documentId)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.deleteDocument = deleteDocument;
var getDocument = function (index, documentId) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.client.index(index).getDocument(documentId)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.getDocument = getDocument;
var getTotalCountOfDoc = function (index) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.client.index(index).getStats()];
            case 1: return [2 /*return*/, (_a.sent()).numberOfDocuments];
        }
    });
}); };
exports.getTotalCountOfDoc = getTotalCountOfDoc;
var initialize = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        search_config_1.config.indexes.forEach(function (index) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, initIndex(index)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.initialize = initialize;
var updateIndexSettings = function (index) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.client.index(index.name).updateSettings(index.config)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.updateIndexSettings = updateIndexSettings;
var deInitialize = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        search_config_1.config.indexes.forEach(function (index) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, exports.deleteIndex)(index.name)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.deInitialize = deInitialize;
var updateIndexesIfRequired = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // eslint-disable-next-line consistent-return
        search_config_1.config.indexes.forEach(function (index) { return __awaiter(void 0, void 0, void 0, function () {
            var name, indexConfig, existingSettings, isUpdateRequired, keys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = index.name, indexConfig = index.config;
                        return [4 /*yield*/, exports.client.index(name).getSettings()];
                    case 1:
                        existingSettings = _a.sent();
                        isUpdateRequired = false;
                        // Sorting to compare as it was automatically getting sorted alphabetically in meilisearch settings
                        indexConfig.filterableAttributes = indexConfig.filterableAttributes.sort(function (attr1, attr2) {
                            if (attr1 < attr2) {
                                return -1;
                            }
                            if (attr1 > attr2) {
                                return 1;
                            }
                            return 0;
                        });
                        keys = Object.keys(indexConfig);
                        isUpdateRequired = keys.some(function (key) { return (!lodash_1.default.isEqual(indexConfig[key], existingSettings[key])); });
                        if (!isUpdateRequired) return [3 /*break*/, 3];
                        logger_1.logger.info("Updating meilisearch settings for index = ".concat(name));
                        return [4 /*yield*/, (0, exports.updateIndexSettings)(index)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.updateIndexesIfRequired = updateIndexesIfRequired;
//# sourceMappingURL=index.js.map