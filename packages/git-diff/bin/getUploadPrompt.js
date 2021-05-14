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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = void 0;
const utils_1 = require("@fatyu/utils");
const execa_1 = __importDefault(require("execa"));
const inquirer_1 = require("inquirer");
exports.TYPES = ['csv', 'diff', 'patch'];
function getBranchList() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let defaultBranch;
            const origin = (yield execa_1.default('git', ['branch', '-r'])).stdout
                .split('\n')
                .slice(1)
                .map(item => item.trim());
            const local = (yield execa_1.default('git', ['branch'])).stdout
                .split('\n')
                .map(item => {
                if (/^\*/.test(item)) {
                    const branchName = item.replace(/^\**\s+(\S+)/, '$1');
                    defaultBranch = branchName;
                    return branchName;
                }
                return item;
            });
            return { BranchList: [...origin, ...local], defaultBranch };
        }
        catch (err) {
            utils_1.logger.error('获取git分支失败');
            return { BranchList: [] };
        }
    });
}
function getTagList() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tags = (yield execa_1.default('git', ['tag', '-l'])).stdout.split('\n');
            return tags.reverse();
        }
        catch (err) {
            utils_1.logger.error('获取git tag 列表失败');
            return [];
        }
    });
}
const Branch = ['custom'];
const PromptMap = {
    fileType: {
        type: 'list',
        name: 'fileType',
        message: '请选择输出文件类型',
        choices: exports.TYPES,
        default: exports.TYPES[0]
    },
    source: {
        type: 'list',
        name: 'source',
        message: '请输入来源分支、tag、commit',
        choices: Branch,
        default: Branch[0],
        validate(input) {
            return input ? true : '请选择来源分支、tag、commit';
        }
    },
    target: {
        type: 'list',
        name: 'target',
        message: '请输入目标分支、tag、commit',
        choices: Branch,
        default: Branch[0],
        validate(input) {
            return input ? true : '请选择目标分支、tag、commit';
        }
    },
    exclude: {
        type: 'input',
        name: 'exclude',
        message: '请输入需要过滤的文件类型，以 | 分割',
        default: 'png|html|xlsx|ttf|scss|map|md'
    }
};
const OtherPrompts = [
    {
        type: 'input',
        name: 'sourceInput',
        when({ source }) {
            return source === Branch[0];
        },
        validate(input) {
            return input ? true : '请输入目标分支、tag、commit';
        }
    },
    {
        type: 'input',
        name: 'targetInput',
        when({ target }) {
            return target === Branch[0];
        },
        validate(input) {
            return input ? true : '请输入目标分支、tag、commit';
        }
    }
];
function getPromptList(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const { BranchList, defaultBranch } = yield getBranchList();
        const tags = yield getTagList();
        if (defaultBranch)
            PromptMap.source.default = defaultBranch;
        PromptMap.source.choices = [
            ...Branch,
            ...BranchList,
            ...tags
        ];
        PromptMap.target.choices = [
            ...Branch,
            ...BranchList,
            ...tags
        ];
        Object.entries(opts).forEach(([key, value]) => {
            const _key = key;
            if (PromptMap[_key])
                PromptMap[_key].default = value;
        });
        return [...Object.values(PromptMap), ...OtherPrompts];
    });
}
function getUploadPrompt(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const PromptList = yield getPromptList(opts);
        const options = yield inquirer_1.prompt(PromptList);
        if (options.sourceInput) {
            options.source = options.sourceInput;
        }
        if (options.targetInput) {
            options.target = options.targetInput;
        }
        return Object.assign(Object.assign({}, opts), options);
    });
}
exports.default = getUploadPrompt;
//# sourceMappingURL=getUploadPrompt.js.map