"use strict";
var co_data_model_1 = require('./co-data.model');
var CoResourcesInfo = (function () {
    function CoResourcesInfo(resources) {
        this.resources = resources;
    }
    CoResourcesInfo.prototype.countResources = function () {
        return this.resources.resource.length;
    };
    CoResourcesInfo.prototype.getFirstContent = function () {
        if (this.resources.resource.length > 0) {
            return this.resources.resource[0].content;
        }
        return null;
    };
    CoResourcesInfo.prototype.getAllContent = function () {
        var contentArray = Array();
        if (this.countResources() === 0) {
            return null;
        }
        for (var _i = 0, _a = this.resources.resource; _i < _a.length; _i++) {
            var resource = _a[_i];
            contentArray.push(resource.content);
        }
        return contentArray;
    };
    CoResourcesInfo.prototype.getContentType = function () {
        var firstContent = this.getFirstContent();
        if (!firstContent) {
            return co_data_model_1.CoDataConstants.CONTENT_TYPE_GENERIC;
        }
        return firstContent._type;
    };
    CoResourcesInfo.prototype.getContentRoot = function () {
        var firstContent = this.getFirstContent();
        if (!firstContent) {
            return co_data_model_1.CoDataConstants.CONTENT_ROOT_GENERIC;
        }
        var keys = Object.keys(firstContent);
        if (keys.length !== 2) {
            throw new TypeError('no valid codata content-resource');
        }
        //FIXME: this is not deterministic!!! -> maybe just using 'data' as contentRoot?
        return keys[1];
    };
    CoResourcesInfo.prototype.getFirstDto = function () {
        var contentRoot = this.getContentRoot();
        if (contentRoot !== co_data_model_1.CoDataConstants.CONTENT_ROOT_GENERIC) {
            return this.resources.resource[0].content[contentRoot];
        }
        return null;
    };
    CoResourcesInfo.prototype.getContentKeys = function () {
        //let dto:T = this.getFirstDto();
        var contentRoot = this.getContentRoot();
        //if (dto) {
        //      return Object.keys(dto);
        //  }
        var allKeys = [];
        var found = false;
        for (var _i = 0, _a = this.resources.resource; _i < _a.length; _i++) {
            var row = _a[_i];
            for (var _b = 0, _c = Object.keys(row.content[contentRoot]); _b < _c.length; _b++) {
                var oneKey = _c[_b];
                found = false;
                for (var _d = 0, allKeys_1 = allKeys; _d < allKeys_1.length; _d++) {
                    var alreadyThereKey = allKeys_1[_d];
                    if (alreadyThereKey === oneKey) {
                        found = true;
                    }
                }
                if (!found) {
                    allKeys.push(oneKey);
                }
            }
        }
        return allKeys;
    };
    return CoResourcesInfo;
}());
exports.CoResourcesInfo = CoResourcesInfo;
//# sourceMappingURL=co-resources-info.class.js.map