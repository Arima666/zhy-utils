"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is = {
    arr: function (a) {
        return Array.isArray(a);
    },
    obj: function (a) {
        return typeof a === 'object';
    },
    str: function (a) {
        return typeof a === 'string';
    },
    num: function (a) {
        return typeof a === 'number' && !isNaN(a);
    },
    und: function (a) {
        return typeof a === 'undefined';
    },
    nul: function (a) {
        return a === null;
    },
    boo: function (a) {
        return typeof a === 'boolean';
    },
    fun: function (a) {
        return a instanceof Function;
    }
};
exports.default = is;
//# sourceMappingURL=is.js.map