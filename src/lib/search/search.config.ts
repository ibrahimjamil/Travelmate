export type SearchIndexConfig = {
  name: string;
  primaryKey?: string;
  config: {
    filterableAttributes: string[];
    searchableAttributes: string[];
    pagination: {
      maxTotalHits: number;
    }
  };
};

export type SearchConfig = {
  indexes: SearchIndexConfig[];
};

export const multiIndexAttributes = [
];

export const config: SearchConfig = {
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
          'gender'
        ],
        searchableAttributes: [
          'id',
          'firstName',
          'lastName',
          'age',
          'email',
          'gender',
          'location',
          'status'
        ],
        pagination: { maxTotalHits: 300000 },
      },
    },
  ],
};
