"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchedTravelerSchema = void 0;
var zod_1 = require("zod");
exports.MatchedTravelerSchema = zod_1.z.object({
    id: zod_1.z.number(),
    userId: zod_1.z.number(),
    recommendedTravelersId: zod_1.z.number(),
});
//# sourceMappingURL=travelmatch.types.js.map