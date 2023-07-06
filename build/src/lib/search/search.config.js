"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.multiIndexAttributes = void 0;
exports.multiIndexAttributes = [];
exports.config = {
    indexes: [
        {
            name: 'travelmateRecommenders',
            primaryKey: 'id',
            config: {
                filterableAttributes: [
                    'expectedMateAge',
                    'expectedVisitingPlaces',
                    'travelLocationsPreference',
                    'genderPreference',
                    'travelerStatus',
                    'location',
                    'status',
                    'gender',
                    'religion',
                    'ridePreference',
                    'personQty'
                ],
                searchableAttributes: [
                    'id',
                    'firstName',
                    'lastName',
                    'age',
                    'email',
                    'gender',
                    'location',
                    'status',
                    'religion',
                    'ridePreference',
                    'personQty'
                ],
                pagination: { maxTotalHits: 300000 },
            },
        },
    ],
};
//# sourceMappingURL=search.config.js.map