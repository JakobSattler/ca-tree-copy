"use strict";
var co_data_model_1 = require('./co-data.model');
var CoResourcesBuilder = (function () {
    function CoResourcesBuilder() {
        this._contentType = co_data_model_1.CoDataConstants.CONTENT_TYPE_GENERIC;
        this._contentRoot = co_data_model_1.CoDataConstants.CONTENT_ROOT_GENERIC;
    }
    CoResourcesBuilder.prototype.contentType = function (contentType) {
        this._contentType = contentType;
        return this;
    };
    CoResourcesBuilder.prototype.contentRoot = function (contentRoot) {
        this._contentRoot = contentRoot;
        return this;
    };
    CoResourcesBuilder.prototype.dtoList = function (dtoList) {
        this._dtoList = dtoList;
        return this;
    };
    CoResourcesBuilder.prototype.build = function () {
        var _this = this;
        var resources = {
            resource: []
        };
        if (!this._dtoList) {
            return resources;
        }
        this._dtoList.forEach(function (dto) {
            var content = {
                _type: _this._contentType
            };
            content[_this._contentRoot] = dto;
            // leider muss man hier auf any zurück greifen,
            // da in diesem Fall CoContentDto dynamisch erstellt wird
            var resource = {
                content: content
            };
            resources.resource.push(resource);
        });
        return resources;
    };
    return CoResourcesBuilder;
}());
exports.CoResourcesBuilder = CoResourcesBuilder;
//# sourceMappingURL=co-resources-builder.class.js.map