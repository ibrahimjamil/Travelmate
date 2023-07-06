"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStyleNameKey = exports.getStockKey = exports.STYLENAME_PREFIX_REDIS = exports.STOCK_PREFIX_REDIS = void 0;
exports.STOCK_PREFIX_REDIS = 'stock_';
exports.STYLENAME_PREFIX_REDIS = 'styleName_';
function getStockKey(vendorProductVariantsId) {
    return exports.STOCK_PREFIX_REDIS + vendorProductVariantsId;
}
exports.getStockKey = getStockKey;
function getStyleNameKey(vendorProductStyleId) {
    return exports.STYLENAME_PREFIX_REDIS + vendorProductStyleId;
}
exports.getStyleNameKey = getStyleNameKey;
//# sourceMappingURL=redis.js.map