"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var configs_1 = require("../configs");
var is_1 = __importDefault(require("./is"));
function throwErr(tips) {
    throw new commander_1.InvalidOptionArgumentError(tips);
}
function checkPath(val) {
    if (!val)
        throwErr('Path is required');
    if (!is_1.default.str(val))
        throwErr('Path should be a string');
    return val;
}
function checkCompression(val) {
    if (val) {
        if (!configs_1.COMPRESSION.includes(val))
            throwErr("Compression is invalid. Allowed choices are " + configs_1.COMPRESSION.join(', ') + ".");
    }
    return val;
}
function checkLevel(val) {
    if (val) {
        if (!configs_1.COMPRESS_LEVEL.includes(val))
            throwErr('CompressLevel should between 1 to 9');
        return Number(val);
    }
    return val;
}
function checkMimeType(val) { }
function checkPlatform(val) {
    if (val) {
        if (!configs_1.PLATFORM.includes(val))
            throwErr("Platform is invalid. Allowed choices are " + configs_1.PLATFORM.join(', ') + ".");
    }
    return val;
}
function checkName(val) {
    if (val) {
        if (/[?\\/:*<>|"]/g.test(val))
            throwErr('Name is invalid. Should not have ?\\/:*<>|"');
    }
    return val;
}
function checkFirstDirName(val) {
    if (val) {
        if (/[?\\/:*<>|"]/g.test(val))
            throwErr('FirstDirName is invalid. Should not have ?\\/:*<>|"');
    }
    return val;
}
var checkOptions = {
    path: checkPath,
    compression: checkCompression,
    compressLevel: checkLevel,
    platform: checkPlatform,
    name: checkName,
    firstDirName: checkFirstDirName
};
exports.default = checkOptions;
//# sourceMappingURL=checkOptions.js.map