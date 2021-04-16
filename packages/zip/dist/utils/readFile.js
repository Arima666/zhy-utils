"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function readFile(_zip, _path) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield fs_1.promises.readdir(_path);
        for (let i = 0; i < files.length; i++) {
            const filePath = `${_path}/${files[i]}`;
            const fileStatus = yield fs_1.promises.stat(filePath);
            if (fileStatus.isDirectory()) {
                const dirList = _zip.folder(files[i]);
                yield readFile(dirList, filePath);
            }
            else {
                const file = yield fs_1.promises.readFile(filePath);
                _zip.file(files[i], file);
            }
        }
    });
}
exports.default = readFile;
//# sourceMappingURL=readFile.js.map