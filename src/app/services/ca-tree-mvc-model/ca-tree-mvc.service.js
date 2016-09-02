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
var ca_resources_service_1 = require('../../../../../../core/lib/services/co-resources-service/ca-resources.service');
var actions = require('./ca-tree-actions');
//import * as actions from './ca-table.actions';
var CaTreeMvcService = (function (_super) {
    __extends(CaTreeMvcService, _super);
    function CaTreeMvcService(_caDataService) {
        _super.call(this, _caDataService);
        this._caDataService = _caDataService;
    }
    CaTreeMvcService.prototype.dispatchAction = function (action) {
        //switch (action.action) {
        //  case actions.CA_TABLE_DELETE:
        //    return this.fetchDataModel(action.localModel);
        //  default:
        //    return this.fetchDataModel(action.localModel);
        //}
        switch (action.action) {
            case actions.CA_TREE_EDIT:
                console.log('ca_tree_edit');
                return this.fetchDataModel(action.model, this.caTreeComponent.caUri);
            default:
                console.log('default');
        }
        return null;
    };
    CaTreeMvcService.prototype.init = function (uri) {
        return this.fetchDataModel(null, uri);
    };
    CaTreeMvcService.prototype.fetchDataModel = function (model, uri) {
        return _super.prototype.fetchDataModel.call(this, model, uri);
    };
    CaTreeMvcService.prototype.updateNode = function (uri, nr, newName) {
        var _this = this;
        var node;
        this.init(uri).subscribe(function (resource) {
            //find old node using nr, replace its name with the new one
            node = resource.resource.filter(function (res) { return res.content.nr === nr + ''; })[0].content;
            var oldNodeString = JSON.stringify(node);
            var newNodeString = oldNodeString.replace(node.name, newName);
            _this._caDataService.put(uri, JSON.stringify(resource).replace(oldNodeString, newNodeString)).subscribe(function (error) {
                console.log(error);
            });
        });
    };
    CaTreeMvcService = __decorate([
        core_1.Injectable()
    ], CaTreeMvcService);
    return CaTreeMvcService;
}(ca_resources_service_1.CaResourcesService));
exports.CaTreeMvcService = CaTreeMvcService;
//# sourceMappingURL=ca-tree-mvc.service.js.map