"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = exports.noAuthRoutes = void 0;
var authMiddleware_1 = require("../middlewares/authMiddleware");
var auth_controller_1 = require("../modules/auth/auth.controller");
var meiliSearch_controller_1 = require("../modules/meiliSearch/meiliSearch.controller");
var payment_controller_1 = require("../modules/payment/payment.controller");
var travelmatch_controller_1 = require("../modules/traveler_match/travelmatch.controller");
var user_controller_1 = require("../modules/users/user.controller");
var userController = new user_controller_1.UserController();
var authController = new auth_controller_1.AuthController();
var meilisearchController = new meiliSearch_controller_1.MeiliSearchController();
var travelMatchController = new travelmatch_controller_1.TravelMatchController();
exports.noAuthRoutes = [
    {
        path: '/nats-test/',
        middleware: [],
        action: function () {
        },
    },
    {
        path: '/auth/',
        middleware: [],
        action: authController.routes(),
    },
    {
        path: '/payment/',
        middleware: [],
        action: new payment_controller_1.PaymentController().routes(),
    }
];
exports.AppRoutes = [
    {
        path: '/user/',
        middleware: [authMiddleware_1.setUpPem, authMiddleware_1.verifyAccessToken],
        action: userController.routes(),
    },
    {
        path: '/matchTraveler/',
        middleware: [authMiddleware_1.setUpPem, authMiddleware_1.verifyAccessToken],
        action: travelMatchController.routes(),
    },
    {
        path: '/travelerRecommendations/',
        middleware: [authMiddleware_1.setUpPem, authMiddleware_1.verifyAccessToken],
        action: meilisearchController.routes(),
    }
];
//# sourceMappingURL=routes.js.map