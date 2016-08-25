"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CoDataModelError = (function (_super) {
    __extends(CoDataModelError, _super);
    function CoDataModelError(message) {
        _super.call(this, message);
        this.message = message;
    }
    return CoDataModelError;
}(Error));
exports.CoDataModelError = CoDataModelError;
var CoDataServiceError = (function (_super) {
    __extends(CoDataServiceError, _super);
    function CoDataServiceError(message) {
        _super.call(this, message);
        this.message = message;
    }
    return CoDataServiceError;
}(Error));
exports.CoDataServiceError = CoDataServiceError;
var CaUriError = (function (_super) {
    __extends(CaUriError, _super);
    function CaUriError(message) {
        _super.call(this, message);
        this.message = message;
    }
    return CaUriError;
}(Error));
exports.CaUriError = CaUriError;
//# sourceMappingURL=ca-data.error.js.map