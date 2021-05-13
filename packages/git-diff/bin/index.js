#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@fatyu/utils");
const commander_1 = require("commander");
const execa_1 = __importDefault(require("execa"));
const getUploadPrompt_1 = __importStar(require("./getUploadPrompt"));
const { name, version } = utils_1.getJson([
    __dirname,
    '../package.json'
]);
commander_1.program
    .version(version, '-v, --version', `${name} 的版本`)
    .addOption(new commander_1.Option('-f, --file-type [type]', '输出文件类型')
    .choices(getUploadPrompt_1.TYPES)
    .default('csv'))
    .option('-s, --source [source]', '来源分支、tag、commit')
    .option('-t, --target [target]', '目标分支、tag、commit')
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    const opts = yield getUploadPrompt_1.default(options);
    try {
        const diff = yield (yield execa_1.default('git', [
            'diff',
            opts.source,
            opts.target,
            '--stat-name-width=200',
            '--stat-graph-width=3'
        ])).stdout;
        const diffArr = diff
            .split('\n')
            .filter(item => !/\.(png|html|xlsx|ttf|scss|map)/gi.test(item));
        utils_1.logger.info(JSON.stringify(diffArr, null, 2));
    }
    catch (err) {
        utils_1.logger.error('比较失败', err);
    }
}))
    .parse(process.argv);
//# sourceMappingURL=index.js.map