"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDirNameFromPath(path) {
    var pathArr = path.split('\\');
    return pathArr[pathArr.length - 1];
}
exports.default = getDirNameFromPath;
//# sourceMappingURL=getDirNameFromPath.js.map