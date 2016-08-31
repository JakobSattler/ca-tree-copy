"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ca_resources_service_1 = require('../ca-resources.service');
var CaTreeMvcService = (function (_super) {
    __extends(CaTreeMvcService, _super);
    function CaTreeMvcService(caDataService) {
        _super.call(this, caDataService);
    }
    CaTreeMvcService.prototype.dispatchAction = function (action) {
        //switch (action.action) {
        //  case actions.CA_TABLE_DELETE:
        //    return this.fetchDataModel(action.localModel);
        //  default:
        //    return this.fetchDataModel(action.localModel);
        //}
        return null;
    };
    CaTreeMvcService.prototype.init = function (uri) {
        return this.fetchDataModel(null, uri);
    };
    CaTreeMvcService.prototype.fetchDataModel = function (model, uri) {
        return _super.prototype.fetchDataModel.call(this, model, uri);
    };
    CaTreeMvcService = __decorate([
        core_1.Injectable()
    ], CaTreeMvcService);
    return CaTreeMvcService;
}(ca_resources_service_1.CaResourcesService));
exports.CaTreeMvcService = CaTreeMvcService;
//# sourceMappingURL=ca-tree-mvc.service.js.map