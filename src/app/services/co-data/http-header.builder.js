"use strict";
var http_1 = require('@angular/http');
var HttpHeaderBuilder = (function () {
    function HttpHeaderBuilder(headers) {
        this.headers = headers ? headers : new http_1.Headers();
    }
    HttpHeaderBuilder.prototype.addBearer = function (token) {
        if (token) {
            this.headers.append('Authorization', 'Bearer ' + token);
        }
        return this;
    };
    HttpHeaderBuilder.prototype.addContentType = function () {
        this.headers.append('Content-Type', 'application/json');
        return this;
    };
    HttpHeaderBuilder.prototype.addContentTypeModel = function (modeltype) {
        if (modeltype) {
            this.headers.append('Content-Type', 'application/json;localModel=' + modeltype);
        }
        else {
            this.headers.append('Content-Type', 'application/json');
        }
        return this;
    };
    HttpHeaderBuilder.prototype.addAcceptJson = function () {
        this.headers.append('Accept', 'application/json');
        return this;
    };
    HttpHeaderBuilder.prototype.build = function () {
        return this.headers;
    };
    return HttpHeaderBuilder;
}());
exports.HttpHeaderBuilder = HttpHeaderBuilder;
//# sourceMappingURL=http-header.builder.js.map