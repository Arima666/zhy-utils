"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLATFORM = exports.COMPRESS_LEVEL = exports.COMPRESSION = exports.Configuration = exports.OptionsKey = void 0;
var OptionsKey;
(function (OptionsKey) {
    OptionsKey["path"] = "path";
    OptionsKey["compression"] = "compression";
    OptionsKey["compressLevel"] = "compressLevel";
    OptionsKey["mimeType"] = "mimeType";
    OptionsKey["platform"] = "platform";
})(OptionsKey = exports.OptionsKey || (exports.OptionsKey = {}));
exports.Configuration = ['compressrc', 'compressrc.js', 'compressrc.json'];
exports.COMPRESSION = ['STORE', 'DEFLATE'];
exports.COMPRESS_LEVEL = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
exports.PLATFORM = ['DOS', 'UNIX'];
//# sourceMappingURL=index.js.map