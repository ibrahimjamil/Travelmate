import { OpenAPIGenerator, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { writeFileSync } from 'fs';
import path from 'path';
import { stringify as yamlStringify } from 'yaml';

export const registry = new OpenAPIRegistry();

const generateOpenAPI = () => {
  const config = {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'My API',
      description: 'This is the API',
    },
    servers: [{ url: 'v1' }],
  };

  return new OpenAPIGenerator(registry.definitions).generateDocument(config);
};

export const writeDocumentation = () => {
  const docs = generateOpenAPI();

  const fileContent = yamlStringify(docs);

  writeFileSync(path.join(__dirname, '/openapi-docs.yml'), fileContent, {
    encoding: 'utf-8',
  });
};
