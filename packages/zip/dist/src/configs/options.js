"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var index_1 = require("./index");
var Options = {
    path: new commander_1.default.Option('-p, --path [path]', '压缩目标相对路径'),
    compression: new commander_1.default.Option('-c, --compression [type]', '压缩类型，STORE（不压缩）、DEFLATE（压缩）').choices(index_1.COMPRESSION),
    compressLevel: new commander_1.default.Option('-l, --compress-level [level]', '压缩的等级').choices(index_1.COMPRESS_LEVEL),
    mimeType: new commander_1.default.Option('-m, --mime-type [zip]', '压缩文件后缀名'),
    platform: new commander_1.default.Option('-p, --platform [platform]', '使用平台').choices(index_1.PLATFORM),
    name: new commander_1.default.Option('-n, --name [name]', '压缩文件名字'),
    firstDirName: new commander_1.default.Option('-f, --first-dir-name [dir]', '压缩文件首层文件夹名字')
};
exports.default = Options;
//# sourceMappingURL=options.js.map