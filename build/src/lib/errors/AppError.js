"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    /**
     * @param name The name of the error
     * @param description The external description of the error (displayed to client)
     * @param httpCode The http code of the error
     * @param isOperational If not operational, the server will restart
     * @param message An internal message describing the error in server logs only. Defaults to description
     * @internal
     */
    function AppError(name, description, httpCode, isOperational, message) {
        if (isOperational === void 0) { isOperational = false; }
        if (message === void 0) { message = undefined; }
        var _newTarget = this.constructor;
        var _this = _super.call(this, description) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype); // restore prototype chain
        if (Error.captureStackTrace)
            Error.captureStackTrace(_this);
        _this.message = "".concat(description || message).concat(description && message ? ' -- ' : '').concat(description && message ? message : '');
        _this.name = name || 'Unknown Error';
        _this.httpCode = httpCode || 500;
        _this.isOperational = isOperational;
        _this.description = description;
        return _this;
    }
    return AppError;
}(Error));
exports.default = AppError;
//# sourceMappingURL=AppError.js.map