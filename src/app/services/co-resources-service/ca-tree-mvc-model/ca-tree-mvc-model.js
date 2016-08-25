"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('rxjs/add/operator/map');
var ca_base_mvc_model_1 = require('../ca-base-mvc.model');
var CaTreeMvcModel = (function (_super) {
    __extends(CaTreeMvcModel, _super);
    function CaTreeMvcModel() {
        _super.call(this);
        this.resources = {};
        this.resources.meta = new Array();
        this.resources.meta.usecase = new Array();
        this.resources.resource = new Array();
    }
    CaTreeMvcModel.prototype.getNode = function (nr) {
        //let result = this.resources.resource.filter(res => res.nr === nr);
        //if (result.length === 1) {
        //  return result[0];
        //} else {
        //  return null;
        //}
        return null;
    };
    return CaTreeMvcModel;
}(ca_base_mvc_model_1.CaBaseMvcModel));
exports.CaTreeMvcModel = CaTreeMvcModel;
//# sourceMappingURL=ca-tree-mvc-model.js.map