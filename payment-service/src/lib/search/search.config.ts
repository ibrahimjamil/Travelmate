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
  'variants.color',
  'variants.sizeName',
  'variants.sizeSymbol',
  'variants.vendorProductVariants.vendorColorName',
  'variants.vendorProductVariants.vendorStyleName',
];

export const config: SearchConfig = {
  indexes: [
    {
      name: 'productVariants',
      primaryKey: 'id',
      config: {
        filterableAttributes: [
          'id',
          'gtin',
          'stock',
          'productColor.name',
          'productColor.names',
          'productSize.name',
          'productSize.symbol',
          'productStyle.styleName',
          'productStyle.vendorDescription',
          'productStyle.keywords',
          'productStyle.description',
          'productStyle.descriptions',
          'productStyle.keywordList',
          'productStyle.categories',
          'productStyle.brandName',
          'productStyle.categoryName',
          'vendorProductVariant.vendorColorName',
          'vendorProductVariant.vendorSizeName',
        ],
        searchableAttributes: [
          'productStyle.styleName',
          'productStyle.vendorDescription',
          'productStyle.keywords',
          'productStyle.description',
          'productStyle.categories',
          'productStyle.categoryName',
          'productStyle.brandName',
          'productColor.name',
          'productSize.name',
          'productSize.symbol',
          'vendorProductVariant.vendorColorName',
          'vendorProductVariant.vendorSizeName',
        ],
        pagination: { maxTotalHits: 300000 },
      },
    },
  ],
};
