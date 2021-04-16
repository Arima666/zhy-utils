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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const jszip_1 = __importDefault(require("jszip"));
const commander_1 = require("commander");
const utils_1 = __importDefault(require("@zhy/utils"));
const package_json_1 = require("../package.json");
const configs_1 = require("./configs");
const options_1 = __importDefault(require("./configs/options"));
const getConfiguration_1 = __importDefault(require("./utils/getConfiguration"));
const checkOptions_1 = __importDefault(require("./utils/checkOptions"));
const readFile_1 = __importDefault(require("./utils/readFile"));
const getDirNameFromPath_1 = __importDefault(require("./utils/getDirNameFromPath"));
const zip = new jszip_1.default();
const curPath = process.cwd();
function startZip(options) {
    return __awaiter(this, void 0, void 0, function* () {
        utils_1.default.info('压缩参数\n', JSON.stringify(options, null, 2));
        const { name, firstDirName } = options, rets = __rest(options, ["name", "firstDirName"]);
        try {
            const targetPath = path_1.default.resolve(process.cwd(), options.path);
            const targetExists = fs_1.existsSync(targetPath);
            if (targetExists) {
                const targetStatus = yield fs_1.promises.stat(targetPath);
                const targetName = getDirNameFromPath_1.default(targetPath);
                if (targetStatus.isDirectory()) {
                    const zipFirstDir = zip.folder(firstDirName || targetName);
                    yield readFile_1.default(zipFirstDir, targetPath);
                }
                else if (targetStatus.isFile()) {
                    const file = yield fs_1.promises.readFile(targetPath);
                    if (firstDirName) {
                        const zipFirstDir = zip.folder(firstDirName);
                        zipFirstDir.file(targetName, file);
                    }
                    else {
                        zip.file(targetName, file);
                    }
                }
                const content = yield zip.generateAsync(Object.assign(Object.assign({}, rets), { type: 'uint8array' }));
                yield fs_1.promises.writeFile(`${curPath}/${name}.zip`, content, 'utf-8');
                utils_1.default.success('生成压缩包成功');
            }
            else {
                console.warn('目标文件不存在', targetPath);
            }
        }
        catch (err) {
            throw err;
        }
    });
}
commander_1.program.version(package_json_1.version, '-v, --version', `${package_json_1.name} 的版本`);
Object.values(options_1.default).forEach(item => {
    commander_1.program.addOption(item);
});
commander_1.program.parse();
const cfg = Object.assign(Object.assign({}, getConfiguration_1.default(configs_1.Configuration)), commander_1.program.opts());
checkOptions_1.default.path(cfg.path);
Object.entries(cfg).forEach(([key, val]) => {
    var _a;
    (_a = checkOptions_1.default[key]) === null || _a === void 0 ? void 0 : _a.call(checkOptions_1.default, val);
});
startZip(cfg)
    .then(() => {
    utils_1.default.success('执行完毕！');
})
    .catch(err => {
    utils_1.default.error('执行失败！', err);
});
//# sourceMappingURL=index.js.map