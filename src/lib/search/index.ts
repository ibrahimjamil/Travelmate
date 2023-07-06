import _ from 'lodash';
import { MeiliSearch } from 'meilisearch';
import appConfig from '../../config/appConfig';
import { logger } from '../../utils/logger';
import { config, SearchIndexConfig } from './search.config';

export const client = new MeiliSearch({
  host: `http://${appConfig.MEILI_HOST}`,
  apiKey: process.env.MEILI_MASTER_KEY,
});

const initIndex = async (index: SearchIndexConfig) => {
  await client.createIndex(index.name, { primaryKey: index.primaryKey || 'id' });
  return await client.index(index.name).updateSettings(index.config);
};

export const add = async <T>(index: string, documents: T[], batchSize: number) => {
  const res = await client.index(index).addDocumentsInBatches(documents, batchSize);
  return res;
};

export const addOrUpdateMultiple = async (index: string, documents: any) => {
  const res = await client.index(index).updateDocumentsInBatches(documents);
  return res;
};

export const update = async (index: string, documents: Record<string, unknown>[]) => {
  const res = await client.index(index).updateDocuments(documents);
  return res;
};

export const search = async (
  index: string,
  searchParam: string,
  filter: any,
  limit: number,
  offset: number,
) => {
  const res = await client.index(index).search(searchParam, {
    filter,
    limit,
    offset,
  });
  return res;
};

export const deleteIndex = async (index: string) => {
  const res = await client.index(index).delete();
  return res;
};

export const deleteAllDocuments = async (index: string) => {
  const res = await client.index(index).deleteAllDocuments();
  return res;
};

export const deleteDocument = async (index: string, documentId: string | number) => {
  const res = await client.index(index).deleteDocument(documentId);
  return res;
};

export const getDocument = async (index: string, documentId: string | number) => {
  const res = await client.index(index).getDocument(documentId);
  return res;
};

export const getTotalCountOfDoc = async (index: string) => {
  return (await client.index(index).getStats()).numberOfDocuments;
};

export const initialize = async () => {
  config.indexes.forEach(async (index) => {
    await initIndex(index);
  });
  return;
}

export const updateIndexSettings = async (index: SearchIndexConfig) => {
  const res = await client.index(index.name).updateSettings(index.config);
  return res;
};

export const deInitialize = async () => {
  config.indexes.forEach(async (index) => {
    await deleteIndex(index.name);
  });
  return;
}

export const updateIndexesIfRequired = async () => {
  // eslint-disable-next-line consistent-return
  config.indexes.forEach(async (index) => {
    const { name, config: indexConfig } : any = index;
    const existingSettings: any = await client.index(name).getSettings();

    let isUpdateRequired = false;

    // Sorting to compare as it was automatically getting sorted alphabetically in meilisearch settings
    indexConfig.filterableAttributes = indexConfig.filterableAttributes.sort((attr1:string, attr2:string) => {
      if (attr1 < attr2) { return -1; }
      if (attr1 > attr2) { return 1; }
      return 0;
    })

    const keys = Object.keys(indexConfig);

    isUpdateRequired = keys.some((key: string) => (!_.isEqual(indexConfig[key], existingSettings[key])));

    if (isUpdateRequired) {
      logger.info(`Updating meilisearch settings for index = ${name}`);
      return await updateIndexSettings(index);
    }
  })
}
