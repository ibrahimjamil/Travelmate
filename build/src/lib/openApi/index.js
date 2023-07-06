"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDocumentation = exports.registry = void 0;
var zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var yaml_1 = require("yaml");
exports.registry = new zod_to_openapi_1.OpenAPIRegistry();
var generateOpenAPI = function () {
    var config = {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'My API',
            description: 'This is the API',
        },
        servers: [{ url: 'v1' }],
    };
    return new zod_to_openapi_1.OpenAPIGenerator(exports.registry.definitions).generateDocument(config);
};
var writeDocumentation = function () {
    var docs = generateOpenAPI();
    var fileContent = (0, yaml_1.stringify)(docs);
    (0, fs_1.writeFileSync)(path_1.default.join(__dirname, '/openapi-docs.yml'), fileContent, {
        encoding: 'utf-8',
    });
};
exports.writeDocumentation = writeDocumentation;
//# sourceMappingURL=index.js.map