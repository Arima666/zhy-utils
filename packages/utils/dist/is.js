"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is = {
    arr(a) {
        return Array.isArray(a);
    },
    obj(a) {
        return typeof a === 'object';
    },
    str(a) {
        return typeof a === 'string';
    },
    num(a) {
        return typeof a === 'number' && !isNaN(a);
    },
    und(a) {
        return typeof a === 'undefined';
    },
    nul(a) {
        return a === null;
    },
    boo(a) {
        return typeof a === 'boolean';
    },
    fun(a) {
        return a instanceof Function;
    }
};
exports.default = is;
//# sourceMappingURL=is.js.map