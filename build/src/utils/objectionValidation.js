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
exports.ZodObjectionValidator = void 0;
var objection_1 = require("objection");
var ZodObjectionValidator = /** @class */ (function (_super) {
    __extends(ZodObjectionValidator, _super);
    function ZodObjectionValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZodObjectionValidator.prototype.validate = function (args) {
        var json = args.json, options = args.options, ctx = args.ctx;
        // eslint-disable-next-line prefer-destructuring
        var schema = ctx.schema;
        if (!schema)
            return json;
        var validatedJson = options.patch ? schema.partial().parse(json) : schema.parse(json);
        return validatedJson;
    };
    ZodObjectionValidator.prototype.beforeValidate = function (args) {
        var ctx = args.ctx;
        // Using ts-ignore to access static method - ongoing discussion here: https://github.com/microsoft/TypeScript/issues/3841#issuecomment-646214218
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ctx.schema = args.model.constructor.schema;
        return _super.prototype.beforeValidate.call(this, args);
    };
    ZodObjectionValidator.prototype.afterValidate = function (args) {
        return _super.prototype.afterValidate.call(this, args);
    };
    return ZodObjectionValidator;
}(objection_1.Validator));
exports.ZodObjectionValidator = ZodObjectionValidator;
//# sourceMappingURL=objectionValidation.js.map