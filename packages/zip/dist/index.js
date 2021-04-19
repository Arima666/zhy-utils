"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const archiver_1 = __importDefault(require("archiver"));
const commander_1 = require("commander");
const utils_1 = require("@zhy/utils");
const configs_1 = require("./configs");
const options_1 = __importDefault(require("./configs/options"));
const index_default_json_1 = __importDefault(require("./configs/index.default.json"));
const getDirNameFromPath_1 = __importDefault(require("./utils/getDirNameFromPath"));
const checkCfg_1 = __importDefault(require("./utils/checkCfg"));
const getPackageJson_1 = __importDefault(require("./utils/getPackageJson"));
const { name, version } = getPackageJson_1.default();
const curPath = process.cwd();
commander_1.program.version(version, '-v, --version', `${name} 的版本`);
Object.values(options_1.default).forEach(item => {
    commander_1.program.addOption(item);
});
commander_1.program.parse(process.argv);
const cfg = Object.assign(Object.assign(Object.assign({}, index_default_json_1.default), utils_1.getConfiguration(name, configs_1.Configuration)), commander_1.program.opts());
checkCfg_1.default(cfg);
const targetPath = path_1.default.resolve(process.cwd(), cfg.path);
const targetExists = fs_1.existsSync(targetPath);
if (!targetExists) {
    utils_1.logger.warning(`Compress target is not exists. Please check targetPath: ${targetPath}`);
    process.exit();
}
let zipType = 'zip';
let zipOpt = {
    zlib: {
        level: Number(cfg.compressLevel)
    }
};
if (cfg.encrypt) {
    archiver_1.default.registerFormat('zip-encrypted', require('archiver-zip-encrypted'));
    zipType = 'zip-encrypted';
    zipOpt.encryptionMethod = cfg.encryptionMethod;
    zipOpt.password = cfg.password;
}
const Output = fs_1.createWriteStream(`${curPath}/${cfg.name}.zip`);
const archive = archiver_1.default.create(zipType, zipOpt);
const targetStatus = fs_1.statSync(targetPath);
const targetName = getDirNameFromPath_1.default(targetPath);
if (targetStatus.isDirectory()) {
    archive.directory(targetPath, cfg.destPath ? cfg.firstDirName || targetName : false);
}
else if (targetStatus.isFile()) {
    archive.file(targetPath, { name: targetName });
}
archive.pipe(Output);
Output.on('close', function () {
    utils_1.logger.success('压缩完成', archive.pointer() / 1024 / 1024 + 'M');
});
archive.on('error', function (err) {
    utils_1.logger.error('压缩失败!');
    throw err;
});
archive.finalize();
//# sourceMappingURL=index.js.map