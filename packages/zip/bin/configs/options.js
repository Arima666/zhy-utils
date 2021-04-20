"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const index_1 = require("./index");
const Options = {
    path: new commander_1.default.Option('-p, --path [path]', '压缩目标相对路径'),
    encrypt: new commander_1.default.Option('-e, --encrypt', '是否加密'),
    encryptionMethod: new commander_1.default.Option('-m, --encryption-method', '加密格式').choices(index_1.ENCRYPTIONMETHOD),
    compressLevel: new commander_1.default.Option('-l, --compress-level [level]', '压缩的等级').choices(index_1.COMPRESS_LEVEL),
    name: new commander_1.default.Option('-n, --name [name]', '压缩文件名字'),
    firstDirName: new commander_1.default.Option('-f, --first-dir-name [dir]', '压缩文件首层文件夹名字'),
    password: new commander_1.default.Option('-p, --password [password]', '压缩密码'),
    destPath: new commander_1.default.Option('-d, --dest-path', '是否生成根目录')
};
exports.default = Options;
//# sourceMappingURL=options.js.map