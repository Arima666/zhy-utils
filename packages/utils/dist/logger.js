"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const figures_1 = __importDefault(require("figures"));
const error = (...text) => console.log(chalk_1.default.bold.red(figures_1.default.cross, ...text));
const warning = (...text) => console.log(chalk_1.default.keyword('orange')(figures_1.default.info, ...text));
const info = (...text) => console.log(chalk_1.default.cyan(figures_1.default.info, ...text));
const success = (...text) => console.log(chalk_1.default.green(figures_1.default.tick, ...text));
const logger = {
    error,
    warning,
    info,
    success
};
exports.default = logger;
//# sourceMappingURL=logger.js.map