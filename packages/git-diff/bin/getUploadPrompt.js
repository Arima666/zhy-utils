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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = void 0;
const inquirer_1 = require("inquirer");
exports.TYPES = ['csv', 'diff', 'patch'];
const PromptMap = {
    fileType: {
        type: 'list',
        name: 'fileType',
        choices: exports.TYPES,
        default: exports.TYPES[0]
    },
    source: {
        type: 'input',
        name: 'source',
        validate(input) {
            return input ? true : '请输入来源分支、tag、commit';
        }
    },
    target: {
        type: 'input',
        name: 'target',
        validate(input) {
            return input ? true : '请输入目标分支、tag、commit';
        }
    }
};
function getPromptList(opts) {
    Object.entries(opts).forEach(([key, value]) => {
        const _key = key;
        if (PromptMap[_key])
            PromptMap[_key].default = value;
    });
    return Object.values(PromptMap);
}
function getUploadPrompt(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = yield inquirer_1.prompt(getPromptList(opts));
        return Object.assign(Object.assign({}, opts), options);
    });
}
exports.default = getUploadPrompt;
//# sourceMappingURL=getUploadPrompt.js.map