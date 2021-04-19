"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwErr = void 0;
const commander_1 = require("commander");
const configs_1 = require("../configs");
function throwErr(tips) {
    throw new commander_1.InvalidOptionArgumentError(tips);
}
exports.throwErr = throwErr;
function checkLevel(val) {
    if (val) {
        if (!configs_1.COMPRESS_LEVEL.includes(val))
            throwErr('CompressLevel should between 1 to 9');
        return Number(val);
    }
}
function checkName(val) {
    if (val) {
        if (/[?\\/:*<>|"]/g.test(val))
            throwErr('Name is invalid. Should not have ?\\/:*<>|"');
    }
}
function checkFirstDirName(val) {
    if (val) {
        if (/[?\\/:*<>|"]/g.test(val))
            throwErr('FirstDirName is invalid. Should not have ?\\/:*<>|"');
    }
}
function checkEncryptMethod(val) {
    if (val) {
        if (!configs_1.ENCRYPTIONMETHOD.includes(val))
            throwErr(`Compression is invalid. Allowed choices are ${configs_1.ENCRYPTIONMETHOD.join(', ')}.`);
    }
}
const checkOptions = {
    encryptionMethod: checkEncryptMethod,
    compressLevel: checkLevel,
    name: checkName,
    firstDirName: checkFirstDirName
};
exports.default = checkOptions;
//# sourceMappingURL=checkOptions.js.map