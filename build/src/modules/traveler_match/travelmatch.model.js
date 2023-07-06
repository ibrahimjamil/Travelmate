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
exports.TravelMatch = void 0;
var objection_1 = require("objection");
var user_model_1 = require("../users/user.model");
// eslint-disable-next-line no-redeclare
var TravelMatch = /** @class */ (function (_super) {
    __extends(TravelMatch, _super);
    function TravelMatch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TravelMatch.relationMappings = function () {
        return {
            user: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: user_model_1.User,
                join: {
                    from: 'matched_traveler.userId',
                    to: 'user.id',
                },
            },
            recommendedTravelers: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: user_model_1.User,
                join: {
                    from: 'matched_traveler.recommendedTravelersId',
                    to: 'user.id',
                },
            }
        };
    };
    // Table name is the only required property.
    TravelMatch.tableName = 'matched_traveler';
    return TravelMatch;
}(objection_1.Model));
exports.TravelMatch = TravelMatch;
//# sourceMappingURL=travelmatch.model.js.map