"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBodyValidation = exports.validateInput = void 0;
var errors_1 = require("../lib/errors");
var validateInput = function (dataToValidate, schema) {
    var validation = schema.safeParse(dataToValidate);
    if (validation.success)
        return validation.data;
    throw (0, errors_1.validationError)(JSON.stringify(validation.error.format()));
};
exports.validateInput = validateInput;
var useBodyValidation = function (schema) {
    return function (req, res, next) {
        try {
            if (!req.body || Object.keys(req.body).length === 0 || req.body.length === 0) {
                throw (0, errors_1.emptyReqBodyError)();
            }
            req.body = (0, exports.validateInput)(req.body, schema);
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.useBodyValidation = useBodyValidation;
//# sourceMappingURL=validationMiddleware.js.map