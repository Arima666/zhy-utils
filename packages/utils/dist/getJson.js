"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const logger_1 = __importDefault(require("./logger"));
function getJson(filePath) {
    const targetPath = typeof filePath === 'string' ? filePath : path_1.resolve(...filePath);
    try {
        const JsonObj = JSON.parse(fs_1.readFileSync(targetPath, 'utf-8'));
        return JsonObj;
    }
    catch (err) {
        logger_1.default.error(`读取Json发生错误，目标文件路径：${targetPath}`);
        process.exit();
    }
}
exports.default = getJson;
//# sourceMappingURL=getJson.js.map