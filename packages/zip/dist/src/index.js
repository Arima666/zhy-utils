"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var jszip_1 = __importDefault(require("jszip"));
var commander_1 = require("commander");
var package_json_1 = require("../package.json");
var configs_1 = require("./configs");
var options_1 = __importDefault(require("./configs/options"));
var logger_1 = __importDefault(require("./utils/logger"));
var getConfiguration_1 = __importDefault(require("./utils/getConfiguration"));
var checkOptions_1 = __importDefault(require("./utils/checkOptions"));
var readFile_1 = __importDefault(require("./utils/readFile"));
var getDirNameFromPath_1 = __importDefault(require("./utils/getDirNameFromPath"));
var zip = new jszip_1.default();
var curPath = process.cwd();
function startZip(options) {
    return __awaiter(this, void 0, void 0, function () {
        var name, firstDirName, rets, targetPath, targetExists, targetStatus, targetName, zipFirstDir, zipFirstDir, file, content, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.default.info('压缩参数\n', JSON.stringify(options, null, 2));
                    name = options.name, firstDirName = options.firstDirName, rets = __rest(options, ["name", "firstDirName"]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, , 12]);
                    targetPath = path_1.default.resolve(process.cwd(), options.path);
                    targetExists = fs_1.existsSync(targetPath);
                    if (!targetExists) return [3, 9];
                    return [4, fs_1.promises.stat(targetPath)];
                case 2:
                    targetStatus = _a.sent();
                    targetName = getDirNameFromPath_1.default(targetPath);
                    if (!targetStatus.isDirectory()) return [3, 4];
                    zipFirstDir = zip.folder(firstDirName || targetName);
                    return [4, readFile_1.default(zipFirstDir, targetPath)];
                case 3:
                    _a.sent();
                    return [3, 6];
                case 4:
                    if (!targetStatus.isFile()) return [3, 6];
                    if (!firstDirName) return [3, 6];
                    zipFirstDir = zip.folder(firstDirName);
                    return [4, fs_1.promises.readFile(targetPath)];
                case 5:
                    file = _a.sent();
                    zipFirstDir.file(targetName, file);
                    _a.label = 6;
                case 6: return [4, zip.generateAsync(__assign(__assign({}, rets), { type: 'uint8array' }))];
                case 7:
                    content = _a.sent();
                    return [4, fs_1.promises.writeFile(curPath + "/" + name + ".zip", content, 'utf-8')];
                case 8:
                    _a.sent();
                    logger_1.default.success('生成压缩包成功');
                    return [3, 10];
                case 9:
                    console.warn('目标文件不存在', targetPath);
                    _a.label = 10;
                case 10: return [3, 12];
                case 11:
                    err_1 = _a.sent();
                    throw err_1;
                case 12: return [2];
            }
        });
    });
}
commander_1.program.version(package_json_1.version, '-v, --version', package_json_1.name + " \u7684\u7248\u672C");
Object.values(options_1.default).forEach(function (item) {
    commander_1.program.addOption(item);
});
commander_1.program.parse();
var cfg = __assign(__assign({}, getConfiguration_1.default(configs_1.Configuration)), commander_1.program.opts());
checkOptions_1.default.path(cfg.path);
Object.entries(cfg).forEach(function (_a) {
    var _b;
    var key = _a[0], val = _a[1];
    (_b = checkOptions_1.default[key]) === null || _b === void 0 ? void 0 : _b.call(checkOptions_1.default, val);
});
startZip(cfg)
    .then(function () {
    logger_1.default.success('执行完毕！');
})
    .catch(function (err) {
    logger_1.default.error('执行失败！', err);
});
//# sourceMappingURL=index.js.map