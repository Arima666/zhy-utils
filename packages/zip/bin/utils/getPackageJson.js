"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function getPackageJson() {
    const PackageJson = JSON.parse(fs_1.readFileSync(path_1.default.resolve(__dirname + '../../../package.json'), 'utf-8'));
    return PackageJson;
}
exports.default = getPackageJson;
//# sourceMappingURL=getPackageJson.js.map