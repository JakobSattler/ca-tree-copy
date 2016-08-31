"use strict";
var co_resources_info_class_1 = require('../co-data/co-resources-info.class');
var ca_data_service_1 = require('../co-data/ca-data.service');
var co_data_model_1 = require('../co-data/co-data.model');
var model_1 = require('../../dto/at/campusonline/core/lib/model/codata/annotation/link/model');
//import {CaUtilsService} from '../ca-utils.service';
var CaBaseMvcModel = (function () {
    function CaBaseMvcModel() {
    }
    CaBaseMvcModel.getTableMvcCopy = function (model) {
        var copy;
        //copy = <CaBaseMvcModel>CaUtilsService.deepCopy(localModel);
        return copy;
    };
    CaBaseMvcModel.prototype.getResources = function () {
        return this.resources.resource;
    };
    CaBaseMvcModel.prototype.getContentRoot = function () {
        return new co_resources_info_class_1.CoResourcesInfo(this.resources).getContentRoot();
    };
    CaBaseMvcModel.prototype.getSelfLink = function () {
        /* tslint:disable:no-string-literal */
        if (!this.resources.link) {
            return;
        }
        for (var _i = 0, _a = this.resources.link; _i < _a.length; _i++) {
            var link = _a[_i];
            if (model_1.CoRelType[link._rel] === 'SELF') {
                return link;
            }
        }
        return null;
        /* tslint:enable:no-string-literal */
    };
    CaBaseMvcModel.prototype.getUri = function () {
        var selfLink = this.getSelfLink();
        // TODO: make helper function
        var uri = '../../rest/';
        uri += selfLink._href;
        uri += '?$meta=true';
        var coLink = new co_data_model_1.CaLink();
        coLink._rel = model_1.CoRelType.self;
        coLink._href = uri;
        var caUri = new ca_data_service_1.CaUri(coLink);
        console.log('CaBaseMvcModel: getUri: ', uri);
        return caUri;
    };
    return CaBaseMvcModel;
}());
exports.CaBaseMvcModel = CaBaseMvcModel;
//# sourceMappingURL=ca-base-mvc.model.js.map