"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var figures_1 = __importDefault(require("figures"));
var error = function () {
    var _a;
    var text = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        text[_i] = arguments[_i];
    }
    return console.log((_a = chalk_1.default.bold).red.apply(_a, __spreadArray([figures_1.default.cross], text)));
};
var warning = function () {
    var text = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        text[_i] = arguments[_i];
    }
    return console.log(chalk_1.default.keyword('orange').apply(void 0, __spreadArray([figures_1.default.info], text)));
};
var info = function () {
    var text = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        text[_i] = arguments[_i];
    }
    return console.log(chalk_1.default.cyan.apply(chalk_1.default, __spreadArray([figures_1.default.info], text)));
};
var success = function () {
    var text = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        text[_i] = arguments[_i];
    }
    return console.log(chalk_1.default.green.apply(chalk_1.default, __spreadArray([figures_1.default.tick], text)));
};
var logger = {
    error: error,
    warning: warning,
    info: info,
    success: success
};
exports.default = logger;
//# sourceMappingURL=logger.js.map