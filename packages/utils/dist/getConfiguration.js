"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var find_up_1 = __importDefault(require("find-up"));
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
function getConfiguration(packageName, files) {
    var config = {};
    var configPath = find_up_1.default.sync(files);
    if (!configPath) {
        return config;
    }
    if (path_1.default.extname(configPath) === '.js') {
        var jsConfiguration = require(configPath);
        if (typeof jsConfiguration === 'function') {
            config = jsConfiguration();
        }
        else {
            config = jsConfiguration;
        }
    }
    else {
        config = JSON.parse(fs_1.readFileSync(configPath, { encoding: 'utf-8' }));
    }
    if (typeof config !== 'object') {
        throw Error("[" + packageName + "] Invalid configuration in " + configPath + " provided. Expected an object but found " + typeof config + ".");
    }
    return config;
}
exports.default = getConfiguration;
//# sourceMappingURL=getConfiguration.js.map