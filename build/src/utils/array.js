"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunk = exports.removeEmptyAndDedupe = exports.removeEmpty = exports.dedupe = void 0;
/**
 * Removes duplicate values from an array
 * @param array Array to dedupe
 * @internal
 */
var dedupe = function (array) { return Array.from(new Set(array)); };
exports.dedupe = dedupe;
/**
 * Removes undefiend and null values from an array
 * @remarks Does not remove empty strings
 * @param array Array to remove empty values
 * @internal
 */
var removeEmpty = function (array) {
    return array.filter(function (value) { return value !== null && value !== undefined; });
};
exports.removeEmpty = removeEmpty;
/**
 * Removes duplicate and empty values from an array
 * @param array Array to remove empty and duplicate values
 * @internal
 */
var removeEmptyAndDedupe = function (array) {
    var noEmptyValues = (0, exports.removeEmpty)(array);
    return (0, exports.dedupe)(noEmptyValues);
};
exports.removeEmptyAndDedupe = removeEmptyAndDedupe;
/**
 * Chunks a single array into multiple arrays
 * @param array Array to dedupe
 * @param chunkSize Size of each chunk
 * @internal
 */
var chunk = function (array, chunkSize) {
    if (chunkSize === void 0) { chunkSize = 100; }
    var chunks = [];
    for (var i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
};
exports.chunk = chunk;
//# sourceMappingURL=array.js.map